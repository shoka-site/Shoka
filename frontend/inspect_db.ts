import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Fetching data...");
    const packages = await prisma.package.findMany({ include: { services: true } });
    console.log("PACKAGES", JSON.stringify(packages, null, 2));

    const services = await prisma.service.findMany();
    console.log("SERVICES", JSON.stringify(services, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
