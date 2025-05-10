import {Operation} from "@/Operations/Domain/operation.entity.js"

export class OperationAssembler {

    static toEntitiesFromResponse(response) {
        if (response.data.status !== "ok") {
            console.error(`${response.status},  ${response.code}, ${response.message}`);
            return [];
        }
        const operationResponse = response.data;
        return operationResponse["operation"].map((operation) => {
            return this.toEntityFromResource(operation);
        });
    }

    static toEntityFromResource(resource) {
        let operation = new Operation(resource);
        return operation;
    }
}