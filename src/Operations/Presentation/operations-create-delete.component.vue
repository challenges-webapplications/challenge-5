<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { OperationsAPIService } from '../Application/operations-api.service.js';
import { Operation } from '../Domain/operation.entity.js';

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
    <div class="create-operation-container">
        <pv-card>
            <template #title>
                Create New Operation
            </template>
            <template #content>
                <div class="form-container">
                    <pv-float-label class="mb-4">
                        <pv-input-text
                            v-model="newOperation.name"
                            class="w-full"
                            required
                        />
                        <label>Operation Name*</label>
                    </pv-float-label>

                    <pv-float-label class="mb-4">
                        <pv-input-text
                            v-model="newOperation.region"
                            class="w-full"
                            required
                        />
                        <label>Type of Operation*</label>
                    </pv-float-label>

                    <pv-float-label class="mb-4">
                        <pv-input-text
                            v-model="newOperation.capital"
                            class="w-full"
                            required
                        />
                        <label>Operation Date*</label>
                    </pv-float-label>

                    <pv-float-label class="mb-4">
                        <pv-input-text
                            v-model="newOperation.population"
                            type="number"
                            class="w-full"
                        />
                        <label>Population</label>
                    </pv-float-label>

                    <pv-float-label class="mb-4">
                        <pv-input-text
                            v-model="newOperation.area"
                            type="number"
                            class="w-full"
                        />
                        <label>Area</label>
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

.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.card-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
}

:deep(.p-inputtext) {
    width: 100%;
}

:deep(.p-float-label) {
    width: 100%;
}
</style>