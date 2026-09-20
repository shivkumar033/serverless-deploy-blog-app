import express from "express";
import User from "../models/User.js";
import Blog from "../models/Blog.js";

const router = express.Router();

router.get("/users", async (req, res) => {
    const users = await User.find();

    res.render("users", {
        users
    });
});

router.get("/user/:username/blogs", async (req, res) => {
    const user = await User.findOne({
        username: req.params.username
    });

    if (!user) {
        return res.status(404).send("User not found");
    }

    const blogs = await Blog.find({
        author: user._id
    }).sort({ createdAt: -1 });

    res.render("user-blogs", {
        user,
        blogs
    });
});

export default router;