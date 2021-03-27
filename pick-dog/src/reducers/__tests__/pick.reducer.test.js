import pick, {initialState} from '../pick.reducer';
import {
    REQUEST_DOG
} from '../../utils/actionTypes';



describe('test pick reducer', () => {
    it('should return initial state on missing action',  () => {
        const state = pick(initialState, {type: 'other'});
        expect(state).toEqual(initialState);
    });
    it(`should add image to state, on ${REQUEST_DOG}--pending action`, () => {
        const currentState = initialState;
        const state = pick(currentState, {type: `${REQUEST_DOG}--pending`});
        expect(state).not.toEqual(initialState);
        expect(state.loading).toEqual(true);

    });
    it(`should add image to state, on ${REQUEST_DOG}--failure action`, () => {
        const currentState = {...initialState, loading: true}
        const state = pick(currentState, {type: `${REQUEST_DOG}--failure`});
        expect(state).not.toEqual(currentState);
        expect(state.loading).toEqual(false);
    });
    it(`should add image to state, on ${REQUEST_DOG}--success action`, () => {
        const payload = [{
            data: { url: `http://mock_image/1.jpg` }
        }];
        const currentState = {...initialState, loading: true}
        const state = pick(currentState, {type: `${REQUEST_DOG}--success`, payload});
        expect(state).not.toEqual(currentState);
        expect(state.loading).toEqual(false);
        expect(state.imgs).toEqual([
            { url: `http://mock_image/1.jpg`, id: '/1', type: 'jpg' },
        ]);
    });
});