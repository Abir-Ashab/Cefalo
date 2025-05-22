// console.log("Hello Prisma");
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const main = async() => {
    const getAllUser = await prisma.user.findMany( {
        select : {
            name :  true
        }
    })
    console.log(getAllUser);

    // findFirst is just like getting the first matched data with the condition, like the find of JS
    // const getFirstUser = await prisma.user.findFirst({
    //     where: {
    //         id: 7
    //     }
    // })   
    // console.log(getFirstUser); // null for invalid request
    
    // // Similar to the previous, just through error
    // const getFirstUserWithErrorHandling = await prisma.user.findFirstOrThrow({
    //     where: {
    //         id: 7
    //     }
    // })   
    // console.log(getFirstUserWithErrorHandling);  
}

main()

