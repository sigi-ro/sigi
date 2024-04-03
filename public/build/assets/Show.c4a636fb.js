import{_ as i}from"./vendor.21c2b6f5.js";import{n as o}from"./LogoLight.eb2f8316.js";import{a as m,C as p,P as d,V as _,b as g,c as h,F as f,A as y,T as v,d as b}from"./CourseFooter.0f44f3e5.js";import{I as x}from"./InputGroup.548575c6.js";import{T as C}from"./app.1a7ea90d.js";import"./ConfirmationModal.41eb8e05.js";const u={metaInfo(){return{title:this.metaTitle,meta:[{name:"description",vmid:"description",content:this.metaDescription},{name:"keywords",vmid:"keywords",content:this.getMetaField("keywords")},{name:"og:description",vmid:"og:description",content:this.getMetaField("og_description",this.metaDescription)},{name:"og:title",vmid:"og:title",content:this.getMetaField("og_title",this.metaTitle)},{name:"og:image",vmid:"og:image",content:this.getMetaField("og_image")},{name:"og:type",vmid:"og:type",content:this.getMetaField("og_type")},{name:"og:url",vmid:"og:url",content:this.getMetaField("og_url")}]}},props:{page:{required:!0,type:Object}},computed:{content(){try{return this.page.data.content}catch{return null}},layout(){try{return this.page.data.layout}catch{return null}},layoutComponent(){switch(this.layoutSlug){case"basic-layout":return"basic-layout";case"course-layout":return"course-layout"}console.log("No layout found")},layoutSlug(){try{return this.layout.slug}catch{return null}},meta(){try{return this.page.data.metadata}catch{return{}}},metaDescription(){return this.getMetaField("description")},metaTitle(){try{return this.getMetaField("title")?this.getMetaField("title"):this.page.data.name}catch{return""}},template(){try{return this.page.data.template}catch{return null}},templateComponent(){switch(this.templateSlug){case"course-template":case"course-page":return"course-page";case"basic-page":return"basic-page"}console.log("No template found")},templateSlug(){try{return this.template.slug}catch{return null}}},methods:{formatRepeaterFieldData(r){try{let t=[];return i.forEach(r,e=>{let a={};i.forEach(e,s=>{a[s.template_field_slug]={slug:s.template_field_slug,order:s.template_field_order,type:s.template_field_type,data:s.data}}),t.push(a)}),t}catch(t){return console.error("Error parsing repeater data",t),null}},getContentFieldData(r,t=null){try{return this.content[r].data?this.content[r].data:t}catch{return t}},getLayoutFieldData(r,t=null){var e;try{return(e=this.layout)!=null&&e.content[r].data?this.layout.content[r].data:t}catch{return t}},getMetaField(r,t=""){try{return this.meta[r]?this.meta[r]:t}catch{return t}}}},F={name:"BasicLayout",props:{layout:{required:!0,type:Object}},computed:{isStickyHeader(){return!0}}};var D=function(){var t=this,e=t._self._c;return e("div",[e("main",{staticClass:"bg-theme-base min-h-screen",attrs:{id:"basic-layout"}},[e("nav",{staticClass:"bg-white px-4 py-3",class:{"shadow-lg sticky top-0 z-50":t.isStickyHeader}},[e("div",{staticClass:"container flex flex-row items-center justify-between mx-auto"},[e("inertia-link",{staticClass:"font-semibold hover:text-theme-primary-hover",attrs:{href:"/"}},[t._v(" "+t._s(t.__("messages.homepage"))+" ")])],1)]),e("div",{staticClass:"container max-w-screen-lg mx-auto pt-12"},[t._t("default")],2)])])},$=[],w=o(F,D,$,!1,null,null,null,null);const T=w.exports,L={name:"BasicPage",mixins:[u],props:{page:{required:!0,type:Object}},computed:{mainContent(){return this.getContentFieldData("main-content")}}};var M=function(){var t=this,e=t._self._c;return e("main",{staticClass:"bg-theme-base text-theme-base-contrast"},[e("div",{staticClass:"prose",domProps:{innerHTML:t._s(t.mainContent)}})])},S=[],q=o(L,M,S,!1,null,null,null,null);const k=q.exports,P={name:"CourseLayout",props:{page:{required:!0,type:Object},layout:{required:!0,type:Object}},computed:{content(){try{return this.page.data.content}catch{return null}},course(){return this.getContentFieldData("course")},logoUrl(){try{return this.page.data.logo_url}catch{return null}},isStickyHeader(){return!0}},methods:{getContentFieldData(r,t=null){try{return this.content[r].data?this.content[r].data:t}catch{return t}}}};var I=function(){var t=this,e=t._self._c;return e("div",[e("main",{attrs:{id:"course-layout"}},[e("nav",{staticClass:"bg-white px-4 py-3",class:{"shadow-lg sticky top-0 z-50":t.isStickyHeader}},[e("div",{staticClass:"container flex flex-row items-center justify-between mx-auto"},[t.logoUrl?e("inertia-link",{staticClass:"logo",attrs:{href:"/"}},[e("img",{staticClass:"mr-2 w-12",attrs:{src:t.logoUrl}})]):e("inertia-link",{staticClass:"font-semibold hover:text-theme-primary-hover",attrs:{href:"/"}},[t._v(" "+t._s(t.__("messages.homepage"))+" ")]),t.course.status==="PUBLISHED"?e("a",{staticClass:"animate-bg-primary-to-secondary button button-primary font-semibold rounded-full",attrs:{href:"#purchase"}},[t._v(" "+t._s(t.__("messages.sign-up"))+" ")]):e("a",{staticClass:"animate-bg-primary-to-secondary button button-primary font-semibold rounded-full",attrs:{href:"#interest-form"}},[t._v(" "+t._s(t.transWithFallback("messages.register_interest","Register Interest"))+" ")])],1)]),t._t("default")],2)])},O=[],j=o(P,I,O,!1,null,null,null,null);const B=j.exports,H={name:"StandardForm",components:{TextAreaGroup:C,InputGroup:x},props:{buttonClass:{default:"button button-primary ml-auto",type:String},form:{required:!0,type:Object},formClass:{default:"gap-6 grid grid-cols-1",type:String},formDataOverrides:{default:()=>({}),type:Object},titleClass:{default:"font-bold text-lg",type:String},titleOverride:{default:null,type:String|null}},data(){return{error:!1,formData:{},isLoading:!1,successMessage:!1}},computed:{submitButtonText(){let r=this.form.submit_button_text?this.form.submit_button_text:"Submit",t="form.buttons."+this.formatTransKey(r);return this.transWithFallback(t,r)}},created(){i.forEach(this.form.form_fields,r=>{this.$set(this.formData,r.slug,"")}),i.forEach(this.formDataOverrides,(r,t)=>{this.$set(this.formData,t,r)})},methods:{getInputType(r){switch(r.type){case"crm_first_name":case"crm_last_name":case"crm_title":case"crm_telephone":return"text";case"crm_email":return"email";default:return r.type}},submit(){this.isLoading=!0,this.error=!1,axios.post(this.$route("api.form-submission.store",this.form.id),this.formData).then(r=>{var t,e;this.isLoading=!1,this.successMessage=(t=r.data)==null?void 0:t.message,(e=r.data)!=null&&e.redirect_url&&setTimeout(()=>{var a;window.location.href=(a=r.data)==null?void 0:a.redirect_url},1e3)}).catch(r=>{this.isLoading=!1,this.error=this.transWithFallback("messages.form_submission_failed","Failed to submit form. Please try again.")})}}};var R=function(){var t=this,e=t._self._c;return e("section",[t._t("title",function(){return[e("h2",{class:t.titleClass},[t._v(" "+t._s(t.titleOverride?t.titleOverride:t.form.name)+" ")])]}),t.successMessage?e("div",[t._v(" "+t._s(t.successMessage)+" ")]):e("form",{class:t.formClass,on:{submit:function(a){return a.preventDefault(),t.submit.apply(null,arguments)}}},[t._l(t.form.form_fields,function(a){var s,l;return e("div",{key:a.slug},[t.getInputType(a)==="hidden"?e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData[a.slug],expression:"formData[field.slug]"}],attrs:{name:a.slug,type:"hidden"},domProps:{value:t.formData[a.slug]},on:{input:function(n){n.target.composing||t.$set(t.formData,a.slug,n.target.value)}}}):t.getInputType(a)==="text"||t.getInputType(a)==="email"?e("input-group",{attrs:{"input-id":a.slug,"input-name":a.slug,"input-required":a.is_required,"input-type":t.getInputType(a),"label-text":a.name},on:{errorHidden:function(n){return t.clearPageErrorMessage(a.slug)}},model:{value:t.formData[a.slug],callback:function(n){t.$set(t.formData,a.slug,n)},expression:"formData[field.slug]"}}):t.getInputType(a)==="textarea"?e("text-area-group",{attrs:{"input-id":a.slug,"input-max-length":(s=a.settings)==null?void 0:s.max_length,"input-name":a.slug,"input-required":a.is_required,"input-rows":(l=a.settings)==null?void 0:l.rows,"label-text":a.name},on:{errorHidden:function(n){return t.clearPageErrorMessage(a.slug)}},model:{value:t.formData[a.slug],callback:function(n){t.$set(t.formData,a.slug,n)},expression:"formData[field.slug]"}}):t._e()],1)}),t._t("button",function(){return[e("div",{staticClass:"text-right"},[e("button",{class:t.buttonClass,attrs:{disabled:t.isLoading,type:"submit"}},[t._v(" "+t._s(t.submitButtonText)+" ")])])]}),t.error?e("div",{staticClass:"text-theme-danger-contrast"},[t._v(" "+t._s(t.error)+" ")]):t._e()],2)],2)},E=[],A=o(H,R,E,!1,null,null,null,null);const c=A.exports,N={name:"CourseInterestForm",components:{StandardForm:c},props:{course:{required:!0,type:Object},form:{required:!0,type:Object}}};var U=function(){var t=this,e=t._self._c;return e("section",{staticClass:"px-4 py-12",attrs:{id:"interest-form"}},[e("standard-form",{staticClass:"max-w-screen-sm mx-auto",attrs:{form:t.form,"form-data-overrides":{course_name:t.course.name},"title-override":t.transWithFallback("messages.register_interest","Register Interest")}})],1)},W=[],z=o(N,U,W,!1,null,null,null,null);const G=z.exports,K={name:"CourseCallToAction",props:{data:{default:"",required:!1,type:String}}};var J=function(){var t=this,e=t._self._c;return e("section",{staticClass:"bg-gray-100 px-4",staticStyle:{"padding-bottom":"3rem"}},[e("div",{staticClass:"container max-w-screen-lg mx-auto"},[e("div",{staticClass:"max-w-screen-lg"},[e("div",{staticClass:"flex flex-row justify-center"},[e("a",{staticClass:"animate-bg-primary-to-secondary button button-primary flex flex-row justify-center max-w-250px mt-6 rounded-full text-xl w-full",attrs:{href:"#purchase"}},[t._v(" "+t._s(t.__("messages.sign-up"))+" ")])])])])])},Q=[],X=o(K,J,Q,!1,null,null,null,null);const Y=X.exports,Z={name:"CoursePage",mixins:[u],components:{CourseCallToAction:Y,CourseInterestForm:G,StandardForm:c,CourseDescription:m,CourseContent:p,Purchase:d,VideoPreview:_,CourseFeatures:g,CourseHeader:h,Faq:f,AboutAuthor:y,Testimonials:v,CourseFooter:b},props:{page:{required:!0,type:Object}},computed:{course(){return this.getContentFieldData("course")},courseCallToActionText(){return this.getLayoutFieldData("course-call-to-action")},authorBio(){return this.getLayoutFieldData("author-bio")},authorName(){return this.getLayoutFieldData("author-name")},company(){return this.getLayoutFieldData("company")},videoPreviewText(){return this.getLayoutFieldData("video-preview-text")},footerMenu(){return this.getLayoutFieldData("footer-menu")},interestForm(){return this.getLayoutFieldData("course-interest-form")},faqs(){try{return this.formatRepeaterFieldData(this.getLayoutFieldData("global-faqs"))}catch{return null}},testimonials(){try{return this.formatRepeaterFieldData(this.getLayoutFieldData("global-testimonials"))}catch{return null}}},methods:{}};var V=function(){var t=this,e=t._self._c;return e("main",{staticClass:"bg-theme-base text-theme-base-contrast"},[e("course-header",{attrs:{course:t.course}}),e("course-features",{attrs:{course:t.course}}),e("course-content",{attrs:{course:t.course}}),e("course-description",{attrs:{course:t.course}}),e("course-call-to-action",{attrs:{data:t.courseCallToActionText}}),e("faq",{attrs:{faqs:t.faqs}}),e("about-author",{attrs:{bio:t.authorBio,name:t.authorName}}),t.course.status==="PUBLISHED"?e("purchase",{staticClass:"bg-theme-base-subtle",attrs:{course:t.course}}):t.interestForm?e("course-interest-form",{staticClass:"bg-theme-base-subtle",attrs:{course:t.course,form:t.interestForm}}):t._e(),e("testimonials",{attrs:{testimonials:t.testimonials}}),e("course-footer",{attrs:{company:t.company,"footer-menu":t.footerMenu}})],1)},tt=[],et=o(Z,V,tt,!1,null,null,null,null);const rt=et.exports,at={name:"PageShow",mixins:[u],components:{BasicLayout:T,CourseLayout:B,BasicPage:k,CoursePage:rt}};var st=function(){var t=this,e=t._self._c;return t.layoutComponent?e(t.layoutComponent,{tag:"component",attrs:{layout:t.layout,page:t.page}},[t.templateComponent?e(t.templateComponent,{tag:"component",attrs:{layout:t.layout,page:t.page}}):t._e()],1):t._e()},nt=[],ot=o(at,st,nt,!1,null,null,null,null);const dt=ot.exports;export{dt as default};