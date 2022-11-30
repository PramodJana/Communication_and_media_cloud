import { LightningElement, track, api} from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PrCombocox extends OmniscriptBaseMixin(LightningElement) {
    @api promotionList;
    options;
    connectedCallback(){
        let tmpStringList;
        console.log('promotionList-->',JSON.stringify(this.promotionList));
       
        this.options=this.promotionList;

        if (Array.isArray(this.options)) {
            tmpStringList = this.options.map(option => JSON.stringify(option));
        } else {
            tmpStringList = Array.of(this.options).map(option => JSON.stringify(option));
        }
        const tmpSet = new Set(tmpStringList);
        const tmpArray = [...tmpSet];
        this.options = tmpArray.map(option => JSON.parse(option));
        console.log('options-->',this.options);
       
        
    //this.callStubPromotionList();
    }
//Calling Integration Procedure in the below method
// async callStubPromotionList(){
//     this.isLoading = true;
//     const options = {
//         chainable: true,
//     };


//     const input = {
    
//     };

//     const params = {
//         input: input,
//         sClassName: 'vlocity_cmt.IntegrationProcedureService',
//         sMethodName: 'pr_getPromotionList',
//         options: JSON.stringify(options),
//     };

//     await this.omniRemoteCall(params, true).then(response=>{
//         console.log('response',JSON.stringify(response.IPResult.PromotionList));
//     })
//     .catch(error=>{
//         this.isLoading= false;
//         console.log('error', error);
//     });
// }


}