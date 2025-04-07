const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

async function handleMigrations() {
  try {
    // Try to run prisma migrate deploy normally
    console.log("Attempting to deploy migrations...");
    await execAsync("prisma migrate deploy");
    console.log("Database migrations applied successfully");
  } catch (error) {
    // Check if the error is because the schema is not empty (P3005)
    if (error.stderr && error.stderr.includes("P3005")) {
      console.log(
        "Database already has tables. Creating baseline migration..."
      );
      try {
        // Create a baseline migration
        await execAsync(
          "prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/baseline.sql"
        );
        await execAsync("prisma migrate resolve --applied baseline");
        console.log("Baseline migration created successfully");
      } catch (baselineError) {
        console.error("Failed to create baseline migration:", baselineError);
        process.exit(1);
      }
    } else {
      // If it's another error, log it and exit
      console.error("Migration failed:", error);
      process.exit(1);
    }
  }
}

handleMigrations();
