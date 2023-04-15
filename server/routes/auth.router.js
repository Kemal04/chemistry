const express = require('express');
const router = express.Router();
const { Admin, Worker, User } = require('../models/model');
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.json({ error: "Ähli öýjükleri dolduruň" });
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        var hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({
                email: email,
                password: hashedPassword
            });
            const accessToken = sign(
                { email: user.email, id: user.id, role: user.role },
                "importantsecret"
            );
            res.json({ success: "Hasaba alyndy", token: accessToken });
        }
        catch (err) {
            console.log(err)
        }
    } else {
        res.json({ error: "Siziň E-poçtaňyz bilen öň hasap açylypdyr" })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({ where: { email: email } })
        .then(user => {
            if (!user || user.email !== email) {
                res.json({ error: "Ulanyjynyň E-poçtasy ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, user.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň E-poçtasy ýa-da açar sözi nädogry" })
                } else {
                    const accessToken = sign(
                        { email: user.email, id: user.id, role: user.role },
                        "importantsecret"
                    );
                    res.json({ success: "Giriş kabul edildi", token: accessToken });
                }
            }
        })
})

router.post("/current", validateToken, (req, res) => {
    res.json(req.user);
})

router.post("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;
    const basicInfo = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
    });

    res.json(basicInfo);
})

// Admin login
router.post("/rootman", async (req, res) => {
    const { email, password } = req.body;
    await Admin.findOne({ where: { email: email } })
        .then(admin => {
            if (!admin || admin.email !== email) {
                res.json({ error: "Ulanyjynyň E-poçtasy ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, admin.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň E-poçtasy ýa-da açar sözi nädogry" })
                } else {
                    const accessToken = sign(
                        { id: admin.id, role: admin.role },
                        "importantsecret"
                    );
                    res.json({ token: accessToken });
                }
            }
        })
});

module.exports = router;