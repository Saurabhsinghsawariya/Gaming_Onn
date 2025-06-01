import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const JoinUs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const faqs: FAQItem[] = [
    {
      question: "How do I join the gaming community?",
      answer: "You can join our gaming community by creating an account and completing your profile. Once registered, you'll have access to all our features, games, and community events."
    },
    {
      question: "What games are available on the platform?",
      answer: "We offer a wide variety of games including action, adventure, strategy, and multiplayer games. Our collection is constantly growing with regular updates."
    },
    {
      question: "Is there a membership fee?",
      answer: "Basic membership is free! However, we offer premium memberships with additional features and exclusive content."
    },
    {
      question: "How can I participate in tournaments?",
      answer: "Once you're a member, you can join tournaments through the 'Tournaments' section. We host regular events for different skill levels."
    },
    {
      question: "Do you have a Discord server?",
      answer: "Yes! We have an active Discord community where members can chat, find gaming partners, and stay updated on events."
    }
  ];

  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement query submission logic here
    console.log('Query submitted:', query);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Join Our Gaming Community
          </h1>
          <p className="mt-4 text-gray-400">
            Become part of an amazing gaming community and experience gaming like never before
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-800/70 transition-all duration-300"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="text-white font-medium">{faq.question}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-indigo-400" />
                ) : (
                  <FaChevronDown className="text-indigo-400" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Query Form */}
        <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4">Have a Question?</h2>
          <form onSubmit={handleSubmitQuery} className="space-y-4">
            <div>
              <textarea
                rows={4}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question here..."
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-100 placeholder-gray-400 transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300"
            >
              Submit Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;