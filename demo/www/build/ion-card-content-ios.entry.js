import { r as registerInstance, e as getIonMode, h, H as Host } from './core-0a0592d1.js';

const CardContent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { class: {
                [mode]: true,
                // Used internally for styling
                [`card-content-${mode}`]: true
            } }));
    }
    static get style() { return "ion-card-content {\n  display: block;\n  position: relative;\n}\n\n.card-content-ios {\n  padding-left: 20px;\n  padding-right: 20px;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  font-size: 16px;\n  line-height: 1.4;\n}\n\@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n  .card-content-ios {\n    padding-left: unset;\n    padding-right: unset;\n    -webkit-padding-start: 20px;\n    padding-inline-start: 20px;\n    -webkit-padding-end: 20px;\n    padding-inline-end: 20px;\n  }\n}\n.card-content-ios h1 {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 2px;\n  font-size: 24px;\n  font-weight: normal;\n}\n.card-content-ios h2 {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 2px;\n  margin-bottom: 2px;\n  font-size: 16px;\n  font-weight: normal;\n}\n.card-content-ios h3,\n.card-content-ios h4,\n.card-content-ios h5,\n.card-content-ios h6 {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 2px;\n  margin-bottom: 2px;\n  font-size: 14px;\n  font-weight: normal;\n}\n.card-content-ios p {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 2px;\n  font-size: 14px;\n}"; }
};

export { CardContent as ion_card_content };
