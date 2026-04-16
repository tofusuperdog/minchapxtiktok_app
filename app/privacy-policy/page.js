import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#11154D] to-[#291337] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md sm:p-12">
        <div className="mb-8">
          <Link href="/" className="mb-6 inline-block text-sm text-white/60 hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-white/50">Effective Date: September 19, 2024</p>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed font-light">
          <p>
            The minchap app respects user privacy. We are committed to securing and protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">1. Collection of Personal Information</h2>
            <p className="mb-2">We will collect personal information necessary for using the app, such as:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal details:</strong> Name, Email</li>
              <li><strong>Payment information:</strong> For purchasing content within the app, credit card or payment gateway details will be securely collected via third-party payment providers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">2. Use of Personal Information</h2>
            <p className="mb-2">Your personal information will be used for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and improve your user experience within the app.</li>
              <li>To process and manage payments for content purchases.</li>
              <li>To communicate with you regarding your account, content of interest, or app updates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">3. Sharing of Information</h2>
            <p className="mb-2">We will not sell, share, or trade your personal information with third parties, except in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>With your explicit consent.</li>
              <li>When it is necessary to share information with third parties to provide services, such as payment providers.</li>
              <li>When required by law or a court order compelling us to disclose the information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">4. Data Security</h2>
            <p>
              We implement technical and organizational measures to secure your personal information, such as encrypting data during transmission and storing it in secure systems. We will follow appropriate standards to prevent unauthorized access to data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">5. Data Retention</h2>
            <p>
              We will retain your personal information for as long as necessary for the purposes for which it was collected or as required by law. Once your information is no longer needed, we will securely delete or destroy it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">6. User Rights</h2>
            <p>
              You have the right to access, modify, or request the deletion of your personal information at any time. You may contact us to make such requests using the information provided in the "Contact Us" section.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">7. Changes to the Privacy Policy</h2>
            <p>
              We reserve the right to modify this Privacy Policy as necessary. If there are changes to this policy, we will notify you through the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">8. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at: <a href="mailto:support@minchapseries.com" className="text-cyan-400 hover:underline">support@minchapseries.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
