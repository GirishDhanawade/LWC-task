import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRecords from '@salesforce/apex/ObjectRecordViewerController.getRecords';
const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' }
];
export default class ObjectRecordViewer extends LightningElement {
    @api objectApiName;
    @api selectedFields;
    @api fields;
    @track column = [];
    @track columnsName = [];
    @track valueForLabel = [];
    @track valueForColumn = [];
    @track columns = [];
    @track recordList = [];
    records = [];
    @api hideData() {
        this.columns = [];
        this.recordList = [];
    }
    @api
    getallRecords(objectApiName, fields) {
        this.valueForLabel = fields;
        this.valueForColumn = fields.map((value, index) =>
        ({
            label: this.valueForLabel[index],
            fieldName: value
        }))
        this.columns = [...this.valueForColumn, { type: 'action', typeAttributes: { rowActions: actions } }];
        getRecords({ objectApiName: objectApiName, fields: fields })
            .then(result => {
                console.log('in records result page: ' + objectApiName);
                if (result) {
                    this.recordList = [];
                    this.recordList = result;
                    console.log('connected records: ' + JSON.stringify(result));
                    console.log(this.recordList);
                    console.log('size of records: ' + this.recordList.length);
                } else {
                    console.log('error occurred');
                }
            })
            .catch(error => {
                console.log('Error on record method: ' + error.message);
            });
    }
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'view':
                this.showRecordDetails(row.Id);
                break;
            case 'edit':
                this.editRecord(row.Id);
                break;
            case 'delete':
                this.deleteRecord(row.Id);
                break;
            default:
                break;
        }
    }
    showRecordDetails(recordId) {
        console.log('View record id: ' + recordId);
        //code to show record details
    }
    editRecord(recordId) {
        console.log('Edit record id: ' + recordId);
        //code to edit record
    }
    deleteRecord(recordId) {
        console.log('Delete record id: ' + recordId);
        //code to delete record
        this.showToast('Success', 'Record deleted successfully.', 'success');
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}