import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
            <p className="mt-4 text-gray-600">
                Oops! The page you&#39;re looking for doesn&#39;t exist.
            </p>
            <Link href="/">
                <a className="mt-6 px-4 py-2 bg-primary text-white rounded-md">
                    Go Back Home
                </a>
            </Link>
        </div>
    );
}