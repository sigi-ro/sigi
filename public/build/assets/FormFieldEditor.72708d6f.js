import{_ as l,s as m}from"./vendor.21c2b6f5.js";import{d as u}from"./vuedraggable.umd.700457d3.js";import{C as F}from"./CheckboxGroup.d38283a5.js";import{I as d}from"./InputGroup.548575c6.js";import{n as s}from"./LogoLight.eb2f8316.js";import{S as p}from"./app.0bf483f2.js";const n={model:{prop:"fieldSettings"},props:{defaultSettings:{required:!0,type:Array|Object},fieldSettings:{required:!0,type:Array|Object},formField:{required:!0,type:Object}},data(){return{editableFieldSettings:{}}},computed:{isDefaultSettings(){try{return!this.defaultSettings||Array.isArray(this.defaultSettings)?!1:Object.keys(this.defaultSettings).length}catch{return!1}}},mounted(){this.editableFieldSettings=l.cloneDeep(this.fieldSettings),this.initialiseSettings()},methods:{initialiseSettings(){(!this.editableFieldSettings||Array.isArray(this.editableFieldSettings))&&(this.editableFieldSettings={}),this.isDefaultSettings&&l.forEach(this.defaultSettings,(i,e)=>{this.editableFieldSettings.hasOwnProperty(e)||(this.editableFieldSettings[e]=i)})},onEditableSettingsChange(){this.$emit("input",this.editableFieldSettings)},onFieldSettingsChange(){this.editableFieldSettings=l.cloneDeep(this.fieldSettings)}},watch:{fieldSettings:{handler:"onFieldSettingsChange"}}},f={name:"FormFieldNumberSettings",mixins:[n],components:{InputGroup:d}};var c=function(){var e=this,t=e._self._c;return t("div",[e._t("default"),t("div",{staticClass:"flex flex-col md:flex-row md:space-x-4"},[t("input-group",{staticClass:"flex-1 mt-4",attrs:{"input-id":`form-field-${e.formField.order}-min`,"input-name":`form-field-${e.formField.order}-min`,"input-type":"number","label-text":"Minimum Value"},on:{input:e.onEditableSettingsChange},model:{value:e.editableFieldSettings.min,callback:function(r){e.$set(e.editableFieldSettings,"min",r)},expression:"editableFieldSettings.min"}}),t("input-group",{staticClass:"flex-1 mt-4",attrs:{"input-id":`form-field-${e.formField.order}-max`,"input-name":`form-field-${e.formField.order}-max`,"input-type":"number","label-text":"Maximum Value"},on:{input:e.onEditableSettingsChange},model:{value:e.editableFieldSettings.max,callback:function(r){e.$set(e.editableFieldSettings,"max",r)},expression:"editableFieldSettings.max"}})],1)],2)},g=[],b=s(f,c,g,!1,null,null,null,null);const h=b.exports,y={name:"FormFieldTextAreaSettings",mixins:[n],components:{InputGroup:d}};var x=function(){var e=this,t=e._self._c;return t("div",[e._t("default"),t("input-group",{staticClass:"flex-1 mt-4",attrs:{"input-id":`form-field-${e.formField.order}-max-length`,"input-name":`form-field-${e.formField.order}-max-length`,"input-type":"number","label-text":"Max Length"},on:{input:e.onEditableSettingsChange},model:{value:e.editableFieldSettings.max_length,callback:function(r){e.$set(e.editableFieldSettings,"max_length",r)},expression:"editableFieldSettings.max_length"}}),t("input-group",{staticClass:"flex-1 mt-4",attrs:{"input-id":`form-field-${e.formField.order}-rows`,"input-name":`form-field-${e.formField.order}-rows`,"input-type":"text","label-text":"Rows"},on:{input:e.onEditableSettingsChange},model:{value:e.editableFieldSettings.rows,callback:function(r){e.$set(e.editableFieldSettings,"rows",r)},expression:"editableFieldSettings.rows"}})],2)},S=[],v=s(y,x,S,!1,null,null,null,null);const $=v.exports,C={name:"FormFieldTextSettings",mixins:[n],components:{InputGroup:d}};var w=function(){var e=this,t=e._self._c;return t("div",[e._t("default"),t("input-group",{staticClass:"mt-4",attrs:{"input-id":`form-field-${e.formField.order}-max-length`,"input-name":`form-field-${e.formField.order}-max-length`,"input-type":"number","label-text":"Max Length"},on:{input:e.onEditableSettingsChange},model:{value:e.editableFieldSettings.max_length,callback:function(r){e.$set(e.editableFieldSettings,"max_length",r)},expression:"editableFieldSettings.max_length"}})],2)},E=[],T=s(C,w,E,!1,null,null,null,null);const D=T.exports,q={name:"FormField",components:{CheckboxGroup:F,InputGroup:d,NumberSettings:h,SelectGroup:p,TextAreaSettings:$,TextSettings:D},model:{prop:"formField"},props:{crmFormFieldTypes:{},errorMessageKeyPrefix:{default:"formFields",type:String},formField:{required:!0,type:Object},formFieldSettings:{required:!0,type:Object},formFieldTypes:{required:!0,type:Object},isAutofocusDisabled:{default:!1,type:Boolean},isViewOnly:{default:!1,type:Boolean}},data(){return{autoUpdateSlug:!0,editableFormField:{is_required:!1,name:"",order:0,settings:{},slug:"",type:""}}},computed:{defaultFieldSettings(){if(!this.editableFormField.type)return!1;try{return this.formFieldSettings[this.editableFormField.type]}catch{return{}}},errorMessageKey(){return this.errorMessageKeyPrefix+"."+this.editableFormField.order+"."},isCrmFieldType(){try{return this.editableFormField?Object.keys(this.crmFormFieldTypes).indexOf(this.editableFormField.type)>=0:!1}catch{return!1}},selectableFormFieldTypes(){let i={};return this.isCrmFieldType&&(i[this.editableFormField.type]=this.crmFormFieldTypes[this.editableFormField.type]),i={...i,...this.formFieldTypes},i},settingsComponent(){if(!this.editableFormField.type)return!1;switch(this.editableFormField.type){case"number":return"number-settings";case"text":return"text-settings";case"textarea":return"text-area-settings";default:return!1}}},created(){this.editableFormField=_.cloneDeep(this.formField),this.editableFormField.slug&&this.editableFormField.slug!==""&&(this.autoUpdateSlug=!1)},methods:{clearErrorMessage(i){this.clearPageErrorMessage(this.errorMessageKey+i)},getErrorMessage(i){let e=this.getPageErrorMessage(this.errorMessageKey+i);return e=e.replace(this.errorMessageKey,""),e},onEditableFormFieldUpdate(){this.isCrmFieldType&&this.$set(this.editableFormField,"slug",this.editableFormField.type)},onFormFieldUpdate(){this.editableFormField=_.cloneDeep(this.formField)},onNameInput(){if(!this.autoUpdateSlug||this.isCrmFieldType){this.updateFormField();return}this.editableFormField.slug=this.slugify(this.editableFormField.name),this.updateFormField()},onSlugBlur(){this.editableFormField.slug=this.slugify(this.editableFormField.slug),this.updateFormField()},onSlugInput(){this.autoUpdateSlug=!1},slugify(i){return!i||!i.length?"":m(i,{lower:!0,replacement:"_"})},updateFormField(){this.$emit("input",_.cloneDeep(this.editableFormField))}},watch:{editableFormField:{deep:!0,handler:"onEditableFormFieldUpdate"},formField:{deep:!0,handler:"onFormFieldUpdate"}}};var M=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"flex flex-col md:flex-row md:space-x-4"},[t("select-group",{staticClass:"flex-1",attrs:{"error-message":e.getErrorMessage("type"),"label-text":"Field Type","input-any-option-enabled":!0,"input-any-option-label":"Please select a field type","input-autofocus":!e.isAutofocusDisabled,"input-id":`form-field-${e.formField.order}-type`,"input-name":`form-field-${e.formField.order}-type`,"input-options":e.selectableFormFieldTypes,"input-required":!0},on:{errorHidden:function(r){return e.clearErrorMessage("type")},input:e.updateFormField},model:{value:e.editableFormField.type,callback:function(r){e.$set(e.editableFormField,"type",r)},expression:"editableFormField.type"}}),t("input-group",{staticClass:"flex-1 mt-4 md:mt-0",attrs:{"input-disabled":!0,"input-id":`form-field-${e.formField.order}-order`,"input-name":`form-field-${e.formField.order}-order`,"input-type":"number","label-text":"Order"},on:{input:e.updateFormField},model:{value:e.editableFormField.order,callback:function(r){e.$set(e.editableFormField,"order",r)},expression:"editableFormField.order"}})],1),t("div",{staticClass:"flex flex-col md:flex-row md:space-x-4"},[t("input-group",{staticClass:"flex-1 mt-4",attrs:{"error-message":e.getErrorMessage("name"),"input-id":`template-field-${e.formField.order}-name`,"input-name":`template-field-${e.formField.order}-name`,"input-required":!0,"input-type":"text","label-text":"Field Name"},on:{errorHidden:function(r){return e.clearErrorMessage("name")},input:e.onNameInput},model:{value:e.editableFormField.name,callback:function(r){e.$set(e.editableFormField,"name",r)},expression:"editableFormField.name"}}),t("input-group",{staticClass:"flex-1 mt-4",attrs:{"error-message":e.getErrorMessage("slug"),"input-disabled":e.isCrmFieldType,"input-id":`template-field-${e.formField.order}-slug`,"input-name":`template-field-${e.formField.order}-slug`,"input-required":!0,"input-type":"text","label-text":"Field Slug"},on:{blur:e.onSlugBlur,input:e.onSlugInput},model:{value:e.editableFormField.slug,callback:function(r){e.$set(e.editableFormField,"slug",r)},expression:"editableFormField.slug"}})],1),t("checkbox-group",{staticClass:"mt-4",attrs:{"input-id":`template-field-${e.formField.order}-is_required`,"input-name":`template-field-${e.formField.order}-is_required`,"error-message":e.getErrorMessage("is_required"),"label-text":"Required?"},on:{input:e.updateFormField},model:{value:e.editableFormField.is_required,callback:function(r){e.$set(e.editableFormField,"is_required",r)},expression:"editableFormField.is_required"}}),e.settingsComponent?t(e.settingsComponent,{tag:"component",attrs:{"default-settings":e.defaultFieldSettings,"form-field":e.editableFormField},on:{input:e.updateFormField},model:{value:e.editableFormField.settings,callback:function(r){e.$set(e.editableFormField,"settings",r)},expression:"editableFormField.settings"}},[t("p",{staticClass:"font-semibold mt-6 text-theme-base-subtle-contrast"},[e._v(" Settings ")])]):e._e()],1)},k=[],O=s(q,M,k,!1,null,null,null,null);const A=O.exports;const j={name:"FormFieldEditor",components:{draggable:u,FormField:A},model:{prop:"formFields"},props:{crmFormFieldTypes:{type:Object,required:!0},formFields:{required:!0,type:Array},formFieldSettings:{type:Object,required:!0},isEditing:{default:!1,type:Boolean},isViewOnly:{default:!1,type:Boolean},standardFormFieldTypes:{type:Object,required:!0}},data(){return{editableFormFields:[],isAutofocusDisabled:!1,isDragging:!1}},computed:{selectedFormFieldTypes(){let i=new Set;return l.forEach(this.editableFormFields,e=>{e.type&&i.add(e.type)}),i},selectableFormFieldTypes(){let i={};return l.forEach(this.crmFormFieldTypes,(e,t)=>{this.selectedFormFieldTypes.has(t)||(i[t]=e)}),{...i,...this.standardFormFieldTypes}}},created(){this.isEditing&&(this.isAutofocusDisabled=!0),this.editableFormFields=l.cloneDeep(this.formFields)},methods:{addFormField(){this.isAutofocusDisabled=!1,this.editableFormFields.push({is_required:!1,name:"",order:this.formFields.length,settings:{},slug:"",type:""}),this.updateFormFields()},deleteFormField(i){try{this.editableFormFields.splice(i,1),this.reorderFormFields()}catch(e){this.$errorToast("Failed to delete field"),console.log(e)}},onDraggableEnd(){this.isDragging=!1,this.reorderFormFields()},onDraggableSort(){this.$page.props.errors={}},onDraggableStart(){this.isDragging=!0},onFormFieldsChange(i){this.editableFormFields=l.cloneDeep(i)},reorderFormFields(){try{if(!this.editableFormFields.length){this.updateFormFields();return}this.editableFormFields.forEach((i,e)=>{this.editableFormFields[e].order=e}),this.updateFormFields()}catch(i){throw"Failed to reorder fields: "+i}},updateFormFields(){this.$emit("input",l.cloneDeep(this.editableFormFields))}},watch:{formFields:{handler:"onFormFieldsChange"}}};var U=function(){var e=this,t=e._self._c;return t("div",[e._m(0),e.editableFormFields.length?t("draggable",{staticClass:"mt-6",attrs:{animation:200,disabled:e.isViewOnly,"ghost-class":"ghost",handle:".draggable-handle"},on:{end:e.onDraggableEnd,sort:e.onDraggableSort,start:e.onDraggableStart},model:{value:e.editableFormFields,callback:function(r){e.editableFormFields=r},expression:"editableFormFields"}},[t("transition-group",{attrs:{name:e.isDragging?null:"flip-field",type:"transition"}},e._l(e.editableFormFields,function(r,a){return t("article",{key:`form-field-${a}`,staticClass:"border-2 border-theme-base-subtle mt-4 overflow-hidden rounded"},[t("header",{staticClass:"draggable-handle bg-theme-base-subtle cursor-move flex flex-row items-center px-4 py-3"},[t("icon-grid-dots",{staticClass:"w-5"}),t("span",{staticClass:"flex-1 pl-4"},[r.name&&r.name.length?[e._v(" "+e._s(r.name)+" ")]:[e._v(" New Form Field ")]],2)],1),t("p",{staticClass:"p-4"},[t("form-field",{attrs:{"crm-form-field-types":e.crmFormFieldTypes,"form-field-types":e.selectableFormFieldTypes,"form-field-settings":e.formFieldSettings,"is-autofocus-disabled":e.isAutofocusDisabled},on:{input:e.updateFormFields},model:{value:e.editableFormFields[a],callback:function(o){e.$set(e.editableFormFields,a,o)},expression:"editableFormFields[index]"}})],1),t("footer",{staticClass:"flex flex-row items-center px-4 py-3"},[t("button",{staticClass:"button button-small bg-transparent border border-theme-base-subtle-contrast flex flex-row items-center ml-auto text-sm text-theme-base-subtle-contrast hover:bg-theme-danger-contrast hover:text-theme-danger hover:border-theme-danger-contrast",attrs:{type:"button"},on:{click:function(o){return e.deleteFormField(a)}}},[t("icon-trash",{staticClass:"h-4 w-4"}),t("span",{staticClass:"pl-2"},[e._v("Delete")])],1)])])}),0)],1):t("p",{staticClass:"bg-theme-base-subtle mt-6 px-4 py-3 rounded text-center text-theme-base-subtle-contrast"},[e._v(" No form fields ")]),t("div",{staticClass:"flex flex-row items-center mt-6"},[t("button",{staticClass:"button button-primary-subtle button-small ml-auto text-sm",attrs:{type:"button"},on:{click:e.addFormField}},[e._v(" Add Field ")])])],1)},N=[function(){var i=this,e=i._self._c;return e("div",{staticClass:"flex flex-row items-center"},[e("span",{staticClass:"font-medium mb-4 text-theme-base-contrast tracking-wider"},[i._v(" Form Fields ")])])}],R=s(j,U,N,!1,null,"c89b0cb8",null,null);const H=R.exports;export{H as F};