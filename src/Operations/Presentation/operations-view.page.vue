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
    router.push({ name: '/operations-create' });
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

const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
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
                                v-model="operation.title"
                                disabled
                                class="w-full operation-input"
                            />
                        </div>
                    </template>
                    <template #content>
                        <div class="operation-details">
                            <pv-float-label class="mb-5">
                                <pv-input-text
                                    v-model="operation.operationType"
                                    disabled
                                    class="w-full operation-input"
                                />
                                <label class="operation-label">Operation Type</label>
                            </pv-float-label>
                            
                            <pv-float-label class="mb-4">
                                <pv-input-text
                                    :model-value="formatDate(operation.date)"
                                    disabled
                                    class="w-full operation-input"
                                />
                                <label class="operation-label">Date</label>
                            </pv-float-label>
                        </div>
                    </template>
                    <template #footer>
                        <div class="card-footer">
                            <pv-button 
                                label="Delete"
                                icon="pi pi-trash"
                                severity="danger"
                                @click="deleteOperation(operation.id)"
                                class="p-button-sm w-full"
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
    max-width: 1400px;
    margin: 0 auto;
}

.operation-card {
    margin-bottom: 1.5rem;
    height: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
}

.card-header {
    padding: 0.75rem;
    background-color: var(--surface-section);
}

.operation-details {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.card-footer {
    padding: 0.75rem;
    border-top: 1px solid var(--surface-border);
}

.operation-input {
    background-color: var(--surface-ground);
    color: var(--text-color);
    padding: 0.5rem;
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
    padding: 0.5rem;
    font-size: 0.9rem;
}

:deep(.p-float-label) {
    width: 100%;
    margin-bottom: 0.5rem;
}

:deep(.p-button.p-button-sm) {
    font-size: 0.875rem;
    padding: 0.5rem;
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