import{_ as l,O as i}from"./vendor.21c2b6f5.js";import{C as n}from"./ConfirmationModal.caf623a6.js";import{I as o}from"./InputGroup.d82ecd1f.js";import{n as r}from"./LogoLight.eaabebeb.js";const c={name:"AdminEDULabelsIndex",components:{ConfirmationModal:n,InputGroup:o},layout:"admin-layout",props:{labels:{required:!0,type:Object},searchOptions:{required:!0,type:Object|Array}},data(){return{editableSearchOptions:{label_name:"",per_page:15},isInitialised:!1,isLoadingDelete:!1,showDeleteModal:!1,itemToDelete:null}},mounted(){this.setSearchOptions(this.searchOptions)},computed:{deleteModalText(){try{return"Do you really want to delete '"+this.itemToDelete.name+"'?"}catch{return"Do you really want to delete this?"}},showPagination(){try{return this.labels.pagination.last_page>1}catch{return!1}},showActions(){return this.userCan("labels.edit")||this.userCan("labels.delete")},labelsData(){return!this.labels||!this.labels.data||this.labels.data.length<1?!1:this.labels.data}},methods:{cancelDelete(){this.isLoadingDelete||(this.showDeleteModal=!1,this.itemToDelete=null)},checkDelete(s){this.showDeleteModal=!0,this.itemToDelete=s},confirmDelete(){if(this.isLoadingDelete)return this.$errorToast("It's only possible to delete one item at a time.");this.$inertia.delete(this.$route("admin.edu.labels.destroy",this.itemToDelete.id),{only:["flash","labels"]}),this.itemToDelete=null,this.showDeleteModal=!1},onSearchOptionsUpdate:l.debounce(function(){!this.isInitialised&&(this.isInitialised=!0,this.labelsData)||i.get(this.$route("admin.edu.labels.index"),this.editableSearchOptions,{only:["labels"],preserveState:!0})},500),setSearchOptions(s={}){let e={label_name:"",per_page:15};try{l.forEach(s,(t,a)=>{e[a]=t})}catch(t){console.log(t)}this.editableSearchOptions=l.cloneDeep(e)}},watch:{editableSearchOptions:{deep:!0,handler:"onSearchOptionsUpdate"}}};var d=function(){var e=this,t=e._self._c;return t("section",[t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Labels ")]),e.userCan("labels.create")?t("inertia-link",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{href:e.$route("admin.edu.labels.create")}},[t("icon-plus",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create ")])],1):e._e()],1),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("h1",{staticClass:"font-semibold px-6 text-gray-850"},[e._v(" Search "),t("button",{staticClass:"text-sm text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary hover:text-theme-primary",on:{click:e.setSearchOptions}},[e._v(" (Clear) ")])]),t("div",{staticClass:"flex flex-col items-center mt-4 px-6 space-y-4 md:flex-row md:space-y-0 md:space-x-8"},[t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"label_name_search","input-class":"form-control form-control-short","input-id":"label_name","input-name":"label_name","input-placeholder":"Name","input-type":"text","label-hidden":!0,"label-text":"Name"},model:{value:e.editableSearchOptions.label_name,callback:function(a){e.$set(e.editableSearchOptions,"label_name",a)},expression:"editableSearchOptions.label_name"}})],1)]),e.labelsData?[t("div",{staticClass:"block mt-8 overflow-x-auto w-full"},[t("table",{staticClass:"table table-hover table-striped w-full"},[t("thead",[t("tr",[t("th",[e._v("Label")]),t("th",[e._v("Slug")]),e.showActions?t("th"):e._e()])]),t("tbody",e._l(e.labelsData,function(a,m){return t("tr",{key:`item-${a.id}`},[t("td",[e._v(" "+e._s(a.name)+" ")]),t("td",[e._v(" "+e._s(a.slug)+" ")]),e.showActions?t("td",[t("div",{staticClass:"flex flex-row items-center justify-end -mx-1"},[e.userCan("labels.edit")?t("inertia-link",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{href:e.$route("admin.edu.labels.edit",a.id),title:"Edit"}},[t("icon-edit",{staticClass:"w-4"})],1):e._e(),e.userCan("labels.delete")?t("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-danger hover:text-theme-danger-contrast",attrs:{title:"Delete"},on:{click:function(p){return e.checkDelete(a)}}},[t("icon-trash",{staticClass:"w-4"})],1):e._e()],1)]):e._e()])}),0)])]),e.showPagination?t("div",{staticClass:"flex flex-row justify-center mt-12 px-6"},[t("pagination",{attrs:{pagination:e.labels.pagination}})],1):e._e()]:t("p",{staticClass:"bg-theme-base-subtle mt-8 mx-6 px-6 py-4 rounded text-center text-theme-base-subtle-contrast"},[e._v(" No results ")]),t("confirmation-modal",{attrs:{"confirm-text":"Delete","confirm-type":"danger","show-modal":e.showDeleteModal,"message-text":e.deleteModalText},on:{cancelAction:e.cancelDelete,closeModal:e.cancelDelete,confirmAction:e.confirmDelete}})],2)])},u=[],h=r(c,d,u,!1,null,null,null,null);const g=h.exports;export{g as default};
