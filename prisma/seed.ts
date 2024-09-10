import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

// npx prisma db seed ou npx prisma migrate reset
async function main() {

    const uAdminEmail = "admin@gmail.com"
    const uUserEmail = "user@gmail.com"

    const result = await prisma.user.findMany({
        where: {
            OR: [
                {
                    email: uAdminEmail
                },
                {
                    email: uUserEmail
                }
            ]
        }
    })

    if(result.length > 0) {
        return;
    }

    const passExample = "123";
    const salt = 10;
    const hashPass = await bcrypt.hash(passExample, salt);

    const uAdmin = await prisma.user.create({
        data: {
            email: uAdminEmail,
            name: "admin",
            password: hashPass,
            role: "ADMIN",
            cellphone: "11111111111"
        }
    })

    const uUser = await prisma.user.create({
        data: {
            email: uUserEmail,
            name: "user",
            password: hashPass,
            role: "USER",
            cellphone: "22222222222"
        }
    })
}

main()
    .catch(async (e) => {
        console.log(e)
    })
    .finally(async () => {
        prisma.$disconnect()
    })