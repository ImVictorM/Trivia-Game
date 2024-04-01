import { Route, Routes } from "react-router-dom";
import { Login } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/game" element={Game} />
      <Route path="/feedback" element={Feedback} />
      <Route path="/settings" element={Settings} />
      <Route path="/ranking" element={Ranking} /> */}
    </Routes>
  );
}
export default App;
