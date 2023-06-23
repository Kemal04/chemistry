const express = require("express");
const router = express.Router();
const { Test } = require("../models/model");

//User ucin
router.get("/", async (req, res) => {
    await Test.findAll().then((tests) => {
        res.json({
            tests: tests
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ err })
    })
});

router.post("/create", async (req, res) => {
    await Test.create({
        name: req.body.name,
    }).then(() => {
        res.json({ success: "Teswir üstünlikli ugrdyldy" });
    })
}
);

router.get("/edit/:testId", async (req, res) => {
    await Test.findOne({
        where: { id: req.params.testId }
    })
        .then((test) => {
            res.json({ test: test })
        })
});

router.post("/edit/:testId", async (req, res) => {
    console.log(req.body);
    await Test.update(
        {
            name: req.body.name,
        },
        { where: { id: req.params.testId } })
        .then(() => {
            res.json({ success: "Tewir üstünlikli üytgedildi" });
        })
        .catch((err) => {
            res.json({ err })
        })
});

router.delete("/delete/:testId", async (req, res) => {
    await Test.findOne({
        where: { id: req.params.testId }
    }).then((test) => {
        if (test) {
            test.destroy();
            return res.json({ success: "Teswir üstünlikli yok edildi!" })
        } else {
            res.json({ error: "Teswir tapylmady" })
        }
    }).catch((err) => {
        res.status(500).json({ err });
    })
});

module.exports = router;