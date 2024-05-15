import{_ as n}from"./vendor.21c2b6f5.js";import{I as r}from"./InputGroup.d82ecd1f.js";import{S as u}from"./app.06a4f968.js";import{n as o,aD as c}from"./LogoLight.eaabebeb.js";import{C as m}from"./ConfirmationModal.caf623a6.js";const p={name:"ColorsSetting",components:{ConfirmationModal:m,InputGroup:r,IconPlus:c},model:{prop:"settingValue"},props:{colors:{required:!0,type:Object},defaultColors:{required:!0,type:Object},settingValue:{default:{},type:String|Object},title:{default:"Colours",type:String}},data(){return{formattedSettingValue:{},showColors:!0,showResetDefaultsModal:!1}},mounted(){this.initialise()},methods:{cancelResetDefaults(){this.showResetDefaultsModal=!1},checkResetDefaults(){this.showResetDefaultsModal=!0},confirmResetDefaults(){this.setDefaults(),this.showResetDefaultsModal=!1},initialise(){try{this.setDefaults();let a={};typeof this.settingValue=="string"?a=JSON.parse(this.settingValue):a=n.cloneDeep(this.settingValue),n.forEach(this.formattedSettingValue,(t,e)=>{a.hasOwnProperty(e)&&this.$set(this.formattedSettingValue,e,a[e])})}catch{}this.onUpdate()},setDefaults(){n.forEach(this.defaultColors,(a,t)=>{this.$set(this.formattedSettingValue,t,a)})},onUpdate(){this.$emit("input",this.formattedSettingValue)},toggleColors(){this.showColors=!this.showColors}}};var d=function(){var t=this,e=t._self._c;return e("section",{staticClass:"overflow-hidden relative"},[e("div",{staticClass:"bg-white flex flex-row justify-between relative z-10"},[e("h2",{staticClass:"font-medium mb-2 text-theme-base-contrast tracking-wider"},[t._v(" "+t._s(t.title)+" "),e("span",{staticClass:"cursor-pointer text-sm text-theme-primary ease-in-out duration-300 transition-colors hover:text-theme-primary-hover",on:{click:t.checkResetDefaults}},[t._v(" (Reset) ")])]),e("div",{staticClass:"cursor-pointer ease-in-out duration-300 transition-colors hover:text-primary",on:{click:t.toggleColors}},[e(t.showColors?"icon-minus":"icon-plus",{tag:"component",staticClass:"w-3"})],1)]),e("transition",{attrs:{name:"slide-down"}},[t.showColors?e("div",{staticClass:"gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"},t._l(t.colors,function(i,s){return e("div",{key:s},[e("input-group",{key:s,staticClass:"mt-2",attrs:{"input-autocomplete":"off","input-class":"input-group-input h-10","input-id":`color-${s}`,"input-name":`color-${s}`,"input-type":"color","label-text":i},model:{value:t.formattedSettingValue[s],callback:function(l){t.$set(t.formattedSettingValue,s,l)},expression:"formattedSettingValue[colorKey]"}})],1)}),0):t._e()]),e("confirmation-modal",{attrs:{"confirm-text":t.__("messages.confirm"),"cancel-text":t.__("messages.cancel"),"message-title":t.__("messages.are-you-sure")+"?","show-modal":t.showResetDefaultsModal,"message-text":t.__("messages.color-reset-confirm")},on:{cancelAction:t.cancelResetDefaults,closeModal:t.cancelResetDefaults,confirmAction:t.confirmResetDefaults}})],1)},f=[],h=o(p,d,f,!1,null,null,null,null);const g=h.exports,S={name:"MailerSetting",components:{ConfirmationModal:m,SelectGroup:u,InputGroup:r,IconPlus:c},model:{prop:"settingValue"},props:{mailers:{required:!0,type:Object},mailerSettingKeys:{required:!0,type:Object},mailerSettingLabels:{required:!0,type:Object},mailerSettingTypes:{required:!0,type:Object},settingValue:{default:{},type:String|Object},title:{default:"Mailer",type:String}},data(){return{formattedSettingValue:{},initialised:!1,isSendingTestMail:!1,showSendTestMailModal:!1,testMailRecipient:""}},computed:{isSettingValueSet(){try{return!!Object.keys(this.formattedSettingValue).length}catch{return!1}}},mounted(){this.initialise()},methods:{cancelSendTestMail(){this.showSendTestMailModal=!1},formatSetting(){if(!this.isSettingValueSet||this.formattedSettingValue.mailer===""){this.formattedSettingValue={},this.$set(this.formattedSettingValue,"mailer","");return}let a={mailer:this.formattedSettingValue.mailer};n.forEach(this.mailerSettingKeys[a.mailer],t=>{var e;a[t]=(e=this.formattedSettingValue[t])!=null?e:""}),this.formattedSettingValue=n.cloneDeep(a)},getInputType(a){try{return this.mailerSettingTypes.hasOwnProperty(a)?this.mailerSettingTypes[a]:"text"}catch{return"text"}},initialise(){try{this.formattedSettingValue=n.cloneDeep(this.settingValue),this.formatSetting(),this.$emit("input",this.formattedSettingValue),this.testMailRecipient=this.$page.props.auth.user.email,this.initialised=!0}catch{}},onUpdate(){this.formatSetting(),this.$emit("input",this.formattedSettingValue)},onUpdateMailer(){let a={mailer:this.formattedSettingValue.mailer};this.mailerSettingKeys.hasOwnProperty(a.mailer)&&n.forEach(this.mailerSettingKeys[a.mailer],t=>{this.$set(a,t,"")}),this.formattedSettingValue=n.cloneDeep(a),this.$emit("input",this.formattedSettingValue)},sendTestMail(){this.isSendingTestMail=!0;let a=n.cloneDeep(this.formattedSettingValue);a.recipient=this.testMailRecipient,axios.post(this.$route("admin.api.settings.mailer-test"),a).then(t=>{this.$successToast("Test mail sent to "+this.testMailRecipient)}).catch(t=>{let e="Failed to send test mail";t&&t.response&&t.response.data&&t.response.data.message&&(e+=" - "+t.response.data.message),this.$errorToast(e)}).finally(()=>{this.isSendingTestMail=!1,this.showSendTestMailModal=!1})},toggleShowSendTestMailModal(){if(this.showSendTestMailModal){this.showSendTestMailModal=!1;return}this.testMailRecipient&&this.testMailRecipient.length&&(this.showSendTestMailModal=!0)}}};var _=function(){var t=this,e=t._self._c;return e("section",{staticClass:"overflow-hidden relative"},[e("hr",{staticClass:"mb-4 mt-4"}),e("h2",{staticClass:"font-medium mb-4 text-theme-base-contrast tracking-wider"},[t._v(" "+t._s(t.title)+" ")]),e("div",{staticClass:"flex flex-col space-y-2"},[t._l(t.formattedSettingValue,function(i,s){return e("div",{key:`${t.formattedSettingValue.mailer}-${s}`},[s==="mailer"?e("select-group",{attrs:{"input-any-option-enabled":!0,"input-any-option-label":"Please Select","input-options":t.mailers,"label-text":"Mailer","input-name":"mailer","input-id":"mailer"},on:{input:t.onUpdateMailer},model:{value:t.formattedSettingValue[s],callback:function(l){t.$set(t.formattedSettingValue,s,l)},expression:"formattedSettingValue[settingKey]"}}):e("input-group",{attrs:{"label-text":t.mailerSettingLabels[s],"input-autocomplete":s,"input-name":s,"input-id":s,"input-type":t.getInputType(s)},on:{input:t.onUpdate},model:{value:t.formattedSettingValue[s],callback:function(l){t.$set(t.formattedSettingValue,s,l)},expression:"formattedSettingValue[settingKey]"}})],1)}),e("div",[e("input-group",{staticClass:"mt-4",attrs:{"label-text":"Test Mail Recipient","input-name":"test_mail_recipient","input-id":"test_mail_recipient","input-wrapper-class":"flex flex-row items-center space-x-3"},scopedSlots:t._u([{key:"inputAppend",fn:function(){return[e("button",{staticClass:"button button-primary button-outline",attrs:{type:"button",disabled:!t.testMailRecipient.length},on:{click:function(i){return i.stopPropagation(),t.toggleShowSendTestMailModal.apply(null,arguments)}}},[t._v(" Test ")])]},proxy:!0}]),model:{value:t.testMailRecipient,callback:function(i){t.testMailRecipient=i},expression:"testMailRecipient"}})],1)],2),e("confirmation-modal",{attrs:{"confirm-text":"Send","confirm-type":"success","show-modal":t.showSendTestMailModal,"message-text":`Please confirm that you want to send a test email to ${t.testMailRecipient} with the updated mail settings?`},on:{cancelAction:t.cancelSendTestMail,closeModal:t.cancelSendTestMail,confirmAction:t.sendTestMail}})],1)},b=[],M=o(S,_,b,!1,null,null,null,null);const v=M.exports,x={name:"AdminSettingEdit",components:{MailerSetting:v,ColorsSetting:g,SelectGroup:u,InputGroup:r},layout:"admin-layout",props:{settings:{required:!0,type:Object},settingsGroup:{required:!0,type:String},settingsName:{required:!0,type:String}},data(){return{formData:{}}},created(){n.forEach(this.settings,(a,t)=>{let e=a.value===null?"":a.value;typeof e=="object"&&(e=n.cloneDeep(e)),this.$set(this.formData,t,e)})},methods:{submit(){let a={};n.forEach(this.formData,(t,e)=>{t.trim===""&&(t=null),a[e]=t}),this.$inertia.put(this.$route("admin.settings.update",this.settingsGroup),a,{onSuccess:()=>{window.location.reload()}})}}};var w=function(){var t=this,e=t._self._c;return e("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(i){return i.preventDefault(),t.submit.apply(null,arguments)}}},[t.userCan("settings.edit")?e("div",{staticClass:"flex flex-row items-center mb-6"},[e("h1",{staticClass:"font-medium mr-auto text-lg"},[t._v(" "+t._s(t.__("settings.edit",{setting:t.settingsName}))+" ")]),e("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[e("icon-save",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" "+t._s(t.__("form.buttons.save"))+" ")])],1)]):t._e(),e("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[e("div",{staticClass:"block -mt-4 px-6 w-full"},[t._l(t.settings,function(i,s){return[i.type==="select"?e("select-group",{key:s,staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage(s),"input-autocomplete":"off","input-id":s,"input-name":s,"input-type":i.type,"label-text":i.label,"input-options":i.options},on:{errorHidden:function(l){return t.clearPageErrorMessage(s)}},model:{value:t.formData[s],callback:function(l){t.$set(t.formData,s,l)},expression:"formData[key]"}}):i.type==="colors"?e("colors-setting",{staticClass:"mt-4",attrs:{colors:i.colors,"default-colors":i.defaultColors,title:i.label},model:{value:t.formData[s],callback:function(l){t.$set(t.formData,s,l)},expression:"formData[key]"}}):i.type==="mailer"?e("mailer-setting",{staticClass:"mt-4",attrs:{colors:i.colors,mailers:i.mailers,"mailer-setting-keys":i.mailerSettingKeys,"mailer-setting-labels":i.mailerSettingLabels,"mailer-setting-types":i.mailerSettingTypes,title:i.label},model:{value:t.formData[s],callback:function(l){t.$set(t.formData,s,l)},expression:"formData[key]"}}):e("input-group",{key:s,staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage(s),"input-autocomplete":"off","input-id":s,"input-name":s,"input-type":i.type,"label-text":i.label},on:{errorHidden:function(l){return t.clearPageErrorMessage(s)}},model:{value:t.formData[s],callback:function(l){t.$set(t.formData,s,l)},expression:"formData[key]"}})]})],2)])])},C=[],y=o(x,w,C,!1,null,null,null,null);const O=y.exports;export{O as default};
