import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>
              Welcome to Trovia. These Terms of Service ("Terms") govern your access to and use of our website, 
              mobile applications, and services (collectively, the "Service"). By accessing or using the Service, 
              you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our Service. By using our Service, you represent and warrant that 
              you are 18 years of age or older and have the legal capacity to enter into a binding agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="mb-2">
              To use certain features of our Service, you must register for an account. When registering, you agree to provide 
              accurate, current, and complete information. You are responsible for safeguarding your account credentials and 
              for all activities that occur under your account.
            </p>
            <p>
              We reserve the right to suspend or terminate your account if any information provided during registration or 
              thereafter proves to be inaccurate, false, or misleading, or if you fail to comply with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Product Listings</h2>
            <p className="mb-2">
              As a user, you may list products for rent on our platform. When listing products, you agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You own or have the legal right to rent out the listed products</li>
              <li>The product descriptions are accurate and not misleading</li>
              <li>The products are in good working condition and safe for use</li>
              <li>You will honor rental agreements made through our platform</li>
              <li>You will comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Rental Transactions</h2>
            <p className="mb-2">
              When renting a product through our platform, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the product only for its intended purpose and in accordance with the owner's instructions</li>
              <li>Return the product in the same condition as received, minus normal wear and tear</li>
              <li>Pay all applicable fees, including rental fees and any damage fees if applicable</li>
              <li>Comply with the specific terms of each rental agreement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Payment and Fees</h2>
            <p>
              We charge service fees for the use of our platform. All fees are clearly displayed before you complete a transaction. 
              By using our Service, you agree to pay all applicable fees and taxes. Payments are processed through our third-party 
              payment processors, and you agree to their terms of service when making payments through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Prohibited Activities</h2>
            <p className="mb-2">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violating any laws or regulations</li>
              <li>Infringing on the intellectual property rights of others</li>
              <li>Listing items that are illegal or prohibited for rent</li>
              <li>Engaging in fraudulent activities</li>
              <li>Harassing other users</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Using our platform to transmit malware or other harmful code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Trovia and its affiliates, officers, employees, agents, 
              and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting 
              from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. If we make changes, we will provide notice by posting the updated 
              Terms on our website and updating the "Last Updated" date. Your continued use of the Service after any 
              changes indicates your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:legal@trovia.com" className="text-purple-600 hover:underline">
                legal@trovia.com
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

export default TermsOfService;