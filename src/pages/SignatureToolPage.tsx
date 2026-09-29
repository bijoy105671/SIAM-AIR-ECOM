import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  Download,
  Sliders,
  Sparkles,
  Crop,
  FileCheck,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  Info
} from 'lucide-react';

interface SignatureToolPageProps {
  navigate: (path: string) => void;
}

export const SignatureToolPage: React.FC<SignatureToolPageProps> = ({ navigate }) => {
  const { lang, activeStudioImage, showNotification } = useApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sample or uploaded signature image
  const [signatureSrc, setSignatureSrc] = useState<string | null>(() => {
    return activeStudioImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop';
  });

  // Sync activeStudioImage if set from Admin or elsewhere
  useEffect(() => {
    if (activeStudioImage) {
      setSignatureSrc(activeStudioImage);
    }
  }, [activeStudioImage]);

  // Processing Parameters
  const [threshold, setThreshold] = useState<number>(145); // Threshold to whiten paper
  const [contrast, setContrast] = useState<number>(140);
  const [inkColor, setInkColor] = useState<'black' | 'blue' | 'original'>('black');
  const [targetWidth, setTargetWidth] = useState<number>(300);
  const [targetHeight, setTargetHeight] = useState<number>(100);
  const [fileSizeKb, setFileSizeKb] = useState<number>(24);

  // Target preset: '300x100' | '300x80' | 'custom'
  const [preset, setPreset] = useState<'300x100' | '300x80' | 'custom'>('300x100');

  useEffect(() => {
    if (preset === '300x100') {
      setTargetWidth(300);
      setTargetHeight(100);
    } else if (preset === '300x80') {
      setTargetWidth(300);
      setTargetHeight(80);
    }
  }, [preset]);

  useEffect(() => {
    if (!signatureSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = signatureSrc;
    img.onload = () => {
      processSignature(img);
    };
  }, [signatureSrc, threshold, contrast, inkColor, targetWidth, targetHeight]);

  const processSignature = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Pure white clean canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    // Calculate aspect fit centered
    const imgAspect = img.width / img.height;
    const canvasAspect = targetWidth / targetHeight;
    let drawW = targetWidth * 0.9;
    let drawH = drawW / imgAspect;

    if (drawH > targetHeight * 0.85) {
      drawH = targetHeight * 0.85;
      drawW = drawH * imgAspect;
    }

    const posX = (targetWidth - drawW) / 2;
    const posY = (targetHeight - drawH) / 2;

    ctx.drawImage(img, posX, posY, drawW, drawH);

    // Get pixel data for threshold background removal & ink sharpening
    const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Grayscale luminance
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      if (lum > threshold) {
        // Turn paper/shadow into pure white
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      } else {
        // Deepen signature ink
        if (inkColor === 'black') {
          data[i] = 20;
          data[i + 1] = 20;
          data[i + 2] = 20;
        } else if (inkColor === 'blue') {
          data[i] = 10;
          data[i + 1] = 45;
          data[i + 2] = 160;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Estimate file size
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    const head = 'data:image/jpeg;base64,';
    const sizeInBytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
    setFileSizeKb(Math.round(sizeInBytes / 1024));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSignatureSrc(ev.target?.result as string);
      showNotification(lang === 'bn' ? 'স্বাক্ষর আপলোড হয়েছে' : 'Signature uploaded');
    };
    reader.readAsDataURL(file);
  };

  const downloadSignature = (format: 'jpg' | 'png') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `siam_signature_${targetWidth}x${targetHeight}.${format}`;
    link.href = canvas.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', 0.88);
    link.click();
    showNotification(lang === 'bn' ? 'স্বাক্ষর ডাউনলোড সম্পন্ন হয়েছে!' : 'Signature downloaded!');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-xs">
          <button
            onClick={() => navigate('/admin')}
            className="text-slate-500 hover:text-blue-700 flex items-center gap-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin'}</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-blue-700 font-bold">অনলাইন স্বাক্ষর রিসাইজার ও ব্যাকগ্রাউন্ড ক্লিনার</span>
        </div>

        {/* Title Header Card */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>বাংলাদেশ সরকারি চাকরি ও অনলাইন ফর্ম স্পেসিফিকেশন</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {lang === 'bn' ? 'স্বাক্ষর রিসাইজার ও ব্যাকগ্রাউন্ড রিমুভার' : 'Signature Resizer & Cleaner Tool'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            টেলিটক, এনটিআরসিএ, বিশ্ববিদ্যালয় ভর্তি ও সরকারি চাকরির আবেদনের জন্য যেকোনো কাগজের স্বাক্ষর মুহূর্তেই ৩০০×১০০ পিক্সেলে রিসাইজ এবং ৬০ KB এর নিচে কম্প্রেস করুন।
          </p>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">স্বাক্ষর ছবি আপলোড:</label>
              <label className="w-full py-3 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-blue-600" />
                <span>কাগজের স্বাক্ষরের ছবি তুলুন বা আপলোড করুন</span>
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>

            {/* Standard Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">পিক্সেল সাইজ প্রিসেট:</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: '300x100', label: '300 × 100 px' },
                  { id: '300x80', label: '300 × 80 px' },
                  { id: 'custom', label: 'কাস্টম সাইজ' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPreset(p.id as any)}
                    className={`py-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                      preset === p.id
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {preset === 'custom' && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block mb-1">প্রস্থ (Width px):</span>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => setTargetWidth(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border rounded-lg"
                  />
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">উচ্চতা (Height px):</span>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => setTargetHeight(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Ink Color */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">স্বাক্ষরের কালার:</label>
              <div className="flex gap-2">
                {[
                  { id: 'black', label: 'গাঢ় কালো (Deep Black)' },
                  { id: 'blue', label: 'নীল কালি (Royal Blue)' },
                  { id: 'original', label: 'মূল কালার' }
                ].map((ink) => (
                  <button
                    key={ink.id}
                    onClick={() => setInkColor(ink.id as any)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      inkColor === ink.id
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {ink.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Whiten Threshold */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-bold mb-1">
                <span>কাগজের ব্যাকগ্রাউন্ড সাদা করার মাত্রা:</span>
                <span className="text-blue-700 font-mono">{threshold}</span>
              </div>
              <input
                type="range"
                min="80"
                max="220"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                ডানে সরালে হলুদ/ধূসর কাগজের দাগ দূর হয়ে সম্পূর্ণ সাদা হবে।
              </span>
            </div>

            {/* Target Size Badge */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>অনলাইন চাকরির ফরম্যাটে প্রস্তুত</span>
              </div>
              <span className="font-mono font-bold text-emerald-700">~{fileSizeKb} KB (Max 60KB)</span>
            </div>

            {/* Download Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => downloadSignature('jpg')}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>JPG ফরম্যাটে ডাউনলোড (টেলিটক উপযোগী)</span>
              </button>

              <button
                onClick={() => downloadSignature('png')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>PNG ফরম্যাটে ডাউনলোড (স্বচ্ছ ও নিখুঁত)</span>
              </button>
            </div>
          </div>

          {/* Live Canvas Preview Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-inner min-h-[380px]">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-blue-400" />
              <span>রিয়েলটাইম প্রিভিউ (সাদা ব্যাকগ্রাউন্ড)</span>
            </span>

            <div className="bg-white p-4 rounded-xl shadow-2xl border-4 border-slate-700 max-w-full overflow-hidden flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto border border-dashed border-slate-300"
              />
            </div>

            <div className="mt-6 text-center space-y-1">
              <p className="text-xs font-mono text-slate-300">
                সাইজ: {targetWidth} × {targetHeight} পিক্সেল | সাইজ: ~{fileSizeKb} KB
              </p>
              <p className="text-[11px] text-slate-500">
                হোমনা ও আশেপাশের শিক্ষার্থীদের সকল অনলাইন আবেদনের স্বাক্ষর নিখুঁতভাবে তৈরি হয়।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
