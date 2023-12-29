const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://rishitsaharan:Mehnakhera%401@cluster0.hzwsqmp.mongodb.net/Week3Assignment");

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    imageLink: String,
});
const Course = mongoose.model('Course', CourseSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    Admin,
    User,
    Course
}