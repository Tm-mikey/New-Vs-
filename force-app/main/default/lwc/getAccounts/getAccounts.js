import { LightningElement, track, api, wire} from 'lwc';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' }
];
import getAccRecords from '@salesforce/apex/GetAccounts.getAccRecords';
export default class GetAccounts extends LightningElement {
    columns = columns;
    
    
    
    
    

    

    
}