import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import ProductCard from "./Cards/ProductCard.jsx";
import {GrNext, GrPrevious} from "react-icons/gr";
import {useRef} from "react";

function SwiperWrapper({title, items}) {
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

    return (
        <div className="md:mt-12 mt-6">
            <div className="flex justify-between items-center w-full">
                <h2 className="font-bold tracking-wide text-slate-800 xl:text-2xl text-lg">
                    {title}
                </h2>
                <div className="flex gap-3">
                    <button
                        ref={nextBtnRef}
                        className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded ">
                        <GrNext/>
                    </button>
                    <button
                        ref={prevBtnRef}
                        className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded">
                        <GrPrevious/>
                    </button>
                </div>
            </div>
            <div className="md:mt-5 mt-3">
                {items.length ?
                    <Swiper
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            480: {
                                slidesPerView: 2,
                            },
                            800: {
                                slidesPerView: 3,
                            },
                            1000: {
                                slidesPerView: 4,
                            },
                            1280: {
                                slidesPerView: 5,
                            },
                            1700: {
                                slidesPerView: 6,
                            }
                        }}
                        modules={[Pagination, Navigation]}
                        navigation={{
                            prevEl: prevBtnRef.current,
                            nextEl: nextBtnRef.current,
                        }}
                        spaceBetween={15}
                    >
                        {items.map((product) => (
                            <SwiperSlide key={product._id}>
                                <ProductCard
                                    {...product}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    : (
                        <div className="text-center text-red-500">
                            محصولی یافت نشد.
                        </div>
                    )}
            </div>
        </div>

    );
}

export default SwiperWrapper;