import Link from "next/link";
import { generateMetadata as createMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "404 - Page Not Found",
  description:
    "The page you are looking for could not be found. Return to Feedbacker.io to continue collecting anonymous feedback.",
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mt-2">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Home
          </Link>

          <div className="text-sm text-gray-500">
            <p>
              Or try{" "}
              <Link href="/signup" className="text-indigo-600 hover:underline">
                signing up
              </Link>{" "}
              to start collecting feedback
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
