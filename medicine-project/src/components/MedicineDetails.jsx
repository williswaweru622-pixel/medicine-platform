import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SiteNavigation from "./SiteNavigation.jsx";
import { getMedicine } from "../medicineStorage.js";

function MedicineDetails() {
    const { id } = useParams();
    const [medicine, setMedicine] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadMedicine() {
            setIsLoading(true);
            setLoadError("");
            try {
                const data = await getMedicine(id);
                if (controller.signal.aborted) return;
                if (!data) {
                    setLoadError("Medicine not found.");
                    return;
                }
                setMedicine(data);
            } catch (error) {
                if (error.name === "AbortError") return;
                console.error("Could not load medicine:", error);
                setLoadError("Medicine details could not be loaded.");
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        loadMedicine();
        return () => controller.abort();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <SiteNavigation />
                <p role="status" className="p-8 text-center text-slate-600">
                    Loading medicine details...
                </p>
            </div>
        );
    }

    if (loadError || !medicine) {
        return (
            <div className="min-h-screen bg-emerald-50">
                <SiteNavigation />
                <div className="flex min-h-[60vh] items-center justify-center">
                    <h2 role="alert" className="text-xl font-bold text-red-600">
                        {loadError || "Medicine not found."}
                    </h2>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-50 ">
      <SiteNavigation />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">
            Medicine Details
          </h2>

          <p className="mt-2 text-slate-500">
            Explore medicine information and product details.
          </p>
        </div>
 <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          <div className="grid gap-10 p-6 md:grid-cols-2 md:p-10">

            {/* Image section */}
            <div className="flex min-h-80 items-center justify-center rounded-2xl bg-emerald-50 p-8">

              {medicine.image ? (
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="h-64 w-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white text-6xl shadow-sm">
                    💊
                  </div>

                  <p className="mt-5 font-medium text-emerald-800">
                    HealthNest Medicine
                     </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Product image coming soon
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">

              <span className="mb-5 w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                {medicine.category}
              </span>

              <h3 className="text-4xl font-extrabold tracking-tight text-slate-800">
                {medicine.name}
              </h3>

              <p className="mt-5 leading-7 text-slate-600">
                {medicine.description}
              </p>

              <div className="my-7 border-t border-slate-100"></div>

              <p className="text-sm font-medium text-slate-500">
                Product price
              </p>

              <p className="mt-2 text-4xl font-extrabold text-emerald-700">
                KSh {medicine.price}
              </p>

              <div className="mt-7 rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Medicine ID
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  #{medicine.id}
                </p>
              </div>

            </div>
          </div>
       <div className="border-t border-slate-100 bg-slate-50 p-6 md:px-10 md:py-8">

            <h4 className="text-xl font-bold text-slate-800">
              Product Information
            </h4>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Medicine Name
                </p>
                <p className="mt-2 font-semibold text-slate-800">
                  {medicine.name}
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Category
                </p>
                <p className="mt-2 font-semibold text-slate-800">
                  {medicine.category}
                </p>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-12 bg-emerald-900 px-6 py-6 text-center text-sm text-emerald-100">
        © 2026 HealthNest. Your health, our priority.
      </footer>

    </div>
  );
}

export default MedicineDetails;