import { Link } from "react-router-dom";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/Logo.png";

const Footer = () => {
    return (
        <footer className="px-4 md:px-8 py-10 shadow-md">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Logo & About */}
                <div>
                    <img src={logo} alt="Logo" className="w-16 mb-4" />
                    <p className="leading-6">
                        سایت ما با هدف ارائه بهترین غذاها و خدمات به مشتریان طراحی شده. از انتخاب شما سپاسگزاریم.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">لینک‌های سریع</h3>
                    <ul className="space-y-2">
                        <li><Link to={"/"} className="hover:text-yellow-400">صفحه اصلی</Link></li>
                        <li><Link to={"product/683da1b48fb06213675c1d3f"} className="hover:text-yellow-400">منو</Link></li>
                        <li><Link to={"about"} className="hover:text-yellow-400">درباره ما</Link></li>
                        <li><Link to={"contact"} className="hover:text-yellow-400">تماس با ما</Link></li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">ارتباط با ما</h3>
                    <div className="flex space-x-4 text-xl">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <FaInstagram className="hover:text-pink-500" />
                        </a>
                        <a href="https://t.me" target="_blank" rel="noreferrer">
                            <FaTelegramPlane className="hover:text-blue-400" />
                        </a>
                        <a href="https://wa.me/your-number" target="_blank" rel="noreferrer">
                            <FaWhatsapp className="hover:text-green-400" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} تمام حقوق محفوظ است. | طراحی توسط جیگر ✌️
            </div>
        </footer>
    );
};

export default Footer;
