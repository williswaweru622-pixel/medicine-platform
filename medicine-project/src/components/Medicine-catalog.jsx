import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SiteNavigation from "./SiteNavigation.jsx";
import {
  deleteMedicine as removeMedicine,
  getMedicines,
  updateMedicine,
} from "../medicineStorage.js";
import "./Medicine-catalog.css";

const catalogMedicines = [
  {
    id: "1",
    name: "Paracetamol",
    price: 100,
    category: "Pain Relief",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Paracetamol_generico.jpg",
  },
  {
    id: "2",
    name: "Ibuprofen",
    price: 150,
    category: "Pain Relief",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ibuprofen-400.jpg",
  },
  {
    id: "3",
    name: "Cetirizine",
    price: 120,
    category: "Allergy Relief",
    image: "https://www.scabpharmacy.com/wp-content/uploads/2024/11/Cetirizine-10mg-film-coated-Tablets-BP-3-scaled.jpg",
  },
  {
    id: "4",
    name: "Antacid Tablets",
    price: 180,
    category: "Digestive Health",
    image: "https://www.penncare.net/wp-content/uploads/2022/04/90089AC.jpg",
  },
  {
    id: "5",
    name: "Ultra Vitamin C Plus",
    price: 200,
    category: "Vitamins",
    image: "https://www.vitabiotics.com/cdn/shop/files/ultra_vitamin_c_front_CTSRC120T1WL4E.png",
  },
  {
    id: "6",
    name: "Ascoril Cough Syrup",
    price: 250,
    category: "Cough and Cold",
    image: "https://storagemydawadocsprod.blob.core.windows.net/productimages/00895/00895_1.jpg",
  },
  {
    id: "7",
    name: "Panadol",
    price: 120,
    category: "Pain Relief",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvMChjSDT78zCIQwXAfsHmeK04rz_3Db4vDRww4RSxg&s=10",
  },
  {
    id: "8",
    name: "Strepsils",
    price: 180,
    category: "Throat Relief",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gPGYwQlueZUCpYteAssPJN9n1N7SX_PjcXmidnkV5A&s=10",
  },
  {
    id: "9",
    name: "Loratadine",
    price: 150,
    category: "Allergy Relief",
    image: "https://thehealthpharmacy.co.uk/wp-content/uploads/2024/02/20250524_124713.jpg",
  },
  {
    id: "10",
    name: "Omeprazole",
    price: 200,
    category: "Digestive Health",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWc44eQlFchLNCi3ZdwQ5AEW5Eb_86a97JPcmlJ0j0ng&s",
  },
  {
    id: "11",
    name: "Oral Rehydration Salts (ORS)",
    price: 50,
    category: "Rehydration",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzkZnI1glzSa-H_XJqeT_42JO2RQ5H5G_ZCSa1kO8d-w&s",
  },
  {
    id: "12",
    name: "Calcium Tablets",
    price: 250,
    category: "Supplements",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Q1dAEwgivOyx12oAHnnL91oer0yUsEC0f84nR0OlWg&s=10",
  },
  {
    id: "13",
    name: "Saline Nasal Spray",
    price: 300,
    category: "Nasal Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXFnXIzd4-zKBRndOd2_SDWuxjTT0dRgz263EHDJbNQ&s=10",
  },
  {
    id: "14",
    name: "Multivitamin Tablets",
    price: 350,
    category: "Vitamins",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8-R09rg_Gd1vGNem4a_cf7LGpF3dnCjwM4ZhBBAW6g&s",
  },
  {
    id: "15",
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
  const [hasLoadedSavedMedicines, setHasLoadedSavedMedicines] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [editingMedicineId, setEditingMedicineId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [deletingMedicineId, setDeletingMedicineId] = useState(null);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadSavedMedicines() {
      try {
        const data = await getMedicines();
        if (controller.signal.aborted) return;

        setHasLoadedSavedMedicines(true);
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
        setLoadError("Saved medicines could not be loaded.");
      }
    }

    loadSavedMedicines();
    return () => controller.abort();
  }, []);

  function startEditing(medicine) {
    setEditingMedicineId(medicine.id);
    setEditDraft({
      name: medicine.name ?? "",
      category: medicine.category ?? "",
      price: medicine.price ?? "",
      description: medicine.description ?? "",
      image: medicine.image ?? "",
      stock: medicine.stock ?? 0,
      prescriptionRequired: Boolean(medicine.prescriptionRequired),
    });
    setActionError("");
  }

  function updateEditDraft(event) {
    const { name, value, type, checked } = event.target;
    setEditDraft((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function saveMedicineEdit(event, medicineId) {
    event.preventDefault();
    const price = Number(editDraft.price);
    const stock = Number(editDraft.stock);

    if (!editDraft.name.trim() || !editDraft.category.trim()) {
      setActionError("Enter a medicine name and category.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setActionError("Enter a price greater than zero.");
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      setActionError("Stock must be a whole number zero or greater.");
      return;
    }

    setIsSavingEdit(true);
    setActionError("");
    try {
      const updatedMedicine = await updateMedicine(medicineId, {
        name: editDraft.name.trim(),
        category: editDraft.category.trim(),
        price,
        description: editDraft.description.trim(),
        image: editDraft.image.trim(),
        stock,
        prescriptionRequired: editDraft.prescriptionRequired,
      });
      setSavedMedicines((current) =>
        current.map((medicine) =>
          String(medicine.id) === String(medicineId)
            ? updatedMedicine
            : medicine
        )
      );
      setEditingMedicineId(null);
      setEditDraft(null);
    } catch (error) {
      console.error("Could not update medicine:", error);
      setActionError(
        error instanceof Error ? error.message : "Could not update medicine."
      );
    } finally {
      setIsSavingEdit(false);
    }
  }

  async function deleteMedicine(medicine) {
    if (!window.confirm(`Delete ${medicine.name}? This cannot be undone.`)) {
      return;
    }

    setDeletingMedicineId(medicine.id);
    setActionError("");
    try {
      await removeMedicine(medicine.id);

      setSavedMedicines((current) =>
        current.filter(
          (savedMedicine) => String(savedMedicine.id) !== String(medicine.id)
        )
      );
      if (String(editingMedicineId) === String(medicine.id)) {
        setEditingMedicineId(null);
        setEditDraft(null);
      }
    } catch (error) {
      console.error("Could not delete medicine:", error);
      setActionError(
        error instanceof Error ? error.message : "Could not delete medicine."
      );
    } finally {
      setDeletingMedicineId(null);
    }
  }

  const savedById = new Map(
    savedMedicines
      .filter((medicine) => medicine.id !== undefined)
      .map((medicine) => [String(medicine.id), medicine])
  );
  const savedByName = new Map(
    savedMedicines
      .filter((medicine) => typeof medicine.name === "string")
      .map((medicine) => [medicine.name.trim().toLowerCase(), medicine])
  );
  const matchedIds = new Set();
  const displayedMedicines = catalogMedicines
    .filter(
      (medicine) =>
        !hasLoadedSavedMedicines ||
        savedById.has(String(medicine.id)) ||
        savedByName.has(medicine.name.toLowerCase())
    )
    .map((medicine) => {
      const savedMedicine =
        savedById.get(String(medicine.id)) ??
        savedByName.get(medicine.name.toLowerCase());
      if (!savedMedicine) return medicine;
      matchedIds.add(String(savedMedicine.id));
      return {
        ...medicine,
        ...savedMedicine,
        image: savedMedicine.image || medicine.image,
        isSaved: true,
      };
    });
  const addedMedicines = savedMedicines
    .filter((medicine) => !matchedIds.has(String(medicine.id)))
    .map((medicine) => ({ ...medicine, isSaved: true }));

  return (
    <>
      <SiteNavigation />

      <div className="medicine-catalog">
        <h1>Medicine Catalog</h1>

        {recentlyAdded && (
          <p role="status">{recentlyAdded.name} was added to the catalog.</p>
        )}

        {loadError && <p role="alert">{loadError}</p>}
        {actionError && <p role="alert">{actionError}</p>}

        <div className="medicine-list">
          {[...displayedMedicines, ...addedMedicines].map((medicine) => {
            const isEditing =
              String(editingMedicineId) === String(medicine.id) &&
              editDraft !== null;
            const isDeleting =
              String(deletingMedicineId) === String(medicine.id);

            return (
              <article
                key={medicine.id ?? medicine.name}
                className="medicine-card"
              >
                {isEditing ? (
                  <form
                    className="medicine-edit-form"
                    onSubmit={(event) =>
                      saveMedicineEdit(event, medicine.id)
                    }
                  >
                    <label>
                      Medicine name
                      <input
                        name="name"
                        value={editDraft.name}
                        onChange={updateEditDraft}
                        required
                      />
                    </label>
                    <label>
                      Category
                      <input
                        name="category"
                        value={editDraft.category}
                        onChange={updateEditDraft}
                        required
                      />
                    </label>
                    <label>
                      Price (KSh)
                      <input
                        name="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={editDraft.price}
                        onChange={updateEditDraft}
                        required
                      />
                    </label>
                    <label>
                      Image URL
                      <input
                        name="image"
                        type="url"
                        value={editDraft.image}
                        onChange={updateEditDraft}
                      />
                    </label>
                    <label>
                      Description
                      <textarea
                        name="description"
                        value={editDraft.description}
                        onChange={updateEditDraft}
                      />
                    </label>
                    <label>
                      Stock
                      <input
                        name="stock"
                        type="number"
                        min="0"
                        step="1"
                        value={editDraft.stock}
                        onChange={updateEditDraft}
                        required
                      />
                    </label>
                    <label className="medicine-prescription-field">
                      <input
                        name="prescriptionRequired"
                        type="checkbox"
                        checked={editDraft.prescriptionRequired}
                        onChange={updateEditDraft}
                      />
                      Prescription required
                    </label>
                    <div className="medicine-actions">
                      <button
                        type="submit"
                        className="medicine-action medicine-action-save"
                        aria-label={`Save changes to ${medicine.name}`}
                        title="Save changes"
                        disabled={isSavingEdit}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="medicine-action medicine-action-cancel"
                        onClick={() => {
                          setEditingMedicineId(null);
                          setEditDraft(null);
                          setActionError("");
                        }}
                        disabled={isSavingEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <Link
                      to={`/medicine/${medicine.id}`}
                      className="medicine-card-link"
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
                    </Link>

                    {medicine.isSaved && (
                      <div className="medicine-actions">
                        <button
                          type="button"
                          className="medicine-action medicine-action-edit"
                          onClick={() => startEditing(medicine)}
                          aria-label={`Edit ${medicine.name}`}
                          title="Edit medicine"
                          disabled={
                            isDeleting ||
                            deletingMedicineId !== null ||
                            editingMedicineId !== null
                          }
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m16 4 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="medicine-action medicine-action-delete"
                          onClick={() => deleteMedicine(medicine)}
                          aria-label={`Delete ${medicine.name}`}
                          title="Delete medicine"
                          disabled={
                            isDeleting ||
                            deletingMedicineId !== null ||
                            editingMedicineId !== null
                          }
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MedicineCatalog;
