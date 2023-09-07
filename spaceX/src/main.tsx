import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cargo from "./components/Cargo";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
    <Route path="/:shipmentId?" element={<Cargo />}> </Route>
    </Routes>
  </BrowserRouter>
);
