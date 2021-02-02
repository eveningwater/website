import App from './App.vue';
import { createApp } from 'vue';
import './styles/reset.less';
import ColorPicker from './components/ColorPicker.vue';
const app = createApp(App);
app.component(ColorPicker.name,ColorPicker);
app.mount('#app');