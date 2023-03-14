import './App.css';
import DisplayLayout from './components/displaylayout/DisplayLayout';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutMovie from './components/aboutMovie/AboutMovie';
function App() {
  return (
    <div className="App">
    <Router>

    <Navbar />
    <Routes>

    <Route path="/" element={<DisplayLayout/>} />
    <Route path="/movies/top-rated" element={<DisplayLayout/>} />
    <Route path="/shows" element={<DisplayLayout />} />
    <Route path="/countries/:name" element={<DisplayLayout />} />
    <Route path="/genre/:name" element={<DisplayLayout />} />
    <Route path="/search/:name" element={<DisplayLayout />} />
    <Route path="/movie/:id" element={<AboutMovie />} />

    </Routes>
    </Router>
    </div>
  );
}

export default App;
