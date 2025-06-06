import {useState} from "react";
import {useSelector} from "react-redux";

import Hero from "../components/Sections/Home/Hero.jsx";
import AllProduct from "../components/Sections/Home/AllProduct.jsx";
import FreshVegetable from "../components/Sections/Home/FreshVegetable.jsx";

function HomePage() {
    const productData = useSelector((state) => state.product.productList);
    const categoryData = useSelector((state) => state.category.categoryList);

    const [filterby, setFilterby] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const homeCardList = productData.slice(0, 4);
    const VegetableList = productData.filter(
        (product) => product.category.name === 'vegetable'
    )

    const handleFilterProduct = (category) => {
        if (filterby === category) {
            // Unselect category filter
            setFilterby("");
            setFilteredProducts(productData);
        } else {
            // Apply new category filter
            setFilterby(category);

            const filter = productData.filter(
                (el) => el?.category?.name?.toLowerCase() === category
            );

            setFilteredProducts(filter);
        }
    };

    return (
        <div>
            {/* Hero */}
            <Hero
                productList={homeCardList}
            />
            {/* Vegetables */}
            <FreshVegetable
                productList={VegetableList}
            />
            {/* Categories */}
            <AllProduct
                productList={filteredProducts.length > 0 || filterby ? filteredProducts : productData}
                categoryList={categoryData}
                handleFilterProduct={handleFilterProduct}
                filterby={filterby}
            />
        </div>
    );
}

export default HomePage;