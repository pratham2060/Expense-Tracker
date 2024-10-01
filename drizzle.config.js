/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",  // or schema.ts
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://expense%20traccker_owner:iQ7JAfZmM5as@ep-holy-union-a5ofp746.us-east-2.aws.neon.tech/expense%20traccker?sslmode=require",
    }
  };
  