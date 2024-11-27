const s3 = require('../config/aws');

const uploadFileToS3 = async (file) => {
    const fileKey = `${file.originalname}`;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try {
        await s3.upload(params).promise();
        const presignedUrl = await getPresignedUrl(fileKey);
        return presignedUrl;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
};

const getPresignedUrl = async (fileKey) => {
    return s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileKey,
        Expires: 60 * 60 // 1 hour
    });
};

module.exports = {
    uploadFileToS3,
    getPresignedUrl
}