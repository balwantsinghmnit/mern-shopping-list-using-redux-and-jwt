// @ts-ignore
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM ,ITEMS_LOADING} from "../actions/types.js";

const initialState = {
    items:[],
    loading:false
}

// @ts-ignore
export default function(state=initialState,action)
{
    switch(action.type)
    {
        case GET_ITEMS:
            return {
                ...state  ,
                items:action.payload,
                loading:false 
            }
        case DELETE_ITEM:
             return {
                ...state,
                // @ts-ignore
                items:state.items.filter(item=>item._id!==action.payload)   
            }
        case ADD_ITEM:
            return {
                ...state,
                items:[...state.items,action.payload]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading:true
            }
        default:
            return state;
    }
}