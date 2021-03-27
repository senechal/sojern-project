import fav, {initialState} from '../fav.reducer';
import {
    SAVE_DOG
} from '../../utils/actionTypes';

describe('test fav reducer', () => {
    it('should return initial state on missing action',  () => {
        const currentState = initialState;
        const state = fav(currentState, {type: 'other'});
        expect(state).toEqual(currentState);
    });
    it(`should add image to state, on ${SAVE_DOG} action`, () => {
        const currentState = initialState;
        const state = fav(currentState, {type: SAVE_DOG, payload: 'img'});
        expect(state).not.toEqual(currentState);
        expect(state.imgs).toEqual(['img']);
    });
});