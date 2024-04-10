import{_ as i,O as l}from"./vendor.21c2b6f5.js";import{C as n}from"./ConfirmationModal.41eb8e05.js";import{I as o}from"./InputGroup.548575c6.js";import{S as r}from"./app.0bf483f2.js";import{n as c}from"./LogoLight.eb2f8316.js";const u={name:"AdminCmsPageIndex",components:{ConfirmationModal:n,InputGroup:o,SelectGroup:r},layout:"admin-layout",props:{layouts:{required:!0,type:Object|Array},pages:{required:!0,type:Object},searchOptions:{required:!0,type:Object|Array},templates:{required:!0,type:Object|Array}},data(){return{editableSearchOptions:{layout_id:"",per_page:15,page_name:"",page_slug:"",template_id:""},isInitialised:!1,isLoadingDelete:!1,showDeleteModal:!1,pageToDelete:null}},mounted(){this.setSearchOptions(this.searchOptions)},computed:{deleteModalText(){try{return"Do you really want to delete '"+this.pageToDelete.name+"'?"}catch{return"Do you really want to delete this page?"}},isLayouts(){try{return Object.keys(this.layouts).length}catch{return!1}},isTemplates(){try{return Object.keys(this.templates).length}catch{return!1}},showPagination(){try{return this.pages.pagination.last_page>1}catch{return!1}},showPageActions(){return this.userCan("cms.edit")||this.userCan("cms.delete")},pagesData(){return!this.pages||!this.pages.data||this.pages.data.length<1?!1:this.pages.data}},methods:{cancelDelete(){this.isLoadingDelete||(this.showDeleteModal=!1,this.pageToDelete=null)},checkDelete(s){this.showDeleteModal=!0,this.pageToDelete=s},confirmDelete(){if(this.isLoadingDelete)return this.$errorToast("It's only possible to delete one page at a time.");this.$inertia.delete(this.$route("admin.cms.pages.destroy",this.pageToDelete.id),{only:["flash","pages"]}),this.pageToDelete=null,this.showDeleteModal=!1},onSearchOptionsUpdate:i.debounce(function(){!this.isInitialised&&(this.isInitialised=!0,this.pagesData)||l.get(this.$route("admin.cms.pages.index"),this.editableSearchOptions,{only:["pages"],preserveState:!0})},500),setSearchOptions(s={}){let e={layout_id:"",per_page:15,page_name:"",page_slug:"",template_type:""};try{i.forEach(s,(t,a)=>{e[a]=t})}catch(t){console.log(t)}this.editableSearchOptions=i.cloneDeep(e)}},watch:{editableSearchOptions:{deep:!0,handler:"onSearchOptionsUpdate"}}};var p=function(){var e=this,t=e._self._c;return t("section",[t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Page ")]),e.userCan("cms.create")?t("inertia-link",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{href:e.$route("admin.cms.pages.create")}},[t("icon-plus",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create Page ")])],1):e._e()],1),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("h1",{staticClass:"font-semibold px-6 text-gray-850"},[e._v(" Search "),t("button",{staticClass:"text-sm text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary hover:text-theme-primary",on:{click:e.setSearchOptions}},[e._v(" (Clear) ")])]),t("div",{staticClass:"flex flex-row flex-wrap items-center -mx-4 -my-2 pt-4 px-6"},[t("div",{staticClass:"my-2 w-full sm:w-1/2 lg:w-1/4"},[t("input-group",{staticClass:"mx-4",attrs:{"input-autocomplete":"page_name_search","input-class":"form-control form-control-short","input-id":"page_name","input-name":"page_name","input-placeholder":"Page Name","input-type":"text","label-hidden":!0,"label-text":"Page Name"},model:{value:e.editableSearchOptions.page_name,callback:function(a){e.$set(e.editableSearchOptions,"page_name",a)},expression:"editableSearchOptions.page_name"}})],1),t("div",{staticClass:"my-2 w-full sm:w-1/2 lg:w-1/4"},[t("input-group",{staticClass:"mx-4",attrs:{"input-autocomplete":"page_slug_search","input-class":"form-control form-control-short","input-id":"page_slug","input-name":"page_slug","input-placeholder":"Page Slug","input-type":"text","label-hidden":!0,"label-text":"Page Slug"},model:{value:e.editableSearchOptions.page_slug,callback:function(a){e.$set(e.editableSearchOptions,"page_slug",a)},expression:"editableSearchOptions.page_slug"}})],1),e.isLayouts?t("div",{staticClass:"my-2 w-full sm:w-1/2 lg:w-1/4"},[t("select-group",{staticClass:"mx-4",attrs:{"label-hidden":!0,"label-text":"Layout","input-any-option-enabled":!0,"input-any-option-label":"Layout","input-class":"form-control form-control-short","input-id":"template_id","input-name":"template_id","input-option-label-key":"name","input-option-value-key":"id","input-options":e.layouts},model:{value:e.editableSearchOptions.layout_id,callback:function(a){e.$set(e.editableSearchOptions,"layout_id",a)},expression:"editableSearchOptions.layout_id"}})],1):e._e(),e.isTemplates?t("div",{staticClass:"my-2 w-full sm:w-1/2 lg:w-1/4"},[t("select-group",{staticClass:"mx-4",attrs:{"label-hidden":!0,"label-text":"Template","input-any-option-enabled":!0,"input-any-option-label":"Template","input-class":"form-control form-control-short","input-id":"template_id","input-name":"template_id","input-option-label-key":"name","input-option-value-key":"id","input-options":e.templates},model:{value:e.editableSearchOptions.template_id,callback:function(a){e.$set(e.editableSearchOptions,"template_id",a)},expression:"editableSearchOptions.template_id"}})],1):e._e()]),e.pagesData?[t("div",{staticClass:"block mt-8 overflow-x-auto w-full"},[t("table",{staticClass:"table table-hover table-striped w-full"},[t("thead",[t("tr",[t("th",{staticClass:"indicator-column"}),t("th",[e._v("Name")]),t("th",[e._v("URL")]),t("th",{staticClass:"text-center"},[e._v("Enabled")]),t("th",{staticClass:"text-center"},[e._v("Publish / Expiry Date")]),t("th",[e._v("Layout / Template")]),e.showPageActions?t("th"):e._e()])]),t("tbody",e._l(e.pagesData,function(a,h){return t("tr",{key:`page-${a.id}`},[t("td",{staticClass:"indicator-column"},[t("div",{staticClass:"h-3 rounded-full w-3",class:{"bg-theme-success-contrast":a.url.is_live,"bg-theme-danger-contrast":!a.url.is_live}})]),t("td",[e._v(" "+e._s(a.name)+" "),t("br"),t("span",{staticClass:"text-sm text-theme-base-subtle-contrast"},[e._v(" "+e._s(a.slug)+" ")])]),t("td",{staticClass:"text-sm"},[e._v(" "+e._s(a.url.url_full)+" ")]),t("td",[t("div",{staticClass:"flex flex-row justify-center"},[a.url.is_enabled?t("icon-check",{staticClass:"h-4 w-4"}):t("icon-x",{staticClass:"h-4 w-4"})],1)]),t("td",{staticClass:"text-sm"},[t("div",{staticClass:"flex flex-col opacity-75 space-y-1"},[t("span",{staticClass:"text-center"},[a.url.published_at?[e._v(" "+e._s(e._f("humanFriendlyDateTime")(a.url.published_at))+" ")]:[e._v(" - ")]],2),t("span",{staticClass:"text-center"},[a.url.expired_at?[e._v(" "+e._s(e._f("humanFriendlyDateTime")(a.url.expired_at))+" ")]:[e._v(" - ")]],2)])]),t("td",{staticClass:"text-sm text-theme-base-subtle-contrast"},[e._v(" "+e._s(a.layout.name)+" "),t("br"),e._v(" "+e._s(a.template.name)+" ")]),e.showPageActions?t("td",[t("div",{staticClass:"flex flex-row items-center justify-end -mx-1"},[e.userCan("cms.edit")?t("inertia-link",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{href:e.$route("admin.cms.pages.edit",a.id),title:"Edit Page"}},[t("icon-edit",{staticClass:"w-4"})],1):e._e(),e.userCan("cms.delete")?t("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-danger hover:text-theme-danger-contrast",attrs:{title:"Delete Page"},on:{click:function(f){return e.checkDelete(a)}}},[t("icon-trash",{staticClass:"w-4"})],1):e._e()],1)]):e._e()])}),0)])]),e.showPagination?t("div",{staticClass:"flex flex-row justify-center mt-12 px-6"},[t("pagination",{attrs:{pagination:e.pages.pagination}})],1):e._e()]:t("p",{staticClass:"bg-theme-base-subtle mt-8 mx-6 px-6 py-4 rounded text-center text-theme-base-subtle-contrast"},[e._v(" No pages ")]),t("confirmation-modal",{attrs:{"confirm-text":"Delete","confirm-type":"danger","show-modal":e.showDeleteModal,"message-text":e.deleteModalText},on:{cancelAction:e.cancelDelete,closeModal:e.cancelDelete,confirmAction:e.confirmDelete}})],2)])},d=[],m=c(u,p,d,!1,null,null,null,null);const v=m.exports;export{v as default};
