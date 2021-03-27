import {  useSelector } from "react-redux";
import Galery from './Galery';

const Fav = () => {
    const { imgs } = useSelector(state => state.fav);

    return <Galery imgs={imgs} />
};

export default Fav;