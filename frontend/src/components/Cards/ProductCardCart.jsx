import {useDispatch} from "react-redux";
import {decreaseQty, deleteCartItem, increaseQty} from "../../redux/Slices/productSlice.js";
import {AiFillDelete} from "react-icons/ai";
import {TbMinus, TbPlus} from "react-icons/tb";
import {toPersianNumber} from "../../utils/helper.js";

function ProductCardCart(props) {
    const dispatch = useDispatch()

    return (
        <div className="bg-slate-200 w-full flex justify-between md:h-52 h-40 p-2 rounded border border-slate-300">
            <div className="flex gap-2">
                <div className="md:w-[200px] w-[110px] h-full rounded overflow-hidden">
                    <img
                        src={props.imageUrl}
                        alt="product-img"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex flex-col md:space-y-2 space-y-1 py-2">
                    <h3 className="font-semibold text-slate-600  capitalize md:text-xl text-sm">
                        {props.name}
                    </h3>
                    <p className=" text-slate-500  md:font-medium text-xs">{props.category.title}</p>
                    <p className="flex gap-x-1.5 font-bold text-base">
                        <span>{toPersianNumber(props.price)}</span>
                        <span className="text-red-500 ">تومان</span>
                    </p>
                    <div className="flex md:gap-3 gap-1 items-center">
                        <button
                            onClick={() => dispatch(increaseQty(props._id))}
                            className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 md:text-base text-xs">
                            <TbPlus/>
                        </button>
                        <p className="font-semibold p-1">{props.qty}</p>
                        <button
                            onClick={() => dispatch(decreaseQty(props._id))}
                            className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 md:text-base text-xs"
                        >
                            <TbMinus/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end py-2">
                <div
                    className="cursor-pointer md:text-lg text-slate-700 hover:text-red-500"
                    onClick={() => dispatch(deleteCartItem(props._id))}>
                    <AiFillDelete/>
                </div>
                <p className="flex gap-x-2 font-semibold text-slate-700 text-sm md:text-xl">
                    مجموع:{" "}
                    <div className="flex gap-x-1">
                        <span>{toPersianNumber(props.total)}</span>
                        <span className="text-red-500">تومان</span>
                    </div>
                </p>
            </div>
        </div>
    );
}

export default ProductCardCart;