import { LightningElement, api, wire ,track} from 'lwc';
import getFields from '@salesforce/apex/FieldSelectorController.getFields';

export default class FieldSelector extends LightningElement {
    @api objectName;
    @track selectedFields=[];
    @track fieldsList=[];
    @api getAllFields(selectedObjectName){
         getFields({ ObjectName : selectedObjectName}).then((result)=>{
            if(result){
                console.log('the '+selectedObjectName);
            this.fieldsList=[];
            for(let key in result){
                console.log('in here');
                this.fieldsList.push({ label:key, value: key});
            }
           
        }else{
                     console.log('error occured in result');
            }
      
          }).catch(error=>{
            console.log('error occured');
          });
    }
  
    handlemyRecord(event){
        this.selectedFields =event.detail.value;
        console.log('My Objects'+this.selectedFields);
        const selectFieldEvent = new CustomEvent('selectfield', { detail: this.selectedFields});
        this.dispatchEvent(selectFieldEvent);
    }


}
