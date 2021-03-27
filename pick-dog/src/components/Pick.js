import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { requestDogs, saveImg } from "../actions/pick.actions";
import { ButtonContainer } from './styles';
import Galery from './Galery';

const Pick = () => {
    const dispatch = useDispatch();
    const { imgs, loading } = useSelector(state => state.pick);

    const handleClickNext = useCallback(() => {
        dispatch(requestDogs());
    }, [dispatch]);

    const handleSaveImg = useCallback((id) => {
        NotificationManager.success('Image added to Favorites!');
        dispatch(saveImg(id));
    }, [dispatch]);

    useEffect(() => {
        if (!imgs.length){
            dispatch(requestDogs());
        }
    }, [dispatch, imgs]);
    return (
        <>
            <Galery imgs={imgs} loading={loading} onSelect={handleSaveImg} selectable />
            <ButtonContainer>
                <button onClick={handleClickNext} data-testid="pick-button">Next</button>
            </ButtonContainer>
        </>
    )
};

export default Pick;