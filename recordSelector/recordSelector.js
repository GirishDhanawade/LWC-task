import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import getRecords from '@salesforce/apex/ObjectRecordViewerController.getRecords';
import deleteRecords from '@salesforce/apex/HandleDeleteMethod.deleteRecords';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' }
];
export default class ObjectRecordViewer extends NavigationMixin(LightningElement) {
    @api objectApiName;
    @api selectedFields;
    @api fields;
    @track getMyRecords =false;
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
                    this.getMyRecords =true;
                    if (this.recordList.length === 0) {
                        this.showToast();
                    }
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
    handleRowAction (event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        
        switch (actionName) {
            case 'view':
                this.navigateToRecordViewPage(row.Id);
                break;
            case 'edit':
                this.navigateToEditRecordPage(row.Id);
                break;
            case 'delete':
                this.deleteRecord(row.Id);
                break;
            default:
                break;
        }
    }
    navigateToRecordViewPage(recordId) {
        console.log('End message'+this.objectApiName)
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: this.objectApiName,
                actionName: 'view'
            }
        });
    }
    navigateToEditRecordPage(recordId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: this.objectApiName,
                actionName: 'edit'
            }
        });
    }
    deleteRecord(recordId) {
        console.log('Delete record id: ' + recordId);
        deleteRecords(recordId)
            .then(() => {
                this.showToast('Success', 'Record deleted successfully.', 'success');
                this.recordList = this.recordList.filter(record => record.Id !== recordId);
            })
            .catch(error => {
                console.log('Error on record deletion: ' + error.message);
            });
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: 'This object has no records',
            message: 'Please insert recods',
            variant: 'Error'
        });
        this.dispatchEvent(event);
    }
    handleRow(event){
        this.populateData(event.detail.row.Id);
    }
   
    populateData(recordId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: this.objectApiName,
                actionName: 'view'
            }
        });
    }
}



