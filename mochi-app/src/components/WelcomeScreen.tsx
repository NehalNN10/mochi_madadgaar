interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-16">
        <h1 className="text-gray-800 mb-6 text-5xl">
          موچی مددگار
        </h1>
        <p className="text-gray-500 text-2xl leading-relaxed">
          آپ کے کاروبار کا ڈیجیٹل مددگار
        </p>
      </div>

      <button
        onClick={onContinue}
        className="bg-gray-700 hover:bg-gray-800 text-white px-20 py-6 rounded-2xl shadow-lg transition-all active:scale-95 text-2xl"
      >
        شروع کریں
      </button>
      
      {/* Progress indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}
