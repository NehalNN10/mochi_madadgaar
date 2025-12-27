import { ArrowLeft, Check, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FilledReceipt } from './FilledReceipt';
import type { Order, AppSettings } from '../App';

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
  onComplete: (orderId: string) => void;
  onSendReminder: (orderId: string) => void;
  settings: AppSettings;
}

export function OrderDetail({ order, onBack, onComplete, onSendReminder, settings }: OrderDetailProps) {
  const text = {
    urdu: {
      orderDetails: 'آرڈر کی تفصیل',
      back: 'واپس',
      customerName: 'گاہک کا نام',
      phoneNumber: 'فون نمبر',
      serviceType: 'سروس کی قسم',
      advance: 'ایڈوانس',
      totalAmount: 'کل رقم',
      pickupDate: 'پک اپ کی تاریخ',
      receiptImage: 'رسید کی تصویر',
      itemImage: 'آرڈر کی تصویر',
      completeOrder: 'آرڈر مکمل کریں',
      sendReminder: 'یاددہانی بھیجیں',
      completed: 'مکمل ہو گیا',
    },
    pashto: {
      orderDetails: 'د آرډر تفصیل',
      back: 'بېرته',
      customerName: 'د پیرودونکي نوم',
      phoneNumber: 'د تلیفون شمېره',
      serviceType: 'د سروس ډول',
      advance: 'پیشکي',
      totalAmount: 'ټول رقم',
      pickupDate: 'د اخیستو نېټه',
      receiptImage: 'د رسید انځور',
      itemImage: 'د آرډر انځور',
      completeOrder: 'آرډر بشپړ کړئ',
      sendReminder: 'یادونه واستوئ',
      completed: 'بشپړ شوی',
    },
  };

  const t = text[settings.language];

  return (
    <div className="h-full bg-gray-50 flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="bg-white/90 backdrop-blur-sm px-4 py-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 px-4 py-3 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={22} />
          <span className="text-lg">{t.back}</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <h2 className="text-3xl text-gray-800 mb-6 mt-2 text-center">{t.orderDetails}</h2>

        {/* Service Type Tag */}
        <div className="flex justify-center mb-4">
          <div className="inline-block bg-gray-700 text-white px-6 py-3 rounded-full text-xl">
            {order.serviceType}
          </div>
        </div>

        {/* Item Image */}
        <div className="mb-4">
          <div className="w-full aspect-square bg-gray-100 rounded-3xl overflow-hidden">
            <ImageWithFallback 
              src={order.itemImage} 
              alt="Item" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Receipt Info Card - Dark Theme */}
        <div className="bg-gray-700 rounded-3xl p-6 shadow-lg mb-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-600">
            <span className="text-gray-300 text-lg">{t.customerName}</span>
            <span className="text-white text-lg">{order.receiptDetails.name}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-600">
            <span className="text-gray-300 text-lg">{t.phoneNumber}</span>
            <span className="text-white text-lg" dir="ltr">{order.phoneNumber}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-600">
            <span className="text-gray-300 text-lg">{t.advance}</span>
            <span className="text-white text-lg">{order.receiptDetails.advance}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-600">
            <span className="text-gray-300 text-lg">{t.totalAmount}</span>
            <span className="text-white text-lg">{order.receiptDetails.totalAmount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-lg">{t.pickupDate}</span>
            <span className="text-white text-lg">{order.receiptDetails.pickupDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {order.status === 'active' && (
          <div className="space-y-3 pb-6">
            <button
              onClick={() => onComplete(order.id)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 px-6 rounded-full shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 text-xl"
            >
              <Check size={28} strokeWidth={2.5} />
              <span>{t.completeOrder}</span>
            </button>

            <button
              onClick={() => onSendReminder(order.id)}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-6 px-6 rounded-full shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 text-xl"
            >
              <Send size={28} strokeWidth={2.5} />
              <span>{t.sendReminder}</span>
            </button>
          </div>
        )}

        {order.status === 'completed' && (
          <div className="bg-green-100 text-green-800 py-6 px-6 rounded-full text-center shadow-lg mb-6">
            <p className="text-xl">{t.completed}</p>
          </div>
        )}
      </div>
    </div>
  );
}