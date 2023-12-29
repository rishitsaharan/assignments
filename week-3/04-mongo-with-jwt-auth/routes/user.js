const { Router } = require("express");
const {User, Course} = require("../db/index");
const router = Router();
const userMiddleware = require("../middleware/user");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    User.create({
        username : username,
        password : password
    }).then(() => {
        res.json({ message: 'User created successfully' });
    });
});

router.post('/signin', async (req, res) => {
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

router.get('/courses', userMiddleware, (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then((data) => {
        res.json({
            "Courses" : data
        });
    });
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    User.updateOne({
        username : username
    }, {
        "$push" : {
            purchasedCourses : courseId
        }
    }).then( ()=> { 
        res.json({"message" : 'Course purchased successfully'})
    }).catch((err) => {
        res.json({"message" : 'Error while purchasing course'})
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    const user = await User.findOne({
        username : username
    });
    Course.find({
        "_id" : {
            "$in" : user.purchasedCourses
        }
    }).then((data) => {
        res.json({"purchasedCourses" : data})
    }).catch((err) => {
        res.json({ "message" : "Error while fetching purchased courses"});
    })
});

module.exports = router
