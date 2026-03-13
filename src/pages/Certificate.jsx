import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { checklistSections } from '../data/checklistItems';
import { useLanguage } from '../i18n';

// Import character images
import anna from '../../assets/images/characters/anna.jpg';
import tedrick from '../../assets/images/characters/Tedrick.png';

function Certificate() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  const [checkedItems] = useLocalStorage('annas-ultrasound-checklist', {});
  const [certificateData, setCertificateData] = useLocalStorage('annas-ultrasound-certificate', {
    name: '',
  });
  const [name, setName] = useState(certificateData.name || '');
  const [isGenerating, setIsGenerating] = useState(false);

  // Check if checklist is complete
  const totalItems = checklistSections.reduce((sum, section) => sum + section.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const isChecklistComplete = completedItems === totalItems;

  // Redirect if checklist not complete
  useEffect(() => {
    if (!isChecklistComplete) {
      // Give user a moment to see the message before redirect
      const timer = setTimeout(() => {
        navigate('/checklist');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isChecklistComplete, navigate]);

  // Save name when it changes
  useEffect(() => {
    if (name) {
      setCertificateData({ name, generatedAt: new Date().toISOString() });
    }
  }, [name, setCertificateData]);

  const handleDownload = async () => {
    if (!certificateRef.current || !name.trim()) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `brave-like-anna-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Sorry, there was an error creating your certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Format date with locale
  const today = new Date().toLocaleDateString(t.common.locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Show message if checklist not complete
  if (!isChecklistComplete) {
    return (
      <div className="min-h-screen bg-gradient-fun flex items-center justify-center px-4">
        <div className="bg-white/90 rounded-2xl p-8 shadow-xl text-center max-w-md">
          <span className="text-5xl mb-4 block">📋</span>
          <h1 className="text-2xl font-bold text-text-dark font-heading mb-4">
            {t.certificate.notComplete.title}
          </h1>
          <p className="text-text-light mb-6">
            {t.certificate.notComplete.message}
          </p>
          <p className="text-sm text-text-light mb-4">
            {t.certificate.notComplete.redirecting}
          </p>
          <Link
            to="/checklist"
            className="inline-block bg-primary-blue text-white font-bold py-3 px-6 rounded-xl
                       hover:bg-blue-600 transition-colors"
          >
            {t.certificate.notComplete.goToChecklist}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-fun py-6 md:py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-blue hover:text-blue-700
                     font-semibold mb-6 transition-colors"
        >
          <span className="text-xl">←</span>
          <span>{t.common.backToHome}</span>
        </Link>

        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark font-heading mb-2">
            {t.certificate.title}
          </h1>
          <p className="text-text-light text-base md:text-lg">
            {t.certificate.subtitle}
          </p>
        </header>

        {/* Name Input */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg mb-6">
          <label htmlFor="name" className="block text-text-dark font-semibold mb-2">
            {t.certificate.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.certificate.namePlaceholder}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200
                       focus:border-primary-blue focus:outline-none
                       text-lg text-text-dark"
            maxLength={30}
          />
        </div>

        {/* Certificate Preview */}
        <div className="mb-6 overflow-hidden rounded-2xl shadow-2xl">
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-soft-blue via-white to-soft-orange p-8 md:p-12"
            style={{ aspectRatio: '1.4/1' }}
          >
            {/* Decorative border */}
            <div className="border-4 border-primary-blue/30 rounded-2xl p-6 md:p-8 h-full
                           flex flex-col items-center justify-between relative">

              {/* Stars decoration */}
              <div className="absolute top-2 left-2 text-2xl">⭐</div>
              <div className="absolute top-2 right-2 text-2xl">⭐</div>
              <div className="absolute bottom-2 left-2 text-2xl">⭐</div>
              <div className="absolute bottom-2 right-2 text-2xl">⭐</div>

              {/* Header */}
              <div className="text-center">
                <h2 className="text-lg md:text-xl text-primary-blue font-semibold mb-1">
                  {t.certificate.certTitle}
                </h2>
                <h3 className="text-2xl md:text-4xl font-extrabold text-text-dark font-heading">
                  {t.certificate.certSubtitle}
                </h3>
              </div>

              {/* Name */}
              <div className="text-center py-4">
                <p className="text-text-light text-sm mb-1">{t.certificate.certifies}</p>
                <p className="text-3xl md:text-5xl font-bold text-warm-orange font-heading
                             min-h-[1.5em] border-b-4 border-dotted border-warm-orange/50 px-4">
                  {name || t.certificate.nameFallback}
                </p>
                <p className="text-text-light text-sm mt-2">
                  {t.certificate.certMessage}
                </p>
              </div>

              {/* Characters */}
              <div className="flex items-end justify-center gap-4 my-2">
                <img
                  src={anna}
                  alt="Anna"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full"
                />
                <img
                  src={tedrick}
                  alt="Tedrick"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>

              {/* Footer */}
              <div className="text-center">
                <p className="text-text-light text-xs">{today}</p>
                <p className="text-primary-blue font-semibold text-sm mt-1">
                  {t.common.appTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <button
            onClick={handleDownload}
            disabled={!name.trim() || isGenerating}
            className={`inline-flex items-center gap-2 font-bold py-4 px-8 rounded-xl
                       transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-offset-2
                       ${name.trim() && !isGenerating
                         ? 'bg-success-green text-white hover:bg-green-600 focus:ring-success-green'
                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t.certificate.creating}
              </>
            ) : (
              <>
                <span>{t.certificate.download}</span>
                <span className="text-xl">📥</span>
              </>
            )}
          </button>

          {!name.trim() && (
            <p className="text-text-light text-sm mt-3">
              {t.certificate.enterName}
            </p>
          )}
        </div>

        {/* Print hint */}
        <div className="mt-8 text-center">
          <p className="text-text-light text-sm">
            {t.certificate.printTip}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
