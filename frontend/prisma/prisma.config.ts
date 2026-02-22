import path from "node:path";

/**
 * Prisma Configuration File (TypeScript)
 * 
 * This file configures the Prisma ORM for the Iraqi Platform project.
 * It defines how Prisma generates the client and interacts with the database.
 * 
 * @see https://www.prisma.io/docs/orm/more/advanced/generators-and-databases/prisma-config
 */

export default {
  earlyAccess: true,
  schema: path.join(__dirname, "schema.prisma"),

  migrate: {
    async adapter() {
      const { PrismaPg } = await import("@prisma/adapter-pg");
      const pg = await import("pg");
      const pool = new pg.Pool({
        connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
      });
      return new PrismaPg(pool);
    },
  },

  studio: {
    enabled: process.env.NODE_ENV === "development",
    port: 5555,
  },

  seeds: [
    {
      import: path.join(__dirname, "../script/seed.ts"),
    },
  ],
};
