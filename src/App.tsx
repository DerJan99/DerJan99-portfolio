import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ImpressumPage from "@/pages/impressum";
import DatenschutzerklaerungPage from "@/pages/datenschutzerklaerung";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ImpressumPage />} path="/impressum" />
      <Route
        element={<DatenschutzerklaerungPage />}
        path="/datenschutzerklaerung"
      />
    </Routes>
  );
}

export default App;
