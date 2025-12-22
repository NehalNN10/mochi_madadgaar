import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { OrderCard } from './OrderCard';
import type { Order, AppSettings } from '../App';

interface DashboardProps {
  orders: Order[];
  onAddOrder: () => void;
  onOrderSelect: (orderId: string) => void;
  settings: AppSettings;
  onBack?: () => void;
}

export function Dashboard({ orders, onAddOrder, onOrderSelect, settings, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const text = {
    urdu: {
      title: 'ڈیش بورڈ',
      activeTab: 'چلتے ہوئے کام',
      completedTab: 'مکمل ہوئے کام',
      noActive: 'کوئی چلتا ہوا کام نہیں',
      noCompleted: 'کوئی مکمل شدہ کام نہیں',
      addNew: 'نیا آرڈر شامل کریں',
      back: 'واپس',
    },
    pashto: {
      title: 'ډیش بورډ',
      activeTab: 'روان کارونه',
      completedTab: 'بشپړ شوي کارونه',
      noActive: 'هېڅ روان کار نشته',
      noCompleted: 'هېڅ بشپړ شوی کار نشته',
      addNew: 'نوې آرډر اضافه کړئ',
      back: 'بېرته',
    },
  };

  const t = text[settings.language];

  const activeOrders = orders.filter(o => o.status === 'active');
  const completedOrders = orders.filter(o => o.status === 'completed');

  const displayOrders = activeTab === 'active' ? activeOrders : completedOrders;

  return (
    <div className="min-h-screen bg-gray-50 pb-6 relative">
      {/* Header with Dashboard Title centered and Add Button on top right */}
      <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-20 px-4 pt-6 pb-4 shadow-sm">
        {/* Back Button - top left */}
        <button
          onClick={onBack}
          className="absolute top-6 left-4 flex items-center gap-2 text-gray-600 px-4 py-3 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={22} />
          <span className="text-lg">{t.back}</span>
        </button>

        {/* Centered Dashboard Title */}
        <h1 className="text-gray-800 text-3xl text-center mb-6">
          {t.title}
        </h1>

        {/* Add Button - below title, on the left in RTL */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onAddOrder}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-3 px-5 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <Plus size={20} strokeWidth={2.5} />
            <span className="text-base">{t.addNew}</span>
          </button>
          <div className="flex-1"></div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-4 px-6 rounded-full transition-all text-xl ${
              activeTab === 'active'
                ? 'bg-gray-800 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {t.activeTab}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-4 px-6 rounded-full transition-all text-xl ${
              activeTab === 'completed'
                ? 'bg-gray-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {t.completedTab}
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 pt-4 space-y-3 pb-16">
        {displayOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <p className="text-gray-400 text-xl">
                {activeTab === 'active' ? t.noActive : t.noCompleted}
              </p>
            </div>
          </div>
        ) : (
          displayOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => onOrderSelect(order.id)}
              settings={settings}
            />
          ))
        )}
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-700"></div>
      </div>
    </div>
  );
}