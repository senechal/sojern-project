import PropTypes from 'prop-types';
import { Img, GaleryContent, Loading } from './styles';

const Galery = ({imgs, loading, onSelect, selectable}) => {
    const handleImageClick = (event) => {
        const { id } = event.target.dataset;
        if(id) {
            onSelect(id);
        }
    }

    return (
        <>
        <GaleryContent onClick={selectable ? handleImageClick :  undefined}>
            {
                loading
                    ? <Loading data-testid="loading-icon"/>
                    : imgs.map(({url, id, type}) => <Img key={id} src={url} data-id={id} alt={url} loading="lazy" selectable={selectable} data-testid="galery-image"/>)
            }
        </GaleryContent>
        </>
    )
}

Galery.propTypes = {
    imgs: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        id: PropTypes.string,
        type: PropTypes.string,
    })),
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    selectable: PropTypes.bool,
};

Galery.defaultProps = {
    imgs: [],
    loading: false,
    onSelect: Function.prototype,
    selectable: false,
};

export default Galery;