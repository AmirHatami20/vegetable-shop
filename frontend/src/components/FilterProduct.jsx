import React from 'react';
import {CiForkAndKnife} from "react-icons/ci";

function FilterProduct({category, onClick,isActive}) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center">
            <span className={`text-3xl p-5 rounded-full cursor-pointer ${isActive ? "bg-red-600 text-white" : "bg-yellow-500"}`}>
                <CiForkAndKnife/>
            </span>
            <span className="font-semibold">
                {category}
            </span>
        </div>
    );
}

export default FilterProduct;