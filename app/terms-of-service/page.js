import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#11154D] to-[#291337] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md sm:p-12">
        <div className="mb-8">
          <Link href="/" className="mb-6 inline-block text-sm text-white/60 hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-white/50">Effective Date: September 19, 2024</p>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed font-light">
          <p>
            These Terms of Service govern your use of the minchap application. Please read and understand them before you begin using the application.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the minchap application, you agree to and accept these Terms of Service. If you do not agree to these terms, please refrain from using the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">2. User Account and Security</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You must provide accurate and up-to-date information when registering an account.</li>
              <li>You are solely responsible for maintaining the confidentiality of your password or account access information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">3. Permitted Use</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You agree to use our application in a lawful manner and not infringe upon the rights of others.</li>
              <li>You may not copy, reproduce, or modify the content within the app without prior permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">4. Account Suspension and Termination</h2>
            <p>
              We reserve the right to immediately suspend or terminate your access to the application if you violate these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">5. Limitation of Liability</h2>
            <p>
              We shall not be liable for any direct or indirect damages arising from the use or inability to use the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">6. Modification of Terms</h2>
            <p>
              The company reserves the right to amend or update these terms at any time. Your continued use of the application after any changes will constitute your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">7. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Kingdom of Thailand.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
