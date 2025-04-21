import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { FeedbackModal } from './components/FeedbackModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastRating, setLastRating] = useState<number | null>(null);

  const handleSubmit = (rating: number) => {
    setLastRating(rating);
    // Here you would typically send the rating to your backend
    console.log('Submitted rating:', rating);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Welcome to Our Product</h1>
            <p className="mt-4 text-lg text-gray-600">
              We value your feedback! Help us improve by sharing your thoughts.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <MessageSquare size={20} />
              Give Feedback
            </button>
          </div>

          {lastRating !== null && (
            <div className="mt-8 text-center text-gray-600">
              Thank you for your feedback! You rated us {lastRating}/10
            </div>
          )}
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;