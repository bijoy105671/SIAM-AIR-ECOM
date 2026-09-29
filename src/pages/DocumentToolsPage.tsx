import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  Download,
  Printer,
  FileText,
  Sliders,
  RotateCw,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Maximize2,
  Trash2,
  Plus
} from 'lucide-react';

interface DocumentToolsPageProps {
  navigate: (path: string) => void;
}

export const DocumentToolsPage: React.FC<DocumentToolsPageProps> = ({ navigate }) => {
  const { lang, activeStudioImage, showNotification } = useApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Document Pages list
  const [pages, setPages] = useState<string[]>(() => {
    return activeStudioImage
      ? [activeStudioImage]
      : ['https://images.unsplash.com/photo-1589330694653-dad6bc0140ce?q=80&w=700&auto=format&fit=crop'];
  });
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  // Sync activeStudioImage if set from Admin or elsewhere
  useEffect(() => {
    if (activeStudioImage) {
      setPages(prev => [activeStudioImage, ...prev.filter(p => p !== activeStudioImage)]);
      setActivePageIndex(0);
    }
  }, [activeStudioImage]);

  // Filter settings
  const [filterMode, setFilterMode] = useState<'clean_bw' | 'grayscale' | 'color_enhanced' | 'original'>('clean_bw');
  const [contrast, setContrast] = useState<number>(140);
  const [brightness, setBrightness] = useState<number>(115);
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    renderDocumentPage();
  }, [pages, activePageIndex, filterMode, contrast, brightness, rotation]);

  const renderDocumentPage = () => {
    if (!pages[activePageIndex]) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = pages[activePageIndex];
    img.onload = () => {
      // Standard A4 aspect or native
      const w = 1240;
      const h = Math.round((w / img.width) * img.height);
      canvas.width = w;
      canvas.height = h;

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      // Draw original
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      ctx.restore();

      // Pixel post-processing for document scanner effect
      if (filterMode !== 'original') {
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          // Grayscale luminance
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          if (filterMode === 'clean_bw') {
            // Scanner threshold for pure white paper and deep dark ink
            if (lum > 140) {
              d[i] = 255;
              d[i + 1] = 255;
              d[i + 2] = 255;
            } else {
              d[i] = Math.max(0, lum * 0.4);
              d[i + 1] = Math.max(0, lum * 0.4);
              d[i + 2] = Math.max(0, lum * 0.4);
            }
          } else if (filterMode === 'grayscale') {
            d[i] = lum;
            d[i + 1] = lum;
            d[i + 2] = lum;
          } else if (filterMode === 'color_enhanced') {
            // Boost document contrast while preserving stamp colors
            d[i] = Math.min(255, Math.max(0, (r - 128) * (contrast / 100) + 128 + (brightness - 100)));
            d[i + 1] = Math.min(255, Math.max(0, (g - 128) * (contrast / 100) + 128 + (brightness - 100)));
            d[i + 2] = Math.min(255, Math.max(0, (b - 128) * (contrast / 100) + 128 + (brightness - 100)));
          }
        }

        ctx.putImageData(imgData, 0, 0);
      }
    };
  };

  const handleUploadPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPages((prev) => [...prev, ev.target?.result as string]);
        showNotification(lang === 'bn' ? 'ডকুমেন্ট পেজ যুক্ত হয়েছে' : 'Document page added');
      };
      reader.readAsDataURL(file);
    });
  };

  const removePage = (index: number) => {
    if (pages.length <= 1) {
      showNotification('কমপক্ষে একটি পেজ থাকতে হবে', 'error');
      return;
    }
    setPages((prev) => prev.filter((_, i) => i !== index));
    setActivePageIndex(0);
  };

  const downloadCurrentPage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `siam_document_page_${activePageIndex + 1}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
    showNotification(lang === 'bn' ? 'পেজ ডাউনলোড সম্পন্ন!' : 'Page downloaded!');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
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
          <span className="text-blue-700 font-bold">ডকুমেন্ট স্ক্যানার ও ক্লিনআপ টুলস</span>
        </div>

        {/* Title Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-blue-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>মোবাইল ক্যামেরা দিয়ে তোলা ডকুমেন্টের ঝাপসা ভাব ও ছায়া দূরীকরণ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {lang === 'bn' ? 'ডকুমেন্ট ও সার্টিফিকেট স্ক্যানার' : 'Document Scanner & Enhancer'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              মোবাইলের ক্যামেরায় তোলা সার্টিফিকেট বা কাগজের কালো ছায়া ও দাগ মুছে একদম ফ্ল্যাটবেড স্ক্যানারের মতো ঝকঝকে ও প্রিন্ট-রেডি করুন।
            </p>
          </div>

          <label className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all flex-shrink-0">
            <Plus className="w-4 h-4" />
            <span>নতুন ডকুমেন্ট পেজ যোগ করুন</span>
            <input type="file" multiple accept="image/*" onChange={handleUploadPage} className="hidden" />
          </label>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-5">
            {/* Pages selector */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                ডকুমেন্ট পেজসমূহ ({pages.length}):
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {pages.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePageIndex(idx)}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                      activePageIndex === idx ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <img src={p} alt="thumb" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] font-bold text-center py-0.5">
                      P.{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Modes */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">স্ক্যানার ফিল্টার মোড:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'clean_bw', label: 'ঝকঝকে সাদা কাগজ (Clean B/W)' },
                  { id: 'color_enhanced', label: 'কালার এনহ্যান্স (Color Boost)' },
                  { id: 'grayscale', label: 'গ্রেস্কেল (Grayscale)' },
                  { id: 'original', label: 'মূল ছবি (Original)' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setFilterMode(m.id as any)}
                    className={`p-2.5 rounded-xl font-bold border text-left transition-colors cursor-pointer ${
                      filterMode === m.id
                        ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 font-bold mb-1">
                  <span>ব্রাইটনেস (Brightness):</span>
                  <span className="font-mono text-blue-700">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="160"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-bold mb-1">
                  <span>কন্ট্রাস্ট (Contrast):</span>
                  <span className="font-mono text-blue-700">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Rotate */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">ঘোরান:</span>
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>+90° Rotate</span>
              </button>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={downloadCurrentPage}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>এই পেজটি হাই-রেজোলিউশনে ডাউনলোড</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>সরাসরি A4 পেপারে প্রিন্ট</span>
              </button>

              {pages.length > 1 && (
                <button
                  onClick={() => removePage(activePageIndex)}
                  className="w-full py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>পেজটি মুছুন</span>
                </button>
              )}
            </div>
          </div>

          {/* Live Clean Canvas Preview */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner min-h-[500px]">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              ক্লিনড স্ক্যানার আউটপুট (পেজ {activePageIndex + 1} / {pages.length})
            </span>

            <div className="bg-white p-2 rounded-xl shadow-2xl border-4 border-slate-700 max-w-full overflow-hidden">
              <canvas
                ref={canvasRef}
                className="max-h-[520px] w-auto object-contain bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
