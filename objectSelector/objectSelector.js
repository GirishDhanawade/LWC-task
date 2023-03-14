import { LightningElement, wire, track } from 'lwc';
//import { refreshApex } from '@salesforce/apex';
import getObjects from '@salesforce/apex/ObjectSelectorController.getObjects';
import { NavigationMixin } from 'lightning/navigation';

export default class ObjectSelector extends NavigationMixin(LightningElement) {
    @track objectList = [];
    @track myfeilds = [];
    @track selectedobject;
    @wire(getObjects)
    wiredObjectName({ error, data }) {
        if (data) {
            this.objectList = Object.entries(data).map(([value, label]) => ({ value, label }));
        } else if (error) {
            console.error(error);
        }
    }
    handleFields(event) {
        this.selectedobject = event.target.value;
        this.template.querySelector('c-feild-selector').getAllFields(event.target.value);
        this.template.querySelector('c-feild-selector').hideFeilds();
        this.template.querySelector('c-record-selector').hideData();

    }
    handlemycheckbox(event) {
        this.myfeilds = event.detail;
        console.log('MyFeilds' + this.myfeilds);
        console.log('selected object' + this.selectedobject);
        this.template.querySelector('c-record-selector').getallRecords(this.selectedobject, this.myfeilds);
    }
    handleCreate(){
        console.log('In handle create');
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.selectedobject,
                actionName: 'new'
            }
        });
    }
}
