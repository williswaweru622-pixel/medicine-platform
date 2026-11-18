
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
import Search from "./components/Search.jsx";
import MedicineCatalog from "./components/Medicine-catalog.jsx";
import AddMedicine from "./components/AddMedicine.jsx";
import MedicineDetails from "./components/medicine/MedicineDetails.jsx";
import HomePage from "./components/HomePage.jsx";
import Search from "./components/Search.jsx";
import MedicineCatalog from "./components/Medicine-catalog";
import AddMedicine from "./components/AddMedicine.jsx";

function App() {
  async function handleAddMedicine(newMedicine) {
    const response = await fetch("http://localhost:3001/medicines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMedicine)
    });

    if (!response.ok) {
      throw new Error(`Could not save medicine (HTTP ${response.status}).`);
    }

    return response.json();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/search" element={<Search />} />

        <Route path="/shop" element={<MedicineCatalog />} />

        <Route path="/search" element={<Search />} />
        <Route path="/shop" element={<MedicineCatalog />} />
        <Route
          path="/add-medicine"
          element={<AddMedicine onAddMedicine={handleAddMedicine} />}
        />

        <Route
          path="/medicine/:id"
          element={<MedicineDetails />}
        />

        <Route path="*" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
