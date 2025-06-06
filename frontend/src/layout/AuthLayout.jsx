import {useState, useCallback} from "react";
import axiosInstance from "../utils/axiosInstance.js";
import {API_PATHS} from "../utils/apiPaths.js";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import loginSignupImage from "../assets/login-animation.gif";
import {BiHide, BiShow} from "react-icons/bi";

function AuthLayout({mode}) {
    const navigate = useNavigate();

    const initialData = mode === "login"
        ? {email: "", password: ""}
        : {firstName: "", lastName: "", image: null, imagePreview: "", email: "", password: "", confirmPassword: ""};

    const [data, setData] = useState(initialData);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleShowPassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const handleShowConfirmPassword = useCallback(() => {
        setShowConfirmPassword((prev) => !prev);
    }, []);

    const handleOnChange = useCallback((e) => {
        const {name, value} = e.target;
        setData((prev) => ({...prev, [name]: value}));
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setData((prev) => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const validateSignUp = () => {
        const {firstName, email, password, confirmPassword} = data;

        if (!firstName || !email || !password || !confirmPassword) {
            toast.error("لطفا تمام فیلدهای ضروری را پر کنید");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("رمز عبور و تکرار آن یکسان نیستند");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mode === "signUp") {
                if (!validateSignUp()) return;

                const formData = new FormData();
                formData.append("firstName", data.firstName);
                formData.append("lastName", data.lastName);
                formData.append("email", data.email);
                formData.append("password", data.password);

                if (data.image) {
                    formData.append("image", data.image);
                }

                const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                });

                toast.success(res.data.message || "ثبت نام با موفقیت انجام شد");
                navigate("/login");
            } else {
                const {email, password} = data;

                const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                    email,
                    password,
                })

                toast.success(res.data.message || "ورود موفقیت آمیز بود");
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "خطایی رخ داده است");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4 rounded-md shadow-md">
                <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
                    <img
                        alt="login-gif"
                        src={data.imagePreview || loginSignupImage}
                        className="w-full h-full object-cover"
                    />

                    {mode === "signUp" && (
                        <label
                            htmlFor="profileImage"
                            className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer"
                            title="آپلود عکس پروفایل"
                        >
                            <p className="text-sm p-1 text-white select-none">بارگذاری</p>
                            <input
                                type="file"
                                id="profileImage"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    )}
                </div>

                <form className="w-full py-3 flex flex-col space-y-4" onSubmit={handleSubmit} noValidate>
                    {mode === "signUp" && (
                        <>
                            <label htmlFor="firstName" className="flex flex-col">
                                نام:
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="auth-input"
                                    value={data.firstName}
                                    onChange={handleOnChange}
                                    required
                                    autoComplete="given-name"
                                />
                            </label>

                            <label htmlFor="lastName" className="flex flex-col">
                                نام خانوادگی:
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="auth-input"
                                    value={data.lastName}
                                    onChange={handleOnChange}
                                    autoComplete="family-name"
                                />
                            </label>
                        </>
                    )}

                    <label htmlFor="email" className="flex flex-col">
                        ایمیل:
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="auth-input"
                            value={data.email}
                            onChange={handleOnChange}
                            required
                            autoComplete="email"
                        />
                    </label>

                    <label htmlFor="password" className="flex flex-col">
                        رمز عبور:
                        <div className="auth-input relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full bg-slate-200 border-none outline-none px-2 py-1"
                                value={data.password}
                                onChange={handleOnChange}
                                required
                                autoComplete={mode === "login" ? "current-password" : "new-password"}
                            />
                            <span
                                className="text-xl cursor-pointer absolute bottom-2.5 left-2 select-none"
                                onClick={handleShowPassword}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleShowPassword()}
                            >
                             {showPassword ? <BiShow/> : <BiHide/>}
                          </span>
                        </div>
                    </label>

                    {mode === "signUp" && (
                        <label htmlFor="confirmPassword" className="flex flex-col">
                            تکرار رمز عبور:
                            <div className="auth-input relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="w-full bg-slate-200 border-none outline-none px-2 py-1"
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                    autoComplete="new-password"
                                />
                                <span
                                    className="text-xl cursor-pointer absolute bottom-2.5 left-2 select-none"
                                    onClick={handleShowConfirmPassword}
                                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleShowConfirmPassword()}
                                >
                                  {showConfirmPassword ? <BiShow/> : <BiHide/>}
                                </span>
                            </div>
                        </label>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded hover:border-t-red-700 transition-colors"
                    >
                        {mode === "signUp" ? "ثبت نام" : "ورود"}
                    </button>
                </form>

                <p className="text-right text-sm mt-4">
                    {mode === "signUp" ? "قبلا ثبت نام کرده‌اید؟" : "حساب کاربری ندارید؟"}{" "}
                    <Link
                        to={mode === "signUp" ? "/login" : "/sign-up"}
                        className="text-red-500 underline"
                    >
                        {mode === "signUp" ? "ورود" : "ثبت نام"}
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default AuthLayout;
