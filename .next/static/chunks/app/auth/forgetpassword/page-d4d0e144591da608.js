(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[35],{6531:function(e,r,t){"use strict";var n=t(6314);r.Z=void 0;var o=n(t(984)),a=t(7437),s=(0,o.default)((0,a.jsx)("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"}),"LockOutlined");r.Z=s},984:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n.createSvgIcon}});var n=t(2557)},2557:function(e,r,t){"use strict";t.r(r),t.d(r,{capitalize:function(){return o.Z},createChainedFunction:function(){return a},createSvgIcon:function(){return s.Z},debounce:function(){return i.Z},deprecatedPropType:function(){return u},isMuiElement:function(){return c.Z},ownerDocument:function(){return l.Z},ownerWindow:function(){return d.Z},requirePropFactory:function(){return f},setRef:function(){return m},unstable_ClassNameGenerator:function(){return w},unstable_useEnhancedEffect:function(){return p.Z},unstable_useId:function(){return h},unsupportedProp:function(){return v},useControlled:function(){return Z.Z},useEventCallback:function(){return g.Z},useForkRef:function(){return x.Z},useIsFocusVisible:function(){return b.Z}});var n=t(5097),o=t(8702),a=t(2940).Z,s=t(9782),i=t(494),u=function(e,r){return()=>null},c=t(673),l=t(3931),d=t(6649);t(3428);var f=function(e,r){return()=>null},m=t(3406).Z,p=t(8519),h=t(3449).Z,v=function(e,r,t,n,o){return null},Z=t(8496),g=t(96),x=t(7663),b=t(3308);let w={configure:e=>{n.Z.configure(e)}}},2027:function(e,r,t){Promise.resolve().then(t.bind(t,5722))},5722:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return z}});var n=t(7437),o=t(2265),a=t(791),s=t(3428),i=t(7042),u=t(5600),c=t(5843),l=t(7927),d=(0,t(9782).Z)((0,n.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),f=t(6520),m=t(5702);function p(e){return(0,m.Z)("MuiAvatar",e)}(0,f.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);let h=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],v=e=>{let{classes:r,variant:t,colorDefault:n}=e;return(0,u.Z)({root:["root",t,n&&"colorDefault"],img:["img"],fallback:["fallback"]},p,r)},Z=(0,c.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.root,r[t.variant],t.colorDefault&&r.colorDefault]}})(({theme:e,ownerState:r})=>(0,s.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===r.variant&&{borderRadius:(e.vars||e).shape.borderRadius},"square"===r.variant&&{borderRadius:0},r.colorDefault&&(0,s.Z)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[600]}))),g=(0,c.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,r)=>r.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),x=(0,c.ZP)(d,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,r)=>r.fallback})({width:"75%",height:"75%"}),b=o.forwardRef(function(e,r){let t=(0,l.Z)({props:e,name:"MuiAvatar"}),{alt:u,children:c,className:d,component:f="div",imgProps:m,sizes:p,src:b,srcSet:w,variant:y="circular"}=t,j=(0,a.Z)(t,h),P=null,k=function({crossOrigin:e,referrerPolicy:r,src:t,srcSet:n}){let[a,s]=o.useState(!1);return o.useEffect(()=>{if(!t&&!n)return;s(!1);let o=!0,a=new Image;return a.onload=()=>{o&&s("loaded")},a.onerror=()=>{o&&s("error")},a.crossOrigin=e,a.referrerPolicy=r,a.src=t,n&&(a.srcset=n),()=>{o=!1}},[e,r,t,n]),a}((0,s.Z)({},m,{src:b,srcSet:w})),F=b||w,C=F&&"error"!==k,S=(0,s.Z)({},t,{colorDefault:!C,component:f,variant:y}),_=v(S);return P=C?(0,n.jsx)(g,(0,s.Z)({alt:u,srcSet:w,src:b,sizes:p,ownerState:S,className:_.img},m)):null!=c?c:F&&u?u[0]:(0,n.jsx)(x,{ownerState:S,className:_.fallback}),(0,n.jsx)(Z,(0,s.Z)({as:f,ownerState:S,className:(0,i.Z)(_.root,d),ref:r},j,{children:P}))});var w=t(9050),y=t(3857),j=t(6041),P=t(5210),k=t(9872),F=t(9245),C=t(8874),S=t(6531),_=t(3226),M=t(3948),R=t(8835),D=t(9721);function z(){return(0,n.jsx)(M.Z,{theme:R.Z,children:(0,n.jsxs)(C.ZP,{container:!0,component:"main",sx:{height:"100vh"},children:[(0,n.jsx)(y.ZP,{}),(0,n.jsx)(C.ZP,{item:!0,xs:!1,sm:4,md:7,sx:{backgroundImage:"url(https://source.unsplash.com/random?wallpapers)",backgroundRepeat:"no-repeat",backgroundColor:e=>"light"===e.palette.mode?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover",backgroundPosition:"center"}}),(0,n.jsx)(C.ZP,{item:!0,xs:12,sm:8,md:5,component:k.Z,elevation:6,square:!0,children:(0,n.jsxs)(F.Z,{sx:{my:8,mx:4,display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,n.jsx)(b,{sx:{m:1,bgcolor:"primary.main"},children:(0,n.jsx)(S.Z,{})}),(0,n.jsx)(_.Z,{component:"h1",variant:"h5",children:"Update Password"}),(0,n.jsxs)(F.Z,{component:"form",noValidate:!0,onSubmit:e=>{e.preventDefault();let r=new FormData(e.currentTarget);console.log({password:r.get("password"),password:r.get("password")})},sx:{mt:1},children:[(0,n.jsx)(j.Z,{margin:"normal",required:!0,fullWidth:!0,id:"newpassword",label:"New Password",name:"newpassword",autoComplete:"password",autoFocus:!0}),(0,n.jsx)(j.Z,{margin:"normal",required:!0,fullWidth:!0,name:"confirmpassword",label:"Confirm Password",type:"password",id:"confirmpassword",autoComplete:"current-password"}),(0,n.jsx)(w.Z,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Update Password"}),(0,n.jsx)(C.ZP,{container:!0,children:(0,n.jsx)(C.ZP,{item:!0,xs:!0,children:(0,n.jsx)(P.Z,{href:"#",variant:"body2",children:"Forgot password?"})})}),(0,n.jsx)(D.Z,{})]})]})})]})})}},9721:function(e,r,t){"use strict";var n=t(7437),o=t(3226);r.Z=function(e){return(0,n.jsxs)(o.Z,{variant:"body2",color:"text.secondary",align:"center",...e,sx:{mt:5},children:["Copyright \xa9 ","Hnin-Convenience-Store",new Date().getFullYear(),"."]})}},8835:function(e,r,t){"use strict";let n=(0,t(8595).Z)({palette:{primary:{main:"#a890be",contrastText:"#fff"},secondary:{main:"#3688D4"},accent:{main:"#ECF6FF"},text:{main:"#fff"},success:{main:"#008080"},warning:{main:"#FFA700"}}});r.Z=n},6314:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}},function(e){e.O(0,[869,5,971,938,744],function(){return e(e.s=2027)}),_N_E=e.O()}]);