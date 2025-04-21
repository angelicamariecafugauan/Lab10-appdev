const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory student list
let students = [];

// Default API route
app.get('/', (req, res) => {
    res.send('Student Recording System API is running...');
});

// Test API route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Route to get the list of students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// Route to add a new student
app.post('/api/students', (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({ message: 'Name and course are required.' });
    }

    const newStudent = { id: students.length + 1, name, course };
    students.push(newStudent);

    res.status(201).json({ message: 'Student added successfully.', student: newStudent });
});

// Server Port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});