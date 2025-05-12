import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authSlice";
import homeReducer from "../features/home/homeSlice";
import productsReducer from "../features/products/productsSlice";
import categoryReducer from "../features/categories/categoriesSlice";
import reviewReducer from "../features/reviews/reviewsSlice";
import filterReducer from "../features/filters/filterSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import returnReducer from "../features/return_products/returnSlice";
import paymentReducer from "../features/payment/paymentSlice";
import promoCodeReducer from "../features/promocode/promocodeSlice";
const rootReducer = combineReducers({
    users: userReducer,
    home: homeReducer,
    products: productsReducer,
    category: categoryReducer,
    reviews: reviewReducer,
    filters: filterReducer,
    cart: cartReducer,
    orders: orderReducer,
    returnRequests: returnReducer,
    payment: paymentReducer,
    promoCode: promoCodeReducer,
});

export default rootReducer;