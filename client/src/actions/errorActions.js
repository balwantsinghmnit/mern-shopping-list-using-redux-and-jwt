import {GET_ERRORS,CLEAR_ERRORS} from "./types.js";

//RETURN ERRORS
export const returnErrors = (msg,status,id=null)=>{
    return{
        type:GET_ERRORS,
        payload:{ msg, status, id}
    }
}

//clear 
export const clearErrors = ()=>{
    return {
        type:CLEAR_ERRORS
    }
}