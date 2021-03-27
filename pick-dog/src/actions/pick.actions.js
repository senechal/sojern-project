import { get } from 'axios';
import {
    NUMBER_OF_DOGS_PER_REQUEST,
    API_URL,
} from '../utils/constants';

import {
    REQUEST_DOG,
    SAVE_DOG,
} from '../utils/actionTypes';

const getDogsImgs = () => {
    const range = [...Array(NUMBER_OF_DOGS_PER_REQUEST)];
    const promises = range.map(() => {
        return get(API_URL);
    });
    return Promise.all(promises);
};
const getActionLifecicle = (action) => ({
    pending: `${action}--pending`,
    success: `${action}--success`,
    failure: `${action}--failure`,
});


const trigger = (type, payload) => ({type, payload});

export const requestDogs = () => dispatch => {
    const {
        pending,
        success,
        failure,
    } = getActionLifecicle(REQUEST_DOG);
    dispatch(trigger(pending));


    return getDogsImgs().then((res) => {
        dispatch(trigger(success, res));
    }).catch(err => {
        dispatch(trigger(failure, err));
    });
}

export const saveImg = (id) => (dispatch, getState) => {
    const { pick: { imgs}} = getState();
    const img = imgs.find(({id: imgId}) => imgId === id);
    if(img){
        dispatch(trigger(SAVE_DOG, {...img}));
    }
}