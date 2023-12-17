import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn"; // Login Page
import SignUp from "./Components/SignUp"; // Registration Page
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
