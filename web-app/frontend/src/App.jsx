import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/login";


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LogIn />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
