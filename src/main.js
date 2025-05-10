import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import Card from 'primevue/card';
import FloatLabel from 'primevue/floatlabel';
import SelectButton  from 'primevue/selectbutton';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import router from './router'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('pv-button', Button);
app.component('pv-float-label', FloatLabel); 
app.component('pv-input-text', InputText);
app.component('pv-card', Card);
app.component('select-button', SelectButton);
app.use(router);
app.mount('#app');
