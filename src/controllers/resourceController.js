const resourceService = require("../services/resourceService");
const { v4: uuidv4 } = require("uuid");

// Create a new resource
module.exports.createResource = async (req, res) => {
    const { expirationTime } = req.query;
    const userId = req.user.id;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    try {
        const resource = await resourceService.createResource({ expirationTime, file, userId });
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: "Error creating resource", error });
    }
};

// Fetch all resources (with optional filters)
module.exports.getAllResources = async (req, res) => {
    const userId = req.user.id;
    const { status } = req.query;

    try {
        const resources = await resourceService.getAllResources({ userId, status });
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Error fetching resources", error });
    }
};

// Access a specific resource
module.exports.getResourceById = async (req, res) => {
    const { id } = req.params;

    try {
        const resource = await resourceService.getResourceById({ id });

        if (!resource) return res.status(404).json({ message: "Resource not found" });
        if (resource.status === "expired") return res.status(403).json({ message: "Resource expired" });

        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: "Error accessing resource", error });
    }
};

// Delete a resource
module.exports.deleteResource = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await resourceService.deleteResource({ id, userId });
        if (!result) return res.status(403).json({ message: "Unauthorized or resource not found" });

        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting resource", error });
    }
};
