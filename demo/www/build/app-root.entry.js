import { r as registerInstance, h } from './core-0a0592d1.js';

const AppRoot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("ion-app", null, h("ion-router", { useHash: false }, h("ion-route", { url: "/", component: "app-home" }), h("ion-route", { url: "/tasks/:projectId", component: "app-tasks" }), h("ion-route", { url: "/tasks/:projectId/:taskId", component: "app-task" }), h("ion-route", { url: "/create", component: "app-create-project" })), h("ion-menu", { id: "ion-menu", side: "start", type: "overlay", swipeGesture: false, contentId: "menu-content" }, h("ion-content", null, h("ion-menu-toggle", { autoHide: false }, h("ion-list", null, h("ion-item", { detail: false, href: "/", routerDirection: "forward" }, h("ion-icon", { name: "code", slot: "start" }), h("ion-label", null, "Coding tutorial")), h("ion-item", { detail: false, href: "/create", routerDirection: "forward" }, h("ion-icon", { name: "create", ios: "md-create", md: "md-create", slot: "start" }), h("ion-label", null, "Create a project")))))), h("ion-nav", { id: "menu-content" }), h("ion-modal-controller", null)));
    }
    static get style() { return ""; }
};

export { AppRoot as app_root };
