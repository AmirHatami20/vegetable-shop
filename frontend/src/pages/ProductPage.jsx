import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCartItem} from "../redux/Slices/productSlice.js"
import SwiperWrapper from "../components/SwiperWrapper.jsx";

function ProductPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productData = useSelector((state) => state.product.productList);

    const mainProduct = productData.find(product => product._id === id);

    if (!mainProduct) {
        return [];
    }

    const filteredCategory = productData.filter(
        (product) => product.category.name.toLowerCase() === mainProduct.category.name.toLowerCase()
    );

    const filteredProduct = filteredCategory.filter(product => product._id !== id);

    const handleBuy = () => {
        dispatch(addCartItem(mainProduct))
        navigate("/cart")
    }
    const handleAddCartProduct = () => {
        dispatch(addCartItem(mainProduct))
    }

    return (
        <div className="">
            <div className="bg-white mx-auto md:w-2/3 w-full">
                {mainProduct ?
                    <div className="p-3 grid md:grid-cols-2 grid-cols-1 gap-x-4">
                        <div className="h-80 w-full bg-gray-100">
                            <img
                                className="w-full h-full hover:scale-105 transition-all object-contain"
                                src={mainProduct.imageUrl}
                                alt="product-img"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
                                {mainProduct.name}
                            </h3>
                            <p className=" text-slate-500  font-medium text-2xl">
                                {mainProduct.category.title}
                            </p>
                            <p className=" font-bold md:text-2xl">
                                <span className="text-red-500 ">$</span>
                                <span>{mainProduct.price}</span>
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleBuy}
                                    className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 px-3"
                                >
                                    خرید
                                </button>
                                <button
                                    onClick={handleAddCartProduct}
                                    className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 px-3"
                                >
                                    افزودن به سبد
                                </button>
                            </div>
                            <div>
                                <p className="text-slate-600 font-medium">توضیحات : </p>
                                <p className="line-clamp-3 mt-2">{mainProduct.description}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-lg w-full min-h-40 flex items-center justify-center">
                        Loading...
                    </div>
                }
            </div>
            <SwiperWrapper
                items={filteredProduct}
                title="محصولات مرتبط"
            />

        </div>
    );
}

export default ProductPage;