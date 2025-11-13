const express = require('express')
const cors = require('cors')
const db = require("./db")
const app = express()
app.use(cors({
    origin: ["http://192.168.30.58:5500"],
    credentials: true
}))
app.use(express.json());

app.get('/', function (req, res) {
    res.send('qqq')
})

app.get('/test', (req, res) => {
    res.send("test page(get)");
})

app.get('/student', async (req, res) => {
    try {
        let sql = "SELECT * FROM STUDENT";
        let [list] = await db.query(sql);
        // console.log(list);
        res.json({
            result: "success",
            list: list
        })
    } catch (error) {
        console.log("에러 발생!");

    }
})

app.get('/student/:stuNo/:stuName', async (req, res) => {
    let { stuNo, stuName } = req.params;
    console.log(stuNo);
    console.log(stuName);

    try {
        let sql2 = "SELECT * FROM STUDENT WHERE STU_NO = ? AND STU_NAME = ?";
        let [list] = await db.query(sql2, [stuNo, stuName]);
        if (list.length != 0) {
            res.json({
                msg: "로그인 성공!",
                result: "success"
            })
        }


        let sql = `SELECT * FROM STUDENT WHERE STU_NAME = '${stuName}'`;
        let [test] = await db.query(sql);
        if (test.length == 0) {
            res.json({
                msg: "해당 이름을 가진 학생이 없습니다",
                result: "fail"
            })
        } else {
            res.json({
                msg: "학번을 확인해주세요",
                result: "fail"
            })
        }

        // console.log(list);
    } catch (error) {
        console.log("에러 발생!", error);

    }
})

app.get('/student/:stuNo', async (req, res) => {
    let { stuNo } = req.params;
    console.log(stuNo);

    try {
        let sql = "SELECT * FROM STUDENT WHERE STU_NO = " + stuNo;
        let [list] = await db.query(sql);
        // console.log(list);
        res.json({
            result: "success",
            info: list[0]
        })
    } catch (error) {
        console.log("에러 발생!");

    }
})

app.delete('/student/:stuNo', async (req, res) => {
    let { stuNo } = req.params;
    console.log(stuNo);

    try {
        let sql = "DELETE FROM STUDENT WHERE STU_NO = " + stuNo;
        let result = await db.query(sql);
        console.log("result ==> ", result);
        res.json({
            result: result,
            msg: "success"
        })
    } catch (error) {
        console.log("에러 발생!");

    }
})

app.post('/student', async (req, res) => {
    let { stuNo, stuName, stuDept } = req.body;
    console.log(req.body);

    try {
        let sql = "INSERT INTO STUDENT (STU_NO, STU_NAME, STU_DEPT) VALUES(?, ?, ?)";
        let result = await db.query(sql, [stuNo, stuName, stuDept]);
        // console.log(list);
        res.json({
            msg: "success",
            result: result
        })
    } catch (error) {
        console.log("에러 발생!");

    }
})

app.post('/test', (req, res) => {
    res.send("test page(post)");
})

app.listen(3000, () => {
    console.log("server start!");
})