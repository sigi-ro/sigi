import{s}from"./vendor.47f4618c.js";import{I as i}from"./InputGroup.480c8ffe.js";import{S as n}from"./app.a29f9b7e.js";import{T as l}from"./TemplateFieldEditor.ba93038c.js";import{n as o}from"./LogoLight.ca076997.js";import"./ConfirmationModal.f78d149d.js";import"./vuedraggable.umd.54de3e7b.js";import"./CheckboxGroup.3665ed22.js";import"./checkbox-form-group.50e62bcf.js";const p={name:"AdminCmsTemplateCreate",components:{InputGroup:i,SelectGroup:n,TemplateFieldEditor:l},layout:"admin-layout",props:{componentTemplateFieldTypes:{type:Object,required:!0},repeaterTemplateFieldTypes:{type:Object,required:!0},templateFieldSettings:{type:Object,required:!0},templateFieldTypes:{type:Object,required:!0},templateTypes:{type:Object,required:!0}},data(){return{autoUpdateSlug:!0,formData:{description:"",name:"",slug:"",template_fields:[],type:""}}},computed:{allowedTemplateFieldTypes(){return this.formData.type==="repeater"?this.repeaterTemplateFieldTypes:this.formData.type==="component"?this.componentTemplateFieldTypes:this.templateFieldTypes}},methods:{onNameInput(){!this.autoUpdateSlug||(this.formData.slug=this.slugify(this.formData.name))},onSlugBlur(){this.formData.slug=this.slugify(this.formData.slug)},onSlugInput(){this.autoUpdateSlug=!1},slugify(r){return!r||!r.length?"":s(r,{lower:!0})},submit(){this.$inertia.post(this.$route("admin.cms.templates.store"),this.formData)}}};var u=function(){var e=this,t=e._self._c;return t("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(a){return a.preventDefault(),e.submit.apply(null,arguments)}}},[e.userCan("cms_advanced.create")?t("div",{staticClass:"flex flex-row items-center mb-6 sticky-menu"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Create Template ")]),e.userCan("cms_advanced.view")?t("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.cms.templates.index")}},[t("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),t("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[t("icon-save",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create Template ")])],1)],1):e._e(),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("select-group",{attrs:{"error-message":e.getPageErrorMessage("type"),"label-text":"Template Type","input-any-option-enabled":!0,"input-any-option-label":"Please select a template type","input-autofocus":!0,"input-id":"type","input-name":"type","input-options":e.templateTypes,"input-required":!0},on:{errorHidden:function(a){return e.clearPageErrorMessage("type")}},model:{value:e.formData.type,callback:function(a){e.$set(e.formData,"type",a)},expression:"formData.type"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("name"),"input-autocomplete":"template_name","input-id":"name","input-name":"name","input-required":!0,"input-type":"text","label-text":"Template Name"},on:{input:e.onNameInput,errorHidden:function(a){return e.clearPageErrorMessage("name")}},model:{value:e.formData.name,callback:function(a){e.$set(e.formData,"name",a)},expression:"formData.name"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("slug"),"input-autocomplete":"template_slug","input-id":"slug","input-name":"slug","input-required":!0,"input-type":"text","label-text":"Template Slug"},on:{blur:e.onSlugBlur,input:e.onSlugInput,errorHidden:function(a){return e.clearPageErrorMessage("slug")}},model:{value:e.formData.slug,callback:function(a){e.$set(e.formData,"slug",a)},expression:"formData.slug"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("description"),"input-autocomplete":"template_description","input-id":"description","input-name":"description","input-type":"text","label-text":"Description"},on:{errorHidden:function(a){return e.clearPageErrorMessage("description")}},model:{value:e.formData.description,callback:function(a){e.$set(e.formData,"description",a)},expression:"formData.description"}})],1)]),e.formData.type?t("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("template-field-editor",{attrs:{"template-field-settings":e.templateFieldSettings,"template-field-types":e.allowedTemplateFieldTypes},model:{value:e.formData.template_fields,callback:function(a){e.$set(e.formData,"template_fields",a)},expression:"formData.template_fields"}})],1)]):e._e()])},m=[],d=o(p,u,m,!1,null,null,null,null);const D=d.exports;export{D as default};
