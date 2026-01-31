import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { checklistSections } from '../data/checklistItems';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Checklist() {
  const [checkedItems, setCheckedItems] = useLocalStorage('annas-ultrasound-checklist', {});
  const [expandedSections, setExpandedSections] = useState(
    checklistSections.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
  );
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate total items and completed items
  const { totalItems, completedItems, progress } = useMemo(() => {
    const total = checklistSections.reduce((sum, section) => sum + section.items.length, 0);
    const completed = Object.values(checkedItems).filter(Boolean).length;
    return {
      totalItems: total,
      completedItems: completed,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [checkedItems]);

  const isComplete = progress === 100;

  const toggleItem = (itemId) => {
    const newCheckedItems = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    };
    setCheckedItems(newCheckedItems);

    // Check if this completes the list
    const newCompleted = Object.values(newCheckedItems).filter(Boolean).length;
    if (newCompleted === totalItems && !isComplete) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getSectionProgress = (section) => {
    const completed = section.items.filter((item) => checkedItems[item.id]).length;
    return `${completed}/${section.items.length}`;
  };

  return (
    <div className="min-h-screen bg-gradient-fun">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          colors={['#3B82F6', '#F97316', '#22C55E', '#EC4899', '#8B5CF6']}
        />
      )}

      <div className="max-w-lg mx-auto px-4 py-6 md:py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-blue hover:text-blue-700
                     font-semibold mb-6 transition-colors"
        >
          <span className="text-xl">←</span>
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark font-heading mb-2">
            Getting Ready Checklist
          </h1>
          <p className="text-text-light text-base md:text-lg">
            Tick off each item as you get ready!
          </p>
        </header>

        {/* Progress Bar */}
        <div className="bg-white/80 rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-text-dark">Your Progress</span>
            <span className="font-bold text-primary-blue">{progress}%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-blue to-success-green rounded-full
                         transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-text-light mt-2 text-center">
            {completedItems} of {totalItems} items completed
          </p>
        </div>

        {/* Completion Message */}
        {isComplete && (
          <div className="bg-success-green/10 border-2 border-success-green rounded-2xl p-6 mb-6 text-center">
            <h2 className="text-2xl font-bold text-success-green font-heading mb-2">
              You're Ready!
            </h2>
            <p className="text-text-dark mb-4">
              Amazing job! You've completed everything on the checklist.
            </p>
            <Link
              to="/certificate"
              className="inline-block bg-success-green text-white font-bold py-3 px-6 rounded-xl
                         hover:bg-green-600 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-success-green focus:ring-offset-2"
            >
              Get Your Certificate!
            </Link>
          </div>
        )}

        {/* Checklist Sections */}
        <div className="space-y-4">
          {checklistSections.map((section) => {
            const isExpanded = expandedSections[section.id];
            const sectionComplete = section.items.every((item) => checkedItems[item.id]);

            return (
              <div
                key={section.id}
                className={`bg-white/90 rounded-2xl shadow-lg overflow-hidden transition-all
                           ${sectionComplete ? 'ring-2 ring-success-green' : ''}`}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 text-left
                             hover:bg-gray-50 transition-colors
                             focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-blue"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.emoji}</span>
                    <div>
                      <h2 className="font-bold text-text-dark font-heading">
                        {section.title}
                      </h2>
                      <span className="text-sm text-text-light">
                        {getSectionProgress(section)} done
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {sectionComplete && (
                      <span className="text-success-green text-xl">✓</span>
                    )}
                    <span
                      className={`text-text-light transition-transform duration-200
                                 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      ▼
                    </span>
                  </div>
                </button>

                {/* Section Items */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-2">
                    {section.items.map((item) => {
                      const isChecked = checkedItems[item.id];

                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl
                                     transition-all duration-200
                                     ${isChecked
                                       ? 'bg-success-green/10'
                                       : 'bg-gray-50 hover:bg-gray-100'}
                                     focus:outline-none focus:ring-2 focus:ring-primary-blue`}
                        >
                          {/* Checkbox */}
                          <div
                            className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center
                                       transition-all duration-200
                                       ${isChecked
                                         ? 'bg-success-green border-success-green scale-110'
                                         : 'border-gray-300'}`}
                          >
                            {isChecked && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>

                          {/* Label */}
                          <span
                            className={`flex-1 text-left transition-all duration-200
                                       ${isChecked
                                         ? 'text-text-light line-through'
                                         : 'text-text-dark'}`}
                          >
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reset button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your checklist?')) {
                setCheckedItems({});
              }
            }}
            className="text-text-light text-sm hover:text-text-dark transition-colors underline"
          >
            Reset checklist
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checklist;
