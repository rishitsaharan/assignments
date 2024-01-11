const { Router } = require("express");
const {User, Course}  = require("../db");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const created = await User.create({
        username : username,
        password : password
    });
    res.json({ message: 'User created successfully' });
});

router.get('/courses', (req, res) => {
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
    const username = req.headers.username;
    const password = req.headers.password;

    User.updateOne({
        username : username,
        password : password
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
    const username = req.headers.username;
    const password = req.headers.password;

    const user = await User.findOne({
        username : username,
        password : password
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

module.exports = router;
