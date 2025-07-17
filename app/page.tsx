"use client";
import Link from "next/link";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FAQSection from "@/components/FAQSection";
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Collect Feedback. Privately. Instantly.
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          Feedbacker.io helps you get honest, anonymous feedback from teammates,
          friends, or your audience — using one simple link.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/signup"
            className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Get Started for Free
          </Link>
          <Link
            href="/login"
            className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-indigo-600 transition"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Feedbacker.io?</h2>
        <div className="grid sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="text-indigo-600 text-3xl mb-2">🕵️</div>
            <h3 className="text-xl font-semibold mb-2">Anonymous Feedback</h3>
            <p className="text-gray-600">
              Receive honest responses without pressuring the sender to reveal
              identity.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="text-indigo-600 text-3xl mb-2">🔗</div>
            <h3 className="text-xl font-semibold mb-2">One Shareable Link</h3>
            <p className="text-gray-600">
              Share your feedback form link anywhere: LinkedIn, Twitter, email,
              or portfolio.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="text-indigo-600 text-3xl mb-2">📊</div>
            <h3 className="text-xl font-semibold mb-2">Simple Dashboard</h3>
            <p className="text-gray-600">
              View all feedback neatly in one clean, private dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-base md:text-lg">
          Getting feedback anonymously is now easier than ever. Just follow
          these simple steps.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="bg-gray-50 hover:bg-indigo-50 transition-all rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="text-indigo-600 text-5xl mb-6">📝</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Create Your Account
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sign up in seconds and instantly get your personalized feedback
              link.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-50 hover:bg-indigo-50 transition-all rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="text-indigo-600 text-5xl mb-6">🔗</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Share Your Link
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Post your link anywhere — social media, resumes, portfolios, or
              emails.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 hover:bg-indigo-50 transition-all rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="text-indigo-600 text-5xl mb-6">📬</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Receive Feedback
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get messages directly to your private dashboard — anonymously and
              instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="bg-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Try It Live</h2>
          <p className="text-gray-600 mb-8">
            Experience how easy it is to send anonymous feedback — no login
            required.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <textarea
              disabled
              rows={3}
              placeholder="Type your anonymous feedback here..."
              className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 bg-white text-sm text-gray-600 shadow-sm cursor-not-allowed"
            />

            <button
              disabled
              className="mt-4 w-full bg-indigo-400 text-white text-sm font-medium py-2.5 px-5 rounded-md opacity-60 cursor-not-allowed"
            >
              Submit Feedback
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Live demo submissions will be available soon.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />
      {/* FAQ Section */}
      <FAQSection />
      {/* CTA Final Section */}
      <section className="py-20 px-6 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to collect feedback?</h2>
        <p className="text-lg mb-6">
          Get started in 30 seconds. It&apos;s free.
        </p>
        <Link
          href="/signup"
          className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Create Your Feedback Link
        </Link>
      </section>
    </div>
  );
}
