import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqRenter: FAQ[] = [
    {
      question: 'How do I search for products to rent?',
      answer: 'You can search for products by using the search bar at the top of the page. You can also browse categories or filter by price, location, and availability.'
    },
    {
      question: 'How do I make a rental request?',
      answer: 'Once you find a product you want to rent, click on it to view details, then select your rental dates and click "Request to Rent". The product owner will then review and approve or decline your request.'
    },
    {
      question: 'How do payments work?',
      answer: 'When your rental request is approved, you\'ll be charged through our secure payment system. We hold the payment until 24 hours after the rental begins, then release it to the owner.'
    },
    {
      question: 'What if the product is damaged or not as described?',
      answer: 'If there\'s a problem with your rental, contact the owner immediately through our messaging system. If you can\'t resolve the issue, you can open a dispute through our platform within 24 hours of receiving the item.'
    },
    {
      question: 'How do returns work?',
      answer: 'You must return the product at the agreed-upon time and location. Make sure to document the condition of the item upon return to avoid any disputes.'
    }
  ];

  const faqOwner: FAQ[] = [
    {
      question: 'How do I list a product for rent?',
      answer: 'Log in to your account, click on "Add Product" in your Account page, then fill out the product details including photos, description, price, and availability.'
    },
    {
      question: 'How much can I charge for my products?',
      answer: 'You set your own rental prices. We recommend researching similar items to determine competitive pricing. You can charge daily, weekly, or monthly rates.'
    },
    {
      question: 'How do I approve rental requests?',
      answer: 'You\'ll receive notifications when someone requests to rent your product. Log in to your account, go to "Rental Requests", and approve or decline each request.'
    },
    {
      question: 'When do I get paid?',
      answer: 'Payments are released to your account 24 hours after the rental begins. You can withdraw funds to your bank account at any time after that.'
    },
    {
      question: 'What if my product is damaged by a renter?',
      answer: 'Document the damage and contact the renter through our messaging system. If you can\'t resolve the issue, open a dispute within 48 hours of the product\'s return.'
    }
  ];

  const generalFaq: FAQ[] = [
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard security measures to protect your personal and payment information. You can learn more in our Privacy Policy.'
    },
    {
      question: 'What fees does Trovia charge?',
      answer: 'We charge a service fee of 10% to renters and 3% to product owners on each transaction. These fees help us maintain the platform and provide customer support.'
    },
    {
      question: 'How is insurance handled?',
      answer: 'All rentals include basic coverage against accidental damage up to ₹10,000. For higher-value items, we recommend purchasing additional coverage during the checkout process.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can email us at support@trovia.com or use the contact form on our Contact page. We typically respond within 24 hours.'
    },
    {
      question: 'Can I use Trovia internationally?',
      answer: 'Currently, Trovia is only available in India. We plan to expand to other countries in the future.'
    }
  ];

  // Filter FAQs based on search query
  const filterFaqs = (faqs: FAQ[]): FAQ[] => {
    if (!searchQuery) return faqs;
    
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredRenterFaqs = filterFaqs(faqRenter);
  const filteredOwnerFaqs = filterFaqs(faqOwner);
  const filteredGeneralFaqs = filterFaqs(generalFaq);

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>
        
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search help articles"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="general" className="w-full" value={''} onValueChange={function (value: string): void {
                  throw new Error('Function not implemented.');
              } }>
          <TabsList className="mb-6 flex flex-wrap gap-2">
            <TabsTrigger value="general" className="flex-grow">General Questions</TabsTrigger>
            <TabsTrigger value="renter" className="flex-grow">For Renters</TabsTrigger>
            <TabsTrigger value="owner" className="flex-grow">For Product Owners</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">General Questions</h2>
            {filteredGeneralFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredGeneralFaqs.map((faq, index) => (
                  <AccordionItem key={`general-${index}`} value={`general-item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-gray-500">No matching questions found. Try a different search term.</p>
            )}
          </TabsContent>
          
          <TabsContent value="renter" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">For Renters</h2>
            {filteredRenterFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredRenterFaqs.map((faq, index) => (
                  <AccordionItem key={`renter-${index}`} value={`renter-item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-gray-500">No matching questions found. Try a different search term.</p>
            )}
          </TabsContent>
          
          <TabsContent value="owner" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">For Product Owners</h2>
            {filteredOwnerFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredOwnerFaqs.map((faq, index) => (
                  <AccordionItem key={`owner-${index}`} value={`owner-item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-gray-500">No matching questions found. Try a different search term.</p>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
          <p className="mb-4">
            Our customer support team is available to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:support@trovia.com" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 text-center"
              rel="noopener noreferrer"
            >
              Email Support
            </a>
            <Link 
              to="/contact" 
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 text-center"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;