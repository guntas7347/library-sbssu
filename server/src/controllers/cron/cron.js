import cron from "node-cron";
import { createLog } from "../../utils/log.js";
import { sendBulkOverdueReminders } from "../issue/sendBulkOverdueReminders.js";

// Schedule the job to run every day at 11:00 AM
cron.schedule(
  "0 11 * * *",
  async () => {
    console.log('Running the 11 AM "due tomorrow" reminder job...');
    try {
      const result = await sendBulkOverdueReminders();
      createLog(
        `Morning reminder job finished. Sent ${result.successCount} of ${result.total} emails.`
      );
    } catch (error) {
      createLog(error, "Morning reminder job failed.");
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Set to your server's timezone
  }
);

// Schedule the job to run every day at 4:00 PM
cron.schedule(
  "0 16 * * *",
  async () => {
    console.log('Running the 4 PM "due tomorrow" reminder job...');
    try {
      const result = await sendBulkOverdueReminders();
      createLog(
        `Afternoon reminder job finished. Sent ${result.successCount} of ${result.total} emails.`
      );
    } catch (error) {
      createLog(error, "Afternoon reminder job failed.");
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);
