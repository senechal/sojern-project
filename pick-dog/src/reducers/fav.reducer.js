import {
    SAVE_DOG
} from '../utils/actionTypes';

export const initialState = {
    imgs: [],
  };

const pickReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_DOG :
            return { ...state, imgs: [...state.imgs, action.payload]};
        default:
            return state
    }
}

export default pickReducer;