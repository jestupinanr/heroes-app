
import { types } from "../types/types";
// const state = {
//     name: 'Juan',
//     logged: true
// }

export const authReducer = (state = {}, action) =>{
    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }    
        case types.logout :
            console.log("entre");
            return{
                logged: false
            }

        default:
            return state;
    }
}