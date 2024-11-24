import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageList from "./components/PageList";
import PageDetail from "./components/PageDetail";

function App() {
  return (
    <Router>
      <div>
        <h1>My React + TypeScript Project</h1>
        <Routes>
          <Route path="/" element={<PageList />} />
          <Route path="/:url" element={<PageDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
