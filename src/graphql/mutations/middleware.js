export const authorize = async (resolve, source, args, context, info) => {
    if(!context.user){
        throw new Error("Unauthorize")
    }
    return resolve(source, args, context, info)
} 