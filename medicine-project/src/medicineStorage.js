import seedData from "../db.json";

const STORAGE_KEY = "medicine-catalog";

function readMedicines() {
  const savedMedicines = window.localStorage.getItem(STORAGE_KEY);
  if (savedMedicines === null) {
    const medicines = seedData.medicines.map((medicine) => ({ ...medicine }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
    return medicines;
  }

  const medicines = JSON.parse(savedMedicines);
  if (
    !Array.isArray(medicines) ||
    medicines.some(
      (medicine) =>
        !medicine || typeof medicine !== "object" || medicine.id === undefined
    )
  ) {
    throw new Error("Saved medicine data is invalid.");
  }

  return medicines;
}

function writeMedicines(medicines) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
}

export async function getMedicines() {
  return readMedicines();
}

export async function getMedicine(id) {
  const medicine = readMedicines().find(
    (savedMedicine) => String(savedMedicine.id) === String(id)
  );
  if (!medicine) return null;

  const seedMedicine = seedData.medicines.find(
    (seed) => String(seed.id) === String(id)
  );
  return {
    ...medicine,
    image: medicine.image || seedMedicine?.image || "",
  };
}

export async function addMedicine(medicine) {
  const medicines = readMedicines();
  const newMedicine = { ...medicine, id: window.crypto.randomUUID() };
  writeMedicines([...medicines, newMedicine]);
  return newMedicine;
}

export async function updateMedicine(id, updates) {
  const medicines = readMedicines();
  const existingMedicine = medicines.find(
    (medicine) => String(medicine.id) === String(id)
  );
  if (!existingMedicine) {
    throw new Error("Could not update medicine because it no longer exists.");
  }

  const updatedMedicine = { ...existingMedicine, ...updates };
  writeMedicines(
    medicines.map((medicine) =>
      String(medicine.id) === String(id) ? updatedMedicine : medicine
    )
  );
  return updatedMedicine;
}

export async function deleteMedicine(id) {
  const medicines = readMedicines();
  const remainingMedicines = medicines.filter(
    (medicine) => String(medicine.id) !== String(id)
  );
  if (remainingMedicines.length === medicines.length) {
    throw new Error("Could not delete medicine because it no longer exists.");
  }

  writeMedicines(remainingMedicines);
}
