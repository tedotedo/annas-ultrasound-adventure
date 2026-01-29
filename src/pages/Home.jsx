import { Link } from 'react-router-dom';

// Import images from the book
import scanRoom from '../../assets/images/scenes/scan_room.png';
import waitingRoom from '../../assets/images/scenes/waiting_room.png';

function Home() {
  const menuItems = [
    {
      to: '/team',
      label: 'Meet the Team',
      description: 'Say hello to Anna, Tedrick and friends',
      bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
      borderColor: 'hover:border-pink-400',
    },
    {
      to: '/explore',
      label: 'Explore the Scan Room',
      description: "See what's inside",
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      borderColor: 'hover:border-blue-400',
    },
    {
      to: '/checklist',
      label: 'Getting Ready Checklist',
      description: 'Prepare for your visit',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
      borderColor: 'hover:border-green-400',
    },
    {
      to: '/book',
      label: 'Get the Book',
      description: "Read Anna's story",
      bgColor: 'bg-gradient-to-br from-amber-100 to-orange-200',
      borderColor: 'hover:border-orange-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-fun relative overflow-hidden">
      {/* Background image from the book - cheerful waiting room scene */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${waitingRoom})` }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-6 md:py-8 min-h-screen">
        {/* Header with Anna and Tedrick */}
        <header className="text-center mb-4 md:mb-6">
          {/* Anna with Tedrick image from the book */}
          <div className="mb-3 md:mb-4">
            <img
              src={scanRoom}
              alt="Anna with Tedrick and Mum in the scan room"
              className="w-64 md:w-80 object-contain rounded-3xl border-4 border-white shadow-lg mx-auto animate-float-slow"
            />
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark font-heading mb-1 md:mb-2">
            Anna's Ultrasound
            <span className="block text-primary-blue">Adventure</span>
          </h1>
          <p className="text-base md:text-lg text-text-light font-semibold">
            Get ready for your scan with Anna and Tedrick!
          </p>
        </header>

        {/* Navigation Buttons */}
        <nav className="w-full max-w-md space-y-3 md:space-y-4 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block w-full ${item.bgColor} rounded-2xl md:rounded-3xl p-4 md:p-5
                         shadow-lg hover:shadow-xl
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                         border-2 border-white/70 ${item.borderColor}
                         focus:outline-none focus:ring-3 focus:ring-primary-blue focus:ring-offset-2`}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-1 min-w-0">
                  <span className="text-base md:text-lg font-bold text-text-dark font-heading block">
                    {item.label}
                  </span>
                  <span className="text-sm text-text-light/90 block">
                    {item.description}
                  </span>
                </div>
                <span className="text-text-light/60 text-xl md:text-2xl flex-shrink-0">→</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <footer className="mt-auto pt-6 md:pt-8 text-center">
          <p className="text-text-light text-sm">
            Based on the book by Dr Moira McCarty
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
