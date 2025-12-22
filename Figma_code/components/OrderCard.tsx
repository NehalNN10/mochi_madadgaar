import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Order, AppSettings } from '../App';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
  settings: AppSettings;
}

export function OrderCard({ order, onClick, settings }: OrderCardProps) {
  const text = {
    urdu: {
      completedOn: 'مکمل ہوا:',
    },
    pashto: {
      completedOn: 'بشپړ شوی:',
    },
  };

  const t = text[settings.language];

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const urduNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const urduMonths = ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'];
    
    const day = date.getDate().toString().split('').map(d => urduNumerals[parseInt(d)]).join('');
    const month = urduMonths[date.getMonth()];
    const year = date.getFullYear().toString().split('').map(d => urduNumerals[parseInt(d)]).join('');
    
    return `${day} ${month} ${year}`;
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatCompletedDate = (isoString: string) => {
    const date = new Date(isoString);
    const urduNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const urduMonths = ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'];
    
    const day = date.getDate().toString().split('').map(d => urduNumerals[parseInt(d)]).join('');
    const month = urduMonths[date.getMonth()];
    const year = date.getFullYear().toString().split('').map(d => urduNumerals[parseInt(d)]).join('');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} - ${hours}:${minutes}`;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-4"
    >
      <div className="flex gap-4 items-start">
        {/* Item Image */}
        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden">
          <ImageWithFallback 
            src={order.itemImage} 
            alt="Item" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Order Details */}
        <div className="flex-1 text-right">
          {/* Service Type Tag */}
          <div className="inline-block bg-gray-700 text-white px-4 py-2 rounded-full mb-2 text-base">
            {order.serviceType}
          </div>
          <p className="text-gray-600 mb-1 text-base">{formatDate(order.timestamp)}</p>
          <p className="text-gray-600 mb-1 text-base">{formatTime(order.timestamp)}</p>
          <p className="text-gray-500 text-base" dir="ltr">{order.phoneNumber}</p>
          {order.status === 'completed' && order.completedAt && (
            <p className="text-green-600 text-base mt-2">
              {t.completedOn} {formatCompletedDate(order.completedAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}