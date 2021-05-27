(this["webpackJsonpit-guidelines"]=this["webpackJsonpit-guidelines"]||[]).push([[0],{30:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var i,l,a,s=t(2),r=t.n(s),c=t(19),o=t.n(c),b=(t(30),t(4)),u=t(1),d=t(24),j=t(13),O=t(0),p=Object(O.c)(i||(i=Object(j.a)(["\n  from, 8%, 12%, to {\n    fill: black;\n  }\n  10% {\n    fill: transparent;\n  }\n  "]))),f=Object(O.c)(l||(l=Object(j.a)(["\n  from, 8%, 12%, 16%, 20%, 30%, 50%, to  {\n    transform: translate(0, 0);\n    fill: black;\n  }\n  10%, 18% {\n    fill: transparent;\n  }\n  35%, 45% {\n    transform: translate(0, -15px)\n  }\n"]))),m=Object(O.c)(a||(a=Object(j.a)(["\n  from, 8%, 12%, 30%, 70%, 88%, 92%, to  {\n    transform: translate(0, 0);\n    fill: black;\n  }\n  10%, 90% {\n    fill: transparent;\n  }\n  35%, 65% {\n    transform: translate(-8px, -8px)\n  }\n  "]))),g=Object(O.a)("width:10vh;.pupil{animation:",p," 3s ease infinite;transition:translate;}&.rolleye{.pupil{animation:",f," 5s ease-in-out infinite;}}&.focus{.pupil{animation:",m," 5s ease-in-out infinite;}}","");function y(e){var n=e.variant;return Object(O.b)("svg",{className:n,css:g,viewBox:"0 0 91 248",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Object(O.b)("path",{d:"M31 104C31 104 31 128.5 31 156C31 183.5 66 184 66 156C66 128 66 84.5 66 40C66 -4.5 19 -9.5 19 40C19 89.5 19 151 19 199C19 247 78 248 78 199C78 150 78 104 78 104",stroke:"#A7A7A7",strokeWidth:"8"}),Object(O.b)("circle",{className:"eye",cx:"20",cy:"74",r:"19.5",fill:"url(#paint0_linear)",stroke:"black"}),Object(O.b)("circle",{className:"pupil",cx:"19.5",cy:"73.5",r:"4.5",fill:"black"}),Object(O.b)("circle",{className:"eye",cx:"71",cy:"74",r:"19.5",fill:"url(#paint1_linear)",stroke:"black"}),Object(O.b)("circle",{className:"pupil",cx:"70.5",cy:"73.5",r:"4.5",fill:"black"}),Object(O.b)("defs",null,Object(O.b)("linearGradient",{id:"paint0_linear",x1:"11.5",y1:"65",x2:"29",y2:"94",gradientUnits:"userSpaceOnUse"},Object(O.b)("stop",{stopColor:"#F2F2F2"}),Object(O.b)("stop",{offset:"1",stopColor:"#CECECE"})),Object(O.b)("linearGradient",{id:"paint1_linear",x1:"62.5",y1:"65",x2:"80",y2:"94",gradientUnits:"userSpaceOnUse"},Object(O.b)("stop",{stopColor:"#F2F2F2"}),Object(O.b)("stop",{offset:"1",stopColor:"#CECECE"}))))}var h=Object(b.a)("div",{target:"e6rof6s2"})({name:"286f0x",styles:"background:url(\"data:image/svg+xml,<svg width='779' height='468' viewBox='0 0 779 468' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='389.5' cy='234' rx='389.5' ry='234' fill='rgb(255,255,255)' fill-opacity='0.1'/></svg>\");background-size:contain;background-repeat:no-repeat;background-position:center;display:flex;flex-direction:column;height:100%;justify-content:space-evenly;max-width:800px;margin:0 auto"}),w=Object(b.a)("div",{target:"e6rof6s1"})({name:"1amegwm",styles:"background-color:white;border-radius:1em;box-shadow:.5em .5em 2em rgba(0,0,0,0.25);color:black;padding:1em;margin-bottom:2em;width:80%"}),v=Object(b.a)("div",{target:"e6rof6s0"})({name:"2qga7i",styles:"text-align:right"});function k(e){var n=e.children,t=e.variant;return Object(O.b)(h,null,Object(O.b)(w,null,n),Object(O.b)(v,null,Object(O.b)(y,{variant:t})))}var N=t(40);var x=Object(b.a)("main",{target:"ex80j703"})({name:"c8ln7q",styles:"padding:1rem;flex-grow:1"}),C=Object(b.a)("section",{target:"ex80j702"})("display:",(function(e){return e.show?"block":"none"}),";"),T=Object(b.a)("div",{target:"ex80j701"})({name:"1mta8nl",styles:"margin-top:1.5em;display:flex"}),A=Object(b.a)("button",{target:"ex80j700"})({name:"9uj0eb",styles:"font-size:1em;padding:.5em;text-align:center;min-width:5em;background-color:#DDD;border-radius:5px;border:none;&:hover{background-color:#EEE;}&+&{margin-left:1em;}"}),S=function(){return{currentSlide:"projectPhase",clippyVariant:"focus"}};function D(){var e=Object(s.useState)(S),n=Object(d.a)(e,2),t=n[0],i=n[1],l=Object(N.a)().t,a=function(e){return t.currentSlide===e};return Object(O.b)(x,null,Object(O.b)("h1",null,"Neues Projekt"),Object(O.b)(k,{variant:t.clippyVariant},Object(O.b)(C,{show:a("projectPhase")},Object(O.b)("p",null,l("slides.projectPhase.question")),Object(O.b)(T,null,Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"targetAudience",projectPhase:"idea"})}))}},l("slides.projectPhase.answers.idea")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"targetAudience",projectPhase:"implementation"})}))}},l("slides.projectPhase.answers.implementation")))),Object(O.b)(C,{show:a("targetAudience")},Object(O.b)("p",null,l("slides.targetAudience.question")),Object(O.b)(T,null,Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"toolType",targetAudience:"bundesebene"})}))}},l("slides.targetAudience.answers.bundesebene")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"toolType",targetAudience:"canton"})}))}},l("slides.targetAudience.answers.canton")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"toolType",targetAudience:"external"})}))}},l("slides.targetAudience.answers.external")))),Object(O.b)(C,{show:a("toolType")},Object(O.b)("p",null,l("slides.toolType.question")),Object(O.b)(T,null,Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"sensitiveData",toolType:"dataProcessing"})}))}},l("slides.toolType.answers.dataProcessing")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"sensitiveData",toolType:"contentOnly"})}))}},l("slides.toolType.answers.contentOnly")))),Object(O.b)(C,{show:a("sensitiveData")},Object(O.b)("p",null,l("slides.sensitiveData.question")),Object(O.b)(T,null,Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"loginNeeded",sensitiveData:"yes"})}))}},l("slides.sensitiveData.answers.yes")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"loginNeeded",sensitiveData:"no"})}))}},l("slides.sensitiveData.answers.no")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"loginNeeded",sensitiveData:"maybe"})}))}},l("slides.sensitiveData.answers.maybe")))),Object(O.b)(C,{show:a("loginNeeded")},Object(O.b)("p",null,l("slides.loginNeeded.question")),Object(O.b)(T,null,Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"apiNeeded",loginNeeded:"yes"})}))}},l("slides.loginNeeded.answers.yes")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"apiNeeded",loginNeeded:"no"})}))}},l("slides.loginNeeded.answers.no")))),Object(O.b)(C,{show:a("apiNeeded")},Object(O.b)("p",null,l("slides.apiNeeded.question")),Object(O.b)(T,null,Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"similarToolAvailable",apiNeeded:"midata"})}))}},l("slides.apiNeeded.answers.midata")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"similarToolAvailable",apiNeeded:"other"})}))}},l("slides.apiNeeded.answers.other")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"similarToolAvailable",apiNeeded:"no"})}))}},l("slides.apiNeeded.answers.no")))),Object(O.b)(C,{show:a("similarToolAvailable")},Object(O.b)("p",null,l("slides.similarToolAvailable.question")),Object(O.b)(T,null,Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"responsibility",similarToolAvailable:"yes"})}))}},l("slides.similarToolAvailable.answers.yes")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"responsibility",similarToolAvailable:"no"})}))}},l("slides.similarToolAvailable.answers.no")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"responsibility",similarToolAvailable:"maybe"})}))}},l("slides.similarToolAvailable.answers.maybe")))),Object(O.b)(C,{show:a("responsibility")},Object(O.b)("p",null,l("slides.responsibility.question")),Object(O.b)(T,null,Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"evaluation",responsibility:"yes"})}))}},l("slides.responsibility.answers.yes")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"evaluation",responsibility:"no"})}))}},l("slides.responsibility.answers.no")),Object(O.b)(A,{onClick:function(){return i((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentSlide:"evaluation",responsibility:"maybe"})}))}},l("slides.responsibility.answers.maybe")))),Object(O.b)(C,{show:a("evaluation")},Object(O.b)("p",null,l("slides.evaluation.text")),Object(O.b)("code",null,JSON.stringify(t)),Object(O.b)("h2",null,"ToDo"),Object(O.b)("ul",null,Object(O.b)("li",null,"Kontakt aufnehmen mit der ITKom"),"yes"!==t.responsibility&&Object(O.b)("li",null,"Verantwortliche Person definieren"),"midata"===t.apiNeeded&&Object(O.b)("li",null,"Definieren welche Daten von der MiData ben\xf6tigt werden"),"maybe"===t.similarToolAvailable&&Object(O.b)("li",null,"Herausfinden ob es nicht doch schon \xe4hnliche Tools gibt"),"no"===t.loginNeeded&&"yes"===t.sensitiveData&&Object(O.b)("li",null,"Abkl\xe4ren ob es wirklich kein Login braucht")),Object(O.b)("h2",null,"Antworten"),console.log(t),Object(O.b)("p",null,Object(O.b)("em",null,l("slides.projectPhase.question"),":"),Object(O.b)("br",null)," ",l("slides.projectPhase.answers.".concat(t.projectPhase))),Object(O.b)("p",null,Object(O.b)("em",null,l("slides.targetAudience.question"),":"),Object(O.b)("br",null)," ",l("slides.targetAudience.answers.".concat(t.targetAudience))),Object(O.b)("p",null,Object(O.b)("em",null,l("slides.toolType.question"),":"),Object(O.b)("br",null)," ",l("slides.toolType.answers.".concat(t.toolType))),Object(O.b)("p",null,Object(O.b)("em",null,l("slides.sensitiveData.question"),":"),Object(O.b)("br",null)," ",l("slides.sensitiveData.answers.".concat(t.sensitiveData))),Object(O.b)("p",null,Object(O.b)("em",null,l("slides.loginNeeded.question"),":"),Object(O.b)("br",null)," ",l("slides.loginNeeded.answers.".concat(t.loginNeeded))),Object(O.b)("p",null,Object(O.b)("em",null,l("slides.apiNeeded.question"),":"),Object(O.b)("br",null)," ",l("slides.apiNeeded.answers.".concat(t.apiNeeded))),Object(O.b)("p",null,Object(O.b)("em",null,l("slides.similarToolAvailable.question"),":"),Object(O.b)("br",null)," ",l("slides.similarToolAvailable.answers.".concat(t.similarToolAvailable))),Object(O.b)("p",null,Object(O.b)("em",null,l("slides.responsibility.question"),":"),Object(O.b)("br",null)," ",l("slides.responsibility.answers.".concat(t.responsibility))))))}var q=t.p+"static/media/footer.744eec6b.svg",P=Object(b.a)("footer",{target:"e630tne0"})("background-image:url(",q,");background-repeat:repeat-x;height:236px;");var E=function(){return Object(O.b)(r.a.Fragment,null,Object(O.b)(D,null),Object(O.b)(P,null))},F=t(17),I=t(10);F.a.use(I.e).init({resources:{en:{translation:{slides:{projectPhase:{question:"In welcher Phase des Projekts befindest du dich?",answers:{idea:"Idee",implementation:"Umsetzung"}},targetAudience:{question:"Wer ist das Zielpublikum?",answers:{bundesebene:"Bundesebene",canton:"Kantone",external:"Externe (z.B. Eltern)"}},toolType:{question:"Werden Daten verarbeitet oder werden nur Inhalte dargestellt?",answers:{dataProcessing:"Daten verarbeiten",contentOnly:"Nur Inhalte"}},loginNeeded:{question:"Muss man sich einloggen k\xf6nnen?",answers:{yes:"Ja",no:"Nein"}},sensitiveData:{question:"Werden sch\xfctzenswerte Daten verarbeitet?",answers:{yes:"Ja",no:"Nein",maybe:"Glaubs n\xf6d"}},apiNeeded:{question:"Werden Daten von anderen IT-Tools ben\xf6tigt?",answers:{midata:"Ja, von der MiData",other:"Ein anderes Tool",no:"Nein, braucht es nicht"}},similarToolAvailable:{question:"Gibt es bereits ein \xe4hnliches Tool in dieser Art (gratis oder kostenpflichtig)?",answers:{yes:"Ja, das gibts",no:"Nein, gibt es nicht",maybe:"Keine Ahnung"}},responsibility:{question:"Ist eine verantwortliche Person definiert?",answers:{yes:"Ja, ist klar",no:"Nein, noch nicht",maybe:"Wir brauchen das nicht"}}}}},fr:{translation:{"Welcome to React":"Bienvenue \xe0 React et react-i18next"}}},lng:"en",interpolation:{escapeValue:!1}});F.a;var J=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,41)).then((function(n){var t=n.getCLS,i=n.getFID,l=n.getFCP,a=n.getLCP,s=n.getTTFB;t(e),i(e),l(e),a(e),s(e)}))};o.a.render(Object(O.b)(r.a.StrictMode,null,Object(O.b)(E,null)),document.getElementById("root")),J()}},[[39,1,2]]]);
//# sourceMappingURL=main.f263c007.chunk.js.map