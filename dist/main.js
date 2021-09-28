(()=>{var e={300:(e,r,s)=>{const{createLogger:t,format:o,transports:i,info:n}=s(693),u=new Date,c=u.getFullYear()+("0"+(1+u.getMonth())).slice(-2)+("0"+u.getDate()).slice(-2),a=t({level:"info",format:o.json(),transports:[new i.File({filename:"./log/combined.log"+c}),new i.File({filename:"./errlog/error.log"+c,level:"error"})]});e.exports=a},310:(e,r,s)=>{const t=s(860).Router();t.get("/",(async(e,r)=>{try{r.render("index")}catch(e){console.err(e),next(e)}})),e.exports=t},228:(e,r,s)=>{const t=s(860).Router();e.exports=t},336:(e,r,s)=>{const t=s(860).Router();e.exports=t},710:e=>{"use strict";e.exports=require("cookie-parser")},142:e=>{"use strict";e.exports=require("dotenv")},860:e=>{"use strict";e.exports=require("express")},508:e=>{"use strict";e.exports=require("express-session")},518:e=>{"use strict";e.exports=require("gh-pages")},806:e=>{"use strict";e.exports=require("helmet")},487:e=>{"use strict";e.exports=require("hpp")},470:e=>{"use strict";e.exports=require("morgan")},738:e=>{"use strict";e.exports=require("multer")},520:e=>{"use strict";e.exports=require("nunjucks")},511:e=>{"use strict";e.exports=require("passport")},773:e=>{"use strict";e.exports=require("redis")},693:e=>{"use strict";e.exports=require("winston")},147:e=>{"use strict";e.exports=require("fs")},17:e=>{"use strict";e.exports=require("path")}},r={};function s(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={exports:{}};return e[t](i,i.exports,s),i.exports}(()=>{const e=s(860),r=s(710),t=s(470),o=s(17),i=s(508),n=s(520),u=s(142);s(511),s(806),s(487),s(773),s(518).publish("dist",{branch:"master",repo:"https://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@github.com/mincoln419/profile.git",add:!0,message:"Auto-generated commit",user:"Mincoln Cho",email:"mincoln419@naver.com"},(function(e){m.error(e)}));const c=s(310),a=s(228),p=s(336);u.config();const l=e();l.set("port",process.env.Port||3e3),l.set("view engine","html"),n.configure("views",{express:l,watch:!0}),l.use(t("dev")),l.use("/",e.static(o.join(__dirname,"public"))),l.use("/img",e.static(o.join(__dirname,"uploads"))),l.use(e.json()),l.use(e.urlencoded({exteneded:!1})),l.use(e.raw()),l.use(e.text()),l.use(r(process.env.COOKIE_SECRET));const d={resave:!1,saveUninitialized:!1,secret:process.env.COOKIE_SECRET,cookie:{httpOnly:!0,secure:!1},proxy:!0};l.use(i(d)),l.use("/",c),l.use("/profile",a),l.use("/stack",p),l.use("/resume",p);const x=s(738),g=s(147),m=s(300);try{g.readdirSync("uploads")}catch(e){console.error("uploads 폴더가 없어서 uploads 폴더를 생성합니다"),g.mkdirSync("uploads")}x({storage:x.diskStorage({destination(e,r,s){s(null,"uploads/")},filename(e,r,s){const t=o.extname(r.originalname);s(null,o.basename(r.originalname,t)+Date.now()+t)}}),limits:{fileSize:5242880}}),l.use(((e,r,s)=>{const t=new Error(`${e.method} ${e.url} 라우터가 없습니다.`);t.status=404,s(t)})),l.use(((e,r,s,t)=>{s.locals.message=e.message,s.locals.error="production"!==process.env.NODE_EVN?e:{},s.status(e.status||500),s.render("error")})),l.listen(l.get("port"),(()=>{console.log(l.get("port"),"번 포트에서 대기 중")}))})()})();