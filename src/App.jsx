import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Additional routes will be added here */}
        <Route path="/team" element={<PlaceholderPage title="Meet the Team" />} />
        <Route path="/explore" element={<PlaceholderPage title="Explore the Scan Room" />} />
        <Route path="/checklist" element={<PlaceholderPage title="Getting Ready Checklist" />} />
        <Route path="/book" element={<PlaceholderPage title="Get the Book" />} />
        <Route path="/certificate" element={<PlaceholderPage title="Certificate" />} />
      </Routes>
    </BrowserRouter>
  );
}

// Temporary placeholder for pages not yet implemented
function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen bg-soft-blue flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-text-dark font-heading mb-4">{title}</h1>
      <p className="text-text-light mb-6">Coming soon!</p>
      <a
        href="/"
        className="bg-warm-orange text-white px-6 py-3 rounded-xl font-semibold
                   hover:bg-orange-600 transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
}

export default App;
