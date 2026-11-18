import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SiteNavigation from "./SiteNavigation.jsx";
import "./Medicine-catalog.css";

const catalogMedicines = [
  {
    name: "Paracetamol",
    price: 100,
    category: "Pain Relief",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Paracetamol_generico.jpg",
  },
  {
    name: "Ibuprofen",
    price: 150,
    category: "Pain Relief",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ibuprofen-400.jpg",
  },
  {
    name: "Cetirizine",
    price: 120,
    category: "Allergy Relief",
    image: "https://www.scabpharmacy.com/wp-content/uploads/2024/11/Cetirizine-10mg-film-coated-Tablets-BP-3-scaled.jpg",
  },
  {
    name: "Antacid Tablets",
    price: 180,
    category: "Digestive Health",
    image: "https://www.penncare.net/wp-content/uploads/2022/04/90089AC.jpg",
  },
  {
    name: "Ultra Vitamin C Plus",
    price: 200,
    category: "Vitamins",
    image: "https://www.vitabiotics.com/cdn/shop/files/ultra_vitamin_c_front_CTSRC120T1WL4E.png",
  },
  {
    name: "Ascoril Cough Syrup",
    price: 250,
    category: "Cough and Cold",
    image: "https://storagemydawadocsprod.blob.core.windows.net/productimages/00895/00895_1.jpg",
  },
  {
    name: "Panadol",
    price: 120,
    category: "Pain Relief",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvMChjSDT78zCIQwXAfsHmeK04rz_3Db4vDRww4RSxg&s=10",
  },
  {
    name: "Strepsils",
    price: 180,
    category: "Throat Relief",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gPGYwQlueZUCpYteAssPJN9n1N7SX_PjcXmidnkV5A&s=10",
  },
  {
    name: "Loratadine",
    price: 150,
    category: "Allergy Relief",
    image: "https://thehealthpharmacy.co.uk/wp-content/uploads/2024/02/20250524_124713.jpg",
  },
  {
    name: "Omeprazole",
    price: 200,
    category: "Digestive Health",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWc44eQlFchLNCi3ZdwQ5AEW5Eb_86a97JPcmlJ0j0ng&s",
  },
  {
    name: "Oral Rehydration Salts (ORS)",
    price: 50,
    category: "Rehydration",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzkZnI1glzSa-H_XJqeT_42JO2RQ5H5G_ZCSa1kO8d-w&s",
  },
  {
    name: "Calcium Tablets",
    price: 250,
    category: "Supplements",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Q1dAEwgivOyx12oAHnnL91oer0yUsEC0f84nR0OlWg&s=10",
  },
  {
    name: "Saline Nasal Spray",
    price: 300,
    category: "Nasal Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXFnXIzd4-zKBRndOd2_SDWuxjTT0dRgz263EHDJbNQ&s=10",
  },
  {
    name: "Multivitamin Tablets",
    price: 350,
    category: "Vitamins",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8-R09rg_Gd1vGNem4a_cf7LGpF3dnCjwM4ZhBBAW6g&s",
  },
  {
    name: "Zinc Tablets",
    price: 100,
    category: "Supplements",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctKkWzh_Y-nbgj1kGTFwmJxPF58pqD66PE-EI3FYlMw&s=10",
  },
];

function MedicineCatalog() {
  const location = useLocation();
  const recentlyAdded = location.state?.addedMedicine;
  const [savedMedicines, setSavedMedicines] = useState(() =>
    recentlyAdded ? [recentlyAdded] : []
  );
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadSavedMedicines() {
      try {
        const response = await fetch("http://localhost:3001/medicines", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("The medicine response was not a list");
        }

        setSavedMedicines((current) => {
          const fetchedIds = new Set(data.map((medicine) => medicine.id));
          return [
            ...data,
            ...current.filter((medicine) => !fetchedIds.has(medicine.id)),
          ];
        });
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Could not load saved medicines:", error);
        setLoadError("Newly added medicines could not be loaded.");
      }
    }

    loadSavedMedicines();
    return () => controller.abort();
  }, []);

  const savedByName = new Map(
    savedMedicines
      .filter((medicine) => typeof medicine.name === "string")
      .map((medicine) => [medicine.name.trim().toLowerCase(), medicine])
  );
  const displayedMedicines = catalogMedicines.map((medicine) => {
    const savedMedicine = savedByName.get(medicine.name.toLowerCase());
    if (!savedMedicine) return medicine;
    savedByName.delete(medicine.name.toLowerCase());
    return {
      ...medicine,
      ...savedMedicine,
      image: savedMedicine.image || medicine.image,
    };
  });
  const addedMedicines = [...savedByName.values()];

  return (
    <>
      <SiteNavigation />
      <div className="medicine-catalog">
        <h1>Medicine Catalog</h1>
        {recentlyAdded && (
          <p role="status">
            {recentlyAdded.name} was added to the catalog.
          </p>
        )}
        {loadError && <p role="alert">{loadError}</p>}
        <div className="medicine-list">
          {[...displayedMedicines, ...addedMedicines].map((medicine) => (
            <div
              key={medicine.id ?? medicine.name}
              className="medicine-card"
            >
              {medicine.image && (
                <img src={medicine.image} alt={medicine.name} />
              )}
              <h2>{medicine.name}</h2>
              <p>Price: Ksh {medicine.price}</p>
              <p>Category: {medicine.category}</p>
              {medicine.description && <p>{medicine.description}</p>}
              {medicine.stock !== undefined && (
                <p>Stock: {medicine.stock}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MedicineCatalog;
