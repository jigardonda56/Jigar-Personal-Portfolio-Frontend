import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// import About from './components/GeneralComps/About';
import Navbar from './components/GeneralComps/Navbar';
import Profile from './components/GeneralComps/Profile';
import Context from './context/notes/myContextState';
import EditProfileComp from './components/EditProfileComps/EditProfileComp';
import Login from './components/GeneralComps/Login';
// import AboutComp from './components/DisplayProfileComps/AboutComp';

function App() {
  return (
    <>
      <Context>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Profile />} />
              <Route exact path="/profile" element={<Profile />} />
              {/* <Route path="/about" element={<About />} /> */}
              <Route exact path="/admin" element={<EditProfileComp />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </Context>
    </>
  );
}

export default App;
