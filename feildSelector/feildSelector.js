import { LightningElement, api, track } from 'lwc';
//import { refreshApex } from '@salesforce/apex';
import getFields from '@salesforce/apex/ObjectFormController.getFields';
export default class FieldSelector extends LightningElement {
  @api objectName;
  @track selectedFields = [];
  @track fieldsList = [];
  @track getMyFeilds = false;
  @api
  hideFeilds() {
    this.selectedFields = [];
    this.fieldsList = [];
  }
  @api getAllFields(selectedObjectName) {
    getFields({ ObjectName: selectedObjectName }).then((result) => {
      if (result) {
        console.log('the ' + selectedObjectName);
        this.fieldsList = [];
        this.getMyFeilds = true;
        for (let key in result) {
          console.log('in here');
          this.fieldsList.push({ label: key, value: key });
        }
      } else {
        console.log('error occured in result');
      }
    }).catch(error => {
      console.log('error occured');
    });
  }
  handleMyRecord(event) {
    this.selectedFields = event.detail.value;
    console.log('My Objects' + this.selectedFields);
  }
  recordClick() {
    const selectFieldEvent = new CustomEvent('selectfield', { detail: this.selectedFields });
    console.log('In record Click = ' + this.selectedFields);
    this.dispatchEvent(selectFieldEvent);
  }
  @api hideTable() {
    this.template.querySelector('c-record-selector').hideData();
  }
}