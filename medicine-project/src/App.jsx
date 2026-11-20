
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Search from "./components/Search.jsx";
import MedicineCatalog from "./components/Medicine-catalog.jsx";
import AddMedicine from "./components/AddMedicine.jsx";
import MedicineDetails from "./components/MedicineDetails.jsx";
import { addMedicine } from "./medicineStorage.js";

function App() {
  async function handleAddMedicine(newMedicine) {
    return addMedicine(newMedicine);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shop" element={<MedicineCatalog />} />
        <Route
          path="/add-medicine"
          element={<AddMedicine onAddMedicine={handleAddMedicine} />}
        />
        <Route path="/medicine/:id" element={<MedicineDetails />} />
        <Route path="*" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
