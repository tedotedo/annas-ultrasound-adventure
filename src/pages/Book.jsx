import { Link } from 'react-router-dom';

// Import a book page image to use as cover preview
import bookCover from '../../assets/images/pages/part5_page01.png';

function Book() {
  const purchaseOptions = [
    {
      id: 'kindle',
      label: 'Kindle Edition',
      icon: '📱',
      description: 'Read on your device',
      url: 'https://www.amazon.co.uk/dp/B0GKQ61CT8',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      hoverBorder: 'hover:border-blue-400',
      available: true,
    },
    {
      id: 'paperback',
      label: 'Paperback',
      icon: '📖',
      description: 'Coming Soon',
      url: null,
      bgColor: 'bg-gradient-to-br from-amber-100 to-orange-200',
      hoverBorder: 'hover:border-orange-400',
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-fun">
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
            Get the Book
          </h1>
          <p className="text-text-light text-base md:text-lg">
            Read the full story of Anna's adventure!
          </p>
        </header>

        {/* Book Preview Card */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-xl mb-8">
          {/* Book Cover */}
          <div className="mb-6">
            <img
              src={bookCover}
              alt="Anna's Ultrasound Adventure book cover"
              className="w-48 md:w-56 mx-auto rounded-lg shadow-lg border-4 border-white"
            />
          </div>

          {/* Book Info */}
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-text-dark font-heading mb-1">
              Anna's Ultrasound Adventure
            </h2>
            <p className="text-primary-blue font-semibold mb-4">
              By Dr Moira McCarty
            </p>
            <p className="text-text-dark leading-relaxed">
              Follow Anna's ultrasound adventure in this beautifully illustrated book.
              Perfect for reading together before your child's scan to help them
              feel calm and prepared.
            </p>
          </div>
        </div>

        {/* Purchase Options */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-text-dark font-heading text-center mb-4">
            Choose your format
          </h3>

          {purchaseOptions.map((option) => (
            option.available ? (
              <a
                key={option.id}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full ${option.bgColor} rounded-xl py-4 px-5
                           shadow-md hover:shadow-lg
                           transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                           border border-white/70 ${option.hoverBorder}
                           focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{option.icon}</span>
                  <div className="flex-1">
                    <span className="font-bold text-text-dark font-heading block">
                      {option.label}
                    </span>
                    <span className="text-sm text-text-light">
                      {option.description}
                    </span>
                  </div>
                  <span className="text-text-light text-lg">→</span>
                </div>
              </a>
            ) : (
              <div
                key={option.id}
                className={`block w-full ${option.bgColor} rounded-xl py-4 px-5
                           shadow-md opacity-70 border border-white/70`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{option.icon}</span>
                  <div className="flex-1">
                    <span className="font-bold text-text-dark font-heading block">
                      {option.label}
                    </span>
                    <span className="text-sm text-text-light italic">
                      {option.description}
                    </span>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="text-text-light text-sm">
            Available on Amazon UK
          </p>
          <p className="text-text-light text-xs mt-2">
            Links will open in a new window
          </p>
        </div>
      </div>
    </div>
  );
}

export default Book;
