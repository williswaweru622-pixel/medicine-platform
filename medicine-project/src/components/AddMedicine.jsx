import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteNavigation from "./SiteNavigation.jsx";

function AddMedicine({ onAddMedicine }) {
  const navigate = useNavigate();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

    const price = Number(formData.price);
    const stock = formData.stock === "" ? 0 : Number(formData.stock);
    if (!formData.name.trim() || !formData.category) {
      setSubmitError("Enter a medicine name and choose a category.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setSubmitError("Enter a price greater than zero.");
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      setSubmitError("Stock must be a whole number zero or greater.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const savedMedicine = await onAddMedicine({
        ...formData,
        name: formData.name.trim(),
        category: formData.category.trim(),
        price,
        description: formData.description.trim(),
        image: formData.image.trim(),
        stock,
      });
      if (!savedMedicine) {
        throw new Error("The medicine was not saved. Please try again.");
      }

      navigate("/shop", {
        state: { addedMedicine: savedMedicine },
      });
    } catch (error) {
      console.error("Could not add medicine:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Could not add medicine."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SiteNavigation />
      <div className="mx-auto my-10 max-w-[600px] rounded-xl bg-white p-[7.5px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] max-[600px]:mx-3 max-[600px]:my-5 max-[600px]:p-5">
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
            <option value="Allergy Relief">Allergy Relief</option>
            <option value="Digestive Health">Digestive Health</option>
            <option value="Cough and Cold">Cough and Cold</option>
            <option value="Throat Relief">Throat Relief</option>
            <option value="Vitamins">Vitamins</option>
            <option value="Supplements">Supplements</option>
            <option value="First Aid">First Aid</option>
            <option value="Antibiotics">Antibiotics</option>
            <option value="Rehydration">Rehydration</option>
            <option value="Nasal Care">Nasal Care</option>
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
          />

          <label className="font-bold text-[#26332d]">Description</label>
          <textarea
            name="description"
            className="box-border min-h-25 w-full resize-y rounded-md border border-[#ccc] p-3 text-[15px]"
            placeholder="Enter medicine description"
            value={formData.description}
            onChange={handleChange}
          />

          <label className="font-bold text-[#26332d]">
            Stock Quantity (optional, defaults to 0)
          </label>
          <input
            type="number"
            name="stock"
            className="box-border w-full rounded-md border border-[#ccc] p-3 text-[15px]"
            placeholder="Enter available quantity"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleChange}
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
            disabled={isSubmitting}
            className="cursor-pointer rounded-md border-0 bg-[#176b50] p-3.5 text-base text-white hover:bg-[#10523c]"
          >
            {isSubmitting ? "Adding..." : "Add Medicine"}
          </button>
        </form>
        {submitError && (
          <p role="alert" className="mt-4 text-red-700">
            {submitError}
          </p>
        )}
      </div>
    </>
  );
}

export default AddMedicine;
