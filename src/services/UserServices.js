import { errorHandler } from "../utility"
import { axiosClient } from "../config";

export const getAllUsers = async () => {
    try{
        const res = await axiosClient('/users');
        if(res.status === 200) {
            return res.data
        }else{
            return [];
        }
    }
    catch(err){
        errorHandler(err);
        return false
    }
}