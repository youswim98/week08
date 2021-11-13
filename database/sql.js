import mysql from "mysql2";

const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'week08',
        password: '12171809',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

const promisePool = pool.promise();
//export를 하면 외부에서 이걸 끌어다가 사용할 수 있음
export const selectSql = {
    getEmployee : async () => {
        const [rows] = await promisePool.query(`select * from employee`);
        //쿼리 작업이 끝날때까지 기다리겠다는 뜻
        //전달받은 데이터베이스의 데이터를 rows에 담아서 리턴
        return rows
    },

    getDepartment : async () => {
        //getEmployee에서 하는 일과 같다.
        const [rows] = await promisePool.query('select * from department');
        return rows
    },
}

export const insertSql={

    setEmployee : async (data) => { //data받아서 쿼리문 생성
        const sql = `insert into employee values (
        "${data.Fname}", "${data.Minit}", "${data.Lname}", "${data.Ssn}", "${data.Bdate}",
        "${data.Address}", "${data.Sex}", "${data.Salary}", "${data.Super_ssn}", "${data.Dno}" )`;
        //변수를 사용해야하므로 백틱을 사용했다.
        //전달받은 data에서 변수를 하나씩 꺼내서 sql문을 만든다.
        await promisePool.query(sql);
        //만든 sql문을 데이터베이스에 전달한다.
    },

    setDepartment : async (data) => {
        const sql = `insert into department values (
            "${data.Dname}", "${data.Dnumber}", "${data.Mgr_ssn}", "${data.Mgr_start_date}")`;
            
            await promisePool.query(sql);
        },
}


export const updateSql = {
    updateEmployee : async (data) => {
        //where 조건을 만족하는 행에 대해서 salary수정
        console.log(data);
        //primary key인 ssn으로 검색해서, ssn으로 검색되는 항목의 salary를 입력해준
        //salary로 교체한다.
        const sql=`update employee set Salary = "${data.Salary}" where Ssn ="${data.Ssn}"`;
        await promisePool.query(sql);
    },

    updateDepartment : async (data) => {
        const sql = `update department set dname = "${data.Dname}" where Dnumber = ${data.Dnumber}`;
        await promisePool.query(sql);
    },
}
