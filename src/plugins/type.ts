import { App } from "vue";

export type VuePluginInstallType<T> = T & { install(app: App): void; };