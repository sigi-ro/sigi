import{b as o,F as u}from"./InputGroup.513e0dd4.js";import{c}from"./checkbox-form-group.99a615f1.js";import{n as p}from"./LogoLight.f7426689.js";const d={name:"InlineCheckboxGroup",mixins:[o,c],components:{FormFieldError:u},props:{inputClass:{default:"cursor-pointer form-checkbox h-5 mr-2 rounded text-theme-primary w-5 focus:border-theme-primary focus:outline-none focus:ring focus:ring-primary",type:String},labelClass:{default:"cursor-pointer flex-1 font-medium select-none text-theme-base-contrast text-sm tracking-wider",type:String}}};var m=function(){var e=this,r=e._self._c;return r("div",{staticClass:"flex flex-col"},[r("div",{staticClass:"flex flex-row"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.editableValue,expression:"editableValue"}],ref:e.inputId,class:e.formattedInputClass,attrs:{id:e.inputId,disabled:e.inputDisabled,"false-value":e.inputValueFalse,name:e.inputName,required:e.inputRequired,"true-value":e.inputValueTrue,type:"checkbox"},domProps:{checked:Array.isArray(e.editableValue)?e._i(e.editableValue,null)>-1:e._q(e.editableValue,e.inputValueTrue)},on:{change:[function(a){var t=e.editableValue,s=a.target,i=s.checked?e.inputValueTrue:e.inputValueFalse;if(Array.isArray(t)){var n=null,l=e._i(t,n);s.checked?l<0&&(e.editableValue=t.concat([n])):l>-1&&(e.editableValue=t.slice(0,l).concat(t.slice(l+1)))}else e.editableValue=i},e.onInput],keyup:function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"esc",27,a.key,["Esc","Escape"])?null:e.blurInput.apply(null,arguments)}}}),r("label",{class:e.labelClass,attrs:{for:e.inputId}},[r("span",{staticClass:"flex flex-row items-baseline"},[r("span",[e._v(e._s(e.labelText))]),e.inputRequired?r("sup",{staticClass:"text-theme-danger-contrast"},[e._v(" * ")]):e._e()])])]),r("form-field-error",{attrs:{"error-class":e.errorClass,"error-message":e.errorMessage,"is-error":e.isError}})],1)},f=[],b=p(d,m,f,!1,null,null,null,null);const k=b.exports;export{k as I};