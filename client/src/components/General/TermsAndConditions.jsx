import React from 'react';

function TermsAndConditions() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white text-center p-8 rounded-lg shadow-lg">
        <div className="text-2xl font-bold text-indigo-900 mb-4 uppercase">
          Terms of Service
        </div>
        <div className="text-gray-700">
          Welcome to TummyTales, a recipe generator website. By using our website, you agree to comply with and be bound by the following terms and conditions.
        </div>
        <div className="mt-6 text-lg text-indigo-900 uppercase">
          Acceptance of Terms
        </div>
        <div className="text-gray-700 mt-4">
          <p>By accessing or using our website, you agree to be legally bound by these terms and conditions, which govern your use of TummyTales.</p>
          <p>If you do not agree with these terms, please do not use our website.</p>
        </div>

        <div className="mt-8 text-lg text-indigo-900 uppercase">
          User Responsibilities
        </div>
        <div className="text-gray-700 mt-4">
          <p>When using TummyTales, you agree to:</p>
          <ul className="list-disc pl-6">
            <li>Provide accurate and truthful information when using our services.</li>
            <li>Respect the privacy and personal information of other users.</li>
            <li>Not engage in any harmful or illegal activities on our website.</li>
            <li>Refrain from posting offensive, inappropriate, or spammy content on the platform.</li>
          </ul>
        </div>

        <div className="mt-8 text-lg text-indigo-900 uppercase">
          Intellectual Property
        </div>
        <div className="text-gray-700 mt-4">
          <p>TummyTales and its content, including but not limited to text, images, logos, and software, are protected by intellectual property laws. You may not use our intellectual property without our written permission.</p>
        </div>

        <div className="mt-8 text-lg text-indigo-900 uppercase">
          Termination
        </div>
        <div className="text-gray-700 mt-4">
          <p>We reserve the right to terminate or suspend your access to TummyTales at our discretion, without prior notice, if you violate these terms and conditions or engage in any activities that are harmful to our platform or other users.</p>
        </div>

        <div className="mt-8 text-lg text-indigo-900 uppercase">
          Governing Law
        </div>
        <div className="text-gray-700 mt-4">
          <p>These terms and conditions are governed by the laws of [Your Jurisdiction]. Any disputes arising from your use of TummyTales will be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].</p>
        </div>

        <div className="mt-8 text-lg text-indigo-900 uppercase">
          Changes to Terms
        </div>
        <div className="text-gray-700 mt-4">
          <p>We may update these terms and conditions from time to time. It is your responsibility to review them periodically. Your continued use of TummyTales after changes to these terms signifies your acceptance of the revised terms.</p>
        </div>

      </div>
    </section>
  );
}

export default TermsAndConditions;
