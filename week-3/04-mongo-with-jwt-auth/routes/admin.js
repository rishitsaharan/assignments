const { Router } = require("express");
const { Admin, User, Course } = require("../db/index");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const router = Router();
const {jwtSecret} = require("../config");

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    Admin.create({
        username : username,
        password : password
    }).then(() => {
        res.json({ message: 'Admin created successfully' });
    });
});


router.post('/signin', async(req, res) => {

    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const user = await User.find({
        username,
        password
    });
    if(user){
        const token = jwt.sign({username}, jwtSecret);
        res.status(200).json({
            token : token
        })
    }
    else{
        res.status(403).json({
            message : "Error while signing up"
        });
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
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

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then((data) => {
        res.json({
            "Courses" : data
        });
    }) 
});

module.exports = router;