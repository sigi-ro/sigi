import{s as i}from"./vendor.21c2b6f5.js";import{I as r}from"./InputGroup.548575c6.js";import{S as o}from"./app.7f65178f.js";import{n as u}from"./LogoLight.eb2f8316.js";import"./ConfirmationModal.41eb8e05.js";let n=axios.CancelToken,l=n.source();const m={name:"AdminCmsLayoutCreate",components:{InputGroup:r,SelectGroup:o},layout:"admin-layout",props:{templates:{type:Object|Array,required:!0}},data(){return{autoUpdateSlug:!0,formData:{name:"",slug:"",template_id:""},isLoadingTemplate:!1,selectedTemplate:null}},computed:{isTemplates(){try{return Object.keys(this.templates).length}catch{return!1}},selectedTemplateHasFields(){try{return this.selectedTemplate?this.selectedTemplate.template_fields.length:!1}catch{return!1}},selectedTemplateId(){var t;return(t=this.formData.template_id)!=null?t:""}},methods:{cancelLoadTemplate(){this.isLoadingTemplate&&(l.cancel("Template load cancelled"),l=n.source())},onNameInput(){!this.autoUpdateSlug||(this.formData.slug=this.slugify(this.formData.name))},onSelectedTemplateIdChange:_.debounce(function(){this.selectedTemplate=null,this.cancelLoadTemplate(),this.selectedTemplateId&&(this.isLoadingTemplate=!0,axios.get(this.$route("admin.api.cms.templates.show",this.selectedTemplateId)).then(t=>{this.selectedTemplate=_.cloneDeep(t.data.data),this.setNewTemplateContent()}).catch(t=>{axios.isCancel(t)||(this.$errorToast("Failed to load selected template"),console.log(t))}).finally(()=>{this.isLoadingTemplate=!1}))},500),onSlugBlur(){this.formData.slug=this.slugify(this.formData.slug)},onSlugInput(){this.autoUpdateSlug=!1},setNewTemplateContent(){this.selectedTemplateHasFields||(this.formData.content={});let t={};_.forEach(this.selectedTemplate.template_fields,e=>{t[e.id]={data:"",template_field_id:e.id}}),this.$set(this.formData,"content",_.cloneDeep(t))},slugify(t){return!t||!t.length?"":i(t,{lower:!0})},submit(){this.$inertia.post(this.$route("admin.cms.layouts.store"),this.formData)}},watch:{selectedTemplateId:{handler:"onSelectedTemplateIdChange"}}};var p=function(){var e=this,a=e._self._c;return a("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(s){return s.preventDefault(),e.submit.apply(null,arguments)}}},[e.userCan("cms_advanced.create")?a("div",{staticClass:"flex flex-row items-center mb-6 sticky-menu"},[a("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Create Layout ")]),e.userCan("cms_advanced.view")?a("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.cms.layouts.index")}},[a("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),a("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),a("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[a("icon-save",{staticClass:"w-5 md:mr-2"}),a("span",{staticClass:"hidden md:inline"},[e._v(" Create Layout ")])],1)],1):e._e(),a("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[a("div",{staticClass:"block px-6 w-full"},[a("select-group",{attrs:{"error-message":e.getPageErrorMessage("template_id"),"label-text":"Template","input-any-option-enabled":!0,"input-any-option-label":"Please select a template","input-autofocus":!0,"input-id":"template_id","input-name":"template_id","input-options":e.isTemplates?e.templates:{},"input-option-label-key":"name","input-option-value-key":"id","input-required":!0},on:{errorHidden:function(s){return e.clearPageErrorMessage("template_id")}},model:{value:e.formData.template_id,callback:function(s){e.$set(e.formData,"template_id",s)},expression:"formData.template_id"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("name"),"input-autocomplete":"layout_name","input-id":"name","input-name":"name","input-required":!0,"input-type":"text","label-text":"Layout Name"},on:{errorHidden:function(s){return e.clearPageErrorMessage("name")},input:e.onNameInput},model:{value:e.formData.name,callback:function(s){e.$set(e.formData,"name",s)},expression:"formData.name"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("slug"),"input-autocomplete":"layout_slug","input-id":"slug","input-name":"slug","input-required":!0,"input-type":"text","label-text":"Layout Slug"},on:{blur:e.onSlugBlur,errorHidden:function(s){return e.clearPageErrorMessage("slug")},input:e.onSlugInput},model:{value:e.formData.slug,callback:function(s){e.$set(e.formData,"slug",s)},expression:"formData.slug"}})],1)]),!this.isLoadingTemplate&&e.selectedTemplateHasFields?a("div",{staticClass:"bg-white mt-6 px-4 py-6 shadow-subtle rounded-lg"},[a("p",{staticClass:"text-lg"},[e._v("Fields")]),a("content-editor",{staticClass:"mt-4",attrs:{"template-fields":e.selectedTemplate.template_fields},model:{value:e.formData.content,callback:function(s){e.$set(e.formData,"content",s)},expression:"formData.content"}})],1):e._e()])},c=[],d=u(m,p,c,!1,null,null,null,null);const b=d.exports;export{b as default};
