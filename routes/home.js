import express from "express";
import {insertSql, selectSql} from "../database/sql";

const router = express.Router();

router.get('/',(req, res) => {
    res.render('home.hbs');
    // localhost:8080/으로 접속하면,
    //home.hbs파일을 띄워준다
});

router.post('/', (req,res)=>{
    // localhost:8080/ 으로 post방식으로 요청하면
    //아래의 내용들이 실행된다.

    const vars = req.body;
    //form으로 전달받은데이터 req를  vars에 저장한다.

    const var_lenth = Object.keys(req.body).length;
    //넘어온 데이터가 employee인지 department인지
    //데이터 길이로 판단하기 위해서
    //var_lenth변수를 만듦
    console.log(vars);


    if(var_lenth > 4){
        //data의 갯수가 4개가 넘어가면
        //data에 데이터를 저장한다.
        const data = {
            Fname: vars.fname,
            Minit: vars.minit,
            Lname: vars.lname,
            Ssn: vars.ssn,
            Bdate: vars.bdate,
            Address: vars.address,
            Sex: vars.sex,
            Salary: vars.salary,
            Super_ssn: vars.super_ssn,
            Dno: vars.dno
        };
        insertSql.setEmployee(data);
        //sql.js의 insertSql객체의 setEmployee함수에 데이터를 넘겨준다.
    } else{
        console.log(vars);
        const data ={
            Dname: vars.dname,
            Dnumber: vars.dnumber,
            Mgr_ssn: vars.mgr_ssn,
            Mgr_start_date: vars.mgr_start_date
        };

        insertSql.setDepartment(data);
        //sql.js의 insertSql객체의 setEmployee함수에 데이터를 넘겨준다.
    }
    res.redirect('/');
    //입력하고 난 후에 이동할 페이지를 이것으로 설정
});
module.exports = router;