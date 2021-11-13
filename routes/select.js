import express from "express" ;
import { selectSql } from "../database/sql";
//사용자가 만든 모듈을 불러올 때, 중괄호를 쓴다.


const router = express.Router();

router.get('/', async function(req, res) {
    //이 부분이 /select가 되어야 하는거 아닌지?
    //--> 여기에 /select를 한다는 뜻은 /select/select가 되는 것을 의미한다.
    // localhost:8080/select로 get요청이 오면 아래의 내용을 실행한다.

const employee = await selectSql.getEmployee();
const department = await selectSql.getDepartment();
//sql.js의 seleceSql객체에서 getEmployee와 getDepartment함수를 실행시켜서
//employee와 department변수에 데이터베이스의 내용들을 저장한다.
//console.log(department);

    res.render('select.hbs', {
        title: '직원 테이블',
        title2: '부서 테이블',
        employee,
        department
        //select.hbs파일의 각 변수에 위 내용이 들어가게 된다.
        //화면에 select.hbs파일을 띄운다.
    });
});

module.exports = router;
