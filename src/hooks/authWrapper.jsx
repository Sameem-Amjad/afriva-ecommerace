"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsThunk } from "@/redux/features/cart/cartThunk";
import { fetchGetFavouriteProducts } from "@/redux/features/products/productsThunk";
import dynamic from "next/dynamic";
const Loader = dynamic(() => import("@/components/Loader/Loader"), { ssr: false });

const privatePaths = ["/cart", "/wishlist", "/profile"];
const notAuthenticatedPaths = [
    "/success",
    "/complete-profile",
    "/setup-profile",
    "/email-verification",
    "/signup",
    "/forget-password",
    "/login",
];

export default function AuthWrapper({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.users);

    const checkAuth = async () => {
        try {
            setLoading(true);
            const {
                data: { session },
            } = await supabase.auth.getSession();
            const isAuthenticated = session && session.user;

            if (isAuthenticated) {
                dispatch(setUser(session.user));
                if (notAuthenticatedPaths.includes(pathname)) {
                    router.push("/");
                }
            } else {
                if (privatePaths.includes(pathname)) {
                    router.push("/");
                }
            }
        } catch (error) {
            toast.error("An error occurred while checking authentication.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [pathname, dispatch]);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            checkAuth();
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (user?.id) {
            dispatch(getCartItemsThunk(user.id));
            dispatch(fetchGetFavouriteProducts({ userId: user.id, start: 0, limit: 10 }));
        }
    }, [user?.id, dispatch]);

    if (loading) return <Loader />;
    return <>{children}</>;
}
