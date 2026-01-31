import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Explore from './pages/Explore';
import Checklist from './pages/Checklist';
import Book from './pages/Book';
import Certificate from './pages/Certificate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/book" element={<Book />} />
        <Route path="/certificate" element={<Certificate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
