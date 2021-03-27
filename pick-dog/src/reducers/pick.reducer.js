import {
    REQUEST_DOG
} from '../utils/actionTypes';

export const initialState = {
    imgs: [],
    loading: false,
  };

const getData = (url) => {
    const{ pathname} = new URL(url);
    const [id, type] = pathname.split('.');

    return {id,  type};
}

const pickReducer = (state = initialState, action) => {
    switch(action.type){
        case `${REQUEST_DOG}--pending` :
            return { ...state, loading: true};
        case `${REQUEST_DOG}--failure` :
            return { ...state, loading: false};
        case `${REQUEST_DOG}--success` :{
            const imgs = action.payload.map(({data: {url}}) => ({url, ...getData(url)}));
            return {
                ...state,
                imgs,
                loading: false,
            }
        }
        default:
            return state
    }
}

export default pickReducer;