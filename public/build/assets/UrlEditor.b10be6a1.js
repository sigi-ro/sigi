import{_ as l,s}from"./vendor.7c6c1ab8.js";import{I as n}from"./InputGroup.2066916f.js";import{n as o}from"./LogoLight.dcee77db.js";import{D as u}from"./DateTimePickerGroup.6fcfa721.js";import{I as c}from"./InlineCheckboxGroup.edaa00c4.js";const p={name:"MetadataEditor",components:{InputGroup:n},model:{prop:"metadata"},props:{metadata:{required:!0,type:Object|null}},data(){return{editableMetadata:{canonical:"",description:"",keywords:"",title:"",og_description:"",og_image:"",og_title:"",og_type:"",og_url:""},tab_key_meta:"meta",tab_key_open_graph:"og",tab_selected:"meta"}},created(){try{this.metadata&&Object.keys(this.metadata).length&&(this.editableMetadata=l.cloneDeep(this.metadata))}catch{return}},methods:{getTabClass(r){let e="border-b-2 border-white pb-1 text-lg focus:outline-none ";return this.tab_selected===r?e+="text-theme-primary focus:border-theme-primary hover:border-theme-primary":e+="text-theme-base-subtle-contrast focus:border-theme-base-subtle-contrast hover:border-theme-base-subtle-contrast",e},onEditableMetadataUpdate:l.debounce(function(){this.$emit("input",this.editableMetadata)},100),onOgImageFileManagerFileSelected(r){try{this.editableMetadata.og_image=r.url}catch(e){this.$errorToast(e)}},openOgImageFileManagerModal(){this.$store.commit("openFileManagerModel",this.onOgImageFileManagerFileSelected)},selectTab(r){this.tab_selected=r}},watch:{editableMetadata:{deep:!0,handler:"onEditableMetadataUpdate"}}};var m=function(){var e=this,a=e._self._c;return a("div",[a("div",{staticClass:"flex flex-row space-x-4"},[a("button",{class:e.getTabClass(e.tab_key_meta),attrs:{type:"button"},on:{click:function(t){return e.selectTab(e.tab_key_meta)}}},[e._v(" Metadata ")]),a("button",{class:e.getTabClass(e.tab_key_open_graph),attrs:{type:"button"},on:{click:function(t){return e.selectTab(e.tab_key_open_graph)}}},[e._v(" Open Graph Data ")])]),a("transition",{attrs:{name:"slide-left",mode:"out-in"}},[e.tab_selected===e.tab_key_meta?a("div",{key:"tab_key_meta",staticClass:"overflow-hidden"},[a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("metadata.title"),"input-id":"metadata_title","input-name":"metadata_title","input-type":"text","label-text":"Title"},on:{errorHidden:function(t){return e.clearPageErrorMessage("metadata.title")}},model:{value:e.editableMetadata.title,callback:function(t){e.$set(e.editableMetadata,"title",t)},expression:"editableMetadata.title"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("metadata.description"),"input-id":"metadata_description","input-name":"metadata_description","input-type":"text","label-text":"Meta Description"},on:{errorHidden:function(t){return e.clearPageErrorMessage("metadata.description")}},model:{value:e.editableMetadata.description,callback:function(t){e.$set(e.editableMetadata,"description",t)},expression:"editableMetadata.description"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("metadata.keywords"),"input-id":"metadata_keywords","input-name":"metadata_keywords","input-type":"text","label-text":"Meta Keywords"},on:{errorHidden:function(t){return e.clearPageErrorMessage("metadata.keywords")}},model:{value:e.editableMetadata.keywords,callback:function(t){e.$set(e.editableMetadata,"keywords",t)},expression:"editableMetadata.keywords"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("metadata.canonical"),"input-id":"metadata_canonical","input-name":"metadata_canonical","input-type":"text","label-text":"Canonical"},on:{errorHidden:function(t){return e.clearPageErrorMessage("metadata.canonical")}},model:{value:e.editableMetadata.canonical,callback:function(t){e.$set(e.editableMetadata,"canonical",t)},expression:"editableMetadata.canonical"}})],1):e._e(),e.tab_selected===e.tab_key_open_graph?a("div",{key:"tab_key_open_graph",staticClass:"overflow-hidden"},[a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("metadata.og_title"),"input-id":"metadata_og_title","input-name":"metadata_og_title","input-type":"text","label-text":"OG Title"},on:{errorHidden:function(t){return e.clearPageErrorMessage("metadata.og_title")}},model:{value:e.editableMetadata.og_title,callback:function(t){e.$set(e.editableMetadata,"og_title",t)},expression:"editableMetadata.og_title"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("metadata.og_description"),"input-id":"metadata_og_description","input-name":"metadata_og_description","input-type":"text","label-text":"OG Description"},on:{errorHidden:function(t){return e.clearPageErrorMessage("metadata.og_description")}},model:{value:e.editableMetadata.og_description,callback:function(t){e.$set(e.editableMetadata,"og_description",t)},expression:"editableMetadata.og_description"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("metadata.og_type"),"input-id":"metadata_og_type","input-name":"metadata_og_type","input-type":"text","label-text":"OG Type"},on:{errorHidden:function(t){return e.clearPageErrorMessage("metadata.og_type")}},model:{value:e.editableMetadata.og_type,callback:function(t){e.$set(e.editableMetadata,"og_type",t)},expression:"editableMetadata.og_type"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("metadata.og_url"),"input-id":"metadata_og_url","input-name":"metadata_og_url","input-type":"text","label-text":"OG URL"},on:{errorHidden:function(t){return e.clearPageErrorMessage("metadata.og_url")}},model:{value:e.editableMetadata.og_url,callback:function(t){e.$set(e.editableMetadata,"og_url",t)},expression:"editableMetadata.og_url"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("metadata.og_image"),"input-class":"border border-theme-base-subtle font-medium px-3 py-2 rounded-l w-full focus:border-theme-primary focus:outline-none focus:ring-0","input-id":"metadata_og_image","input-name":"metadata_og_image","input-type":"text","input-wrapper-class":"flex flex-row items-center","label-text":"OG Image"},on:{errorHidden:function(t){return e.clearPageErrorMessage("metadata.og_image")}},scopedSlots:e._u([{key:"inputAppend",fn:function(){return[a("button",{staticClass:"border border-l-0 border-theme-primary-subtle button button-primary-subtle rounded-l-none",attrs:{type:"button"},on:{click:e.openOgImageFileManagerModal}},[e._v(" Browse... ")])]},proxy:!0}],null,!1,4230810879),model:{value:e.editableMetadata.og_image,callback:function(t){e.$set(e.editableMetadata,"og_image",t)},expression:"editableMetadata.og_image"}})],1):e._e()])],1)},g=[],b=o(p,m,g,!1,null,null,null,null);const C=b.exports;let d=axios.CancelToken,i=d.source();const _={name:"UrlEditor",components:{DateTimePickerGroup:u,InlineCheckboxGroup:c,InputGroup:n},model:{prop:"urlData"},props:{computedUrl:{default:"",type:String},parentUrl:{default:null,type:String|null},urlData:{required:!0,type:Object|null}},data(){return{autoUpdateUrl:!0,editableUrlData:{expired_at:null,is_enabled:!1,published_at:null,url_main:""},isUrlChecked:!1,isUrlCheckLoading:!1,isUrlAvailable:!1,urlInput:""}},computed:{urlFull(){let r="";return this.parentUrl&&this.parentUrl.length&&(r+=this.parentUrl),r+=this.urlInputSlugified,r.split("//").join("/")},urlInputSlugified(){if(!this.urlInput)return"/";let r=this.urlInput;return r.trim(),r.length?(r=s(r,{lower:!0}),r.indexOf("/")!==0&&(r="/"+r),r):"/"}},created(){var r;try{this.urlData&&Object.keys(this.urlData).length&&(this.editableUrlData=l.cloneDeep(this.urlData),this.urlInput=(r=this.editableUrlData.url_main)!=null?r:""),this.urlInput&&this.urlInput!==""&&(this.autoUpdateUrl=!1)}catch{return}},methods:{cancelUrlCheck(){this.isUrlCheckLoading&&(i.cancel("URL check cancelled"),i=d.source())},checkUrlIsAvailable:l.debounce(function(){if(this.isUrlChecked=!1,this.cancelUrlCheck(),this.isUrlChecked=!1,this.isUrlAvailable=!1,!this.urlInput.length)return;this.isUrlCheckLoading=!0;let r={url:this.urlFull,url_id:this.urlData.id?this.urlData.id:null};axios.get(this.$route("admin.api.cms.urls.available"),{params:r,cancelToken:i.token}).then(e=>{this.isUrlCheckLoading=!1,this.isUrlChecked=!0,this.isUrlAvailable=e.data}).catch(e=>{axios.isCancel(e)||(this.isUrlCheckLoading=!1,this.$errorToast("Failed to check URL availability"))})},500),onComputedUrlUpdate(){!this.autoUpdateUrl||this.updateUrl(this.computedUrl)},onEditableUrlUpdate:l.debounce(function(){this.$emit("input",this.editableUrlData)},100),onIsUrlAvailableUpdate(){this.$emit("isAvailable",this.isUrlAvailable)},onUrlInputInput(){this.autoUpdateUrl=!1,this.isUrlChecked=!1},onUrlInputUpdate:l.debounce(function(){!this.urlInput.length||this.updateUrl(this.urlInput)},100),updateUrl(r){let e=r,a=e.charAt(0)==="/";e=s(e),a&&(e="/"+e),this.urlInput!==e&&(this.urlInput=e,this.isUrlChecked=!1),this.$set(this.editableUrlData,"url_main",e),this.checkUrlIsAvailable()}},watch:{computedUrl:{handler:"onComputedUrlUpdate"},editableUrlData:{deep:!0,handler:"onEditableUrlUpdate"},isUrlAvailable:{handler:"onIsUrlAvailableUpdate"},urlFull:{handler:"checkUrlIsAvailable"},urlInput:{handler:"onUrlInputUpdate"}}};var h=function(){var e=this,a=e._self._c;return a("div",[a("input-group",{attrs:{"error-message":e.getPageErrorMessage("url.url_main"),"input-id":"url_input","input-name":"url_input","input-required":!0,"input-type":"text","label-text":"URL"},on:{errorHidden:function(t){return e.clearPageErrorMessage("url.url_main")},input:e.onUrlInputInput},model:{value:e.urlInput,callback:function(t){e.urlInput=t},expression:"urlInput"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("url.url_full"),"input-disabled":!0,"input-id":"url_full","input-name":"url_full","input-type":"text","label-text":"Formatted URL"},on:{errorHidden:function(t){return e.clearPageErrorMessage("url.url_full")}},model:{value:e.urlFull,callback:function(t){e.urlFull=t},expression:"urlFull"}},[a("span",{staticClass:"flex flex-row items-center"},[a("span",{staticClass:"flex flex-row items-baseline"},[e._v(" Formatted URL "),a("sup",{staticClass:"text-theme-danger-contrast"},[e._v("*")])]),e.isUrlCheckLoading?a("icon-loader-circle",{staticClass:"animate-spin-slow h-4 ml-3 text-theme-base-subtle-contrast w-4"}):e.isUrlChecked&&this.urlInput.length?a("span",{staticClass:"flex flex-row font-normal items-center ml-3",class:{"text-theme-success-contrast":e.isUrlAvailable,"text-theme-danger-contrast":!e.isUrlAvailable}},[e.isUrlAvailable?[a("icon-check",{staticClass:"h-4 mr-1 w-4"}),a("span",[e._v("URL is available")])]:e.isUrlAvailable?e._e():[a("icon-x",{staticClass:"h-4 mr-1 w-4"}),a("span",[e._v("URL is unavailable")])]],2):e._e()],1)]),a("div",{staticClass:"bg-theme-base-subtle h-px my-6"}),a("inline-checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("url.is_enabled"),"input-id":"url_is_enabled","input-name":"url_is_enabled","label-text":"Enabled?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("url.is_enabled")}},model:{value:e.editableUrlData.is_enabled,callback:function(t){e.$set(e.editableUrlData,"is_enabled",t)},expression:"editableUrlData.is_enabled"}}),a("div",{staticClass:"flex flex-col md:flex-row md:mt-2 md:space-x-4"},[a("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("url.published_at"),"input-id":"url_published_at","input-name":"url_published_at","label-text":"Publish Date"},on:{errorHidden:function(t){return e.clearPageErrorMessage("url.published_at")}},model:{value:e.editableUrlData.published_at,callback:function(t){e.$set(e.editableUrlData,"published_at",t)},expression:"editableUrlData.published_at"}}),a("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("url.expired_at"),"input-id":"url_expired_at","input-name":"url_expired_at","label-text":"Expiry Date"},on:{errorHidden:function(t){return e.clearPageErrorMessage("url.expired_at")}},model:{value:e.editableUrlData.expired_at,callback:function(t){e.$set(e.editableUrlData,"expired_at",t)},expression:"editableUrlData.expired_at"}})],1)],1)},f=[],U=o(_,h,f,!1,null,null,null,null);const $=U.exports;export{C as M,$ as U};