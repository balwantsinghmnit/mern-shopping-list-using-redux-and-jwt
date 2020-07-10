//@ts-ignore
import axios from "axios";
import {USER_LOADED,USER_LOADING,AUTH_ERROR,LOGOUT_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS,REGISTER_FAIL,REGISTER_SUCCESS} from "./types.js";
import {returnErrors} from "./errorActions.js";

//check token & load user
export const loadUser = () => (dispatch,getState) => {
    //user loading
    dispatch({type:USER_LOADING});
    axios.get('/api/auth/user',tokenConfig(getState))
    .then(res=>dispatch({
        type:USER_LOADED,
        payload:res.data
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status));
        dispatch({
            type:AUTH_ERROR
        })
    })
}


//register user
export const register = ({name,email,password}) => dispatch=>{
   //headers
    const config = {
        'Content-type':'application/json'
    };
    //request body
    axios.post('/api/users',{name,email,password},config)
    .then(res=>dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));
        dispatch({
            type:REGISTER_FAIL
        });
    });
}

//login user
export const login = ({email,password}) => dispatch =>{
   //headers
   const config = {
    'Content-type':'application/json'
    };
    //request body
    axios.post('/api/auth',{email,password},config)
    .then(res=>dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'));
        dispatch({
            type:LOGIN_FAIL
        });
    });

}

//logout user
export const logout = ()=>{
    return{
        type:LOGOUT_SUCCESS
    }
}

export const tokenConfig = getState =>{
    //get token from localSTorage
    const token = getState().auth.token;
    //headers
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }

    //if token add to headers
    if(token){
        config.headers['x-auth-token']=token;
    }
    return config;
}