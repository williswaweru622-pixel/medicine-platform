import { useEffect, useState } from "react";
import SiteNavigation from "./SiteNavigation.jsx";

const SEARCH_PREFERENCES_KEY = "medicine-search-preferences";

function loadSearchPreferences() {
  try {
    const savedPreferences = window.localStorage.getItem(SEARCH_PREFERENCES_KEY);
    if (!savedPreferences) {
      return { searchTerm: "", selectedCategory: "All", storageError: "" };
    }

    const parsedPreferences = JSON.parse(savedPreferences);
    return {
      searchTerm:
        typeof parsedPreferences.searchTerm === "string"
          ? parsedPreferences.searchTerm
          : "",
      selectedCategory:
        typeof parsedPreferences.selectedCategory === "string"
          ? parsedPreferences.selectedCategory
          : "All",
      storageError: "",
    };
  } catch (error) {
    console.error("Could not load search preferences:", error);
    return {
      searchTerm: "",
      selectedCategory: "All",
      storageError: "Saved search preferences could not be loaded.",
    };
  }
}

function Search() {
  const [medicines, setMedicines] = useState([]);
  const [searchPreferences, setSearchPreferences] =
    useState(loadSearchPreferences);
  const [storageError, setStorageError] = useState(
    searchPreferences.storageError
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { searchTerm, selectedCategory } = searchPreferences;

  function updateSearchPreferences(key, value) {
    const updatedPreferences = { ...searchPreferences, [key]: value };
    setSearchPreferences(updatedPreferences);

    try {
      window.localStorage.setItem(
        SEARCH_PREFERENCES_KEY,
        JSON.stringify({
          searchTerm: updatedPreferences.searchTerm,
          selectedCategory: updatedPreferences.selectedCategory,
        })
      );
      setStorageError("");
    } catch (saveError) {
      console.error("Could not save search preferences:", saveError);
      setStorageError("Search preferences could not be saved.");
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadMedicines() {
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

        setMedicines(data);
      } catch (loadError) {
        if (loadError.name === "AbortError") return;
        console.error("Could not load medicines:", loadError);
        setError("Medicines could not be loaded. Please try again later.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadMedicines();
    return () => controller.abort();
  }, []);

  const categories = [
    "All",
    ...new Set(medicines.map((medicine) => medicine.category).filter(Boolean)),
  ];
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredMedicines = medicines.filter((medicine) => {
    const name = typeof medicine.name === "string" ? medicine.name : "";
    return (
      name.toLowerCase().includes(normalizedSearchTerm) &&
      (selectedCategory === "All" || medicine.category === selectedCategory)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand to-[#0b3b2b] p-4 text-brand-pale sm:p-8">
      <SiteNavigation />
      <main className="mx-auto max-w-6xl py-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-light">
            Health Nest catalog
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Search Medicines
          </h1>
          <p className="mt-2 max-w-2xl text-brand-pale/80">
            Find a medicine by name or narrow the list by category.
          </p>
        </div>

        <section
          aria-label="Medicine search and filters"
          className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur sm:grid-cols-[minmax(0,1fr)_16rem] sm:p-6"
        >
          <div>
            <label
              htmlFor="medicine-search"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Medicine name
            </label>
            <input
              id="medicine-search"
              type="search"
              placeholder="Try Panadol or Ibuprofen"
              value={searchTerm}
              onChange={(event) =>
                updateSearchPreferences("searchTerm", event.target.value)
              }
              className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-brand-dark outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:ring-2 focus:ring-brand-light/50"
            />
          </div>

          <div>
            <label
              htmlFor="medicine-category"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Category
            </label>
            <select
              id="medicine-category"
              value={selectedCategory}
              onChange={(event) =>
                updateSearchPreferences("selectedCategory", event.target.value)
              }
              className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-brand-dark outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/50"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </section>

        {storageError && (
          <p role="alert" className="mb-4 text-sm text-red-200">
            {storageError}
          </p>
        )}

        <p aria-live="polite" className="mb-4 text-sm text-brand-pale/80">
          {isLoading
            ? "Loading medicines..."
            : error
              ? error
              : `${filteredMedicines.length} ${
                  filteredMedicines.length === 1 ? "medicine" : "medicines"
                } found`}
        </p>

        {error ? (
          <p role="alert" className="rounded-xl bg-red-950/50 p-4 text-red-100">
            {error}
          </p>
        ) : !isLoading && filteredMedicines.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/5 p-6 text-brand-pale/80">
            No medicines match your search. Try another name or category.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMedicines.map((medicine) => (
              <li
                key={medicine.id ?? medicine.name}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-lg transition duration-200 hover:-translate-y-1 hover:border-brand-light/50 hover:bg-white/15"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">
                    {medicine.name}
                  </h2>
                  {medicine.category && (
                    <span className="shrink-0 rounded-full bg-brand-light/20 px-3 py-1 text-xs font-medium text-brand-pale">
                      {medicine.category}
                    </span>
                  )}
                </div>
                <p className="text-lg font-semibold text-brand-light">
                  KSh {medicine.price}
                </p>
                {medicine.description && (
                  <p className="mt-2 text-sm leading-6 text-brand-pale/80">
                    {medicine.description}
                  </p>
                )}
                {medicine.stock !== undefined && (
                  <p className="mt-4 border-t border-white/10 pt-3 text-sm text-brand-pale/70">
                    Stock: {medicine.stock}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default Search;
