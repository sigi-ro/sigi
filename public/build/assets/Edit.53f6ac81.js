import{_ as s,s as l}from"./vendor.7c6c1ab8.js";import{I as o}from"./InputGroup.8162edf2.js";import{W as n,T as u,F as c}from"./app.17af205a.js";import{C as d}from"./CheckboxGroup.6c948342.js";import{S as m}from"./SectionItemsEditor.d4d7a80a.js";import{n as p}from"./LogoLight.7aba7668.js";import"./ConfirmationModal.a09056ce.js";import"./checkbox-form-group.50e62bcf.js";import"./vuedraggable.umd.d3f96d51.js";let f=axios.CancelToken,h=f.source();const _={name:"AdminEduLectureEdit",components:{WysiwygField:n,TextAreaGroup:u,SectionItemsEditor:m,InputGroup:o,CheckboxGroup:d,FileManagerFileUploader:c},layout:"admin-layout",props:{lecture:{type:Object,required:!0}},data(){return{autoUpdateSlug:!1,currentDirectory:"/",isLoadingFileUpload:!1,formData:{}}},computed:{uploaderDirectory(){let r="PDFs";return this.currentDirectory!=="/"&&(r+=this.currentDirectory),r}},created(){this.transformSections(),this.formData={id:this.lecture.id,title:this.lecture.title,slug:this.lecture.slug,description:this.lecture.description,can_be_previewed:this.lecture.can_be_previewed,preview_url:this.lecture.preview_url,video_url:this.lecture.video_url,content_length:this.lecture.content_length,index:this.lecture.index,item_type:this.lecture.item_type,section_id:this.lecture.section_id,section:this.lecture.section,files:this.lecture.files,templateField:{type:"wysiwyg"}}},methods:{onFileUploaderFilesAdded(){this.isLoadingFileUpload=!0},onFileUploaderCompleted(){this.isLoadingFileUpload=!1,this.loadFiles()},loadFiles(){if(this.isLoadingFiles)return;this.isLoadingFiles=!0,this.formData.files=[];let r={directory:this.currentDirectory};axios.get(this.$route("admin.api.lectures.files.show",this.formData.id),{params:r,cancelToken:h.token}).then(e=>{e.data.hasOwnProperty("files")&&(this.formData.files=e.data.files)}).catch(e=>{axios.isCancel(e)||this.$errorToast("Failed to load files")}).finally(()=>{this.isLoadingFiles=!1})},transformSections(){let r=this.lecture.sections;s.forEach(r,(e,t)=>{s.forEach(e.child_items,(i,a)=>{i.child_items=[]})}),this.lecture.sections=r},onNameInput(){!this.autoUpdateSlug||(this.formData.slug=this.slugify(this.formData.name),this.computedUrl=this.formData.slug)},onSlugBlur(){this.formData.slug=this.slugify(this.formData.slug)},onSlugInput(){this.autoUpdateSlug=!1,this.computedUrl=this.formData.slug},slugify(r){return!r||!r.length?"":l(r,{lower:!0})},submit(){this.$inertia.put(this.$route("admin.edu.lectures.update",this.lecture.id),this.formData)}}};var v=function(){var e=this,t=e._self._c;return t("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(i){return i.preventDefault(),e.submit.apply(null,arguments)}}},[t("div",{staticClass:"flex flex-row space-x-2 text-sm mb-2"},[t("span",{staticClass:"flex flex-row"},[[t("inertia-link",{staticClass:"text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary hover:text-theme-primary",attrs:{href:e.$route("admin.edu.courses.edit",e.lecture.section.course.id)}},[e._v(" "+e._s(e.lecture.section.course.name)+" ")]),t("span",{staticClass:"ml-2 text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary"},[e._v(" / "+e._s(e.lecture.section.title)+" ")])]],2)]),e.userCan("lectures.edit")?t("div",{staticClass:"flex flex-row items-center mb-6 sticky-menu"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Edit - "),t("b",[e._v(e._s(e.lecture.title))])]),e.userCan("lectures.view")?t("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.edu.lectures.index")}},[t("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),t("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[t("icon-save",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Save ")])],1)],1):e._e(),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg"},[t("h2",[e._v("General details")]),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("title"),"input-autocomplete":"lecture_title","input-id":"title","input-name":"title","input-required":!0,"input-type":"text","label-text":"Title"},on:{errorHidden:function(i){return e.clearPageErrorMessage("title")},input:e.onNameInput},model:{value:e.formData.title,callback:function(i){e.$set(e.formData,"title",i)},expression:"formData.title"}}),t("div",{staticClass:"mt-4"},[t("label",[e._v("Description")]),t("wysiwyg-field",{attrs:{"input-autofocus":!0},model:{value:e.formData.description,callback:function(i){e.$set(e.formData,"description",i)},expression:"formData.description"}})],1)],1),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Lecture Preview")]),t("checkbox-group",{staticClass:"mt-4 mb-4",attrs:{"error-message":e.getPageErrorMessage("can_be_previewed"),"input-id":"can_be_previewed","input-name":"can_be_previewed","label-text":"Lecture can be previewed?"},on:{errorHidden:function(i){return e.clearPageErrorMessage("can_be_previewed")}},model:{value:e.formData.can_be_previewed,callback:function(i){e.$set(e.formData,"can_be_previewed",i)},expression:"formData.can_be_previewed"}}),e.formData.can_be_previewed?t("input-group",{staticClass:"mb-4",attrs:{"input-autofocus":!0,"input-id":"lecture_item_preview_url","input-name":"lecture_item_preview_url","input-placeholder":"Preview URL","label-text":"Preview URL"},model:{value:e.formData.preview_url,callback:function(i){e.$set(e.formData,"preview_url",i)},expression:"formData.preview_url"}}):e._e(),e.formData.preview_url?t("div",{staticClass:"mb-4"},[t("h2",{staticClass:"font-weight-bolder"},[e._v("Preview")]),t("div",{staticClass:"px-4 space-y-2"},[t("iframe",{attrs:{src:e.formData.preview_url,width:"540",height:"360",frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:""}})])]):e._e()],1),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Video details")]),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("content_length"),"input-autocomplete":"lecture_content_length_video","input-id":"content_length","input-name":"content_length","input-required":!1,"input-type":"text","label-text":"Total content length in hours"},on:{errorHidden:function(i){return e.clearPageErrorMessage("content_length")}},model:{value:e.formData.content_length,callback:function(i){e.$set(e.formData,"content_length",i)},expression:"formData.content_length"}}),t("input-group",{staticClass:"mb-4",attrs:{"input-autofocus":!0,"input-id":"lecture_item_video_url","input-name":"lecture_item_video_url","input-placeholder":"Video URL","label-text":"Video URL"},model:{value:e.formData.video_url,callback:function(i){e.$set(e.formData,"video_url",i)},expression:"formData.video_url"}}),e.formData.video_url?t("section",{staticClass:"px-4 space-y-2"},[t("h2",[e._v("Video")]),t("iframe",{attrs:{src:e.formData.video_url,width:"540",height:"360",frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:""}})]):e._e()],1),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("File details")]),e.formData.id?t("div",{staticClass:"mt-4 px-4 space-y-2"},[t("label",{attrs:{for:"file-uploader"}},[e._v("Upload lecture PDFs")]),t("file-manager-file-uploader",{staticClass:"mb-4",attrs:{id:"file-uploader",directory:e.uploaderDirectory,url:e.$route("admin.api.file-manager.files.store",{lecture:e.formData.id})},on:{filesAdded:e.onFileUploaderFilesAdded,queueCompleted:e.onFileUploaderCompleted}})],1):e._e(),e.formData.files?t("div",{staticClass:"mb-4 px-4 space-y-2 mt-4"},[t("label",[e._v("Files")]),t("ul",{staticClass:"list-group"},e._l(e.formData.files,function(i){return t("li",{key:"file-"+i.id,staticClass:"flex flex-row items-start justify-between py-2 space-x-4 ease-in-out duration-300 transition-all hover:bg-gray-100"},[t("div",{staticClass:"flex flex-row items-start"},[e._v(" "+e._s(i.file_name)+" ")]),t("div",{staticClass:"flex flex-row items-center space-x-2"},[i.url?t("a",{staticClass:"flex flex-row items-center justify-center rounded text-theme-base-subtle-contrast ease-in-out duration-300 transition-colors focus:text-theme-primary focus:outline-none hover:text-theme-primary",attrs:{href:i.url,rel:"noreferrer noopener nofollow",target:"_blank"},on:{click:function(a){a.stopPropagation()}}},[t("icon-external-link",{staticClass:"w-5"})],1):e._e()])])}),0)]):e._e()])])},g=[],b=p(_,v,g,!1,null,null,null,null);const P=b.exports;export{P as default};