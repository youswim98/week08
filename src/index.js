import express from "express";
import logger from "morgan";
import path from "path";
//모듈 import

import homeRouter from "../routes/home" //홈화면
import updateRouter from "../routes/update" //수정
import selectRouter from "../routes/select"//조회

const PORT = 8080;

const app = express();
//express기능을 사용할 것임.
//app이라는 이름으로 객체를 만들어서 express를 사용할 것임.
//express를 그대로 사용해도 되는가?

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

app.use(logger("dev"));
//logger를 사용할 것이다

app.use('/', homeRouter); //home화면
app.use('/update', updateRouter); //update 화면
app.use('/select', selectRouter); //select(조회) 화면 /모든 페이지가 route되지 않으면 오류로 서버가 동작하지 않음

app.listen(PORT, ()=>{
    console.log(`Example app listening at http://localhost:${PORT}`)
})
