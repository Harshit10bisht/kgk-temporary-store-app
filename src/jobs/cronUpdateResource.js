const cron = require("node-cron");
const Resource = require("../models/Resource");
const { Op } = require("sequelize");

// To optimize this cron job like restricting numerous DB update calls, we can do multiple steps like :
// 1. Deploying this in separate worker instance. 
// 2. We can process updates in batches.
// 3. We can check if any valid record available before update, and record a counter in Redis.
// Plus many more 

// Run every 5 second to update expired resources
cron.schedule("*/5 * * * * *", async () => {
    try {
        await Resource.update(
            { status: "expired" },
            { where: { expirationTime: { [Op.lt]: new Date() }, status: "active" } }
        );
        console.log("Expired resources updated.");
    } catch (error) {
        console.error("Error updating expired resources", error);
    }
});
