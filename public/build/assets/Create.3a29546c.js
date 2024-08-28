<<<<<<<< HEAD:public/build/assets/Create.3a29546c.js
import{s}from"./vendor.7c6c1ab8.js";import{A as i}from"./ArrayGroup.7b3e8fec.js";import{F as n}from"./FormFieldEditor.754f55b6.js";import{I as o}from"./InlineCheckboxGroup.0933a8b9.js";import{I as m}from"./InputGroup.392fed83.js";import{T as l}from"./app.40a6410b.js";import{n as u}from"./LogoLight.fa462175.js";import"./vuedraggable.umd.d3f96d51.js";import"./CheckboxGroup.93ed8500.js";import"./checkbox-form-group.99a615f1.js";import"./ConfirmationModal.91fad66a.js";const c={name:"AdminCrmFormCreate",components:{ArrayGroup:i,FormFieldEditor:n,InlineCheckboxGroup:o,InputGroup:m,TextAreaGroup:l},layout:"admin-layout",props:{crmFormFieldTypes:{type:Object,required:!0},formFieldSettings:{type:Object,required:!0},standardFormFieldTypes:{type:Object,required:!0}},data(){return{autoUpdateSlug:!0,formData:{email_recipients:[],form_fields:[],marketing_email:!1,marketing_sms:!1,marketing_telephone:!1,name:"",redirect_url:"",slug:"",submit_button_text:"",success_message:""}}},methods:{onNameInput(){!this.autoUpdateSlug||(this.formData.slug=this.slugify(this.formData.name))},onSlugBlur(){this.formData.slug=this.slugify(this.formData.slug)},onSlugInput(){this.autoUpdateSlug=!1},slugify(a){return!a||!a.length?"":s(a,{lower:!0})},submit(){this.$inertia.post(this.$route("admin.crm.forms.store"),this.formData)}}};var p=function(){var e=this,t=e._self._c;return t("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(r){return r.preventDefault(),e.submit.apply(null,arguments)}}},[t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Create Form ")]),e.userCan("crm_forms.view")?t("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.crm.forms.index")}},[t("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),e.userCan("crm_forms.create")?t("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[t("icon-save",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create Form ")])],1):e._e()],1),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("input-group",{attrs:{"error-message":e.getPageErrorMessage("name"),"input-autocomplete":"form_name","input-id":"name","input-name":"name","input-required":!0,"input-type":"text","label-text":"Form Name"},on:{errorHidden:function(r){return e.clearPageErrorMessage("name")},input:e.onNameInput},model:{value:e.formData.name,callback:function(r){e.$set(e.formData,"name",r)},expression:"formData.name"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("slug"),"input-autocomplete":"form_slug","input-id":"slug","input-name":"slug","input-required":!0,"input-type":"text","label-text":"Form Slug"},on:{blur:e.onSlugBlur,errorHidden:function(r){return e.clearPageErrorMessage("slug")},input:e.onSlugInput},model:{value:e.formData.slug,callback:function(r){e.$set(e.formData,"slug",r)},expression:"formData.slug"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("submit_button_text"),"input-id":"submit_button_text","input-name":"submit_button_text","input-type":"text","label-text":"Submit Button Text (Leave blank for default)"},on:{errorHidden:function(r){return e.clearPageErrorMessage("submit_button_text")}},model:{value:e.formData.submit_button_text,callback:function(r){e.$set(e.formData,"submit_button_text",r)},expression:"formData.submit_button_text"}}),t("text-area-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("success_message"),"input-id":"success_message","input-name":"success_message","input-rows":"2","input-type":"text","label-text":"Success Message"},on:{errorHidden:function(r){return e.clearPageErrorMessage("success_message")}},model:{value:e.formData.success_message,callback:function(r){e.$set(e.formData,"success_message",r)},expression:"formData.success_message"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("redirect_url"),"input-id":"redirect_url","input-name":"redirect_url","input-type":"text","label-text":"Redirect Url (Leave blank for no redirect)"},on:{errorHidden:function(r){return e.clearPageErrorMessage("redirect_url")}},model:{value:e.formData.redirect_url,callback:function(r){e.$set(e.formData,"redirect_url",r)},expression:"formData.redirect_url"}}),t("array-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessageFromArrayField("email_recipients"),"input-id":"email_recipients","input-name":"email_recipients","label-text":"Email Recipients"},model:{value:e.formData.email_recipients,callback:function(r){e.$set(e.formData,"email_recipients",r)},expression:"formData.email_recipients"}})],1)]),t("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("p",{staticClass:"font-medium mb-4 text-theme-base-contrast tracking-wider"},[e._v(" Marketing Preference Fields ")]),t("div",{staticClass:"space-y-4"},[t("inline-checkbox-group",{attrs:{"input-id":"marketing-email","input-name":"marketing-email","label-text":"Email"},model:{value:e.formData.marketing_email,callback:function(r){e.$set(e.formData,"marketing_email",r)},expression:"formData.marketing_email"}}),t("inline-checkbox-group",{attrs:{"input-id":"marketing-sms","input-name":"marketing-sms","label-text":"SMS"},model:{value:e.formData.marketing_sms,callback:function(r){e.$set(e.formData,"marketing_sms",r)},expression:"formData.marketing_sms"}}),t("inline-checkbox-group",{attrs:{"input-id":"marketing-telephone","input-name":"marketing-telephone","label-text":"Telephone"},model:{value:e.formData.marketing_telephone,callback:function(r){e.$set(e.formData,"marketing_telephone",r)},expression:"formData.marketing_telephone"}})],1)])]),t("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("form-field-editor",{attrs:{"crm-form-field-types":e.crmFormFieldTypes,"form-field-settings":e.formFieldSettings,"standard-form-field-types":e.standardFormFieldTypes},model:{value:e.formData.form_fields,callback:function(r){e.$set(e.formData,"form_fields",r)},expression:"formData.form_fields"}})],1)])])},f=[],d=u(c,p,f,!1,null,null,null,null);const w=d.exports;export{w as default};
========
import{s}from"./vendor.7c6c1ab8.js";import{A as i}from"./ArrayGroup.07750d75.js";import{F as n}from"./FormFieldEditor.e9c60a4d.js";import{I as o}from"./InlineCheckboxGroup.edaa00c4.js";import{I as m}from"./InputGroup.2066916f.js";import{T as l}from"./app.84f85cc2.js";import{n as u}from"./LogoLight.dcee77db.js";import"./vuedraggable.umd.d3f96d51.js";import"./CheckboxGroup.41b255bb.js";import"./checkbox-form-group.50e62bcf.js";import"./ConfirmationModal.ab34ec58.js";const c={name:"AdminCrmFormCreate",components:{ArrayGroup:i,FormFieldEditor:n,InlineCheckboxGroup:o,InputGroup:m,TextAreaGroup:l},layout:"admin-layout",props:{crmFormFieldTypes:{type:Object,required:!0},formFieldSettings:{type:Object,required:!0},standardFormFieldTypes:{type:Object,required:!0}},data(){return{autoUpdateSlug:!0,formData:{email_recipients:[],form_fields:[],marketing_email:!1,marketing_sms:!1,marketing_telephone:!1,name:"",redirect_url:"",slug:"",submit_button_text:"",success_message:""}}},methods:{onNameInput(){!this.autoUpdateSlug||(this.formData.slug=this.slugify(this.formData.name))},onSlugBlur(){this.formData.slug=this.slugify(this.formData.slug)},onSlugInput(){this.autoUpdateSlug=!1},slugify(a){return!a||!a.length?"":s(a,{lower:!0})},submit(){this.$inertia.post(this.$route("admin.crm.forms.store"),this.formData)}}};var p=function(){var e=this,t=e._self._c;return t("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(r){return r.preventDefault(),e.submit.apply(null,arguments)}}},[t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Create Form ")]),e.userCan("crm_forms.view")?t("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.crm.forms.index")}},[t("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),e.userCan("crm_forms.create")?t("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[t("icon-save",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create Form ")])],1):e._e()],1),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("input-group",{attrs:{"error-message":e.getPageErrorMessage("name"),"input-autocomplete":"form_name","input-id":"name","input-name":"name","input-required":!0,"input-type":"text","label-text":"Form Name"},on:{errorHidden:function(r){return e.clearPageErrorMessage("name")},input:e.onNameInput},model:{value:e.formData.name,callback:function(r){e.$set(e.formData,"name",r)},expression:"formData.name"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("slug"),"input-autocomplete":"form_slug","input-id":"slug","input-name":"slug","input-required":!0,"input-type":"text","label-text":"Form Slug"},on:{blur:e.onSlugBlur,errorHidden:function(r){return e.clearPageErrorMessage("slug")},input:e.onSlugInput},model:{value:e.formData.slug,callback:function(r){e.$set(e.formData,"slug",r)},expression:"formData.slug"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("submit_button_text"),"input-id":"submit_button_text","input-name":"submit_button_text","input-type":"text","label-text":"Submit Button Text (Leave blank for default)"},on:{errorHidden:function(r){return e.clearPageErrorMessage("submit_button_text")}},model:{value:e.formData.submit_button_text,callback:function(r){e.$set(e.formData,"submit_button_text",r)},expression:"formData.submit_button_text"}}),t("text-area-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("success_message"),"input-id":"success_message","input-name":"success_message","input-rows":"2","input-type":"text","label-text":"Success Message"},on:{errorHidden:function(r){return e.clearPageErrorMessage("success_message")}},model:{value:e.formData.success_message,callback:function(r){e.$set(e.formData,"success_message",r)},expression:"formData.success_message"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("redirect_url"),"input-id":"redirect_url","input-name":"redirect_url","input-type":"text","label-text":"Redirect Url (Leave blank for no redirect)"},on:{errorHidden:function(r){return e.clearPageErrorMessage("redirect_url")}},model:{value:e.formData.redirect_url,callback:function(r){e.$set(e.formData,"redirect_url",r)},expression:"formData.redirect_url"}}),t("array-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessageFromArrayField("email_recipients"),"input-id":"email_recipients","input-name":"email_recipients","label-text":"Email Recipients"},model:{value:e.formData.email_recipients,callback:function(r){e.$set(e.formData,"email_recipients",r)},expression:"formData.email_recipients"}})],1)]),t("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("p",{staticClass:"font-medium mb-4 text-theme-base-contrast tracking-wider"},[e._v(" Marketing Preference Fields ")]),t("div",{staticClass:"space-y-4"},[t("inline-checkbox-group",{attrs:{"input-id":"marketing-email","input-name":"marketing-email","label-text":"Email"},model:{value:e.formData.marketing_email,callback:function(r){e.$set(e.formData,"marketing_email",r)},expression:"formData.marketing_email"}}),t("inline-checkbox-group",{attrs:{"input-id":"marketing-sms","input-name":"marketing-sms","label-text":"SMS"},model:{value:e.formData.marketing_sms,callback:function(r){e.$set(e.formData,"marketing_sms",r)},expression:"formData.marketing_sms"}}),t("inline-checkbox-group",{attrs:{"input-id":"marketing-telephone","input-name":"marketing-telephone","label-text":"Telephone"},model:{value:e.formData.marketing_telephone,callback:function(r){e.$set(e.formData,"marketing_telephone",r)},expression:"formData.marketing_telephone"}})],1)])]),t("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("form-field-editor",{attrs:{"crm-form-field-types":e.crmFormFieldTypes,"form-field-settings":e.formFieldSettings,"standard-form-field-types":e.standardFormFieldTypes},model:{value:e.formData.form_fields,callback:function(r){e.$set(e.formData,"form_fields",r)},expression:"formData.form_fields"}})],1)])])},f=[],d=u(c,p,f,!1,null,null,null,null);const w=d.exports;export{w as default};
>>>>>>>> master:public/build/assets/Create.8e58a21b.js
