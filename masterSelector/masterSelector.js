import { LightningElement, track } from 'lwc';

export default class MasterSelector extends LightningElement {
    @track selectedObject;
    @track selectedFields = [];

    handleObjectSelected(event) {
        this.selectedObject = event.detail;
        this.template.querySelector('c-myfield-selector').fetchFields();
    }

    handleFieldsSelected(event) {
        this.selectedFields = event.detail;
    }

    handleShowRecords() {
        this.template.querySelector('c-myrecord-selector').handleShowRecords();
    }
}
