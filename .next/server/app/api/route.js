"use strict";(()=>{var e={};e.id=755,e.ids=[755],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2361:e=>{e.exports=require("events")},7147:e=>{e.exports=require("fs")},1808:e=>{e.exports=require("net")},2781:e=>{e.exports=require("stream")},9512:e=>{e.exports=require("timers")},4404:e=>{e.exports=require("tls")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},7073:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>f,originalPathname:()=>x,patchFetch:()=>v,requestAsyncStorage:()=>l,routeModule:()=>p,serverHooks:()=>g,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>m});var s={};t.r(s),t.d(s,{GET:()=>d,POST:()=>c});var o=t(5419),n=t(9108),i=t(9678);t(4610);var u=t(424),a=t(8070);async function d(e,r){return a.Z.json({name:"Hello World"},{status:200})}async function c(e,r){return a.Z.json(u.Z.prototype.body.getReader.prototype,{status:201})}let p=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/route",pathname:"/api",filename:"route",bundlePath:"app/api/route"},resolvedPagePath:"/Users/test/Documents/PyaePhyoSwe/Student-Projects/convenience-store/src/app/api/route.js",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:h,serverHooks:g,headerHooks:f,staticGenerationBailout:m}=p,x="/api/route";function v(){return(0,i.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:h})}},8397:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{PageSignatureError:function(){return t},RemovedPageError:function(){return s},RemovedUAError:function(){return o}});class t extends Error{constructor({page:e}){super(`The middleware "${e}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `)}}class s extends Error{constructor(){super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `)}}class o extends Error{constructor(){super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `)}}},424:(e,r,t)=>{Object.defineProperty(r,"Z",{enumerable:!0,get:function(){return s.NextRequest}});let s=t(1868)},1868:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{INTERNALS:function(){return u},NextRequest:function(){return a}});let s=t(514),o=t(8670),n=t(8397),i=t(3608),u=Symbol("internal request");class a extends Request{constructor(e,r={}){let t="string"!=typeof e&&"url"in e?e.url:String(e);(0,o.validateURL)(t),e instanceof Request?super(e,r):super(t,r);let n=new s.NextURL(t,{headers:(0,o.toNodeOutgoingHttpHeaders)(this.headers),nextConfig:r.nextConfig});this[u]={cookies:new i.RequestCookies(this.headers),geo:r.geo||{},ip:r.ip,nextUrl:n,url:n.toString()}}[Symbol.for("edge-runtime.inspect.custom")](){return{cookies:this.cookies,geo:this.geo,ip:this.ip,nextUrl:this.nextUrl,url:this.url,bodyUsed:this.bodyUsed,cache:this.cache,credentials:this.credentials,destination:this.destination,headers:Object.fromEntries(this.headers),integrity:this.integrity,keepalive:this.keepalive,method:this.method,mode:this.mode,redirect:this.redirect,referrer:this.referrer,referrerPolicy:this.referrerPolicy,signal:this.signal}}get cookies(){return this[u].cookies}get geo(){return this[u].geo}get ip(){return this[u].ip}get nextUrl(){return this[u].nextUrl}get page(){throw new n.RemovedPageError}get ua(){throw new n.RemovedUAError}get url(){return this[u].url}}}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,495],()=>t(7073));module.exports=s})();