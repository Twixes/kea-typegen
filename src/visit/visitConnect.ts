import { ParsedLogic } from '../types'
import * as ts from 'typescript'
import { getParameterDeclaration } from '../utils'

export function visitConnect(type: ts.Type, parsedLogic: ParsedLogic) {
    const { checker } = parsedLogic

    for (const property of type.getProperties()) {
        const loaderName = property.getName()
        const value = (property.valueDeclaration as ts.PropertyAssignment).initializer

        if (value && ts.isArrayLiteralExpression(value)) {
            for (let i = 0; i < value.elements.length; i += 2) {
                const logicReference = value.elements[i]
                const connectArray = value.elements[i + 1]

                let strings = []
                if (connectArray && ts.isArrayLiteralExpression(connectArray)) {
                    strings = connectArray.elements.map((e: ts.StringLiteral) => e.text)
                }

                const symbol = checker.getSymbolAtLocation(logicReference)
                const otherLogicType = checker.getTypeOfSymbolAtLocation(symbol, logicReference)

                if (loaderName === 'actions') {
                    const actionsForLogic = (otherLogicType as any).properties.find((p) => p.escapedName === 'actions')
                    const actionTypes = actionsForLogic.valueDeclaration.type.members

                    for (const actionType of actionTypes) {
                        if (ts.isPropertySignature(actionType)) {
                            const name = actionType.name.getText()

                            const functionTypeNode = actionType.type
                            if (strings.includes(name) && ts.isFunctionTypeNode(functionTypeNode)) {
                                const parameters = functionTypeNode.parameters.map((param) => getParameterDeclaration(param))

                                let returnType = functionTypeNode.type

                                if (ts.isParenthesizedTypeNode(returnType)) {
                                    returnType = returnType.type
                                }

                                if (ts.isTypeLiteralNode(returnType)) {
                                    const payload = returnType.members.find(
                                        (m) => m.name.getText() === 'payload',
                                    ) as ts.PropertySignature

                                    parsedLogic.actions.push({
                                        name: name,
                                        returnTypeNode: payload.type,
                                        parameters: parameters,
                                    })
                                }
                            }
                        }
                    }
                }

                if (loaderName === 'values' || loaderName === 'props') {
                    const selectorsForLogic = (otherLogicType as any).properties.find((p) => p.escapedName === 'selectors')
                    const selectorTypes = selectorsForLogic.valueDeclaration.type.members

                    for (const selectorType of selectorTypes) {
                        if (ts.isPropertySignature(selectorType)) {
                            const name = selectorType.name.getText()

                            const functionTypeNode = selectorType.type
                            if (strings.includes(name) && ts.isFunctionTypeNode(functionTypeNode)) {
                                let returnType = functionTypeNode.type

                                if (ts.isParenthesizedTypeNode(returnType)) {
                                    returnType = returnType.type
                                }

                                parsedLogic.selectors.push({
                                    name: name,
                                    typeNode: returnType,
                                    functionTypes: []
                                })
                            }
                        }
                    }
                }
            }
        }
    }
}
