import { ParsedLogic } from '../types'
import * as ts from 'typescript'
import { NodeBuilderFlags } from 'typescript'

export function visitWindowValues(type: ts.Type, inputProperty: ts.PropertyAssignment, parsedLogic: ParsedLogic) {
    const { checker } = parsedLogic

    for (const property of type.getProperties()) {
        const name = property.getName()
        if (ts.isPropertyAssignment(property.valueDeclaration)) {
            const value = property.valueDeclaration.initializer

            if (value && ts.isFunctionLike(value)) {
                const type = checker.getTypeOfSymbolAtLocation(property, value)
                const signature = type.getCallSignatures()[0]
                const typeNode = checker.typeToTypeNode(signature.getReturnType(), value, NodeBuilderFlags.NoTruncation)

                parsedLogic.reducers.push({ name, typeNode })
            }
        }
    }
}
