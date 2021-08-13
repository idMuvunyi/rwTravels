
import * as types from '../store/types'
const initialState = []

const reducer = (state = initialState, action) => {

    switch(action.type){
        case types.SET_USERS:
            return {...state, user: action.payload.user}
    
        case types.SET_STORIES:
            return {...state, stories: action.payload.stories}


    default:
    return state;
    }
}

export {reducer}