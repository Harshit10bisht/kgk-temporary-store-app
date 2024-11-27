const express = require("express");
const resourceController = require("../controllers/resourceController");
const upload = require('../utils/multer');

const router = express.Router();

// Create a new resource
router.post("/", upload.single('file'), resourceController.createResource);

// Fetch all resources (with optional filters)
router.get("/", resourceController.getAllResources);

// Access a specific resource by ID
router.get("/:id", resourceController.getResourceById);

// Delete a resource
router.delete("/:id", resourceController.deleteResource);

module.exports = router;