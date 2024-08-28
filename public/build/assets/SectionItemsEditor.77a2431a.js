import{m as r,_ as o}from"./vendor.7c6c1ab8.js";import{d as u}from"./vuedraggable.umd.d3f96d51.js";import{C as m}from"./ConfirmationModal.91fad66a.js";import{I as c}from"./InputGroup.392fed83.js";import{F as h,W as f}from"./app.053b0c35.js";import{n as a}from"./LogoLight.fa462175.js";let p=axios.CancelToken,b=p.source();const _={name:"SectionItemModal",mixins:[r],components:{InputGroup:c,FileManagerFileUploader:h},props:{isCreate:{default:!0,type:Boolean},sectionItem:{default:()=>({title:"",lecture_count:"",content_length:"",child_items:[]})},resetOnClose:{default:!1,type:Boolean},showModal:{default:!0,type:Boolean}},data(){return{currentDirectory:"/",isLoadingFileUpload:!1,defaultSectionItem:{title:"",lecture_count:"",content_length:"",child_items:[]},editableSectionItem:{title:"",lecture_count:"",content_length:"",child_items:[]}}},computed:{confirmText(){return this.isCreate?"Add":"Update"},isSectionItemValid(){try{return this.editableSectionItem.title.length}catch{return!1}},headerText(){return this.isCreate?"Add Section":"Update Section"},showFileUploader(){return this.canUploadFiles&&this.userCan("file_manager.edit")},uploaderDirectory(){let i="PDFs";return this.currentDirectory!=="/"&&(i+=this.currentDirectory),i}},methods:{onFileUploaderFilesAdded(){this.isLoadingFileUpload=!0},onFileUploaderCompleted(){this.isLoadingFileUpload=!1,this.loadFiles()},loadFiles(){if(this.isLoadingFiles)return;this.isLoadingFiles=!0,this.formData.files=[];let i={directory:this.currentDirectory};axios.get(this.$route("admin.api.lectures.files.show",this.formData.id),{params:i,cancelToken:b.token}).then(e=>{e.data.hasOwnProperty("files")&&(this.formData.files=e.data.files)}).catch(e=>{axios.isCancel(e)||this.$errorToast("Failed to load files")}).finally(()=>{this.isLoadingFiles=!1})},cancelAction(){this.$emit("cancelAction")},closeModal(){this.$emit("closeModal")},confirmAction(i=!0){if(!this.isSectionItemValid){i&&this.$errorToast("Section data is invalid.");return}this.$emit("confirmAction",this.editableSectionItem),this.editableSectionItem=o.cloneDeep(this.defaultSectionItem)},onSectionItemChange(){this.editableSectionItem=o.cloneDeep(this.sectionItem);try{o.forEach(this.defaultSectionItem,(i,e)=>{this.editableSectionItem.hasOwnProperty(e)||this.$set(this.editableSectionItem,e,this.defaultSectionItem[e])})}catch{this.editableSectionItem=o.cloneDeep(defaultSectionItem)}},onShowModal(){try{let i=document.getElementsByTagName("body")[0];this.showModal?i.classList.add("overflow-y-hidden"):(i.classList.remove("overflow-y-hidden"),this.resetOnClose&&(this.editableSectionItem=o.cloneDeep(this.defaultSectionItem)))}catch(i){console.error(i)}}},watch:{sectionItem:{handler:"onSectionItemChange",deep:!0},showModal:{handler:"onShowModal"}}};var x=function(){var e=this,t=e._self._c;return e.showModal?t("transition",{attrs:{name:"fade"}},[t("div",{staticClass:"fixed bg-gray-800 bg-opacity-75 flex h-full inset-0 items-center justify-center w-full p-4 z-30",on:{keypress:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:(s.preventDefault(),s.stopPropagation(),e.confirmAction(!1))}}},[t("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:e.closeModal,expression:"closeModal"}],staticClass:"bg-theme-card max-h-full max-w-full overflow-y-auto relative rounded shadow-md text-theme-card-contrast w-160"},[t("div",{staticClass:"flex flex-row justify-end p-2"},[t("button",{staticClass:"flex items-center justify-center ml-auto p-1 rounded ease-in-out duration-300 transition-colors focus:outline-none focus:ring focus:ring-primary hover:bg-theme-base-subtle",attrs:{type:"button"},on:{click:e.closeModal}},[t("icon-close",{staticClass:"h-5 w-5"})],1)]),t("div",{staticClass:"px-4"},[t("h2",{staticClass:"font-semibold text-center text-lg"},[e._v(" "+e._s(e.headerText)+" ")]),e.editableSectionItem?t("div",{staticClass:"mt-6"},[t("input-group",{attrs:{"input-autofocus":!0,"input-id":"section_item_title","input-name":"section_item_title","input-placeholder":"Title","label-text":"Title"},model:{value:e.editableSectionItem.title,callback:function(s){e.$set(e.editableSectionItem,"title",s)},expression:"editableSectionItem.title"}}),t("input-group",{staticClass:"mt-4",attrs:{"input-id":"section_item_lecture_count","input-name":"section_item_lecture_count","input-placeholder":"Total Number of Lectures","label-text":"Total Number of Lectures"},model:{value:e.editableSectionItem.lecture_count,callback:function(s){e.$set(e.editableSectionItem,"lecture_count",s)},expression:"editableSectionItem.lecture_count"}}),t("input-group",{staticClass:"mt-4",attrs:{"input-id":"section_item_content_length","input-name":"section_item_content_length","input-placeholder":"Total Length in minutes","label-text":"Total Length in minutes"},model:{value:e.editableSectionItem.content_length,callback:function(s){e.$set(e.editableSectionItem,"content_length",s)},expression:"editableSectionItem.content_length"}})],1):e._e(),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Files details")]),e.editableSectionItem.id?t("div",{staticClass:"mt-4 px-4 space-y-2"},[t("label",{attrs:{for:"file-uploader"}},[e._v("Upload resources (PDFs, etc...)")]),t("file-manager-file-uploader",{staticClass:"mb-4",attrs:{id:"file-uploader",directory:e.uploaderDirectory,url:e.$route("admin.api.file-manager.files.store",{section:e.editableSectionItem.id})},on:{filesAdded:e.onFileUploaderFilesAdded,queueCompleted:e.onFileUploaderCompleted}})],1):e._e(),e.editableSectionItem.files?t("div",{staticClass:"mb-4 px-4 space-y-2 mt-4"},[t("label",[e._v("Files")]),t("ul",{staticClass:"list-group"},e._l(e.editableSectionItem.files,function(s){return t("li",{key:"file-"+s.id,staticClass:"flex flex-row items-start justify-between py-2 space-x-4 ease-in-out duration-300 transition-all hover:bg-gray-100"},[t("div",{staticClass:"flex flex-row items-start"},[e._v(" "+e._s(s.file_name)+" ")]),t("div",{staticClass:"flex flex-row items-center space-x-2"},[s.url?t("a",{staticClass:"flex flex-row items-center justify-center rounded text-theme-base-subtle-contrast ease-in-out duration-300 transition-colors focus:text-theme-primary focus:outline-none hover:text-theme-primary",attrs:{href:s.url,rel:"noreferrer noopener nofollow",target:"_blank"},on:{click:function(n){n.stopPropagation()}}},[t("icon-external-link",{staticClass:"w-5"})],1):e._e()])])}),0)]):e._e()])]),t("div",{staticClass:"flex flex-col items-center justify-end mb-4 mt-8 px-4 space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0"},[t("button",{staticClass:"bg-theme-base-subtle min-w-24 px-4 py-2 rounded text-center text-theme-base-subtle-contrast w-full ease-in-out duration-300 transition-colors sm:w-auto focus:outline-none focus:ring focus:ring-primary hover:bg-theme-base-subtle-contrast hover:text-theme-base-subtle",attrs:{type:"button"},on:{click:e.cancelAction}},[e._v(" Cancel ")]),t("button",{staticClass:"bg-theme-primary border border-theme-primary flex flex-row items-center justify-center px-4 py-2 min-w-24 px-4 py-2 rounded text-center text-theme-primary-contrast w-full ease-in-out duration-300 transition-colors sm:w-auto focus:outline-none focus:ring focus:ring-primary hover:bg-theme-primary-hover hover:border-theme-primary-hover hover:text-theme-primary-hover-contrast",attrs:{disabled:!e.isSectionItemValid,type:"button"},on:{click:e.confirmAction}},[e._v(" "+e._s(e.confirmText)+" ")])])])])]):e._e()},g=[],y=a(_,x,g,!1,null,null,null,null);const d=y.exports,w={name:"LectureItemModal",mixins:[r],components:{WysiwygField:f,InputGroup:c},props:{lectureItem:{default:()=>({id:"",title:"",description:"",can_be_previewed:!1,preview_url:"",video_url:"",content_length:"",item_type:"lecture",child_items:[],templateField:{type:"wysiwyg"},section_id:null})},resetOnClose:{default:!1,type:Boolean},showModal:{default:!0,type:Boolean}},data(){return{currentDirectory:"/",isLoadingFileUpload:!1,defaultLectureItem:{id:"",title:"",description:"",can_be_previewed:!1,preview_url:"",video_url:"",content_length:"",item_type:"lecture",child_items:[],section_id:null},editableLectureItem:{id:"",title:"",description:"",can_be_previewed:!1,preview_url:"",video_url:"",content_length:"",item_type:"lecture",child_items:[],section_id:null}}},computed:{confirmText(){return"Add"},isLectureItemValid(){try{return this.editableLectureItem.title.length}catch{return!1}},headerText(){return"Add Lecture"}},methods:{cancelAction(){this.$emit("cancelAction")},closeModal(){this.$emit("closeModal")},confirmAction(i=!0){if(!this.isLectureItemValid){i&&this.$errorToast("Lecture data is invalid.");return}this.$emit("confirmAction",this.editableLectureItem),this.editableLectureItem=o.cloneDeep(this.defaultLectureItem)},onLectureItemChange(){this.editableLectureItem=o.cloneDeep(this.lectureItem);try{o.forEach(this.defaultLectureItem,(i,e)=>{this.editableLectureItem.hasOwnProperty(e)||this.$set(this.editableLectureItem,e,this.defaultLectureItem[e])})}catch{this.editableLectureItem=o.cloneDeep(this.defaultLectureItem)}},onShowModal(){try{let i=document.getElementsByTagName("body")[0];this.showModal?i.classList.add("overflow-y-hidden"):(i.classList.remove("overflow-y-hidden"),this.resetOnClose&&(this.editableLectureItem=o.cloneDeep(this.defaultLectureItem)))}catch(i){console.error(i)}}},watch:{lectureItem:{handler:"onLectureItemChange",deep:!0},showModal:{handler:"onShowModal"}}};var I=function(){var e=this,t=e._self._c;return e.showModal?t("transition",{attrs:{name:"fade"}},[t("div",{staticClass:"fixed bg-gray-800 bg-opacity-75 flex h-full inset-0 items-center justify-center w-full p-4 z-30",on:{keypress:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:(s.preventDefault(),s.stopPropagation(),e.confirmAction(!1))}}},[t("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:e.closeModal,expression:"closeModal"}],staticClass:"bg-theme-card max-h-full max-w-full overflow-y-auto relative rounded shadow-md text-theme-card-contrast w-160"},[t("div",{staticClass:"flex flex-row justify-end p-2"},[t("button",{staticClass:"flex items-center justify-center ml-auto p-1 rounded ease-in-out duration-300 transition-colors focus:outline-none focus:ring focus:ring-primary hover:bg-theme-base-subtle",attrs:{type:"button"},on:{click:e.closeModal}},[t("icon-close",{staticClass:"h-5 w-5"})],1)]),t("div",{staticClass:"px-4"},[t("h2",{staticClass:"font-semibold text-center text-lg"},[e._v(" "+e._s(e.headerText)+" ")]),e.editableLectureItem?t("div",{staticClass:"mt-6"},[t("input-group",{staticClass:"mb-4",attrs:{"input-autofocus":!0,"input-id":"lecture_item_title","input-name":"lecture_item_title","input-placeholder":"Title","label-text":"Title"},model:{value:e.editableLectureItem.title,callback:function(s){e.$set(e.editableLectureItem,"title",s)},expression:"editableLectureItem.title"}}),t("wysiwyg-field",{staticClass:"mb-4",attrs:{"input-autofocus":!0},model:{value:e.editableLectureItem.description,callback:function(s){e.$set(e.editableLectureItem,"description",s)},expression:"editableLectureItem.description"}})],1):e._e()]),t("div",{staticClass:"flex flex-col items-center justify-end mb-4 mt-8 px-4 space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0"},[t("button",{staticClass:"bg-theme-base-subtle min-w-24 px-4 py-2 rounded text-center text-theme-base-subtle-contrast w-full ease-in-out duration-300 transition-colors sm:w-auto focus:outline-none focus:ring focus:ring-primary hover:bg-theme-base-subtle-contrast hover:text-theme-base-subtle",attrs:{type:"button"},on:{click:e.cancelAction}},[e._v(" Cancel ")]),t("button",{staticClass:"bg-theme-primary border border-theme-primary flex flex-row items-center justify-center px-4 py-2 min-w-24 px-4 py-2 rounded text-center text-theme-primary-contrast w-full ease-in-out duration-300 transition-colors sm:w-auto focus:outline-none focus:ring focus:ring-primary hover:bg-theme-primary-hover hover:border-theme-primary-hover hover:text-theme-primary-hover-contrast",attrs:{disabled:!e.isLectureItemValid,type:"button"},on:{click:e.confirmAction}},[e._v(" "+e._s(e.confirmText)+" ")])])])])]):e._e()},v=[],C=a(w,I,v,!1,null,null,null,null);const S=C.exports;const D={name:"SectionItemDraggable",components:{ConfirmationModal:m,draggable:u,SectionItemModal:d,LectureItemModal:S},props:{sectionItems:{required:!0,type:Array}},data(){return{isDragging:!1,isEditingSectionItem:!1,sectionItemIndexToDelete:null,sectionItemIndexToEdit:null,showDeleteModal:!1,showEditModal:!1,showLectureModal:!1}},computed:{deleteModalText(){try{return"Do you really want to delete '"+this.sectionItemToDelete.title+"'? This action cannot be reversed!"}catch{return"Do you really want to delete this section item? This action cannot be reversed!"}},sectionItemToDelete(){try{return this.sectionItems[this.sectionItemIndexToDelete]}catch{return!1}},sectionItemToEdit(){try{return this.isEditingSectionItem?this.sectionItems[this.sectionItemIndexToEdit]:{}}catch{return{}}}},methods:{addItem(i){this.isEditingSectionItem=!1,this.showEditModal=!1,this.showLectureModal=!0,this.sectionItemIndexToEdit=i},cancelDelete(){this.showDeleteModal=!1,this.sectionItemIndexToDelete=null},cancelEdit(){this.showEditModal=!1,this.sectionItemIndexToEdit=!1},cancelLectureEdit(){this.showLectureModal=!1,this.sectionItemIndexToEdit=!1},checkDelete(i){this.sectionItemIndexToDelete=i,this.showDeleteModal=!0},confirmEdit(i){this.isEditingSectionItem?this.$set(this.sectionItems,this.sectionItemIndexToEdit,o.cloneDeep(i)):this.sectionItems[this.sectionItemIndexToEdit].child_items.push(o.cloneDeep(i)),this.showEditModal=!1,this.isEditingSectionItem=!1,this.sectionItemIndexToEdit=!1},confirmEditLecture(i){this.isEditingSectionItem?this.$set(this.sectionItems,this.sectionItemIndexToEdit,o.cloneDeep(i)):this.sectionItems[this.sectionItemIndexToEdit].child_items.push(o.cloneDeep(i)),this.showLectureModal=!1,this.isEditingSectionItem=!1,this.sectionItemIndexToEdit=!1},confirmDelete(){try{let i=this.sectionItems[this.sectionItemIndexToDelete];this.$delete(this.sectionItems,this.sectionItemIndexToDelete),i.hasOwnProperty("course_id")&&i.id&&this.$inertia.delete(this.$route("admin.edu.sections.destroy",i.id)),i.hasOwnProperty("section_id")&&i.id&&this.$inertia.delete(this.$route("admin.edu.lectures.destroy",i.id))}catch(i){this.$errorToast("Failed to delete section item."),console.log(i)}finally{this.showDeleteModal=!1,this.sectionItemIndexToDelete=null}},editItem(i,e){this.sectionItemIndexToEdit=i,this.isEditingSectionItem=!0,e.hasOwnProperty("section_id")?this.showLectureModal=!0:this.showEditModal=!0},onDraggableEnd(){this.isDragging=!1},onDraggableSort(){this.$page.props.errors={}},onDraggableStart(){this.isDragging=!0}}};var L=function(){var e=this,t=e._self._c;return t("div",[t("draggable",{attrs:{animation:"200","ghost-class":"ghost",group:{name:"section-item-draggable"},handle:".draggable-handle",list:e.sectionItems},on:{end:e.onDraggableEnd,sort:e.onDraggableSort,start:e.onDraggableStart}},e._l(e.sectionItems,function(s,n){return t("div",{key:`section-item-${s.title}-${n}`},[t("div",{staticClass:"border-2 border-theme-base-subtle flex flex-row items-center px-4 py-1 rounded"},[t("div",{staticClass:"draggable-handle cursor-move"},[t("icon-grid-dots",{staticClass:"w-5"})],1),t("span",{staticClass:"font-semibold ml-4 mr-auto"},[e._v(" "+e._s(s.title)+" ")]),t("small",{staticClass:"mr-2 ml-auto"},[s.lecture_count?t("span",[e._v(" "+e._s(s.child_items?s.child_items.length+" lectures | ":"")+" ")]):e._e(),e._v(" "+e._s(s.content_length?s.content_length+" mins":"")+" ")]),s.hasOwnProperty("lecture_count")&&!s.hasOwnProperty("section_id")?t("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-primary-subtle hover:text-theme-primary-subtle-contrast",attrs:{title:"Add",type:"button"},on:{click:function(l){return e.addItem(n)}}},[t("icon-plus",{staticClass:"w-4"})],1):e._e(),s.hasOwnProperty("section_id")?e._e():t("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{title:"Edit",type:"button"},on:{click:function(l){return e.editItem(n,s)}}},[t("icon-edit",{staticClass:"w-4"})],1),s.hasOwnProperty("section_id")&&s.id?t("a",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{href:e.$route("admin.edu.lectures.edit",s.id),target:"_blank"}},[t("icon-edit",{staticClass:"w-4"})],1):e._e(),s.hasOwnProperty("section_id")&&!s.id?t("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{title:"Save Course before you can edit",type:"button",disabled:""}},[t("icon-edit",{staticClass:"w-4"}),e._v(" DRAFT ")],1):e._e(),t("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-danger hover:text-theme-danger-contrast",attrs:{title:"Delete",type:"button"},on:{click:function(l){return e.checkDelete(n)}}},[t("icon-trash",{staticClass:"w-4"})],1)]),t("div",[t("section-item-draggable",{staticClass:"inner-draggable pl-4",class:{"mt-4":s.child_items.length},attrs:{"section-items":s.child_items}})],1)])}),0),t("confirmation-modal",{attrs:{"confirm-text":"Delete","confirm-type":"danger","show-modal":e.showDeleteModal,"message-text":e.deleteModalText},on:{cancelAction:e.cancelDelete,closeModal:e.cancelDelete,confirmAction:e.confirmDelete}}),t("section-item-modal",{attrs:{"is-create":!e.isEditingSectionItem,"section-item":e.sectionItemToEdit,"show-modal":e.showEditModal},on:{cancelAction:e.cancelEdit,closeModal:e.cancelEdit,confirmAction:e.confirmEdit}}),t("lecture-item-modal",{attrs:{"lecture-item":e.sectionItemToEdit,"show-modal":e.showLectureModal},on:{cancelAction:e.cancelLectureEdit,closeModal:e.cancelLectureEdit,confirmAction:e.confirmEditLecture}})],1)},M=[],T=a(D,L,M,!1,null,"d0e577a6",null,null);const E=T.exports,k={name:"SectionItemsEditor",components:{SectionItemDraggable:E,SectionItemModal:d},model:{prop:"sectionItems"},props:{sectionItems:{required:!0,type:Array}},data(){return{isDragging:!1,newSectionItem:{},newLectureItem:{},showCreateModal:!1}},methods:{addSectionItem(){this.showCreateModal=!0},cancelCreate(){this.showCreateModal=!1},confirmCreate(i){this.showCreateModal=!1,this.sectionItems.push(o.cloneDeep(i)),this.newSectionItem={},this.newLectureItem={}}}};var $=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"flex flex-row items-center"},[t("span",{staticClass:"text-lg"},[e._v("Sections")]),t("button",{staticClass:"button button-primary-subtle button-small ml-auto text-sm",attrs:{type:"button"},on:{click:e.addSectionItem}},[e._v(" Add Section ")])]),e.sectionItems.length?t("div",[t("section-item-draggable",{staticClass:"mt-6",attrs:{"section-items":e.sectionItems}})],1):t("p",{staticClass:"bg-theme-base-subtle mt-6 px-4 py-3 rounded text-center text-theme-base-subtle-contrast"},[e._v(" Nothing found ")]),t("section-item-modal",{attrs:{"section-item":e.newSectionItem,"show-modal":e.showCreateModal},on:{cancelAction:e.cancelCreate,closeModal:e.cancelCreate,confirmAction:e.confirmCreate}})],1)},A=[],F=a(k,$,A,!1,null,null,null,null);const V=F.exports;export{V as S};
