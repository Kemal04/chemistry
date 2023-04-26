const express = require("express");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const { User } = require("../models/model")

router.get("/", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = 10;
    const offset = (page - 1) * size;
    const limit = page * size;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await User.findAndCountAll({ limit, offset }).then((users) => {
        res.json({
            users: users.rows,
            pagination: {
                before: before,
                next: next,
                page: page,
                total: users.count,
                pages: Math.ceil(users.count / size)
            }
        })
    }).catch((err) => {
        res.status(500).json({ err: err })
    })
})

router.get("/:userId", async (req, res) => {
    await User.findOne({
        where: { id: req.params.userId }
    }).then((user) => {
        res.json({ user: user })
    }).catch((err) => {
        res.status(500).json(err)
    })
})

router.delete("/admin/delete/:userId", isAdmin, async (req, res) => {
    await User.findOne({ where: { id: req.params.userId } })
        .then((user) => {
            if (user) {
                user.destroy()
                return res.json({ success: "Ulanyjy ustunlikli yok edildi" })
            } else {
                res.json({ error: "Ulanyjy tapylmady" })
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

module.exports = router;