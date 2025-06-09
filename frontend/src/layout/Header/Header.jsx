import {useState} from "react";
import {Link} from "react-router-dom";

import logo from "../../assets/Logo.png";

import {HiOutlineUserCircle} from "react-icons/hi";
import {BsCartFill} from "react-icons/bs";
import {MdOutlineAddToPhotos} from "react-icons/md";
import {GrLogin} from "react-icons/gr";

import {useDispatch, useSelector} from "react-redux";
import {logoutRedux} from "../../redux/Slices/userSlice.js";
import {toast} from 'react-toastify'

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const cartItemNumber = useSelector((state) => state.product.cartItem)

    const handleShowMenu = () => {
        setShowMenu((prevState) => !prevState);
    };
    const handleLogout = () => {
        dispatch(logoutRedux());
        toast.success("Logout successfully");
    };

    return (
        <header className="fixed shadow-md w-full h-22 px-4 md:px-4 z-50 bg-white">
            <div className="container flex items-center h-full justify-between">
                <div className="flex items-center gap-x-5">
                    <div className="w-14">
                        <Link to={"/"}>
                            <img
                                alt="logo"
                                src={logo}
                                className="h-full"
                            />
                        </Link>
                    </div>
                    <nav className="gap-4 md:gap-5 text-base md:text-lg hidden md:flex">
                        <Link to={""}>صفحه اصلی</Link>
                        <Link to={"product/683da1b48fb06213675c1d3f"}>لیست منو ها</Link>
                        <Link to={""}>ارتباط با ما</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4 md:gap-5">
                    <div className="text-3xl text-slate-600 relative">
                        <Link to={"cart"}>
                            <BsCartFill/>
                            <div
                                className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center"
                            >
                                {cartItemNumber.length}
                            </div>
                        </Link>
                    </div>
                    <div
                        onClick={handleShowMenu}
                        className=" text-slate-600"
                    >
                        <div className="text-4xl cursor-pointer rounded-full overflow-hidden drop-shadow-md py-2">
                            {userData.image ? (
                                <img
                                    alt="user-img"
                                    src={userData.image}
                                    className="h-full w-full"
                                />
                            ) : (
                                <HiOutlineUserCircle/>
                            )}
                        </div>
                        {showMenu && (
                            <div
                                className="absolute left-4 bg-white p-2  shadow drop-shadow-md flex flex-col min-w-[120px] ">
                                <Link
                                    to={"new-product"}
                                    className="flex items-center gap-x-2 whitespace-nowrap cursor-pointer p-2 border-b border-gray-200 hover:text-red-700 transition-colors"
                                >
                                    <MdOutlineAddToPhotos/>
                                    افزودن محصول
                                </Link>
                                {userData.image ? (
                                    <p
                                        className="cursor-pointer text-white px-2 bg-red-500"
                                        onClick={handleLogout}
                                    >
                                        Logout ({userData.firstName})
                                    </p>
                                ) : (
                                    <Link
                                        to={"login"}
                                        className="flex items-center gap-x-2 whitespace-nowrap p-2 cursor-pointer px-2 hover:text-red-700 transition-colors"
                                    >
                                        <GrLogin/>
                                        ورود
                                    </Link>
                                )}

                                <nav
                                    className="text-base md:text-lg flex flex-col md:hidden pt-2 border-t border-gray-300"
                                >
                                    <Link
                                        to={""}
                                        className="px-2 py-1"
                                    >
                                        خانه
                                    </Link>
                                    <Link
                                        to={"menu/684028c0d6711f95e34bea47"}
                                        className="px-2 py-1"
                                    >
                                        منوها
                                    </Link>
                                    <Link
                                        to={"about"}
                                        className="px-2 py-1">
                                        درباره ما
                                    </Link>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
