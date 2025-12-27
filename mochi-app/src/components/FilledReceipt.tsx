import { useEffect, useRef } from 'react';
// import receiptTemplate from 'figma:asset/14b1fe322cb99faf4fc708f1e437bf292c81978b.png';

interface FilledReceiptProps {
  details: {
    name: string;
    number: string;
    advance: string;
    totalAmount: string;
    pickupDate: string;
  };
  onReady?: (imageUrl: string) => void;
  className?: string;
}

export function FilledReceipt({ details, onReady, className }: FilledReceiptProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawReceipt = () => {
      // Set canvas size to match image
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw the receipt template
      ctx.drawImage(img, 0, 0);

      // Set up text styling for Urdu/Arabic text
      ctx.textAlign = 'right';
      ctx.direction = 'rtl';
      ctx.fillStyle = '#000000';
      
      // Calculate responsive font sizes based on canvas width
      const baseFontSize = canvas.width * 0.045; // Responsive to image size
      
      // Write customer details on the receipt
      // These positions are approximate - adjust based on your receipt template
      const rightMargin = canvas.width * 0.85;
      const startY = canvas.height * 0.35;
      const lineHeight = canvas.height * 0.08;

      // Name
      ctx.font = `bold ${baseFontSize}px Arial, sans-serif`;
      ctx.fillText(details.name, rightMargin, startY);

      // Phone Number
      ctx.font = `${baseFontSize}px Arial, sans-serif`;
      ctx.fillText(details.number, rightMargin, startY + lineHeight);

      // Advance
      ctx.fillText(details.advance, rightMargin, startY + lineHeight * 2);

      // Total Amount
      ctx.fillText(details.totalAmount, rightMargin, startY + lineHeight * 3);

      // Pickup Date
      ctx.fillText(details.pickupDate, rightMargin, startY + lineHeight * 4);

      // Convert canvas to image URL
      const dataUrl = canvas.toDataURL('image/png');
      if (onReady) {
        onReady(dataUrl);
      }
    };

    if (img.complete) {
      drawReceipt();
    } else {
      img.onload = drawReceipt;
    }
  }, [details, onReady]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="w-full h-full object-cover rounded-2xl" />
      <img
        ref={imageRef}
        // src={receiptTemplate}
        src="https://placehold.co/40"
        alt="Receipt template"
        className="hidden"
        crossOrigin="anonymous"
      />
    </div>
  );
}
