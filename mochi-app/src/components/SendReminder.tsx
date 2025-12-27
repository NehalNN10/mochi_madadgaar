import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import type { Order, AppSettings } from '../App';

interface SendReminderProps {
  order: Order;
  onBack: () => void;
  onSend: () => void;
  settings: AppSettings;
}

export function SendReminder({ order, onBack, onSend, settings }: SendReminderProps) {
  const [messageType, setMessageType] = useState<'auto' | 'custom'>('auto');
  const [customMessage, setCustomMessage] = useState('');

  const text = {
    urdu: {
      title: 'یاددہانی بھیجیں',
      subtitle: 'کسٹمر کو آرڈر تیار ہونے کی اطلاع بھیجیں',
      phoneNumber: 'فون نمبر',
      autoMessage: 'خودکار پیغام',
      customMessage: 'اپنا پیغام',
      autoText: 'آپ کا آرڈر تیار ہے۔ براہِ کرم لے جائیں۔',
      placeholder: 'اپنا پیغام یہاں لکھیں…',
      send: 'پیغام بھیجیں',
      sent: 'پیغام بھیج دیا گیا!',
    },
    pashto: {
      title: 'یادونه واستوئ',
      subtitle: 'پیرودونکي ته د آرډر چمتو کېدو خبر ورکړئ',
      phoneNumber: 'د تلیفون شمېره',
      autoMessage: 'خودکار پیغام',
      customMessage: 'ستاسو پیغام',
      autoText: 'ستاسو آرډر چمتو دی. مهرباني وکړئ یې واخلئ.',
      placeholder: 'خپله پیغام دلته ولیکئ…',
      send: 'پیغام واستوئ',
      sent: 'پیغام ولیږل شوه!',
    },
  };

  const t = text[settings.language];

  const handleSend = () => {
    const message = messageType === 'auto' ? t.autoText : customMessage;
    alert(`${t.sent}\n\n${t.phoneNumber}: ${order.phoneNumber}\n\n${message}`);
    onSend();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm px-4 py-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 px-4 py-3 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={22} />
          <span className="text-lg">واپس</span>
        </button>
      </div>

      <div className="px-4">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl text-gray-800 mb-3">{t.title}</h2>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        {/* Phone Number */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <p className="text-gray-500 text-lg mb-2">{t.phoneNumber}</p>
          <p className="text-gray-800 text-2xl" dir="ltr">{order.phoneNumber}</p>
        </div>

        {/* Message Options */}
        <div className="space-y-4 mb-8">
          {/* Auto Message */}
          <button
            onClick={() => setMessageType('auto')}
            className={`w-full p-6 rounded-3xl text-right transition-all ${
              messageType === 'auto'
                ? 'bg-gray-800 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  messageType === 'auto'
                    ? 'border-white'
                    : 'border-gray-300'
                }`}
              >
                {messageType === 'auto' && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <p className={`text-base ${messageType === 'auto' ? 'text-gray-300' : 'text-gray-500'}`}>
                {t.autoMessage}
              </p>
            </div>
            <p className={`text-lg leading-relaxed ${messageType === 'auto' ? 'text-white' : 'text-gray-700'}`}>
              {t.autoText}
            </p>
          </button>

          {/* Custom Message */}
          <button
            onClick={() => setMessageType('custom')}
            className={`w-full p-6 rounded-3xl text-right transition-all ${
              messageType === 'custom'
                ? 'bg-gray-800 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  messageType === 'custom'
                    ? 'border-white'
                    : 'border-gray-300'
                }`}
              >
                {messageType === 'custom' && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <p className={`text-base ${messageType === 'custom' ? 'text-gray-300' : 'text-gray-500'}`}>
                {t.customMessage}
              </p>
            </div>
            {messageType === 'custom' && (
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={t.placeholder}
                className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-gray-400 border-2 border-white/30 rounded-2xl p-4 resize-none focus:outline-none focus:border-white text-lg"
                rows={4}
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </button>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={messageType === 'custom' && !customMessage.trim()}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-6 px-6 rounded-full shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          <Send size={28} strokeWidth={2.5} />
          <span>{t.send}</span>
        </button>
      </div>
    </div>
  );
}