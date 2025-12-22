import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LanguageSelection } from './components/LanguageSelection';
import { Dashboard } from './components/Dashboard';
import { AddOrderFlow } from './components/AddOrderFlow';
import { OrderDetail } from './components/OrderDetail';
import { SendReminder } from './components/SendReminder';

export type Screen = 'welcome' | 'language' | 'dashboard' | 'addOrder' | 'orderDetail' | 'sendReminder';

export interface Order {
  id: string;
  receiptImage: string;
  receiptDetails: {
    name: string;
    number: string;
    advance: string;
    totalAmount: string;
    pickupDate: string;
  };
  itemImage: string;
  serviceType: string;
  timestamp: string;
  phoneNumber: string;
  status: 'active' | 'completed';
  completedAt?: string;
}

export interface AppSettings {
  language: 'urdu' | 'pashto';
  isFirstTime: boolean;
  hasSeenWelcome: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [previousScreen, setPreviousScreen] = useState<Screen | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    language: 'urdu',
    isFirstTime: true,
    hasSeenWelcome: false,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('mochiAppSettings');
    const savedOrders = localStorage.getItem('mochiAppOrders');

    if (savedSettings) {
      const loaded = JSON.parse(savedSettings);
      setSettings(loaded);
      if (loaded.hasSeenWelcome && !loaded.isFirstTime) {
        setCurrentScreen('dashboard');
      } else if (loaded.hasSeenWelcome) {
        setCurrentScreen('language');
      }
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mochiAppSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('mochiAppOrders', JSON.stringify(orders));
  }, [orders]);

  const navigateTo = (screen: Screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const handleWelcomeContinue = () => {
    setSettings({ ...settings, hasSeenWelcome: true });
    navigateTo('language');
  };

  const handleLanguageSelect = (language: 'urdu' | 'pashto') => {
    setSettings({ ...settings, language, isFirstTime: false });
    navigateTo('dashboard');
  };

  const handleAddOrder = (order: Order) => {
    setOrders([order, ...orders]);
    navigateTo('dashboard');
  };

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrderId(orderId);
    navigateTo('orderDetail');
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed', completedAt: new Date().toISOString() }
        : order
    ));
    navigateTo('dashboard');
  };

  const handleSendReminder = (orderId: string) => {
    setSelectedOrderId(orderId);
    navigateTo('sendReminder');
  };

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const getSlideDirection = () => {
    const screenOrder: Screen[] = ['welcome', 'language', 'dashboard', 'addOrder', 'orderDetail', 'sendReminder'];
    const currentIndex = screenOrder.indexOf(currentScreen);
    const previousIndex = previousScreen ? screenOrder.indexOf(previousScreen) : -1;
    
    if (previousIndex === -1) return '';
    return currentIndex > previousIndex ? 'slide-in-right' : 'slide-in-left';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] aspect-[9/19.5] bg-gray-50 relative overflow-hidden rounded-[3rem] shadow-2xl border-8 border-gray-800" dir="rtl">
        <div className={`w-full h-full ${getSlideDirection()}`}>
          {currentScreen === 'welcome' && (
            <WelcomeScreen onContinue={handleWelcomeContinue} />
          )}
          {currentScreen === 'language' && (
            <LanguageSelection 
              onSelect={handleLanguageSelect}
              onBack={() => navigateTo('welcome')}
            />
          )}
          {currentScreen === 'dashboard' && (
            <Dashboard
              orders={orders}
              onAddOrder={() => navigateTo('addOrder')}
              onOrderSelect={handleOrderSelect}
              settings={settings}
              onBack={() => navigateTo('language')}
            />
          )}
          {currentScreen === 'addOrder' && (
            <AddOrderFlow
              onSave={handleAddOrder}
              onCancel={() => navigateTo('dashboard')}
              settings={settings}
            />
          )}
          {currentScreen === 'orderDetail' && selectedOrder && (
            <OrderDetail
              order={selectedOrder}
              onBack={() => navigateTo('dashboard')}
              onComplete={handleCompleteOrder}
              onSendReminder={handleSendReminder}
              settings={settings}
            />
          )}
          {currentScreen === 'sendReminder' && selectedOrder && (
            <SendReminder
              order={selectedOrder}
              onBack={() => navigateTo('orderDetail')}
              onSend={() => navigateTo('dashboard')}
              settings={settings}
            />
          )}
        </div>
      </div>
    </div>
  );
}