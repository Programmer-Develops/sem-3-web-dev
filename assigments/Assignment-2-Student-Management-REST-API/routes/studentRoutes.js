const express = require('express')
const students = require('../data/students')

const router = express.Router()

const findStudent = (id) => students.find((student) => student.id === Number(id))

const isValidStudent = (student) => {
    return student && typeof student.name === 'string' && student.name.trim() &&
        typeof student.course === 'string' && student.course.trim()
}

router.get('/', (req, res) => {
    res.status(200).json(students)
})

router.get('/:id', (req, res) => {
    const student = findStudent(req.params.id)

    if (!student) {
        return res.status(404).json({ message: 'Student not found' })
    }

    res.status(200).json(student)
})

router.post('/', (req, res) => {
    if (!isValidStudent(req.body)) {
        return res.status(400).json({ message: 'Name and course are required' })
    }

    const newStudent = {
        id: students.length ? Math.max(...students.map((student) => student.id)) + 1 : 1,
        name: req.body.name.trim(),
        course: req.body.course.trim()
    }

    students.push(newStudent)
    res.status(201).json(newStudent)
})

router.put('/:id', (req, res) => {
    const student = findStudent(req.params.id)

    if (!student) {
        return res.status(404).json({ message: 'Student not found' })
    }

    if (!isValidStudent(req.body)) {
        return res.status(400).json({ message: 'Name and course are required' })
    }

    student.name = req.body.name.trim()
    student.course = req.body.course.trim()
    res.status(200).json(student)
})

router.delete('/:id', (req, res) => {
    const studentIndex = students.findIndex((student) => student.id === Number(req.params.id))

    if (studentIndex === -1) {
        return res.status(404).json({ message: 'Student not found' })
    }

    const deletedStudent = students.splice(studentIndex, 1)[0]
    res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent })
})

module.exports = router
