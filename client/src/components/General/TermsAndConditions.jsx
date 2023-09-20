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
        <div className="flex justify-center mt-8">
          <button className="bg-indigo-900 text-white px-4 py-2 rounded-md mr-4 hover:bg-indigo-700 transition duration-300 ease-in-out">
            Accept
          </button>
          <button className="border border-indigo-900 text-indigo-900 px-4 py-2 rounded-md hover:bg-indigo-900 hover:text-white transition duration-300 ease-in-out">
            Decline
          </button>
        </div>
      </div>
    </section>
  );
}

export default TermsAndConditions;
