import AddMedicine from "./components/AddMedicine.jsx";

function App() {

  async function handleAddMedicine(newMedicine) {
    try {
      const response = await fetch("http://localhost:3000/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMedicine)
      });

      if (!response.ok) {
        throw new Error("Failed to add medicine");
      }

      const savedMedicine = await response.json();

      alert("Medicine added successfully!");

      console.log(savedMedicine);
      return savedMedicine;

    } catch (error) {
      console.error(error);
      alert("Could not add medicine.");
      return null;
    }
  }

  return (
    <div>
      <AddMedicine onAddMedicine={handleAddMedicine} />
    </div>
  );
}

export default App;