import React from 'react';
import SwiperWrapper from "../../SwiperWrapper.jsx";

function FreshVegetable({productList}) {
    return (
        <SwiperWrapper
            items={productList}
            title="سبزیجات تازه"
        />
    );
}

export default FreshVegetable;