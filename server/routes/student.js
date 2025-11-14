const express = require('express')
const router = express.Router();
const db = require("../db")



router.get('/', async (req, res) => {
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

router.post('/login', async (req, res) => {
    let { stuNo, stuName } = req.body;
    console.log(stuNo);
    console.log(stuName);

    try {
        let sql2 = "SELECT * FROM STUDENT WHERE STU_NO = ? AND STU_NAME = ?";
        let [list] = await db.query(sql2, [stuNo, stuName]);
        
        if (list.length != 0) {
            return res.json({
                msg: list[0].stu_name + "님 환영합니다!!",
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

router.get('/:stuNo', async (req, res) => {
    let { stuNo } = req.params;
    // console.log(stuNo);

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

router.put('/:stuNo', async (req, res) => {
    let { stuNo } = req.params;
    let { stu_name, stu_dept, stu_gender, stu_height } = req.body;
    console.log(stuNo);
    console.log(req.body);
    

    try {
        let sql = `UPDATE STUDENT SET STU_NAME = ?, STU_DEPT = ?, STU_GENDER = ?, STU_HEIGHT = ? WHERE STU_NO = ?`;
        let result = await db.query(sql , [stu_name, stu_dept, stu_gender, stu_height, stuNo]);
        // console.log(list);
        res.json({
            result: result,
            msg: "success"
        })
    } catch (error) {
        console.log("에러 발생!" + error);

    }
})

router.delete('/:stuNo', async (req, res) => {
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

router.post('/', async (req, res) => {
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

module.exports = router;