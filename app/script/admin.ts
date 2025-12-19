// scripts/make-admin.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function makeAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    });
    console.log("✅ Usuario actualizado:", user);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Cambia esto por tu email
makeAdmin("tu-email@ejemplo.com");

// -> npx tsx scripts/make-admin.ts
