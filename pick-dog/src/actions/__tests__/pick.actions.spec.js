import { get } from 'axios';
import * as functions from '../pick.actions';
import {
    REQUEST_DOG,
    SAVE_DOG,
} from '../../utils/actionTypes';
import {
    NUMBER_OF_DOGS_PER_REQUEST,
} from '../../utils/constants';

const createMockThunk = (dispatch, getState, actions) => {
    return Object.keys(actions).reduce((acc, key) => {
        return {
            ...acc,
            [key]: (...args) => {return actions[key](...args)(dispatch, getState)},
        }
    }, {})
};

jest.mock('axios', () => ({
    get: jest.fn(),
}));


describe('testing pick actions', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const actions = createMockThunk(dispatch,getState,  functions);
    describe('saveImg', () => {
        const { saveImg } = actions;
        const img = {id: '1', url: 'http://mock_image/1.jpg', type: 'jpg'};
        const state = {
            pick:  {
                imgs: [img]
            }
        }
        afterEach(() => {
            dispatch.mockReset();
        });
        it('should dispatch action with image from state',  () => {
            getState.mockReturnValueOnce(state);
            saveImg('1');
            expect(dispatch).toBeCalledWith({type: SAVE_DOG, payload: img});
        });
        it('should not dispatch if id not in pick state',  () => {
            getState.mockReturnValueOnce(state);
            saveImg('2');
            expect(dispatch).not.toBeCalled();
        });
    });

    describe('requestDogs', () => {
        const { requestDogs } = actions;

        afterEach(() => {
            dispatch.mockReset();
        });
        it('should call dispatch with succes message and request payload on successfull request', async () => {
            const payload = [...Array(NUMBER_OF_DOGS_PER_REQUEST).fill('success-payload')];
            get.mockResolvedValue('success-payload');
            await requestDogs();
            expect(dispatch).toBeCalledWith({type: `${REQUEST_DOG}--pending`});
            expect(dispatch).toBeCalledWith({type: `${REQUEST_DOG}--success`, payload });
        });
        it('should call dispatch with error message if fail the request', async () => {
            const error = new Error('error');
            get.mockRejectedValue(error);
            await requestDogs();
            expect(dispatch).toBeCalledWith({type: `${REQUEST_DOG}--pending`});
            expect(dispatch).toBeCalledWith({type: `${REQUEST_DOG}--failure`, payload: error });
        });
    });
});