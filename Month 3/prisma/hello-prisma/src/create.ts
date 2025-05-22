// console.log("Hello Prisma");
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const main = async() => {
    const singleUser = await prisma.user.create({
        data: {
            email: "abc@gmail.com",
            name: "niloy"
        }
    })
    const multipleUser = await prisma.user.createMany({
        data: [{
            email: "abc1@gmail.com",
            name: "niloy"
        },
        {
            email: "abc2@gmail.com",
            name: "niloy"
        },
        {
            email: "abc3@gmail.com",
            name: "niloy"
        }
    ]
    })
}

main()

