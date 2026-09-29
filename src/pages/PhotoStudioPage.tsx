import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  Download,
  Printer,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Maximize2,
  Crop,
  Sliders,
  Sparkles,
  Layers,
  Palette,
  Check,
  RefreshCw,
  Grid,
  FileImage,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { PHOTO_PRESETS } from '../config/initialData';
import { PhotoPreset } from '../types';

interface PhotoStudioPageProps {
  navigate: (path: string) => void;
}

export const PhotoStudioPage: React.FC<PhotoStudioPageProps> = ({ navigate }) => {
  const { lang, activeStudioImage, setActiveStudioImage, showNotification } = useApp();

  // Canvas refs
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sheetCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active loaded image
  const [imageSrc, setImageSrc] = useState<string | null>(() => {
    return activeStudioImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop';
  });

  // Keep imageSrc updated whenever activeStudioImage changes (e.g. from Admin order action)
  useEffect(() => {
    if (activeStudioImage) {
      setImageSrc(activeStudioImage);
    }
  }, [activeStudioImage]);

  // Adjustments
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  // Selected Preset
  const [selectedPreset, setSelectedPreset] = useState<PhotoPreset>(PHOTO_PRESETS[0]);

  // Background replacement
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');

  // Sheet layout generator settings
  const [sheetPaper, setSheetPaper] = useState<'4R' | 'A4' | 'A6'>('4R');
  const [copyCount, setCopyCount] = useState<number>(8);
  const [showCutMarks, setShowCutMarks] = useState(true);

  // Active editor tab: 'edit' | 'sheet'
  const [activeTab, setActiveTab] = useState<'edit' | 'sheet'>('edit');

  // Load image onto canvas when source or basic adjustments change
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      renderSinglePhoto(img);
    };
  }, [imageSrc, brightness, contrast, saturation, rotation, flipH, flipV, selectedPreset, bgColor]);

  // Render passport sheet when sheet options change
  useEffect(() => {
    if (activeTab === 'sheet') {
      renderPassportSheet();
    }
  }, [activeTab, sheetPaper, copyCount, showCutMarks, selectedPreset, bgColor, brightness, contrast]);

  // Render single edited photo
  const renderSinglePhoto = (img: HTMLImageElement) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Target dimensions based on preset
    const targetW = selectedPreset.widthPx;
    const targetH = selectedPreset.heightPx;
    canvas.width = targetW;
    canvas.height = targetH;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, targetW, targetH);

    // Apply adjustments & filters
    ctx.save();
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

    // Handle center rotation & flipping
    ctx.translate(targetW / 2, targetH / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    // Calculate aspect ratio crop (cover center)
    const imgAspect = img.width / img.height;
    const targetAspect = targetW / targetH;
    let drawW = targetW;
    let drawH = targetH;

    if (imgAspect > targetAspect) {
      drawH = targetH;
      drawW = targetH * imgAspect;
    } else {
      drawW = targetW;
      drawH = targetW / imgAspect;
    }

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  };

  // Render multi-copy sheet (4R or A4)
  const renderPassportSheet = () => {
    const singleCanvas = previewCanvasRef.current;
    const sheetCanvas = sheetCanvasRef.current;
    if (!singleCanvas || !sheetCanvas) return;
    const ctx = sheetCanvas.getContext('2d');
    if (!ctx) return;

    // Standard 300 DPI sizes
    let sheetW = 1200; // 4R width (4 inch * 300)
    let sheetH = 1800; // 4R height (6 inch * 300)

    if (sheetPaper === 'A4') {
      sheetW = 2480;
      sheetH = 3508;
    } else if (sheetPaper === 'A6') {
      sheetW = 1240;
      sheetH = 1748;
    }

    sheetCanvas.width = sheetW;
    sheetCanvas.height = sheetH;

    // Clean white photo paper
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetW, sheetH);

    // Grid calculations
    let cols = 2;
    let rows = 4;
    if (copyCount === 4) {
      cols = 2;
      rows = 2;
    } else if (copyCount === 6) {
      cols = 2;
      rows = 3;
    } else if (copyCount === 8) {
      cols = 2;
      rows = 4;
    } else if (copyCount === 12) {
      cols = 3;
      rows = 4;
    } else if (copyCount === 16) {
      cols = 4;
      rows = 4;
    }

    const marginX = sheetW * 0.06;
    const marginY = sheetH * 0.06;
    const availableW = sheetW - marginX * 2;
    const availableH = sheetH - marginY * 2;

    const cellW = availableW / cols;
    const cellH = availableH / rows;

    const photoAspect = selectedPreset.widthPx / selectedPreset.heightPx;
    let photoW = cellW * 0.88;
    let photoH = photoW / photoAspect;

    if (photoH > cellH * 0.88) {
      photoH = cellH * 0.88;
      photoW = photoH * photoAspect;
    }

    let count = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (count >= copyCount) break;

        const cellCenterX = marginX + c * cellW + cellW / 2;
        const cellCenterY = marginY + r * cellH + cellH / 2;

        const posX = cellCenterX - photoW / 2;
        const posY = cellCenterY - photoH / 2;

        // Draw photo
        ctx.drawImage(singleCanvas, posX, posY, photoW, photoH);

        // Optional hairline cut marks / border
        if (showCutMarks) {
          ctx.strokeStyle = '#D1D5DB';
          ctx.lineWidth = 1;
          ctx.strokeRect(posX, posY, photoW, photoH);
        }

        count++;
      }
    }

    // Shop watermark in bottom margin
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Siam Air & Digital Service | Ramkrishnapur Bazar, Homna, Cumilla | 01883400808', sheetW / 2, sheetH - 15);
  };

  // File Upload
  const handleLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageSrc(ev.target?.result as string);
      resetAdjustments();
      showNotification(lang === 'bn' ? 'ছবি লোড হয়েছে' : 'Image loaded');
    };
    reader.readAsDataURL(file);
  };

  const resetAdjustments = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setBgColor('#FFFFFF');
  };

  // Download Single Photo
  const downloadSinglePhoto = () => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `siam_passport_${selectedPreset.id}_${Date.now()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
    showNotification(lang === 'bn' ? 'পাসপোর্ট ছবি ডাউনলোড হয়েছে!' : 'Passport photo downloaded!');
  };

  // Download Full Sheet
  const downloadSheet = () => {
    const canvas = sheetCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `siam_photo_sheet_${sheetPaper}_${copyCount}copies.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.98);
    link.click();
    showNotification(lang === 'bn' ? 'প্রিন্ট শীট ডাউনলোড হয়েছে!' : 'Print sheet downloaded!');
  };

  // Trigger Browser Print
  const handleDirectPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-6 px-4 sm:px-6 print:p-0 print:bg-white print:text-black">
      {/* Top Bar (Hidden when printing) */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin'}</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-blue-400 font-bold">Photo Studio & Passport Maker</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            {lang === 'bn' ? 'ফটো স্টুডিও ও পাসপোর্ট প্রিন্ট ইঞ্জিন' : 'Photo Studio & Passport Print Engine'}
          </h1>
        </div>

        {/* View Switcher & Print Actions */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 p-1 rounded-xl flex">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'edit' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'bn' ? '১. ফটো এডিট ও ক্রপ' : '1. Edit & Crop'}
            </button>
            <button
              onClick={() => setActiveTab('sheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sheet' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'bn' ? '২. প্রিন্ট শীট (৪/৮/১৬ কপি)' : '2. Print Sheet Layout'}
            </button>
          </div>

          <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700">
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>নতুন ছবি আপলোড</span>
            <input type="file" accept="image/*" onChange={handleLocalUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 print:m-0 print:block">
        {/* LEFT COLUMN: Controls & Presets (Hidden during print) */}
        <div className="lg:col-span-4 space-y-5 print:hidden">
          {activeTab === 'edit' ? (
            <>
              {/* Presets Card */}
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Crop className="w-3.5 h-3.5 text-blue-400" />
                    <span>সাইজ ও ফরম্যাট প্রিসেট</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {PHOTO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset)}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                        selectedPreset.id === preset.id
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{lang === 'bn' ? preset.nameBn : preset.nameEn}</span>
                        {selectedPreset.id === preset.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {lang === 'bn' ? preset.descriptionBn : preset.descriptionEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color Replace */}
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ব্যাকগ্রাউন্ড কালার সিলেক্ট</span>
                </span>

                <div className="flex items-center gap-2">
                  {[
                    { label: 'হোয়াইট', color: '#FFFFFF' },
                    { label: 'ব্লু', color: '#0077B6' },
                    { label: 'স্কাই ব্লু', color: '#70B0E0' },
                    { label: 'রেড', color: '#C1121F' },
                    { label: 'অফ-হোয়াইট', color: '#F4F4F9' }
                  ].map((bg) => (
                    <button
                      key={bg.color}
                      onClick={() => setBgColor(bg.color)}
                      style={{ backgroundColor: bg.color }}
                      className={`w-9 h-9 rounded-xl border-2 transition-transform cursor-pointer flex items-center justify-center ${
                        bgColor === bg.color ? 'scale-110 border-blue-400 shadow-md ring-2 ring-blue-500/50' : 'border-slate-600'
                      }`}
                      title={bg.label}
                    >
                      {bgColor === bg.color && (
                        <Check className={`w-4 h-4 ${bg.color === '#FFFFFF' ? 'text-slate-900' : 'text-white'}`} />
                      )}
                    </button>
                  ))}

                  {/* Custom color picker */}
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-9 h-9 p-0 bg-transparent rounded-xl border border-slate-600 cursor-pointer"
                    title="Custom Color"
                  />
                </div>
              </div>

              {/* Fine Adjustments (Brightness, Contrast, Saturation) */}
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    <span>কালার ও আলো অ্যাডজাস্ট</span>
                  </span>
                  <button
                    onClick={resetAdjustments}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>রিসেট</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>ব্রাইটনেস (Brightness):</span>
                      <span className="font-mono text-blue-400">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="180"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>কন্ট্রাস্ট (Contrast):</span>
                      <span className="font-mono text-blue-400">{contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="180"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>স্যাচুরেশন (Saturation):</span>
                      <span className="font-mono text-blue-400">{saturation}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>

                {/* Transform buttons */}
                <div className="pt-2 border-t border-slate-700 grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setRotation((r) => (r - 90) % 360)}
                    className="p-2 bg-slate-700/60 hover:bg-slate-700 rounded-xl text-xs flex flex-col items-center gap-1 cursor-pointer"
                    title="Rotate Left"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="text-[10px]">-90°</span>
                  </button>

                  <button
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-2 bg-slate-700/60 hover:bg-slate-700 rounded-xl text-xs flex flex-col items-center gap-1 cursor-pointer"
                    title="Rotate Right"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span className="text-[10px]">+90°</span>
                  </button>

                  <button
                    onClick={() => setFlipH((f) => !f)}
                    className={`p-2 rounded-xl text-xs flex flex-col items-center gap-1 cursor-pointer ${
                      flipH ? 'bg-blue-600 text-white' : 'bg-slate-700/60 hover:bg-slate-700'
                    }`}
                    title="Flip Horizontal"
                  >
                    <FlipHorizontal className="w-4 h-4" />
                    <span className="text-[10px]">উল্টান (H)</span>
                  </button>

                  <button
                    onClick={() => setFlipV((f) => !f)}
                    className={`p-2 rounded-xl text-xs flex flex-col items-center gap-1 cursor-pointer ${
                      flipV ? 'bg-blue-600 text-white' : 'bg-slate-700/60 hover:bg-slate-700'
                    }`}
                    title="Flip Vertical"
                  >
                    <FlipVertical className="w-4 h-4" />
                    <span className="text-[10px]">উল্টান (V)</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Sheet Setup Options */
            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-blue-400" />
                <span>প্রিন্ট শীট ও পেপার সাইজ</span>
              </span>

              <div>
                <label className="block text-xs text-slate-300 mb-1 font-semibold">পেপার সাইজ (Paper Size):</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '4R', label: '4R (৪×৬ ইঞ্চি)' },
                    { id: 'A4', label: 'A4 সাইজ' },
                    { id: 'A6', label: 'A6 সাইজ' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSheetPaper(p.id as any)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        sheetPaper === p.id
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1 font-semibold">কপি সংখ্যা (Copies on Sheet):</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[4, 6, 8, 12, 16].map((count) => (
                    <button
                      key={count}
                      onClick={() => setCopyCount(count)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        copyCount === count
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCutMarks}
                    onChange={(e) => setShowCutMarks(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>কাটিং দাগ বা বর্ডার লাইন দেখান (Cut Marks)</span>
                </label>
              </div>

              <div className="p-3 bg-blue-950/40 border border-blue-800/50 rounded-xl text-xs text-blue-200">
                💡 <strong>কাউন্টার টিপস:</strong> ৪R ফটো পেপারে সাধারণত ৪ বা ৮ কপি পাসপোর্ট সাইজ ছবি নিখুঁত রেজোলিউশনে প্রিন্ট হয়।
              </div>
            </div>
          )}

          {/* Quick Actions (Single / Sheet) */}
          <div className="space-y-2">
            {activeTab === 'edit' ? (
              <>
                <button
                  onClick={downloadSinglePhoto}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>সিঙ্গেল পাসপোর্ট ছবি ডাউনলোড</span>
                </button>
                <button
                  onClick={() => setActiveTab('sheet')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  <span>প্রিন্ট শীট তৈরি করুন (পরবর্তী ধাপ)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleDirectPrint}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-5 h-5" />
                  <span>লোকাল প্রিন্টারে সরাসরি প্রিন্ট (Print Now)</span>
                </button>
                <button
                  onClick={downloadSheet}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>ফুল প্রিন্ট শীট ইমেজ ডাউনলোড</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Canvas Workspace & Live Preview */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center bg-slate-950 rounded-3xl p-6 border border-slate-800 min-h-[520px] print:p-0 print:border-none print:bg-white">
          {activeTab === 'edit' ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative shadow-2xl rounded-lg overflow-hidden border-2 border-slate-700">
                <canvas
                  ref={previewCanvasRef}
                  className="max-h-[460px] w-auto object-contain bg-white"
                />
              </div>

              <div className="text-center">
                <span className="text-xs font-mono text-slate-400">
                  {selectedPreset.nameEn} — {selectedPreset.widthMm} × {selectedPreset.heightMm} mm ({selectedPreset.widthPx} × {selectedPreset.heightPx} px)
                </span>
              </div>
            </div>
          ) : (
            /* Sheet Canvas View */
            <div className="flex flex-col items-center space-y-4 print:space-y-0">
              <div className="relative shadow-2xl rounded-sm overflow-hidden border border-slate-700 bg-white print:border-none print:shadow-none">
                <canvas
                  ref={sheetCanvasRef}
                  className="max-h-[540px] w-auto object-contain print:w-full print:max-h-none"
                />
              </div>

              <span className="text-xs font-mono text-slate-400 print:hidden">
                {sheetPaper} Sheet — {copyCount} Copies Prepared for Print
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
