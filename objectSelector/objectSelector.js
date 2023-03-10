import { LightningElement, wire, track } from 'lwc';
import getObjectInfo from '@salesforce/apex/ObjectSelectorController.getObjectInfo';
import getObjects from '@salesforce/apex/ObjectSelectorController.getObjects';

export default class ObjectSelector extends LightningElement {
    @track objectList = [];
    @track myfeilds =[];
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
       // let selectedObject = event.target.value;
        this.selectedobject = event.target.value;
        this.template.querySelector('c-feild-selector').getAllFields(event.target.value);
    
    }
  

    handlemycheckbox(event){
        this.myfeilds=event.detail;
        console.log('MyFeilds'+this.myfeilds);
        console.log('selected object'+this.selectedobject);
        this.template.querySelector('c-record-selector').getallRecords(this.selectedobject,this.myfeilds);
        
        
    }




}
