const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/Course");

const router = express.Router();

// CREATE course
router.post("/", async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);

    res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create course",
      error: error.message,
    });
  }
});

// READ all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      message: "Courses fetched successfully",
      count: courses.length,
      courses: courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
});

// READ one course by ID
router.get("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid course ID",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course fetched successfully",
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch course",
      error: error.message,
    });
  }
});

// UPDATE course by ID
router.put("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid course ID",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update course",
      error: error.message,
    });
  }
});

// DELETE course by ID
router.delete("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid course ID",
      });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
});

module.exports = router;
