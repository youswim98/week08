import express from "express" ;
import { selectSql, updateSql } from "../database/sql";
//만든 두개의 모듈을 불러온다.
const router = express.Router();

router.get('/employee', async (req, res) => {
    //localhost:8080/update/employee로 접속하면 아래의 함수를 실행한다.
    const emp_res = await selectSql.getEmployee();
    //employee 테이블에 담겨있는 데이터를 emp_res에 저장한다.
    res.render('updateEmployee.hbs',{
        //updateEmployee.hbs에 아래의 변수들을 넣어서 화면에 띄워준다.
        title: "직원 테이블 갱신",
        emp_res
    });
});

router.get('/department', async (req, res) => {
    //localhost:8080/update/department로 접속하면 아래의 내용 실행한다.
    const dept_res = await selectSql.getDepartment();
    //department 테이블에 저정된 데이터들 dept_res에 저장한다.
    res.render('updateDepartment.hbs', {
        //updateDepartment.hbs에 아래의 변수를 넣고 화면에 띄워준다.
        title: "부서 테이블 갱신",
        dept_res
    });
});

router.post('/employee', async (req, res) => {
    //localhost:8080/update/employee에 post요청이 들어오면 아래를 실행한다.
    console.log(req.body);
    const vars = req.body;
    const data={
        Ssn: vars.ssn,
        Salary: vars.salary
    }
    await updateSql.updateEmployee(data);
    //sql.js의 updateSql객체의 updateEmployee함수를 실행한다.
    res.redirect('/select');
    //위의 내용을 실행하고나서, localhost:8080/select로 redirect시킨다.
});

router.post('/department', async (req, res) => {
    //위의 함수와 같은 일을 한다.
    const vars = req.body;
    console.log(vars);

    const data={
        Dname: vars.dname,
        Dnumber: vars.dnumber
    }
    await updateSql.updateDepartment(data);

    res.redirect('/select');// localhost:8080/select로 redirection시킨다.
});

module.exports = router;
