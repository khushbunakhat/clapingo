require('dotenv'). config();
const express = require("express");
const path = require('path');
const cors = require("cors");

require("./db/config");

const Student = require('./db/student');
const Teacher= require("./db/Teacher");
const app = express();
app.use(express.static(path.join(__dirname+'/public')));
app.use(express.json());
app.use(cors());


app.post("/register", async (req, resp) => {
    let student = new Student(req.body);
    let result = await student.save();
    result = result.toObject();
    delete result.password
    resp.send(result)
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let student = await User.findOne(req.body).select("-password");
        if (student) {
            resp.send({ student })
        } else {
            resp.send({ result: "No Student found" })
        };
    }
    else {
        resp.send({ result: "No Student found" })
    }
});

app.post("/add-teacher", async (req, resp) => {
    let teacher = new Teacher(req.body);
    let result = await teacher.save();
    resp.send(result);
});

app.get("/teachers", async (req, resp) => {
    const teachers = await Teacher.find();
    if (teachers.length > 0) {
        resp.send(teachers)
    } else {
        resp.send({ result: "No teachers found" })
    }
});
app.get("/students", async (req, resp) => {
    const students = await Student.find();
    if (students.length > 0) {
        resp.send(students)
    } else {
        resp.send({ result: "No students found" })
    }
});

app.delete("/teacher/:id", async (req, resp) => {
    let result = await Teacher.deleteOne({ _id: req.params.id });
    resp.send(result)
});
    app.get("/teacher/:id", async (req, resp) => {
        let result = await Teacher.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    });
app.get("/search/:key", async (req, resp) => {
    let result = await Teacher.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                subject: {$regex: req.params.key}
            }
        ]
    });
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "No Record Found." })
    }

})

app.listen(process.env.PORT || 5000, function () {
    console.log("Im listening at 5000");
});