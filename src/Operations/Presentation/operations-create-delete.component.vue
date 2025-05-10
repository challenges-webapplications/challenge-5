<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { OperationsAPIService } from '../Application/operations-api.service.js';
import { Operation } from '../Domain/operation.entity.js';
import TheHeader from '@/public/Presentation/the-header.component.vue';

const router = useRouter();
const operationsService = new OperationsAPIService();
const newOperation = ref(new Operation());

const saveOperation = async () => {
    try {
        await operationsService.createOperation(newOperation.value);
        newOperation.value = new Operation();
        router.push({ name: '/operations' });
    } catch (error) {
        console.error('Error creating operation:', error);
    }
};
</script>

<template>
    <TheHeader />
    <div class="create-operation-container">
        <pv-card class="operation-form-card">
            <template #title>
                <div class="card-header">
                    <h2>Create New Operation</h2>
                </div>
            </template>
            <template #content>
                <div class="form-container">
                    <pv-float-label class="mb-5">
                        <pv-input-text
                            v-model="newOperation.title"
                            class="w-full operation-input"
                            required
                        />
                        <label class="operation-label">Operation Title*</label>
                    </pv-float-label>

                    <pv-float-label class="mb-5">
                        <pv-input-text
                            v-model="newOperation.operationType"
                            class="w-full operation-input"
                            required
                        />
                        <label class="operation-label">Operation Type*</label>
                    </pv-float-label>

                    <pv-float-label class="mb-5">
                        <pv-input-text
                            v-model="newOperation.date"
                            type="datetime-local"
                            class="w-full operation-input"
                            required
                        />
                        <label class="operation-label">Operation Date*</label>
                    </pv-float-label>
                </div>
            </template>
            <template #footer>
                <div class="card-footer">
                    <pv-button
                        label="Save"
                        icon="pi pi-save"
                        severity="success"
                        @click="saveOperation"
                        class="p-button-sm w-full"
                    />
                </div>
            </template>
        </pv-card>
    </div>
</template>

<style scoped>
.create-operation-container {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
}

.operation-form-card {
    margin-bottom: 1.5rem;
}

.card-header {
    padding: 0.75rem;
    background-color: var(--surface-section);
}

.card-header h2 {
    margin: 0;
    color: var(--text-color);
    font-size: 1.25rem;
}

.form-container {
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

.operation-label {
    color: var(--text-color);
}

:deep(.p-float-label) input + label {
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
}

:deep(.p-button.p-button-sm) {
    font-size: 0.875rem;
    padding: 0.5rem;
}
</style>