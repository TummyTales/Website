import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import TermsAndConditions from './components/General/TermsAndConditions'
import Recipe from './pages/Recipe';
// import { AnimatePresence } from 'framer-motion';

export default function App() {
  // const location=useLocation();
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route exact path="/recipe/:data" element={<Recipe />} />
      </Routes>
    
    </Router>
)}