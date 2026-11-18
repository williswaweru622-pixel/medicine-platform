import { useState } from "react";
function MedicineDetails() {
    const [medicine, setMedicine] = useState({
        id: "1",
        name: "Paracetamol",
        category: "Pain Relief",
        price: 100,
        description: "Temporary sample description",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Paracetamol_generico.jpg",
        stock: 45,
        dosage: "sample dosage",
        form: "Tablet",
        manufacturer: "Sample manufacturer",
        prescriptionRequired: false,
        warnings: ["Sample warning"],
        storage: "Sample storage instructions",
        expiryDate: "2027-12-31",
    });
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">
            <h1 className="mb-2 text-3xl font-bold text-slate-800">
                Medicine Details
            </h1>
            <p className="mb-8 text-slate-500">
                View medicine information and availability.
            </p>
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
                    <div className="flex items-center justify-center rounded-xl bg-slate-100 p-6">
                        <img
                        src={medicine.image}
                        alt={medicine.name}
                        style={{
                            width: "150px",
                            height: "150px",
                            maxWidth: "100px",
                            objectFit: "contain",
                            display: "block"
                        }}
                      />
                     </div>
                <div className="flex flex-col justify-center">
                    <span className="mb-3 w-fit rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                        {medicine.category}
                    </span>
                    <h2 className="mb-3 text-3xl font-bold text-slate-800">
                {medicine.name}
              </h2>

              <p className="mb-5 text-slate-600">
                {medicine.description}
              </p>

              <p className="mb-4 text-3xl font-bold text-green-700">
                KSh {medicine.price}
              </p>

              <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                {medicine.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>

            </div>
          </div>

          {/* Additional information */}
          <div className="border-t border-slate-200 p-6 md:p-10">

            <h3 className="mb-5 text-xl font-bold text-slate-800">
              Medicine Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Dosage</p>
                <p className="font-semibold text-slate-800">{medicine.dosage}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Form</p>
                <p className="font-semibold text-slate-800">{medicine.form}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Manufacturer</p>
                <p className="font-semibold text-slate-800">{medicine.manufacturer}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Stock Available</p>
                <p className="font-semibold text-slate-800">{medicine.stock} units</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Prescription Required</p>
                <p className="font-semibold text-slate-800">
                  {medicine.prescriptionRequired ? "Yes" : "No"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Expiry Date</p>
                <p className="font-semibold text-slate-800">{medicine.expiryDate}</p>
              </div>

            </div>

            {/* Warnings */}
            <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-5">
              <h3 className="mb-3 font-bold text-orange-800">
                Important Warnings
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-orange-700">
                {medicine.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
                <h3 className="mb-2 font-bold text-slate-800">
                    Storage Instructions
                </h3>
                <p className="text-slate-600">{medicine.storage}</p>
            </div>

           </div>
          </div>
        </div>
     </div>
   );
}

export default MedicineDetails;
        

        