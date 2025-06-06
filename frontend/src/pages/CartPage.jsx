import React from 'react';
import {useSelector} from 'react-redux';
import ProductCardCart from "../components/Cards/ProductCardCart.jsx";
import {toPersianNumber} from "../utils/helper.js";
import {Link} from "react-router-dom";

const CartSection = ({children, title}) => {
    return (
        <div className="w-full rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="bg-red-500 text-white text-lg md:text-xl font-bold px-4 py-3">
                {title}
            </div>
            <div className="bg-white p-4 space-y-4">
                {children}
            </div>
        </div>
    );
};

function CartPage() {
    const productCartItem = useSelector((state) => state.product.cartItem);

    const totalPrice = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.total),
        0
    );
    const totalQty = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.qty),
        0
    );

    return (
        <div className="mt-4 md:mt-6 px-2 md:px-0">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <CartSection title="سبد خرید">
                        {productCartItem.length > 0 ? (
                            productCartItem.map((product) => (
                                <ProductCardCart key={product._id} {...product} />
                            ))
                        ) : (
                            <div
                                className="w-full h-24 flex items-center justify-center text-gray-500 text-base md:text-lg">
                                سبد خرید شما خالی است.
                            </div>
                        )}
                    </CartSection>
                </div>

                <div className="w-full md:w-[350px]">
                    <CartSection title="اطلاعات پرداخت">
                        <div className="space-y-3 text-sm md:text-base">
                            <div className="flex justify-between">
                                <span>مبلغ کل:</span>
                                <span>{toPersianNumber(totalPrice)} تومان</span>
                            </div>
                            <div className="flex justify-between">
                                <span>تعداد کل:</span>
                                <span>{toPersianNumber(totalQty)} عدد</span>
                            </div>
                            <Link to={""} className="block w-full">
                                <button
                                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm md:text-base rounded-lg py-2 transition-all"
                                >
                                    ثبت سفارش
                                </button>
                            </Link>
                        </div>
                    </CartSection>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
