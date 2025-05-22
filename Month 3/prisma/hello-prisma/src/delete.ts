import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const deleteOperation = async () => {
    const deleteOne = await prisma.user.delete({
        where: {
            id: 1
        }
    })
};

deleteOperation(); // Call the async function
