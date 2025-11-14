const express = require('express')
const router = express.Router();
const db = require("../db")




router.get("/", async (req, res) => {
    try {
        let sql = "SELECT * FROM TBL_PRODUCT";
        let [list] = await db.query(sql);

        res.json({
            list: list,
            result: "success"
        })
    } catch (error) {
        console.log("에러발생!" + error);

    }
})

router.post("/", async (req, res) => {
    let { productName, price, category } = req.body;
    try {
        let sql = "INSERT INTO TBL_PRODUCT(PRODUCTNAME, PRICE, CATEGORY) VALUES (?, ?, ?)";
        let result = await db.query(sql, [productName, price, category]);

        res.json({
            result: result,
            msg: "success"
        })
    } catch (error) {
        console.log("에러발생!" + error);

    }
})

router.delete("/:productId", async (req, res) => {
    let { productId } = req.params;
    try {
        let sql = "DELETE FROM TBL_PRODUCT WHERE productId = ?";
        let result = await db.query(sql, [productId]);

        res.json({
            result: result,
            msg: "success"
        })
    } catch (error) {
        console.log("에러발생!" + error);

    }
})

router.get("/:productId", async (req, res) => {
    let { productId } = req.params;
    try {
        let sql = "SELECT * FROM TBL_PRODUCT WHERE PRODUCTID = ?";
        let [list] = await db.query(sql, [productId]);

        res.json({
            info: list[0],
            result: "success"
        })
    } catch (error) {
        console.log("에러발생!" + error);

    }
})

router.put("/", async (req, res) => {
    let { productId, productName, price, category } = req.body;
    console.log(req.body);
    
    try {
        let sql = "UPDATE TBL_PRODUCT SET PRODUCTNAME = ?, PRICE = ?, CATEGORY = ? WHERE PRODUCTID = ?";
        let result = await db.query(sql, [productName, price, category, productId]);

        res.json({
            result: result,
            msg: "success"
        })
    } catch (error) {
        console.log("에러발생!" + error);

    }
})

module.exports = router;