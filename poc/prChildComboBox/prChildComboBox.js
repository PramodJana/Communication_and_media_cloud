import { LightningElement,api,track } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

export default class PrChildComboBox extends OmniscriptBaseMixin(LightningElement) {
    @api options;
    @api minchar;
    @api selectedValue;
    @api placeHolder;
    @api disabled = false;
    @api isinitialised;
    @track optionData;
    value;
    searchString;
    message;
    showDropdown;
    scrollClick = false;
    

    /***********************************************************************
    * LWC LIFECYCLE
    ***********************************************************************/
    connectedCallback() {
        
        this.showDropdown = false;
        let optionData = this.options ? (JSON.parse(JSON.stringify(this.options))) : null;
        const value = this.selectedValue ? (JSON.parse(JSON.stringify(this.selectedValue))) : null;
        if (value) {
            optionData.forEach(item => {
                if (item.value === value) {
                    this.searchString = item.label;
                }
            });
        }
        this.value = value;
        this.optionData = optionData;
    }

    /***********************************************************************
    * EVENT HANDLERS
    ***********************************************************************/
    showOptions() {

        
        if (this.disabled == false && this.options)  {
            this.message = '';
            //this.searchString = '';
            //this.value = '';
            //this.template.querySelector('.inputBox').value = '';
            let options = JSON.parse(JSON.stringify(this.optionData));
            if (options) {
                options.forEach(item => item.isVisible = true);
                if (options?.length > 0) {
                    this.showDropdown = true;
                }
            }
            this.optionData = options;
        }

        if(!this.isinitialised){
            this.showDropdown = false;
        }
    }

    filterOptions(event) {
        this.searchString = event.target.value;
        console.log(this.minchar+'======searchString==='+this.searchString);
        console.log('======optiondata==='+this.optionData);
        if (this.searchString?.length > 0) {
            this.message = '';
            if (this.searchString.length >= this.minchar) {
                let flag = true;
                if (this.optionData?.length > 0) {
                    this.optionData.forEach(item => {
                        if (item.label.toLowerCase().trim().includes(this.searchString.toLowerCase().trim())) {
                            item.isVisible = true;
                            flag = false;
                        } else {
                            item.isVisible = false;
                        }
                    });
                }
                if (flag) {
                    this.message = `No results found for '${this.searchString}'`;
                }
            }
            if(this.isinitialised || (!this.isinitialised && this.searchString.length >= this.minchar)){
                this.showDropdown = true;
            }
            
        } else {
            this.showDropdown = false;
            this.dispatchEvent(new CustomEvent('select', {
                detail: {
                    value: this.value,
                }
            }));
        }
    }

    selectItem(event) {
        const selectedVal = event.currentTarget.dataset.id;
        if (selectedVal) {
            const options = JSON.parse(JSON.stringify(this.optionData));
            options.forEach(item => {
                if (item.value === selectedVal) {
                    this.value = item.value;
                    this.searchString = item.label;
                }
            });
            this.optionData = options;
            this.showDropdown = false;
        }
        event.stopPropagation();
    }

    blurEvent() {
        if (this.scrollClick) {
            const inputElement = this.template.querySelector('.inputBox');
            inputElement.focus();
            this.scrollClick = false;
        } else {
            if (this.optionData?.length > 0) {

                this.optionData.forEach(item => {
                    if (item.value === this.value) {
                        this.searchString = item.label;
                    }
                });

            }
            this.showDropdown = false;
            this.dispatchEvent(new CustomEvent('select', {
                detail: {
                    value: this.value,
                }
            }));
        }
    }

    scrolling() {
        this.scrollClick = true;
    }

    handleChange(){
        this.value = '';
    }
}