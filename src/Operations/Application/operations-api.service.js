import axios from "axios";

const OperationAPI = import.meta.env.VITE_OPERATIONS_API_URL;

export class OperationsAPIService {
    async getAll() {
        var response = await axios.get(`${OperationAPI}`)
        return response; 
    }

    async createOperation(operation) {
        const response = await axios.post(`${OperationAPI}`, operation);
        return response;
    }

    async deleteOperation(id) {
        const response = await axios.delete(`${OperationAPI}/${id}`);
        return response;
    }
}