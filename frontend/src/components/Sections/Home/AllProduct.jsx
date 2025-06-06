import React from 'react';
import ProductCard from "../../Cards/ProductCard.jsx";
import FilterProduct from "../../FilterProduct.jsx";

function AllProduct({categoryList, productList, handleFilterProduct, filterby}) {
    return (
        <div className="md:mt-12 mt-6">
            <h2 className="font-bold tracking-wide text-slate-800 xl:text-2xl text-lg">
                تمام محصولات
            </h2>
            <div className="flex flex-wrap justify-center gap-5">
                {categoryList.length ?
                    categoryList.map((category) => (
                        <FilterProduct
                            key={category._id}
                            category={category.title}
                            onClick={() => handleFilterProduct(category?.name?.toLowerCase())}
                            isActive={(category?.name || '').toLowerCase() === (filterby || '').toLowerCase()}
                        />
                    ))
                    :
                    <div className="text-lg w-full min-h-40 flex items-center justify-center">
                        Loading...
                    </div>
                }
            </div>
            {productList.length ? (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:mt-8 mt-5"
                >
                    {productList.map((product) => (
                        <ProductCard
                            key={product._id}
                            {...product}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-red-500 mt-5">
                    محصولی یافت نشد.
                </div>
            )
            }

        </div>
    );
}

export default AllProduct;