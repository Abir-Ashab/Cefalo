// console.log("Hello Prisma");
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const main = async() => {
    // offset pagination
    // It is inefficient, because big data te skip jodi 99999 emon kichu dei, then etogula one by one skip kore, jeita time consuming, thats why we need cursor based pagination
    const getAllUser = await prisma.user.findMany( {
        skip : 2,
        take : 3
    })
    // console.log(getAllUser);

    // cursor based pagination 
    // Ekhane starting point fixed kore dei
    {
        const getAllUser = await prisma.user.findMany( {
            skip : 2,
            take : 3,
            cursor : {
                id : 4
            }
        })
        console.log(getAllUser);
    }
}

main()

