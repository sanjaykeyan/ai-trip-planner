const { exec } = require("child_process");

// Check if we're in a production environment (like Vercel)
// Only generate in non-production to avoid issues with Vercel's build process
if (process.env.NODE_ENV === "production") {
  console.log("Production environment detected, skipping Prisma generation");
} else {
  console.log("Generating Prisma client...");
  exec("npx prisma generate", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during Prisma generation: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Prisma generation stderr: ${stderr}`);
      return;
    }
    console.log(`Prisma client generated: ${stdout}`);
  });
}
