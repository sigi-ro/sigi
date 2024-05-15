import{b as a,F as r}from"./InputGroup.d82ecd1f.js";import{n}from"./LogoLight.eaabebeb.js";const l={name:"DateTimePickerGroup",mixins:[a],components:{FormFieldError:r},props:{inputClass:{default:"",type:String},inputFormat:{default:"DD/MM/YYYY HH:mm",type:String},inputPlaceholder:{default:"Please select a date",type:String},inputTimeTitleFormat:{default:"DD/MM/YYYY HH:mm",type:String},inputTitleFormat:{default:"DD/MM/YYYY HH:mm",type:String},inputType:{default:"datetime",type:String},inputValueType:{default:"YYYY-MM-DD HH:mm",type:String}},data(){return{editableInput:"",isInitialised:!1}},mounted(){this.editableInput=this.inputValue,this.$nextTick(()=>{this.isInitialised=!0})},methods:{onInput(){!this.isInitialised||(this.$emit("input",this.editableInput),this.errorHideOnInput&&(this.hideError=!0))},onInputValueChange(){this.inputValue!==this.editableInput&&(this.editableInput=this.inputValue)}},watch:{editableInput:{handler:"onInput"},inputValue:{handler:"onInputValueChange"}}};var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"flex flex-col"},[e("label",{class:t.formattedLabelClass,attrs:{for:t.inputId}},[t._t("default",function(){return[e("span",{staticClass:"flex flex-row items-baseline"},[e("span",[t._v(t._s(t.labelText))]),t.inputRequired?e("sup",{staticClass:"text-theme-danger-contrast"},[t._v(" * ")]):t._e()])]})],2),e("date-picker",{class:t.formattedInputClass,attrs:{id:t.inputId,disabled:t.inputDisabled,format:t.inputFormat,placeholder:t.inputPlaceholder,required:t.inputRequired,"time-title-format":t.inputTimeTitleFormat,"title-format":t.inputTitleFormat,type:t.inputType,"value-type":t.inputValueType},model:{value:t.editableInput,callback:function(i){t.editableInput=i},expression:"editableInput"}}),e("form-field-error",{attrs:{"error-class":t.errorClass,"error-message":t.errorMessage,"is-error":t.isError}})],1)},u=[],p=n(l,s,u,!1,null,null,null,null);const f=p.exports;export{f as D};
