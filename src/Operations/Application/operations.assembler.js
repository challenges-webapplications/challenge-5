import {Operation} from "../Domain/operation.entity.js"

export class OperationAssembler {

    static toEntitiesFromResponse(response) {
        if (!response || !response.data) {
            console.error('Invalid response received');
            return [];
        }
        
        const operationResponse = response.data;
        if (!Array.isArray(operationResponse)) {
            console.error('Expected array of operations in response');
            return [];
        }

        return operationResponse.map((operation) => {
            return this.toEntityFromResource(operation);
        });
    }

    static toEntityFromResource(resource) {
        let operation = new Operation(resource);
        return operation;
    }
}