import { LightningElement , track, wire } from 'lwc';
import insertAccounts from '@salesforce/apex/AccountInsertHandler.insertAccounts';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ANNUALREVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' }
];
import getAccRecords from '@salesforce/apex/GetAccounts.getAccRecords';
export default class InsertAccountDetails extends LightningElement 
{
    @track accountDetail={
                            Name : NAME_FIELD,
                            Phone : PHONE_FIELD,
                            AnnualRevenue : ANNUALREVENUE_FIELD
                        };
    @track openSpinner;
    columns = columns;
    @wire(getAccRecords)
    accounts;
    
renderedCallback()
{
    console.log("Hi");
}
    handleChange(event)
    {
        if(event.target.dataset.name=='Name')
        { 
            this.accountDetail.Name = event.target.value;
        }
        else if(event.target.dataset.name=='Phone')
        { 
            this.accountDetail.Phone = event.target.value;
        }
        else if(event.target.dataset.name=='AnnualRevenue')
        { 
            this.accountDetail.AnnualRevenue = event.target.value;
        }
    }
 
    clickSave()
    {
        this.openSpinner = true;
        insertAccounts({accountDetails: this.accountDetail})
        .then(result=> {
            this.openSpinner = false;
            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Account created successfully',
                variant:'success'
            });
            this.dispatchEvent(toastEvent);
            refreshApex(this.accounts);
           
        })
    }
    

    


}