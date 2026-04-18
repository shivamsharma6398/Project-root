const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/studentDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


const Student = require('./models/student');


app.get('/students', async (req, res) => {
    const data = await Student.find();
    res.json(data);
});


app.post('/students', async (req, res) => {
  try {
    console.log(req.body); // 🔥 check incoming data

    const newStudent = new Student({
      name: req.body.name,
      age: Number(req.body.age),
      course: req.body.course
    });

    await newStudent.save();

    res.json(newStudent);
  } catch (error) {
    console.log("ERROR:", error);  // 🔥 shows real problem
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});