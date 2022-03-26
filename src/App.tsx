import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BasicForm from "./components/BasicForm";
import Test from "./components/Test";

function App() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/test");
    }
  }, []);

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/register">register</Link>
          </li>
          {/* <li>
            <Link to="/test">test</Link>
          </li> */}
        </ul>
      </nav>

      <Routes>
        <Route path="login" element={<BasicForm title="login" />} />
        <Route path="register" element={<BasicForm title="register" />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
