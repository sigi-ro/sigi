import{_ as s,O as i}from"./vendor.7c6c1ab8.js";import{C as n}from"./ConfirmationModal.91fad66a.js";import{I as o}from"./InputGroup.392fed83.js";import{S as r}from"./app.053b0c35.js";import{n as p}from"./LogoLight.fa462175.js";const m={name:"AdminCmsTemplateIndex",components:{ConfirmationModal:n,InputGroup:o,SelectGroup:r},layout:"admin-layout",props:{searchOptions:{required:!0,type:Object|Array},templates:{required:!0,type:Object},templateTypes:{required:!0,type:Object}},data(){return{editableSearchOptions:{per_page:15,template_name:"",template_slug:"",template_type:""},isInitialised:!1,isLoadingDelete:!1,showDeleteModal:!1,templateToDelete:null}},computed:{deleteModalText(){try{return"Do you really want to delete '"+this.templateToDelete.name+"'?"}catch{return"Do you really want to delete this template?"}},showPagination(){try{return this.templates.pagination.last_page>1}catch{return!1}},showTemplateActions(){return this.userCan("cms_advanced.edit")||this.userCan("cms_advanced.delete")},templatesData(){return!this.templates||!this.templates.data||this.templates.data.length<1?!1:this.templates.data}},mounted(){this.setSearchOptions(this.searchOptions)},methods:{cancelDelete(){this.isLoadingDelete||(this.showDeleteModal=!1,this.templateToDelete=null)},checkDelete(l){this.showDeleteModal=!0,this.templateToDelete=l},confirmDelete(){if(this.isLoadingDelete)return this.$errorToast("It's only possible to delete one template at a time.");this.$inertia.delete(this.$route("admin.cms.templates.destroy",this.templateToDelete.id),{only:["flash","templates"]}),this.templateToDelete=null,this.showDeleteModal=!1},getTemplateTypeLabel(l){try{return this.templateTypes.hasOwnProperty(l)?this.templateTypes[l]:l}catch{return l}},onSearchOptionsUpdate:s.debounce(function(){!this.isInitialised&&(this.isInitialised=!0,this.templatesData)||i.get(this.$route("admin.cms.templates.index"),this.editableSearchOptions,{only:["templates"],preserveState:!0})},500),setSearchOptions(l={}){let e={per_page:15,template_name:"",template_slug:"",template_type:""};try{s.forEach(l,(t,a)=>{e[a]=t})}catch(t){console.log(t)}this.editableSearchOptions=s.cloneDeep(e)}},watch:{editableSearchOptions:{deep:!0,handler:"onSearchOptionsUpdate"}}};var c=function(){var e=this,t=e._self._c;return t("section",[t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Templates ")]),e.userCan("cms_advanced.create")?t("inertia-link",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{href:e.$route("admin.cms.templates.create")}},[t("icon-plus",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create Template ")])],1):e._e()],1),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("h1",{staticClass:"font-semibold px-6 text-gray-850"},[e._v(" Search "),t("button",{staticClass:"text-sm text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary hover:text-theme-primary",on:{click:e.setSearchOptions}},[e._v(" (Clear) ")])]),t("div",{staticClass:"flex flex-col items-center mt-4 px-6 space-y-4 md:flex-row md:space-y-0 md:space-x-8"},[t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"template_name_search","input-class":"form-control form-control-short","input-id":"template_name","input-name":"template_name","input-placeholder":"Template Name","input-type":"text","label-hidden":!0,"label-text":"Template Name"},model:{value:e.editableSearchOptions.template_name,callback:function(a){e.$set(e.editableSearchOptions,"template_name",a)},expression:"editableSearchOptions.template_name"}})],1),t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"template_slug_search","input-class":"form-control form-control-short","input-id":"template_slug","input-name":"template_slug","input-placeholder":"Template Slug","input-type":"text","label-hidden":!0,"label-text":"Template Slug"},model:{value:e.editableSearchOptions.template_slug,callback:function(a){e.$set(e.editableSearchOptions,"template_slug",a)},expression:"editableSearchOptions.template_slug"}})],1),t("div",{staticClass:"w-full md:w-1/3"},[t("select-group",{attrs:{"label-hidden":!0,"label-text":"Template Type","input-any-option-enabled":!0,"input-any-option-label":"Template Type","input-class":"form-control form-control-short","input-id":"template_type","input-name":"template_type","input-options":e.templateTypes},model:{value:e.editableSearchOptions.template_type,callback:function(a){e.$set(e.editableSearchOptions,"template_type",a)},expression:"editableSearchOptions.template_type"}})],1)]),e.templatesData?[t("div",{staticClass:"block mt-8 overflow-x-auto w-full"},[t("table",{staticClass:"table table-hover table-striped w-full"},[t("thead",[t("tr",[t("th",[e._v("Name")]),t("th",[e._v("Slug")]),t("th",[e._v("Type")]),e.showTemplateActions?t("th"):e._e()])]),t("tbody",e._l(e.templatesData,function(a,h){return t("tr",{key:`template-${a.id}`},[t("td",[e._v(" "+e._s(a.name)+" ")]),t("td",[e._v(" "+e._s(a.slug)+" ")]),t("td",[e._v(" "+e._s(e.getTemplateTypeLabel(a.type))+" ")]),e.showTemplateActions?t("td",[t("div",{staticClass:"flex flex-row items-center justify-end -mx-1"},[e.userCan("cms_advanced.edit")?t("inertia-link",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{href:e.$route("admin.cms.templates.edit",a.id),title:"Edit Template"}},[t("icon-edit",{staticClass:"w-4"})],1):e._e(),e.userCan("cms_advanced.delete")?t("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-danger hover:text-theme-danger-contrast",attrs:{title:"Delete Template"},on:{click:function(f){return e.checkDelete(a)}}},[t("icon-trash",{staticClass:"w-4"})],1):e._e()],1)]):e._e()])}),0)])]),e.showPagination?t("div",{staticClass:"flex flex-row justify-center mt-12 px-6"},[t("pagination",{attrs:{pagination:e.templates.pagination}})],1):e._e()]:t("p",{staticClass:"bg-theme-base-subtle mt-8 mx-6 px-6 py-4 rounded text-center text-theme-base-subtle-contrast"},[e._v(" No templates ")]),t("confirmation-modal",{attrs:{"confirm-text":"Delete","confirm-type":"danger","show-modal":e.showDeleteModal,"message-text":e.deleteModalText},on:{cancelAction:e.cancelDelete,closeModal:e.cancelDelete,confirmAction:e.confirmDelete}})],2)])},d=[],u=p(m,c,d,!1,null,null,null,null);const v=u.exports;export{v as default};
