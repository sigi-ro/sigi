import{_ as r}from"./vendor.21c2b6f5.js";import{b as l,F as a}from"./InputGroup.d82ecd1f.js";import{n as u}from"./LogoLight.eaabebeb.js";const p={name:"SelectMultipleGroup",mixins:[l],components:{FormFieldError:a},props:{inputAnyOptionEnabled:{default:!1,type:Boolean},inputAnyOptionLabel:{default:"Any",type:String},inputAnyOptionClass:{default:"",type:String},inputAnyOptionValue:{default:""},inputClass:{default:"border border-theme-base-subtle cursor-pointer font-medium form-select px-3 py-2 rounded w-full focus:border-theme-primary focus:outline-none focus:ring-0 focus:shadow-none",type:String},inputOptionExact:{default:!1,type:Boolean},inputOptionForceFormatting:{default:!1,type:Boolean},inputOptionLabelKey:{default:!1,type:Boolean|String|Number},inputOptionValueKey:{default:!1,type:Boolean|String|Number},inputOptions:{required:!0,type:Array|Object}},computed:{formattedOptions(){let t={};return Array.isArray(this.inputOptions)&&!this.inputOptionForceFormatting?r.forEach(this.inputOptions,e=>{t[e]={label:e,value:e}}):r.forEach(this.inputOptions,(e,n)=>{let i=e,s=n;this.inputOptionLabelKey!==!1&&e.hasOwnProperty(this.inputOptionLabelKey)&&(i=e[this.inputOptionLabelKey]),this.inputOptionValueKey!==!1&&e.hasOwnProperty(this.inputOptionValueKey)&&(s=e[this.inputOptionValueKey]),t[n]={label:i,value:s}}),t},formattedInputClass(){let t=this.inputClass;return this.isError&&(t+=" error"),this.isAnyOptionSelected&&(t+=" "+this.inputAnyOptionClass),t},isAnyOptionSelected(){return this.inputValue===this.inputAnyOptionValue||this.inputValue===null}},mounted(){this.autofocus()},methods:{isOptionDisabled(t){return this.inputRequired?t==="":!1},isOptionSelected(t){return this.inputOptionExact?t===this.inputValue:t==this.inputValue}}};var o=function(){var e=this,n=e._self._c;return n("div",{staticClass:"relative flex w-full"},[n("label",{class:e.formattedLabelClass,attrs:{for:e.inputId}},[e._t("default",function(){return[n("span",{staticClass:"flex flex-row items-baseline"},[n("span",[e._v(e._s(e.labelText))]),e.inputRequired?n("sup",{staticClass:"text-theme-danger-contrast"},[e._v(" * ")]):e._e()])]})],2),n("select",{ref:e.inputId,class:e.formattedInputClass,attrs:{id:e.inputId,disabled:e.inputDisabled,name:e.inputName,required:e.inputRequired,multiple:""},on:{change:e.onInput,keyup:function(i){return!i.type.indexOf("key")&&e._k(i.keyCode,"esc",27,i.key,["Esc","Escape"])?null:e.blurInput.apply(null,arguments)}}},[e.inputAnyOptionEnabled?n("option",{attrs:{disabled:e.isOptionDisabled(e.inputAnyOptionValue)},domProps:{selected:e.isOptionSelected(e.inputAnyOptionValue),value:e.inputAnyOptionValue}},[e._v(" "+e._s(e.inputAnyOptionLabel)+" ")]):e._e(),e._l(e.formattedOptions,function(i,s){return n("option",{key:`${e.inputId}-option-${i.value}`,attrs:{disabled:e.isOptionDisabled(i.value)},domProps:{selected:e.isOptionSelected(i.value),value:i.value}},[e._v(" "+e._s(i.label)+" ")])})],2),n("form-field-error",{attrs:{"error-class":e.errorClass,"error-message":e.errorMessage,"is-error":e.isError}})],1)},d=[],f=u(p,o,d,!1,null,null,null,null);const O=f.exports;export{O as S};
