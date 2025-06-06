import {useState} from 'react';
import {toast} from 'react-toastify';
import {BsCloudUpload} from 'react-icons/bs';
import {API_PATHS} from '../utils/apiPaths.js';
import axiosInstance from "../utils/axiosInstance.js";
import {useSelector} from "react-redux";

function NewProductPage() {
    const categoryData = useSelector((state) => state.category.categoryList);

    const [data, setData] = useState({
        name: '',
        category: '',
        image: null,
        imagePreview: '',
        price: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);

    const resetFields = () => {
        setData({
            name: '',
            category: '',
            image: null,
            imagePreview: '',
            price: '',
            description: ''
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {name, category, image, price, description} = data;

        if (!name || !category || !image || !price) {
            toast.error("لطفاً تمام فیلدهای ضروری را پر کنید");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('image', image);

            const res = await axiosInstance.post(API_PATHS.PRODUCT.CREATE_PRODUCT, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            if (res.status === 201) {
                toast.success("محصول با موفقیت اضافه شد!");
                resetFields();
            } else {
                toast.error(res?.data?.message || "خطایی رخ داده است");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "مشکل در ثبت محصول");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <form
                className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">
                    نام محصول:
                    <input
                        type="text"
                        name="name"
                        className="auth-input"
                        onChange={handleInputChange}
                        value={data.name}
                    />
                </label>

                <label htmlFor="category">
                    دسته‌بندی:
                    <select
                        className="auth-input"
                        id="category"
                        name="category"
                        onChange={handleInputChange}
                        value={data.category}
                    >
                        <option value="">
                            دسته بندی...
                        </option>
                        {categoryData.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block mb-2">تصویر:</label>
                <div
                    className="h-40 w-full bg-slate-200 rounded flex items-center justify-center relative overflow-hidden cursor-pointer"
                    onClick={() => document.getElementById('image').click()}
                >
                    {data.imagePreview ? (
                        <img
                            src={data.imagePreview}
                            alt="پیش‌نمایش"
                            className="h-full object-contain"
                        />
                    ) : (
                        <span className="text-5xl text-gray-500">
                            <BsCloudUpload/>
                        </span>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    id="image"
                    className="hidden"
                    onChange={handleFileChange}
                />


                <label htmlFor="price" className="my-1">
                    قیمت:
                    <input
                        type="number"
                        className="auth-input"
                        name="price"
                        onChange={handleInputChange}
                        value={data.price}
                    />
                </label>

                <label htmlFor="description">
                    توضیحات:
                    <textarea
                        rows={3}
                        className="auth-input"
                        name="description"
                        onChange={handleInputChange}
                        value={data.description}
                    />
                </label>

                <button
                    className={`bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow py-2 rounded ${
                        loading && 'opacity-60 cursor-not-allowed'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'در حال ذخیره...' : 'ذخیره محصول'}
                </button>
            </form>
        </div>
    );
};

export default NewProductPage;
