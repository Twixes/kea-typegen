import * as ts from 'typescript'
import { ParsedLogic } from '../types'
import { isKeaCall } from '../utils'
import { visitActions } from './visitActions'
import { visitReducers } from './visitReducers'
import { visitSelectors } from './visitSelectors'

export function visitProgram(program: ts.Program) {
    const checker = program.getTypeChecker()
    const parsedLogics: ParsedLogic[] = []

    for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
            ts.forEachChild(sourceFile, createVisit(checker, parsedLogics, sourceFile))
        }
    }

    return parsedLogics
}

export function createVisit(checker: ts.TypeChecker, parsedLogics: ParsedLogic[], sourceFile: ts.SourceFile) {
    return function visit(node: ts.Node) {
        if (!isKeaCall(node, checker)) {
            ts.forEachChild(node, visit)
            return
        }

        let logicName = 'logic'
        if (ts.isCallExpression(node.parent) && ts.isVariableDeclaration(node.parent.parent)) {
            logicName = node.parent.parent.name.getText()
        }

        const parsedLogic: ParsedLogic = {
            checker,
            logicName,
            fileName: sourceFile.fileName,
            actions: [],
            reducers: [],
            selectors: [],
        }

        const input = (node.parent as ts.CallExpression).arguments[0] as ts.ObjectLiteralExpression

        for (const inputProperty of input.properties) {
            const symbol = checker.getSymbolAtLocation(inputProperty.name as ts.Identifier)

            if (!symbol) {
                continue
            }

            const name = symbol.getName()
            let type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)

            if (ts.isFunctionTypeNode(checker.typeToTypeNode(type))) {
                type = type.getCallSignatures()[0].getReturnType()
            }

            if (name === 'actions') {
                visitActions(type, parsedLogic)
            } else if (name === 'reducers') {
                visitReducers(type, parsedLogic)
            } else if (name === 'selectors') {
                visitSelectors(type, parsedLogic)
            }
        }

        parsedLogics.push(parsedLogic)
    }
}
