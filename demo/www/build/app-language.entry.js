import { r as registerInstance, h } from './core-0a0592d1.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var simpleIcons = createCommonjsModule(function (module) {
});

const AppAvatar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    async componentWillLoad() {
        this.icon = simpleIcons.get(this.language);
    }
    render() {
        if (this.icon) {
            return h("div", { innerHTML: this.icon.svg, class: `language ${this.icon.slug}` });
        }
        else {
            return undefined;
        }
    }
    static get style() { return "div {\n  height: 5rem;\n}\ndiv.javascript {\n  color: #F7DF1E;\n}\ndiv svg {\n  height: 100%;\n  fill: currentColor;\n}"; }
};

export { AppAvatar as app_language };