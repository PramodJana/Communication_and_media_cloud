import { LightningElement,api} from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

export default class PrHelpText extends OmniscriptBaseMixin(LightningElement) {
    @api textMessage1;
    @api textMessage2;
    @api textMessage3;
    @api textMessage4;
    @api textMessage5;

    @api iconName;

    @api labelValue;

    connectedCallback(){
        console.log('textMessage1'+ this.textMessage1);
        console.log('textMessage2'+ this.textMessage2);
        console.log('textMessage3'+ this.textMessage3);
        console.log('textMessage4'+ this.textMessage4);
        console.log('textMessage5'+ this.textMessage5);
        console.log('iconName'+ this.iconName);
    }

    passwordHintClass = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-fall-into-ground slds-hide"
    togglePasswordHint() {
    this.passwordHintClass = this.passwordHintClass == 'slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-fall-into-ground slds-hide' ? "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-rise-from-ground" : "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-fall-into-ground slds-hide"
    }
}