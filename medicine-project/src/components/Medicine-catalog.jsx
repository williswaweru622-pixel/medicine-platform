
function MedicineCatalog() {
  return (
    <div className="p-5 text-center">
      <h1 className="mt-[10px] p-[30px] text-4xl font-bold text-[#1a563c]">
         Medicine Catalog
         </h1>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[
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
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWc44eQlFchLNCi3ZdwQ5AEW5Eb_86a97JPcmlJ0j0ng&s=10",
          },
          {
            name: "Oral Rehydration Salts (ORS)",
            price: 50,
            category: "Rehydration",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzkZnI1glzSa-H_XJqeT_42JO2RQ5H5G_ZCSa1kO8d-w&s=10",
          },
          {
            name: "Calcuim Tablets",
            price: 250,
            category: "Supplements",
            image: "https://storagemydawadocsprod.blob.core.windows.net/cmsimages/ask-Photoroom%20(4)_2026-10-30T090506.68Z.jpg",
          },
          {
            name: "Saline Nasal Spray",
            price: 300,
            category: "Nasal Care",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNCVDenBckGSXnrwB6lZE_id3ltqVYY1wMghugrInvw&s=10",
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
        ].map((medicine) => (
          <div
            key={medicine.name}
            className="rounded-[10px] border border-[#d7eee3] bg-white p-[25px] text-left shadow-[0_4px_20px_rgba(17,202,57,0.1)] transition-transform duration-200 hover:-translate-y-[5px]"
          >
            <img
              src={medicine.image}
              alt={medicine.name}
              className="h-[200px] w-full rounded-xl object-contain"
            />

            <h2 className="mb-[10px] text-[#1a563c]">
              {medicine.name}
            </h2>

            <p className="my-2 font-bold text-black">
              Price: Ksh {medicine.price}
            </p>

            <p className="my-2 text-black">
              Category: {medicine.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicineCatalog;
