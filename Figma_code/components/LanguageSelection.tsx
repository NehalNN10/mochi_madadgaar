import { ArrowLeft } from 'lucide-react';

interface LanguageSelectionProps {
  onSelect: (language: 'urdu' | 'pashto') => void;
  onBack: () => void;
}

export function LanguageSelection({ onSelect, onBack }: LanguageSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative">
      {/* Back Button - always shown */}
      <div className="absolute top-6 left-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 px-4 py-3 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={22} />
          <span className="text-lg">واپس</span>
        </button>
      </div>

      <div className="w-full max-w-sm">
        <h1 className="text-center text-gray-800 mb-12 text-4xl">
          زبان منتخب کریں
        </h1>
        <div className="space-y-5">
          <button
            onClick={() => onSelect('urdu')}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-6 px-6 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            <span className="block text-3xl">اردو</span>
          </button>
          <button
            onClick={() => onSelect('pashto')}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-6 px-6 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            <span className="block text-3xl">پښتو</span>
          </button>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}