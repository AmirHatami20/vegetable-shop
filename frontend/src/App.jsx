import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoutes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import Header from './layout/Header/Header.jsx';
import routes from './routes.jsx';

import 'react-toastify/dist/ReactToastify.css';
import {fetchCategories} from "./redux/Slices/categorySlice.js";
import {fetchProducts} from './redux/Slices/productSlice.js';
import Loader from "./components/Loader.jsx";

function App() {
    const dispatch = useDispatch();
    const router = useRoutes(routes);
    const {loading, error} = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) return <Loader/>;
    if (error) return <p className="flex justify-center items-center min-h-screen text-red-500">سرور خاموش است لطفا مجددا صفحه هارا رفلش کنید تا سرور فعال شود.</p>;

    return (
        <>
            <ToastContainer position="top-center" autoClose={2000}/>
            <Header/>
            {router}
        </>
    );
}

export default App;
