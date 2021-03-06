import Project from "../models/projectModel.js";
import asyncHandler from "express-async-handler";

// @desc Register for project fair
// @route POST /api/projects
// @access private/user

const registerProject = asyncHandler(async (req, res) => {
  const {
    name,
    session,
    category,
    teammembers,
    frontend,
    backend,
    database,
    description,
  } = req.body;

  const projectExists = await Project.findOne({ name });

  if (projectExists) {
    res.status(400);
    throw new Error("Project with this name already exists!");
  }

  const project = new Project({
    name,
    session,
    category,
    teammembers,
    frontend,
    backend,
    database,
    description,
    user: req.user._id,
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc fetch all projects submissions
// @route GET /api/projects
// @access public
const getProjectsModerator = asyncHandler(async (req, res) => {
  const project = await Project.find().sort({ createdAt: "desc" });
  res.json(project);
});

// @desc GET  logged in user projects
// @route GET /api/projects/myprojects
// @access public
const getMyprojects = asyncHandler(async (req, res) => {
  const orders = await Project.find({ user: req.user._id }).sort({
    createdAt: "desc",
  });
  res.json(orders);
});

// @desc fetch single Project details
// @route GET /api/projects/:id
// @access private/user
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    res.json(project);
  } else {
    throw new Error("Submission not Found");
  }
});

// @desc Delete a project submission
// @route DELETE /api/projects/:id
// @access private/user
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    await project.remove();
    res.json({ message: "project submission Removed" });
  } else {
    throw new Error("project Submission not Found");
  }
});

// @desc Update a Project Submission
// @route PUT /api/projects/:id
// @access private/user
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    project.name = req.body.name || project.name;
    project.category = req.body.category || project.category;
    project.teammembers = req.body.teammembers || project.teammembers;
    project.frontend = req.body.frontend || project.frontend;
    project.backend = req.body.backend || project.backend;
    project.database = req.body.database || project.database;
    project.description = req.body.description || project.description;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("Project not Found");
  }
});

const updateProjectByModerator = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    project.isApproved = req.body.isApproved;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("Project not Found");
  }
});

// @desc fetch approved projects
// @route GET /api/projects/approved
// @access private/Judge
const listApprovedProjects = asyncHandler(async (req, res) => {
  const project = await Project.find({ isApproved: true }).sort({
    createdAt: "desc",
  });
  if (project) {
    res.status(201).json(project);
  }
});

// @desc Create a new mark
// @route PUT /api/projects/:id/marks
// @access private/Judge
const createProjectMark = asyncHandler(async (req, res) => {
  const { number, comment } = req.body;
  const project = await Project.findById(req.params.id);

  if (project) {
    const alreadyMarked = project.numbers.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyMarked) {
      res.status(400);
      throw new Error("Project already Marked once");
    }

    const marks = {
      name: req.user.name,
      number: Number(number),
      comment,
      user: req.user._id,
    };

    project.numbers.push(marks);

    project.totalMarkedBy = project.numbers.length;

    project.totalNumbers =
      project.numbers.reduce((acc, item) => item.number + acc, 0) /
      project.numbers.length;

    await project.save();

    res.status(201).json({ message: "Marks added" });
  } else {
    res.status(404);
    throw new Error("Project not Found");
  }
});

export {
  registerProject,
  getProjectsModerator,
  getMyprojects,
  getProjectById,
  deleteProject,
  updateProject,
  updateProjectByModerator,
  listApprovedProjects,
  createProjectMark,
};
