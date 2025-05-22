// console.log("Hello Prisma");
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const main = async() => {
    console.log("prisma client is running..");
    const result = await prisma.user.create({
        data: {
            email: "abc@gmail.com",
            name: "niloy"
        }
    })
    const getAllUser = await prisma.user.findMany()
    console.log(getAllUser);
}

main()

