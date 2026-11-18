import { useState } from "react";

function AddMedicine({ onAddMedicine }) {
  // Store the information entered in the form
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    prescriptionRequired: false,
  });

  // Update form values whenever the user types
  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  // Submit the medicine details
  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.price ||
      !formData.image.trim() ||
      !formData.description.trim() ||
      formData.stock === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newMedicine = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    const savedMedicine = await onAddMedicine(newMedicine);
    if (!savedMedicine) return;

    // Clear the form after submission
    setFormData({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
      stock: "",
      prescriptionRequired: false,
    });
  }

  return (
    <div className="mx-auto my-10 max-w-[600px]rounded-xl bg-white p-[7.5px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] max-[600px]:mx-3 max-[600px]:my-5 max-[600px]:p-5">
      <h2 className="text-center text-2xl font-bold text-[#176b50]">
        Add New Medicine
      </h2>
      <p className="text-center text-[#666]">
        Enter the medicine details below.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="font-bold text-[#26332d]">Medicine Name</label>
        <input
          type="text"
          name="name"
          className="box-border w-full rounded-md border border-[#ccc] p-3 text-[15px]"
          placeholder="Enter medicine name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="font-bold text-[#26332d]">Category</label>
        <select
          name="category"
          className="box-border w-full rounded-md border border-[#ccc] p-3 text-[15px]"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Vitamins">Vitamins</option>
          <option value="First Aid">First Aid</option>
          <option value="Skincare">Skincare</option>
          <option value="Other">Other</option>
        </select>

        <label className="font-bold text-[#26332d]">Price (KSh)</label>
        <input
          type="number"
          name="price"
          className="box-border w-full rounded-md border border-[#ccc] p-3 text-[15px]"
          placeholder="Enter price"
          min="0.01"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label className="font-bold text-[#26332d]">Image URL</label>
        <input
          type="text"
          name="image"
          className="box-border w-full rounded-md border border-[#ccc] p-3 text-[15px]"
          placeholder="Enter image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <label className="font-bold text-[#26332d]">Description</label>
        <textarea
          name="description"
          className="box-border min-h-25 w-full resize-y rounded-md border border-[#ccc] p-3 text-[15px]"
          placeholder="Enter medicine description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label className="font-bold text-[#26332d]">Stock Quantity</label>
        <input
          type="number"
          name="stock"
          className="box-border w-full rounded-md border border-[#ccc] p-3 text-[15px]"
          placeholder="Enter available quantity"
          min="0"
          step="1"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <label className="flex items-center gap-2.5 font-bold text-[#26332d]">
          <input
            type="checkbox"
            name="prescriptionRequired"
            className="w-auto"
            checked={formData.prescriptionRequired}
            onChange={handleChange}
          />
          Prescription required
        </label>

        <button
          type="submit"
          className="cursor-pointer rounded-md border-0 bg-[#176b50] p-3.5 text-base text-white hover:bg-[#10523c]"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
}

export default AddMedicine;
