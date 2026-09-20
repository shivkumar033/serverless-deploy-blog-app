import express from "express";
import User from "../models/User.js";
import Blog from "../models/Blog.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find().limit(5);

    const blogs = await Blog.find()
        .populate("author")
        .sort({ createdAt: -1 })
        .limit(5);

    res.render("home", {
        users,
        blogs
    });
});

router.get("/blogs", async (req, res) => {
    const blogs = await Blog.find()
        .populate("author")
        .sort({ createdAt: -1 });

    res.render("blogs", {
        blogs
    });
});

router.get("/about", (req, res) => {
    res.render("about");
});

export default router;