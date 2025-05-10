<script setup>
import { ref, onMounted } from 'vue';
import { OperationsAPIService } from '../Application/operations-api.service.js';
import { OperationAssembler } from '../Application/operations.assembler.js';
import { useRouter } from 'vue-router';
import TheHeader from '@/public/Presentation/the-header.component.vue';

const operations = ref([]);
const operationsService = new OperationsAPIService();

const getData = async () => {
    try {
        const response = await operationsService.getAll();
        operations.value = OperationAssembler.toEntitiesFromResponse(response);
    } catch (error) {
        console.error('Error fetching operations:', error);
        operations.value = [];
    }
};

onMounted(() => {
    getData();
});

const router = useRouter();

const navigateToCreate = () => {
    router.push({ name: 'operations-create' });
};

const deleteOperation = async (id) => {
    try {
        await operationsService.deleteOperation(id);
        await getData(); 
        alert("Operation deleted successfully.");
    } catch (error) {
        console.error('Error deleting operation:', error);
        alert("Error deleting Operation")
    }
};
</script>

<template>
    <TheHeader />
    <div class="operations-container">
        <div class="grid">
            <div v-for="operation in operations" :key="operation.id" class="col-12 sm:col-6 md:col-4 lg:col-3">
                <pv-card class="operation-card">
                    <template #header>
                        <div class="card-header">
                            <pv-input-text
                                v-model="operation.name"
                                disabled
                                class="w-full operation-input"
                            />
                        </div>
                    </template>
                    <template #content>
                        <div class="operation-details">
                            <pv-float-label class="mb-4">
                                <pv-input-text
                                    v-model="operation.amount"
                                    disabled
                                    class="w-full operation-input"
                                />
                                <label class="operation-label">Amount</label>
                            </pv-float-label>
                            
                            <pv-float-label class="mb-4">
                                <pv-input-text
                                    v-model="operation.createdAt"
                                    disabled
                                    class="w-full operation-input"
                                />
                                <label class="operation-label">Created At</label>
                            </pv-float-label>
                        </div>
                    </template>
                    <template #footer>
                        <div class="card-footer">
                            <pv-button 
                                icon="pi pi-times" 
                                severity="danger" 
                                text 
                                rounded
                                aria-label="Delete"
                                @click="deleteOperation(operation.id)"
                            />
                        </div>
                    </template>
                </pv-card>
            </div>
        </div>
        
        <pv-button 
            class="floating-button"
            icon="pi pi-plus"
            severity="success"
            rounded
            raised
            @click="navigateToCreate"
            aria-label="Create new operation"
        />
    </div>
</template>

<style scoped>
.operations-container {
    padding: 2rem;
}

.operation-card {
    margin-bottom: 2rem;
    height: 100%;
}

.card-header {
    padding: 1rem;
    background-color: var(--surface-section);
}

.operation-details {
    padding: 1rem;
}

.card-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
}

.operation-input {
    background-color: var(--surface-ground);
    color: var(--text-color);
}

.operation-input:disabled {
    opacity: 1;
    color: var(--text-color);
    background-color: var(--surface-ground);
}

.operation-label {
    color: var(--text-color);
}

:deep(.p-float-label) input:disabled + label {
    color: var(--text-color);
}

:deep(.p-inputtext) {
    width: 100%;
    color: var(--text-color);
}

:deep(.p-float-label) {
    width: 100%;
}

.floating-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
}

:deep(.floating-button .p-button-icon) {
    font-size: 1.5rem;
}
</style>