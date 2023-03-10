import { LightningElement, api, wire,track } from 'lwc';
//import { refreshApex } from '@salesforce/apex';
import getRecords from '@salesforce/apex/ObjectRecordViewerController.getRecords';

const columns = [ ];
export default class ObjectRecordViewer extends LightningElement {
    @api objectApiName;
    @api selectedFields;
    @api fields;
    @track column = [];
    @track columnsName=[];
    @track valueForLabel=[];
    @track valueForColumn=[];
    @track columns=[];
    @track recordList = [];   
    records = [];
 
    @api 
    getallRecords(objectApiName, fields) {
        this.valueForLabel = fields;
       this.valueForColumn = fields.map((value, index) =>
       ({label: this.valueForLabel[index],
       fieldName: value
       }))
        this.columns = this.valueForColumn;
       
        getRecords({ objectApiName: objectApiName, fields: fields })
        // console.log('Im in record selector'+' '+objectApiName);
        // console.log('Im in record selector'+' '+fields);
        .then(result => {
            console.log('in records result page: ' + objectApiName);
            if (result) {
                this.recordList = [];
                this.recordList = result;
                console.log('connected records: ' + JSON.stringify(result));            
                console.log(this.recordList);
                this.GotTheRecords = true;
                //console.log('array '+this.recordList);
                console.log('size of records: ' + this.recordList.length);
            } else {
                console.log('error occurred');
            }
        })
        .catch(error => {
            console.log('Error on record method: ' + error.message);
        });
           
    }

    
}