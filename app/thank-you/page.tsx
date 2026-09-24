import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-surface rounded-2xl border border-hairline shadow-soft p-8 md:p-12">
          <div className="w-16 h-16 bg-pine-050 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-pine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink mb-3">Thank You!</h1>
          <p className="text-ink-soft mb-6 leading-relaxed">
            Your responses have been received successfully. We look forward to meeting you and helping you achieve your posture and movement goals.
          </p>

          <div className="bg-pine-050 rounded-lg p-4 mb-8">
            <p className="text-sm text-pine-700">
              Please remember to wear comfortable clothing for your assessment so that movement and posture can be evaluated accurately.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block py-3 px-6 bg-pine-900 text-white font-medium rounded-lg hover:bg-pine-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}