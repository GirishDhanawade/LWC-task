import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import getRecords from '@salesforce/apex/ObjectRecordViewerController.getRecords';
const actions = [
{ label: 'View', name: 'view' },
{ label: 'Edit', name: 'edit' },
{ label: 'Delete', name: 'delete' }
];

export default class ObjectRecordViewer extends NavigationMixin(LightningElement) {
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
    deleteRecord(recordId)
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
        title: title,
        message: message,
        variant: variant
    });
    this.dispatchEvent(event);
}
}
