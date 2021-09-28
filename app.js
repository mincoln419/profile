/*
 * 파일명 : app.js
 * 설명 : 노드 구동
 * 생성일자 : 2021-09-28
 * 저자 : Mincoln Cho
 * =======================================
 * [수정자][수정일자][수정내용]
 * ======================================= 
 */
/******************************************************************
********************** Library Require ****************************
*******************************************************************/
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const helmet = require('helmet');
const hpp = require('hpp');
const redis = require('redis');
const ghpages = require('gh-pages');




/******************************************************************
********************** Router Setting *****************************
*******************************************************************/
const indexRouter = require('./routes');
const profileRouter = require('./routes/profile');
const stackRouter = require('./routes/stack');





/******************************************************************
********************** Sever Enviroments **************************
*******************************************************************/
dotenv.config();
const app = express();
app.set('port', process.env.Port || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true
});


app.use(morgan('dev'));

//static 선언
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname,'uploads')));


//body-parser
app.use(express.json());
app.use(express.urlencoded({ exteneded : false}));

app.use(express.raw());
app.use(express.text());


//쿠키세션설정
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}

if(process.env.NODE_ENV === 'production'){
    sessionOption.proxy = true;
}
app.use(session(sessionOption));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/stack', stackRouter);
app.use('/resume', stackRouter);

/******************************************************************
********************** Multipart upload/download ******************
*******************************************************************/
const multer = require('multer');
const fs = require('fs');
const logger = require('./logger');

try{
    fs.readdirSync('uploads');
}catch(error){
    console.error('uploads 폴더가 없어서 uploads 폴더를 생성합니다');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits : { fileSize: 5 * 1024 * 1024 }
});


/******************************************************************
********************** Exception Process **************************
*******************************************************************/
app.use((req, res, next) => {
    //res.status(404).send('Not Found');
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    //console.log(err);
    //res.status(500).send(err.message);
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_EVN !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});