const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Blog } = require("../models/model");
const fileUpload = require("../helpers/file-upload")
const multer = require("multer");
const fs = require('fs')

//superADMIN start
router.get("/", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Blog.findAndCountAll({ limit, offset })
        .then((blogs) => {
            res.json({
                blogs: blogs.rows,
                pagination: {
                    before: before,
                    next: next,
                    page: page,
                    total: blogs.count,
                    pages: Math.ceil(blogs.count / limit)
                }
            })
        })
})

router.get("/:blogId", async (req, res) => {
    await Blog.findOne({
        where: { id: req.params.blogId }
    }).then((blog) => {
        res.json({
            blog: blog
        })
    })
});

router.post("/create", fileUpload.upload, async (req, res) => {
    await Blog.create({
        title: req.body.title,
        description: req.body.description,
        blog_img: req.files.blog_img[0].filename
    }).then(() => {
        res.json({
            success: "Makala üstinlikli goşuldy"
        })
    })
});

router.get("/edit/:blogId", async (req, res) => {
    await Blog.findOne({
        where: { id: req.params.blogId }
    }).then((blog) => {
        res.json({
            blog: blog
        })
    })
});

router.post("/edit/:blogId", fileUpload.upload, async (req, res) => {
    let img = req.body.blog_img;
    if (req.files.blog_img) {
        await Blog.findOne({ where: { id: req.params.blogId } }).then((current) => {
            fs.unlink("/public/img/blog/" + current.blog_img, err => {
                console.log(err);
            })
        })
        img = req.files.blog_img[0].filename;
    }
    await Blog.update({
        title: req.body.title,
        description: req.body.description,
        blog_img: img
    },
        { where: { id: req.params.blogId } })
        .then(() => {
            res.json({
                success: "Makala üstinlikli üýtgedildi"
            })
        })
});

router.delete("/delete/:blogId", async (req, res) => {
    await Blog.findOne({ where: { id: req.params.blogId } })
        .then((blog) => {
            if (blog) {
                fs.unlink("/public/img/blog/" + blog.blog_img, err => { })
                blog.destroy()
                return res.json({
                    success: "Makala üstunlikli yok edildi"
                })
            } else {
                res.json({
                    error: "Tapylmady"
                })
            }
        })
});
//superADMIN end





module.exports = router;