import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Your responses have been received successfully. We look forward to meeting you and helping you achieve your posture and movement goals.
          </p>

          <div className="bg-emerald-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-emerald-700">
              Please remember to wear comfortable clothing for your assessment so that movement and posture can be evaluated accurately.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block py-3 px-6 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
