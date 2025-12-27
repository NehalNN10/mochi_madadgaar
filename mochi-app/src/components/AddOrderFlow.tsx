import { useState } from 'react';
import { Camera, ArrowLeft, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ZipIcon } from './ZipIcon';
// import receiptTemplate from 'figma:asset/14b1fe322cb99faf4fc708f1e437bf292c81978b.png';
import type { Order, AppSettings } from '../App';

interface AddOrderFlowProps {
  onSave: (order: Order) => void;
  onCancel: () => void;
  settings: AppSettings;
}

type Step = 'receipt' | 'item' | 'service';

// Array of different shoe images for variety
const SHOE_IMAGES = [
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=400&fit=crop',
];

export function AddOrderFlow({ onSave, onCancel, settings }: AddOrderFlowProps) {
  const [step, setStep] = useState<Step>('receipt');
  const [receiptImage, setReceiptImage] = useState<string>('');
  const [receiptDetails, setReceiptDetails] = useState({
    name: '',
    number: '',
    advance: '',
    totalAmount: '',
    pickupDate: '',
  });
  const [itemImage, setItemImage] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');

  const text = {
    urdu: {
      stepReceipt: 'رسید کی تصویر لیں',
      stepItem: 'سامان کی تصویر لیں',
      stepService: 'سروس کی قسم منتخب کریں',
      captureReceipt: 'رسید کی تصویر لیں',
      captureItem: 'سامان کی تصویر لیں',
      saveOrder: 'آرڈر محفوظ کریں',
      back: 'واپس',
      heelReplacement: 'ایڑی بدلنا',
      stitching: 'سلائی',
      polish: 'پالش',
      soleReplacement: 'تلا بدلنا',
      dyeing: 'رنگ کروانا',
      zipFix: 'زِپ ٹھیک کرنا',
      step: 'مرحلہ',
      of: 'از',
    },
    pashto: {
      stepReceipt: 'د رسید انځور واخلئ',
      stepItem: 'د شي انځور واخلئ',
      stepService: 'د سروس ډول غوره کړئ',
      captureReceipt: 'د رسید انځور واخلئ',
      captureItem: 'د شي انځور واخلئ',
      saveOrder: 'آرډر خوندي کړئ',
      back: 'بېرته',
      heelReplacement: 'پاشنه بدلول',
      stitching: 'ګنډل',
      polish: 'پالش',
      soleReplacement: 'تلوه بدلول',
      dyeing: 'رنګول',
      zipFix: 'زپ ټیک کول',
      step: 'مرحله',
      of: 'له',
    },
  };

  const t = text[settings.language];

  const services = [
    { id: 'heel', label: t.heelReplacement, icon: '👠' },
    { id: 'stitch', label: t.stitching, icon: '🪡' },
    { id: 'polish', label: t.polish, icon: '✨' },
    { id: 'sole', label: t.soleReplacement, icon: '👞' },
    { id: 'dye', label: t.dyeing, icon: '🎨' },
    { id: 'zip', label: t.zipFix, useZipIcon: true },
  ];

  const handleCaptureReceipt = () => {
    setReceiptImage(receiptTemplate);
    
    // Mock OCR extraction
    const names = ['احمد علی', 'محمد حسن', 'علی رضا', 'عمران خان', 'فیصل احمد', 'زبیر حسین'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    setReceiptDetails({
      name: randomName,
      number: '0300-' + Math.floor(1000000 + Math.random() * 9000000),
      advance: Math.floor(300 + Math.random() * 700) + ' روپے',
      totalAmount: Math.floor(1000 + Math.random() * 2000) + ' روپے',
      pickupDate: Math.floor(10 + Math.random() * 20) + ' دسمبر 2025',
    });
    
    // Move directly to item step
    setStep('item');
  };

  const handleCaptureItem = () => {
    const randomShoe = SHOE_IMAGES[Math.floor(Math.random() * SHOE_IMAGES.length)];
    setItemImage(randomShoe);
    
    // Move directly to service step
    setStep('service');
  };

  const handleServiceSelect = (service: string) => {
    setServiceType(service);
  };

  const handleSave = () => {
    const newOrder: Order = {
      id: Date.now().toString(),
      receiptImage,
      receiptDetails,
      itemImage,
      serviceType,
      timestamp: new Date().toISOString(),
      phoneNumber: receiptDetails.number,
      status: 'active',
    };
    onSave(newOrder);
  };

  const stepNumber = step === 'receipt' ? 1 : step === 'item' ? 2 : 3;
  const totalSteps = 3;

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm px-4 pt-6 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 px-4 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={22} />
            <span className="text-xl">{t.back}</span>
          </button>
          <div className="text-lg text-gray-500">
            {t.step} {stepNumber} {t.of} {totalSteps}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all ${
                i <= stepNumber ? 'bg-gray-800' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pt-8 pb-6">
        {step === 'receipt' && (
          <CaptureStep
            title={t.stepReceipt}
            buttonText={t.captureReceipt}
            onCapture={handleCaptureReceipt}
          />
        )}

        {step === 'item' && (
          <CaptureStep
            title={t.stepItem}
            buttonText={t.captureItem}
            onCapture={handleCaptureItem}
          />
        )}

        {step === 'service' && (
          <div>
            <h2 className="text-3xl text-gray-800 mb-6 text-center">
              {t.stepService}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.label)}
                  className={`p-6 rounded-3xl transition-all ${
                    serviceType === service.label
                      ? 'bg-gray-800 text-white shadow-lg'
                      : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                  }`}
                >
                  {service.useZipIcon ? (
                    <div className="text-4xl mb-3">
                      <ZipIcon />
                    </div>
                  ) : (
                    <div className="text-4xl mb-3">{service.icon}</div>
                  )}
                  <div className="text-lg">{service.label}</div>
                </button>
              ))}
            </div>

            {serviceType && (
              <button
                onClick={handleSave}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-6 px-6 rounded-full shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 text-xl"
              >
                <Check size={28} strokeWidth={2.5} />
                <span>{t.saveOrder}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Simple capture screen - just camera area and button
function CaptureStep({ title, buttonText, onCapture }: {
  title: string;
  buttonText: string;
  onCapture: () => void;
}) {
  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-3xl text-gray-800 mb-8 text-center">
        {title}
      </h2>
      
      {/* Simple camera placeholder with dashed border */}
      <div className="w-full flex-1 max-h-[500px] bg-gray-200 rounded-3xl mb-8 overflow-hidden relative">
        <div className="absolute inset-8 border-4 border-dashed border-gray-400 rounded-3xl flex items-center justify-center">
          <Camera size={80} className="text-gray-400" strokeWidth={1.5} />
        </div>
      </div>

      {/* Capture button */}
      <button
        onClick={onCapture}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white py-6 px-6 rounded-full shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 text-xl"
      >
        <Camera size={28} strokeWidth={2.5} />
        <span>{buttonText}</span>
      </button>
    </div>
  );
}