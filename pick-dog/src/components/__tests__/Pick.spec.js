import { useDispatch, useSelector } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { requestDogs, saveImg } from '../../actions/pick.actions';
import {
  NUMBER_OF_DOGS_PER_REQUEST,
} from '../../utils/constants';
import Pick from '../Pick';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../actions/pick.actions', () => ({
    requestDogs: jest.fn(),
    saveImg: jest.fn(),
}));

describe('Pick tests', () => {

  const dispatch = jest.fn();

  const getImages = () => {
    const range = [...Array(NUMBER_OF_DOGS_PER_REQUEST)];
    return  range.map((v, index) => {
      return { url: `http://mock_image/${index}.jpg`, id: index.toString(), type: 'jpg' }
    });
  }
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    requestDogs.mockReturnValue('request-dogs-action');
    saveImg.mockReturnValue('save-img-action');
  });

  afterEach(() => {
    dispatch.mockClear();
  });
  it('should, render correctly while loading', () => {
    useSelector.mockReturnValueOnce({loading: true, imgs: []});
    const { container } = render(<Pick />);
    expect(dispatch).toBeCalledWith('request-dogs-action');
    expect(requestDogs).toBeCalled();
    expect(container).toMatchSnapshot();
  });
  it('should, render correctly with imgs', () => {
    useSelector.mockReturnValueOnce({loading: false, imgs: getImages()});
    const { container } = render(<Pick />);
    expect(container).toMatchSnapshot();
  });
  it('should update fotos on button click', () => {
    useSelector.mockReturnValueOnce({loading: false, imgs: getImages()});
    const { getByTestId } = render(<Pick />);
    const button = getByTestId('pick-button');
    fireEvent.click(button);
    expect(dispatch).toBeCalledWith('request-dogs-action');
    expect(requestDogs).toBeCalled();
  });
  it('should save Image to favorites on image click', () => {
    useSelector.mockReturnValueOnce({loading: false, imgs: getImages()});
    const { getAllByTestId } = render(<Pick />);
    const imgs = getAllByTestId('galery-image');
    fireEvent.click(imgs['0']);
    expect(dispatch).toBeCalledWith('save-img-action');
    expect(saveImg).toBeCalledWith('0');
  });
});
