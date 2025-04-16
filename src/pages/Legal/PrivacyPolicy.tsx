import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-3">Introduction</h2>
            <p>
              At Trovia, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our platform. Please read
              this policy carefully to understand our practices regarding your personal data.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, profile picture,
                and payment information when you register for an account.
              </li>
              <li>
                <strong>Product Information:</strong> Details about the products you list for rent,
                including photos, descriptions, pricing, and availability.
              </li>
              <li>
                <strong>Transaction Information:</strong> Records of rentals, payments, and messages
                between users.
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type, operating system, and
                other technical details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p className="mb-2">We use the collected information for various purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing and maintaining our platform</li>
              <li>Processing transactions and sending receipts</li>
              <li>Improving our services and user experience</li>
              <li>Communicating with you about your account and transactions</li>
              <li>Ensuring platform security and preventing fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from
              unauthorized access, alteration, disclosure, or destruction. However, no method of
              transmission over the internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data,
              including the right to access, correct, delete, or restrict processing of your personal
              information. To exercise these rights, please contact us at privacy@trovia.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@trovia.com" className="text-purple-600 hover:underline">
                privacy@trovia.com
              </a>
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-6">
            Last Updated: April 16, 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;