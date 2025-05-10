"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { Toaster } from "sonner";
import AuthWrapper from "@/hooks/authWrapper";

export default function ClientLayout({ children }) {
    return (
        <Provider store={store}>
            <Toaster position="top-center" richColors />
            <AuthWrapper>
                {children}
            </AuthWrapper>
        </Provider>
    );
}

