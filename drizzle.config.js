/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",  // or schema.ts
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DATABASE_URL,
    }
  };
  