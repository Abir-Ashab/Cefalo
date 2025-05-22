import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const main = async() => {
    const updateSingle = await prisma.user.update({
        where: {
            id : 4
        },
        data: {
            email : "changed@gmail.com",
            name : "no name"
        }
    }) // in the same way, you can update many


    // So here I am trying to update something which is not present, thats why it then creates the thing
    // Upsert --> If present, then update : if not present, then create
    const upsertSingle = await prisma.user.upsert({
        where: {
            id : 1
        },
        update: {
            email : "changed@gmail.com",
            name : "no name"
        },
        create: {
            id: 1,
            email : "changed@gmail.com",
            name : "no name"
        }
    })
}

main()
