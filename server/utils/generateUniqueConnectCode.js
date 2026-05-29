import { customAlphabet } from "nanoid"
import User from "../models/User.js";

const generateCode = customAlphabet("0123456789", 6);

export const generateUniqueConnectCode = async function () {

    let code, exists;

    do {
        code = generateCode()
        exists = await User.exists({connectCode: code})
        
    } while (exists);
    
    return code

}