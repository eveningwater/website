import App from './App.vue';
import { createApp } from 'vue';
import './styles/reset.less';
import 'ew-color-picker/dist/ew-color-picker.min.css';
import directives from './directives';
const requireComponent = require.context('./components',false,/\w+\.(vue|js)$/);
const app = createApp(App);
requireComponent.keys().forEach(fileName => {
    const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
    app.component('ew' + componentName,requireComponent(fileName).default || requireComponent(fileName))
});
directives.forEach(dir => app.directive(dir.directive,dir.directiveOption));
app.mount('#app');