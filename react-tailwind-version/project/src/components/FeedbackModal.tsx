import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

export function FeedbackModal({ isOpen, onClose, onSubmit }: FeedbackModalProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  const handleSubmit = () => {
    if (rating !== null) {
      onSubmit(rating);
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        className={`relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all duration-200 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Feedback Matters</h2>
          <p className="mt-2 text-gray-600">
            How would you rate your experience with our product?
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className={`h-12 w-12 rounded-lg text-lg font-medium transition-all duration-200 ${
                  rating === num
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="rounded-lg px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === null}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}