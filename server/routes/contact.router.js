const express = require("express");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const { Contact } = require("../models/model");

//User ucin
router.get("/", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Contact.findAndCountAll({ limit, offset }).then((contacts) => {
        res.json({
            contacts: contacts.rows,
            pagination: {
                before: before,
                next: next,
                page: page,
                total: contacts.count,
                pages: Math.ceil(contacts.count / limit)
            }
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ err })
    })
});

router.post("/create", async (req, res) => {
    await Contact.create({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        comment: req.body.comment
    }).then(() => {
        res.json({ success: "Teswir üstünlikli ugrdyldy" });
    })
}
);

router.get("/edit/:contactId", isAdmin, async (req, res) => {
    await Contact.findOne({
        where: { id: req.params.contactId }
    })
        .then((contact) => {
            res.json({ contact: contact })
        })
});

router.post("/edit/:contactId", isAdmin, async (req, res) => {
    await Contact.update(
        {
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            comment: req.body.comment
        },
        { where: { id: req.params.contactId } })
        .then(() => {
            res.json({ success: "Tewir üstünlikli üytgedildi" });
        })
        .catch((err) => {
            res.json({ err })
        })
});

router.delete("/delete/:contactId", isAdmin, async (req, res) => {
    await Contact.findOne({
        where: { id: req.params.contactId }
    }).then((contact) => {
        if (contact) {
            contact.destroy();
            return res.json({ success: "Teswir üstünlikli yok edildi!" })
        } else {
            res.json({ error: "Teswir tapylmady" })
        }
    }).catch((err) => {
        res.status(500).json({ err });
    })
});

module.exports = router;