const express = require("express");
const { Router } = express;
const {Admin, Course} = require("../db/index");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {

    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username : username,
        password : password
    }).then(() => {
        res.json({ message: 'Admin created successfully' });
    });
});

router.post("/courses", adminMiddleware, (req, res) => {
    // Implement course creation logic  
    const username = req.headers.username;
    const password = req.headers.password;

    Course.create({
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
        imageLink : req.body.imageLink
    }).then((data) => {
        res.json({  message: 'Course created successfully', courseId: data._id })
    }).catch((err) => { 
        res.json({ msg : "Course not created" });
    })
});

router.get("/courses", adminMiddleware, (req, res) => {

    // Implement fetching all courses logic
    const username = req.headers.username;
    const password = req.headers.password;

    Course.find({}).then((data) => {
        res.json({
            "Courses" : data
        });
    }) 
});

module.exports = router;