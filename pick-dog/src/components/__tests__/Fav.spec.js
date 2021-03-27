import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import Fav from '../Fav';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Fav tests', () => {

  it('should, render when empty', () => {
    useSelector.mockReturnValueOnce({ imgs: []});
    const { container } = render(<Fav />);
    expect(container).toMatchSnapshot();
  });
  it('should, render when not empty', () => {
    useSelector.mockReturnValueOnce({ imgs: [{id: '1', url: 'http://mock_image/1.jpg', type: 'jpg'}]});
    const { container } = render(<Fav />);
    expect(container).toMatchSnapshot();
  });
});
