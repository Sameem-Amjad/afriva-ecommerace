"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
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
    "/login",
];

export default function AuthWrapper({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.users);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

    const checkAuth = useCallback(async () => {
        try {
            setLoading(true);
            const {
                data: { session },
            } = await supabase.auth.getSession();
            const isAuthenticated = session?.user;

            if (pathname === "/forget-password") return;

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

            setHasCheckedAuth(true);
        } catch (error) {
            console.error("Auth check error:", error);
            setHasCheckedAuth(true);
        } finally {
            setLoading(false);
            setHasCheckedAuth(true);
        }
    }, [dispatch, pathname, router]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            checkAuth();
        });
        return () => listener.subscription.unsubscribe();
    }, [checkAuth]);

    useEffect(() => {
        if (user?.id) {
            dispatch(getCartItemsThunk(user.id));
            dispatch(fetchGetFavouriteProducts({ userId: user.id, start: 0, limit: 10 }));
        }
    }, [user?.id, dispatch]);

    if (!hasCheckedAuth || loading) return <Loader />;

    return <>{children}</>;
}
