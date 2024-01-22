import { Routes, Route, Navigate, } from 'react-router-dom'
import HomePage from '../pages/user/HomePage';
import ProductPage from '../pages/user/ProductPage';
import SignInPage from '../pages/user/SignIn';
import SignUpPage from '../pages/user/SignUp';
import ProductDetailPage from '../pages/user/ProductDetailPage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Dashboard from '../pages/admin/Dashboard';
import CartPage from '../pages/user/CartPage';
import User from "../pages/admin/UserAdmin";
import ProductAdmin from '../pages/admin/ProductAdmin';
import UserLayout from '../components/layout/user/index'
import NotFound from '../pages/user/NotFound';
import LoginLayout from '../components/layout/login';
import BrandAdmin from '../pages/admin/BrandAdmin';
import WishlistPage from '../pages/user/WishlistPage';
import ProtectedRoute from './ProtectedRoute';
import CheckoutPage from '../pages/user/CheckoutPage1';
import OrderAdmin from '../pages/admin/OrderAdmin';
import VoucherAdmin from '../pages/admin/VoucherAdmin';
import PaymentResult from '../pages/user/PaymentResult';
import AdminProtectedRoute from './AdminProtectedRoute';
import UserPage from '../pages/user/UserPage';
import UserProfile from '../components/pages/user/Body/UserProfile';
import UserOrder from '../components/pages/user/Body/UserOrder';
import ImageProductAdmin from '../pages/admin/ImageProductAdmin';


const SwitchRoute = () => {
    return (
        <Routes>
            {/* admin */}
            <Route path='/admin' element={<AdminProtectedRoute />}>
                <Route index element={<Dashboard />}></Route>
                <Route path='user-manager' element={<User />}></Route>
                <Route path='brand-manager' element={<BrandAdmin />}></Route>
                <Route path='product-manager' element={<ProductAdmin />}></Route>
                <Route path='image-product-manager' element={<ImageProductAdmin />}></Route>
                <Route path='orders-manager' element={<OrderAdmin />}></Route>
                <Route path='voucher-manager' element={<VoucherAdmin />}></Route>
            </Route>

            {/* user */}
            <Route path='/' element={<UserLayout />}>
                <Route index element={<HomePage />}></Route>
                <Route path='allProducts/' element={<ProductPage />}></Route>
                <Route path='allProducts/:slug' element={<ProductPage />}></Route>
                <Route path='product/:id' element={<ProductDetailPage />}></Route>
                <Route path="*" element={<NotFound />} />
                <Route path='payment' element={<PaymentResult />}></Route>
            </Route>

            <Route path='/' element={<LoginLayout />}>
                <Route path='sign-in' element={<SignInPage />}></Route>
                <Route path='sign-up' element={<SignUpPage />}></Route>
            </Route>

            <Route path='/' element={<ProtectedRoute />}>
                <Route path='wishlist' element={<WishlistPage />}></Route>
                <Route path='user' element={<UserPage />}>
                    <Route index element={<UserProfile />}></Route>
                    <Route path='order' element={<UserOrder />}></Route>
                </Route>
                <Route path='cart' element={<CartPage />}></Route>
                <Route path='checkout' element={<CheckoutPage />}></Route>

            </Route>
        </Routes>
    );
}

export default SwitchRoute;