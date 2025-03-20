import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-neutral-800">{question}</h3>
        <span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-[#3b1c4d]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#3b1c4d]" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pr-6">
          <p className="text-[#5f5f5f]">{answer}</p>
        </div>
      )}
    </div>
  );
};

export const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "How do I create an account on Trovia?",
      answer: "Creating an account is simple. Click on the 'Sign Up' button, fill in your details including your college email, create a password, and you're ready to go!"
    },
    {
      question: "Is Trovia only for college students?",
      answer: "Yes, Trovia is specifically designed for college students to facilitate campus-based exchanges and create a trusted community for buying and selling."
    },
    {
      question: "How do I list an item for sale?",
      answer: "After logging in, click on 'Sell Item', fill out the details including photos, description, and price, then submit your listing. It will be visible to other users after a quick review."
    },
    {
      question: "Is there a fee for using Trovia?",
      answer: "Trovia is completely free for basic listings. We offer premium features for a small fee to promote your listings or get priority placement."
    },
    {
      question: "How are payments handled?",
      answer: "Trovia offers secure in-platform payments with multiple options including credit/debit cards and digital wallets. You can also opt for in-person cash exchanges for local transactions."
    }
  ];

  return (
    <section className="w-full py-16 bg-[#f8f5f9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-neutral-800 mb-8">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-[#5f5f5f] text-lg mx-auto leading-relaxed">
            Got questions? We've got answers. Here are some of the most common questions about using Trovia.
          </p>
        </div>

        <div className="mt-8">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
