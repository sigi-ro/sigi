import{n as e}from"./LogoLight.eaabebeb.js";import"./vendor.21c2b6f5.js";const a={name:"StudentAdminProfileIndex",layout:"student-admin-layout",props:{auth:Object,profile:Object},computed:{showRefundButton(){return!0}},methods:{requestRefund(){}}};var l=function(){var t=this,s=t._self._c;return s("section",{staticClass:"max-w-5xl mx-auto"},[t.userCan("profile.edit")?s("div",{staticClass:"flex flex-row items-center mb-6"},[s("h1",{staticClass:"font-medium mr-auto text-lg"},[t._v(" "+t._s(t.__("messages.my-profile"))+" ")]),s("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center",attrs:{href:t.$route("student.admin.profile.edit")}},[s("icon-edit",{staticClass:"w-5 md:mr-2"}),s("span",{staticClass:"hidden md:inline"},[t._v(" "+t._s(t.__("messages.edit-profile"))+" ")])],1)],1):t._e(),s("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[s("div",{staticClass:"block px-6 w-full"},[s("p",[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" "+t._s(t.__("messages.first-name"))+" ")]),t._v(" "+t._s(t.profile.first_name)+" ")]),s("p",{staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" "+t._s(t.__("messages.last-name"))+" ")]),t._v(" "+t._s(t.profile.last_name)+" ")]),s("p",{staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" Email ")]),t._v(" "+t._s(t.profile.email)+" ")]),s("p",{staticClass:"mt-2"},[t._v(" "+t._s(t.__("messages.request-refund-text"))+" "),s("a",{staticClass:"font-semibold",attrs:{href:"mailto:webmaster@example.com"}},[t._v("info@minducate.us")])])])])])},n=[],i=e(a,l,n,!1,null,null,null,null);const _=i.exports;export{_ as default};
