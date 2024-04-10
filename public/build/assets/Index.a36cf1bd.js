import{_ as i,O as a}from"./vendor.21c2b6f5.js";import{C as o}from"./ConfirmationModal.41eb8e05.js";import{I as n}from"./InputGroup.548575c6.js";import{S as l}from"./app.0bf483f2.js";import{n as c}from"./LogoLight.eb2f8316.js";const d={name:"AdminCmsRedirectsIndex",components:{ConfirmationModal:o,InputGroup:n,SelectGroup:l},layout:"admin-layout",props:{searchOptions:{required:!0,type:Object|Array},redirects:{required:!0,type:Object}},data(){return{editableSearchOptions:{per_page:15,redirects_url_from:"",redirects_url_to:""},isInitialised:!1,isLoadingDelete:!1,showDeleteModal:!1,redirectsToDelete:null}},computed:{deleteModalText(){try{return"Do you really want to delete '"+this.redirectsToDelete.url_from+"'?"}catch{return"Do you really want to delete this redirects?"}},showPagination(){try{return this.redirects.pagination.last_page>1}catch{return!1}},showRedirectActions(){return this.userCan("cms_advanced.edit")||this.userCan("cms_advanced.delete")},redirectsData(){return!this.redirects||!this.redirects.data||this.redirects.data.length<1?!1:this.redirects.data}},mounted(){this.setSearchOptions(this.searchOptions)},methods:{cancelDelete(){this.isLoadingDelete||(this.showDeleteModal=!1,this.redirectsToDelete=null)},checkDelete(s){this.showDeleteModal=!0,this.redirectsToDelete=s},confirmDelete(){if(this.isLoadingDelete)return this.$errorToast("It's only possible to delete one redirects at a time.");this.$inertia.delete(this.$route("admin.cms.redirects.destroy",this.redirectsToDelete.id),{only:["flash","redirects"]}),this.redirectsToDelete=null,this.showDeleteModal=!1},onSearchOptionsUpdate:i.debounce(function(){!this.isInitialised&&(this.isInitialised=!0,this.redirectsData)||a.get(this.$route("admin.cms.redirects.index"),this.editableSearchOptions,{only:["redirects"],preserveState:!0})},500),setSearchOptions(s={}){let e={per_page:15,redirects_url_from:"",redirects_url_to:""};try{i.forEach(s,(t,r)=>{e[r]=t})}catch(t){console.log(t)}this.editableSearchOptions=i.cloneDeep(e)}},watch:{editableSearchOptions:{deep:!0,handler:"onSearchOptionsUpdate"}}};var u=function(){var e=this,t=e._self._c;return t("section",[t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Redirects ")]),e.userCan("cms_advanced.create")?t("inertia-link",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{href:e.$route("admin.cms.redirects.create")}},[t("icon-plus",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create Redirect ")])],1):e._e()],1),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("h1",{staticClass:"font-semibold px-6 text-gray-850"},[e._v(" Search "),t("button",{staticClass:"text-sm text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary hover:text-theme-primary",on:{click:e.setSearchOptions}},[e._v(" (Clear) ")])]),t("div",{staticClass:"flex flex-col items-center mt-4 px-6 space-y-4 md:flex-row md:space-y-0 md:space-x-8"},[t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"redirect_url_from","input-class":"form-control form-control-short","input-id":"redirect_url_from","input-name":"redirect_url_from","input-placeholder":"Redirect From","input-type":"text","label-hidden":!0,"label-text":"Redirect From"},model:{value:e.editableSearchOptions.redirect_url_from,callback:function(r){e.$set(e.editableSearchOptions,"redirect_url_from",r)},expression:"editableSearchOptions.redirect_url_from"}})],1),t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"redirect_url_to","input-class":"form-control form-control-short","input-id":"redirect_url_to","input-name":"redirect_url_to","input-placeholder":"Redirect To","input-type":"text","label-hidden":!0,"label-text":"Redirect To"},model:{value:e.editableSearchOptions.redirect_url_to,callback:function(r){e.$set(e.editableSearchOptions,"redirect_url_to",r)},expression:"editableSearchOptions.redirect_url_to"}})],1)]),e.redirectsData?[t("div",{staticClass:"block mt-8 overflow-x-auto w-full"},[t("table",{staticClass:"table table-hover table-striped w-full"},[t("thead",[t("tr",[t("th",{staticClass:"indicator-column"}),t("th",[e._v("From")]),t("th",[e._v("To")]),t("th",[e._v("Enabled")]),t("th",[e._v("Permanent")]),t("th",[e._v("Publish Date")]),t("th",[e._v("Expiry Date")]),e.showRedirectActions?t("th"):e._e()])]),t("tbody",e._l(e.redirectsData,function(r,p){return t("tr",{key:`redirect-${r.id}`},[t("td",{staticClass:"indicator-column"},[t("div",{staticClass:"h-3 rounded-full w-3",class:{"bg-theme-success-contrast":r.is_active,"bg-theme-danger-contrast":!r.is_active}})]),t("td",[e._v(" "+e._s(r.url_from)+" ")]),t("td",[e._v(" "+e._s(r.url_to)+" ")]),t("td",[e._v(" "+e._s(r.is_enabled?"Yes":"No")+" ")]),t("td",[e._v(" "+e._s(r.is_permanent?"Yes":"No")+" ")]),t("td",[r.published_at?[e._v(" "+e._s(e._f("humanFriendlyDateTime")(r.published_at))+" ")]:[e._v(" - ")]],2),t("td",[r.expired_at?[e._v(" "+e._s(e._f("humanFriendlyDateTime")(r.expired_at))+" ")]:[e._v(" - ")]],2),e.showRedirectActions?t("td",[t("div",{staticClass:"flex flex-row items-center justify-end -mx-1"},[e.userCan("cms_advanced.edit")?t("inertia-link",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{href:e.$route("admin.cms.redirects.edit",r.id),title:"Edit Redirect"}},[t("icon-edit",{staticClass:"w-4"})],1):e._e(),e.userCan("cms_advanced.delete")?t("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-danger hover:text-theme-danger-contrast",attrs:{title:"Delete Redirect"},on:{click:function(_){return e.checkDelete(r)}}},[t("icon-trash",{staticClass:"w-4"})],1):e._e()],1)]):e._e()])}),0)])]),e.showPagination?t("div",{staticClass:"flex flex-row justify-center mt-12 px-6"},[t("pagination",{attrs:{pagination:e.redirects.pagination}})],1):e._e()]:t("p",{staticClass:"bg-theme-base-subtle mt-8 mx-6 px-6 py-4 rounded text-center text-theme-base-subtle-contrast"},[e._v(" No redirects ")]),t("confirmation-modal",{attrs:{"confirm-text":"Delete","confirm-type":"danger","show-modal":e.showDeleteModal,"message-text":e.deleteModalText},on:{cancelAction:e.cancelDelete,closeModal:e.cancelDelete,confirmAction:e.confirmDelete}})],2)])},m=[],h=c(d,u,m,!1,null,null,null,null);const y=h.exports;export{y as default};
