import{n as e}from"./LogoLight.eaabebeb.js";import"./vendor.21c2b6f5.js";const a={name:"AdminProfileIndex",layout:"admin-layout",props:{auth:Object,profile:Object}};var l=function(){var t=this,s=t._self._c;return s("section",{staticClass:"max-w-5xl mx-auto"},[t.userCan("profile.edit")?s("div",{staticClass:"flex flex-row items-center mb-6"},[s("h1",{staticClass:"font-medium mr-auto text-lg"},[t._v(" My Profile ")]),s("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center",attrs:{href:t.$route("landlord.admin.profile.edit")}},[s("icon-edit",{staticClass:"w-5 md:mr-2"}),s("span",{staticClass:"hidden md:inline"},[t._v(" Edit Profile ")])],1)],1):t._e(),s("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[s("div",{staticClass:"block px-6 w-full"},[s("p",[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" First Name ")]),t._v(" "+t._s(t.profile.first_name)+" ")]),s("p",{staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" Last Name ")]),t._v(" "+t._s(t.profile.last_name)+" ")]),s("p",{staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" Email ")]),t._v(" "+t._s(t.profile.email)+" ")])])])])},i=[],n=e(a,l,i,!1,null,null,null,null);const c=n.exports;export{c as default};
