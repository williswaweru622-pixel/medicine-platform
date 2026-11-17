import { useState, useEffect } from "react";

function Search() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/medicines")
      .then((res) => res.json())
      .then((data) => setMedicines(data))
      .catch((err) => console.error("Could not load medicines:", err));
  }, []);

  const categories = ["All", ...new Set(medicines.map((m) => m.category))];

  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || m.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-brand-dark p-6 text-brand-pale">
      <h1 className="mb-4 text-3xl font-bold">Search Medicines</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded border border-brand-light bg-brand p-2 text-white placeholder-brand-pale/60"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded border border-brand-light bg-brand p-2 text-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <li key={m.id} className="rounded bg-brand p-4">
              <h2 className="text-xl font-semibold">{m.name}</h2>
              <p className="text-brand-light">{m.category}</p>
              <p>${m.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;