(this["webpackJsonptheta-upsilon-fundraisers"]=this["webpackJsonptheta-upsilon-fundraisers"]||[]).push([[0],{74:function(e,t,a){"use strict";a.r(t);var A=a(0),n=a.n(A),r=a(12),c=a.n(r),i=a(47),l=a(20),o=a(56),s=a(109),d=a(110),j=a(127),b=a(116),u=a(120),h=a(121),x=a(123),m=a(107),f=a(44),O=a.n(f),g=a(111),v=a(129),p=a(128),P=a(114),Q=a(115),B=a(118),y=a(5),E=a(113),W=a(130),Z=a(117),D=a(119),N=a(122),S=a(125),C=a(2);Number.MAX_SAFE_INTEGER;function T(e){return e.toLocaleString("en-US",{style:"currency",currency:"USD"})}var k=function(){var e=Object(A.useState)(!0),t=Object(l.a)(e,2),a=t[0],n=t[1],r=Object(A.useState)([]),c=Object(l.a)(r,2),u=c[0],h=c[1];Object(A.useEffect)((function(){n(!0),O.a.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vS1gk8NEzkYM4dW211o-knOAufdli-gEoZLaunhkfDrSPCm0iDa4HEo92br6jP7Q0JRkS0i_HB7mK7P/pub?gid=0&single=true&output=csv",{download:!0,header:!0,complete:function(e){var t=e.data;h(t.map((function(e){return{name:e.name,zeta:e.zeta,amount:parseFloat(e.amount.replace("$","")),displayAmount:Boolean(e.displayAmount),date:new Date(e.date)}}))),n(!1)}})}),[]);var x=Object(A.useState)({donationGoal:0,deadline:new Date}),f=Object(l.a)(x,2),B=f[0],y=f[1];Object(A.useEffect)((function(){n(!0),O.a.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vS1gk8NEzkYM4dW211o-knOAufdli-gEoZLaunhkfDrSPCm0iDa4HEo92br6jP7Q0JRkS0i_HB7mK7P/pub?gid=1502649564&single=true&output=csv",{download:!0,header:!0,complete:function(e){var t=e.data;y((function(){var e=t[0];return{donationGoal:parseFloat(e.donationGoal),deadline:new Date(e.deadline)}})),n(!1)}})}),[]);var D=Object(A.useMemo)((function(){var e,t=Number.MAX_SAFE_INTEGER,a=Number.MIN_SAFE_INTEGER,A=Object(i.a)(u);try{for(A.s();!(e=A.n()).done;){var n=e.value;t=Math.min(t,n.amount),a=Math.max(a,n.amount)}}catch(r){A.e(r)}finally{A.f()}return{min:t,max:a}}),[u]);console.log({range:D});var N,S=null===u||void 0===u?void 0:u.reduce((function(e,t){return e+t.amount}),0),k=Object(A.useState)(!1),I=Object(l.a)(k,2),M=I[0],K=I[1],z=Object(A.useState)(!1),G=Object(l.a)(z,2),Y=G[0],L=G[1],H=S/B.donationGoal,R=Object(A.useState)(!1),q=Object(l.a)(R,2),F=q[0],U=q[1],_=Object(A.useState)(!0),$=Object(l.a)(_,2);return $[0],$[1],Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)("div",{style:{margin:20},children:[Object(C.jsx)(m.a,{}),Object(C.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(C.jsx)("img",{src:"data:image/png;base64,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",style:{width:"100%",maxWidth:1e3},alt:"lca logo"}),Object(C.jsx)(o.a,{variant:"h3",children:"Theta Upsilon Zeta"}),Object(C.jsx)(o.a,{variant:"h2",children:"Fall 2023 Ritual at RPI"}),Object(C.jsx)(v.a,{color:"primary",variant:"outlined",onClick:function(){return K(!0)},style:{marginBottom:15},children:"More Info"}),Object(C.jsx)(v.a,{color:"primary",variant:"contained",style:{fontSize:40,marginBottom:20},onClick:function(){return L(!0)},children:"Donate Now"}),Object(C.jsx)(s.a,{style:{marginBottom:20,paddingLeft:30,paddingRight:30},children:Object(C.jsxs)(d.a,{children:[Object(C.jsx)(o.a,{variant:"h4",children:Object(C.jsx)("b",{children:"Time Left"})}),Object(C.jsx)(X,{targetDate:B.deadline})]})}),a?Object(C.jsx)(g.a,{size:48}):Object(C.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(C.jsx)(o.a,{variant:"h1",children:T(S)}),Object(C.jsxs)(o.a,{children:["Raised of ",T(B.donationGoal)]}),Object(C.jsxs)(o.a,{children:["Total Donors: ",null===u||void 0===u?void 0:u.length]}),Object(C.jsx)(W.a,{title:(N=H,parseFloat(String(100*N)).toFixed(2)+"%"),children:Object(C.jsx)(w,{variant:"determinate",value:S/18e3*100,style:{width:"100%",marginTop:20,marginBottom:10}})})]})]}),Object(C.jsx)(o.a,{variant:"h4",gutterBottom:!0,children:"Donations"}),a?Object(C.jsx)(E.a,{style:{marginTop:20}}):Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(V,{donations:u})})]}),Object(C.jsx)(j.a,{display:"flex",flexDirection:"row-reverse",children:Object(C.jsx)("a",{href:"https://docs.google.com/spreadsheets/d/1nKf2fATRcnCPiuv9fD98RQ2oVDt_NVCGFeaGYQEJBZA/edit#gid=0",target:"_blank",rel:"noreferrer",style:{padding:5,textDecoration:"none"},children:"."})}),Object(C.jsx)(J,{showLetter:M,onClose:function(){return K(!1)}}),Object(C.jsxs)(p.a,{open:Y,onClose:function(){return L(!1)},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",fullWidth:!0,children:[Object(C.jsx)(P.a,{id:"alert-dialog-title",children:"Donate"}),Object(C.jsxs)(Q.a,{style:{padding:20},children:[Object(C.jsxs)(b.a,{container:!0,spacing:2,children:[Object(C.jsx)(b.a,{item:!0,xs:12,children:Object(C.jsx)("a",{style:{textDecoration:"none"},href:"https://www.paypal.com/donate?business=lxathuhousecorp%40gmail.com&item_name=Donation&currency_code=USD",target:"_blank",rel:"noreferrer",children:Object(C.jsx)(v.a,{variant:"contained",fullWidth:!0,children:"Paypal"})})}),Object(C.jsx)(b.a,{item:!0,xs:12,children:Object(C.jsx)("a",{style:{textDecoration:"none"},href:"https://venmo.com/Alex-Lawson-6",target:"_blank",rel:"noreferrer",children:Object(C.jsx)(v.a,{variant:"contained",fullWidth:!0,children:"Venmo"})})}),Object(C.jsx)(b.a,{item:!0,xs:12,children:Object(C.jsx)(v.a,{variant:"contained",fullWidth:!0,onClick:function(){return alert("lxathuhousecorp@gmail.com")},children:"Zelle"})}),Object(C.jsx)(b.a,{item:!0,xs:12,children:Object(C.jsx)(v.a,{variant:"contained",fullWidth:!0,onClick:function(){return U((function(e){return!e}))},children:"Cash / Check"})})]}),Object(C.jsxs)(Z.a,{in:F,children:[Object(C.jsx)("div",{style:{height:30}}),Object(C.jsx)(o.a,{variant:"h4",children:"Mailing Information"}),Object(C.jsx)(o.a,{variant:"caption",children:"Please send cash / checks to:"}),Object(C.jsx)("div",{style:{height:10}}),Object(C.jsx)(o.a,{children:"Theta Upsilon of Lambda Chi Alpha"}),Object(C.jsx)(o.a,{children:"91 McGuinness Blvd"}),Object(C.jsx)(o.a,{children:"Apt 3"}),Object(C.jsx)(o.a,{children:"Brooklyn, NY 11222"})]})]})]})]})},X=function(e){var t=e.targetDate,a=Object(A.useState)(void 0),n=Object(l.a)(a,2),r=n[0],c=n[1];function i(){var e=function(e){var t=(Date.parse(String(new Date(e)))-Date.parse(String(new Date)))/1e3;if(t<=0)return null;var a={years:0,days:0,hours:0,min:0,sec:0,millisec:0};return t>=31557600&&(a.years=Math.floor(t/31557600),t-=365.25*a.years*86400),t>=86400&&(a.days=Math.floor(t/86400),t-=86400*a.days),t>=3600&&(a.hours=Math.floor(t/3600),t-=3600*a.hours),t>=60&&(a.min=Math.floor(t/60),t-=60*a.min),a.sec=t,a}(t);c(e)}return Object(A.useEffect)((function(){i();var e=setInterval((function(){i()}),1e3);return function(){clearInterval(e)}}),[]),Object(C.jsxs)(b.a,{container:!0,spacing:4,children:[Object(C.jsxs)(b.a,{item:!0,xs:3,style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(C.jsx)(o.a,{variant:"h3",children:null===r||void 0===r?void 0:r.days}),Object(C.jsx)(o.a,{children:"Days"})]}),Object(C.jsxs)(b.a,{item:!0,xs:3,style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(C.jsx)(o.a,{variant:"h3",children:null===r||void 0===r?void 0:r.hours}),Object(C.jsx)(o.a,{children:"Hours"})]}),Object(C.jsxs)(b.a,{item:!0,xs:3,style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(C.jsx)(o.a,{variant:"h3",children:null===r||void 0===r?void 0:r.min}),Object(C.jsx)(o.a,{children:"Minutes"})]}),Object(C.jsxs)(b.a,{item:!0,xs:3,style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(C.jsx)(o.a,{variant:"h3",children:null===r||void 0===r?void 0:r.sec}),Object(C.jsx)(o.a,{children:"Seconds"})]})]})},w=Object(y.a)((function(e){return{root:{height:10,borderRadius:5},colorPrimary:{backgroundColor:e.palette.grey["light"===e.palette.type?200:700]},bar:{borderRadius:5,backgroundColor:"#1a90ff"}}}))(E.a),J=function(e){var t=e.showLetter,a=e.onClose;return Object(C.jsxs)(p.a,{open:t,onClose:a,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",fullWidth:!0,maxWidth:"lg",children:[Object(C.jsx)(P.a,{id:"alert-dialog-title",children:"A Letter from the Actives"}),Object(C.jsx)(Q.a,{children:Object(C.jsx)(B.a,{id:"alert-dialog-description",children:Object(C.jsx)("p",{children:"Dear Alumni of Lambda Chi Alpha, Theta Upsilon Zeta,"})})})]})},V=function(e){var t=e.donations;return Object(C.jsx)(s.a,{style:{height:"100%"},children:Object(C.jsx)(d.a,{children:Object(C.jsxs)(D.a,{children:[Object(C.jsx)(u.a,{children:Object(C.jsxs)(h.a,{children:[Object(C.jsx)(N.a,{children:"Date"}),Object(C.jsx)(N.a,{children:"Name"}),Object(C.jsx)(N.a,{children:"Zeta"}),Object(C.jsx)(N.a,{children:"Amount"})]})}),Object(C.jsx)(x.a,{children:t.sort((function(e,t){return t.date.getTime()-e.date.getTime()})).map((function(e){var t=e.date,a=e.name,A=e.zeta,n=e.amount,r=e.displayAmount;return Object(C.jsxs)(h.a,{children:[Object(C.jsx)(N.a,{children:Object(S.a)(t,"P")}),Object(C.jsx)(N.a,{children:a}),Object(C.jsx)(N.a,{children:A}),Object(C.jsx)(N.a,{children:r?"$".concat(n):""})]},a)}))})]})})})},I=a(53),M=a(131),K=a(124),z=Object(I.a)();z=Object(M.a)(z),c.a.render(Object(C.jsx)(n.a.StrictMode,{children:Object(C.jsx)(K.a,{theme:z,children:Object(C.jsx)(k,{})})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.6a6158d9.chunk.js.map