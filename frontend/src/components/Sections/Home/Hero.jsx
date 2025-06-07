import {memo} from "react";
import ProductCard from "../../Cards/ProductCard.jsx";

const Hero = memo(function Hero({productList}) {

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4">
            <div className="flex flex-col space-y-3">
                <h2 className="xl:text-7xl md:text-7xl text-5xl leading-16 md:leading-32 font-bold">
                    سریع‌ترین تحویل درب  {" "}
                    <span className="text-red-600">منزل شما</span>
                </h2>
                <p className="xl:text-xl text-lg leading-8 md:leading-9 mt-3">
                    ما با سرعتی باورنکردنی، محصولات تازه و باکیفیت رو مستقیم به درب منزلتون می‌رسونیم.
                    هر لحظه که بخوای، ما آماده‌ایم تا نیازت رو سریع، راحت و مطمئن برطرف کنیم.
                    تجربه‌ی یک خرید هوشمند، آسون و لذت‌بخش با ما آغاز میشه!
                </p>
                <button className="xl:text-lg font-bold bg-red-500 text-white px-4 py-2 rounded-md w-max">
                    ثبت سفارش
                </button>
            </div>
            <div className="flex flex-wrap gap-5 justify-center md:mt-0 mt-5">
                {productList.length &&
                    productList.map((product) => (
                        <ProductCard
                            key={product._id}
                            mode="home"
                            {...product}
                        />
                    ))
                }
            </div>
        </div>
    );
})

export default Hero;