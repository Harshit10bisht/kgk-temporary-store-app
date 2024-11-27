const Resource = require("../models/Resource");
const { uploadFileToS3 } = require('../utils/aws');

// Create a new resource
const createResource = async ({ expirationTime, file, userId }) => {
    try {
        // Upload the resource to S3
        const expiredDate = new Date(Date.now() + expirationTime * 1000);
        const preSignedURL = await uploadFileToS3(file);
        return await Resource.create({ resourceUrl: preSignedURL, expirationTime: expiredDate, userId });
    } catch (error) {
        console.error("Error creating resource:", error);
        throw error;
    }
};

// Fetch all resources (with optional filters)
const getAllResources = async ({ userId, status }) => {
    try {
        // const whereCondition = { userId };
        const whereCondition = {};
        if (status) whereCondition.status = status;

        return await Resource.findAll({ where: whereCondition });
    } catch (error) {
        console.error("Error fetching resources:", error);
        throw error;
    }
};

// Access a specific resource
const getResourceById = async ({ id, token }) => {
    try {
        return await Resource.findOne({ where: { id } });
    } catch (error) {
        console.error("Error fetching resource by ID:", error);
        throw error;
    }
};

// Delete a resource
const deleteResource = async ({ id, userId }) => {
    try {
        const resource = await Resource.findOne({ where: { id, userId } });
        if (!resource) return false;

        await resource.destroy();
        return true;
    } catch (error) {
        console.error("Error deleting resource:", error);
        throw error;
    }
};

module.exports = {
    createResource,
    getAllResources,
    getResourceById,
    deleteResource
};