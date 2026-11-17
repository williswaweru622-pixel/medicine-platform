import React from "react"
import "./Medicine-catalog.css"

 function MedicineCatalog() {

    return(
        <div className="medicine-catalog">
          <h1>Medicine Catalog</h1>

             <div className="medicine-list">

                 <div className="medicine-card">
                    <img 
                       src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Paracetamol_generico.jpg" 
                       alt="Paracetamol"
                     />
                    <h2>Paracetamol</h2>
                    <p>Price: Ksh 100</p>
                    <p>Category: Pain Relief</p>
                </div>
                <div className="medicine-card">
                    <img 
                       src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ibuprofen-400.jpg" 
                       alt="Ibuprofen" 
                       />
                     <h2>Ibuprofen</h2>
                     <p>Price: Ksh 150</p>
                     <p>Category: Pain Relief</p>
                </div>
                <div className="medicine-card">
                   <img 
                        src="https://www.scabpharmacy.com/wp-content/uploads/2024/11/Cetirizine-10mg-film-coated-Tablets-BP-3-scaled.jpg" 
                        alt="" />
                     <h2>Cetirizine</h2>
                     <p>Price: Ksh120</p>
                     <p>Category: Allergy Relief</p>
                </div>
                <div className="medicine-card">
                  <img 
                       src="https://www.penncare.net/wp-content/uploads/2022/04/90089AC.jpg"
                       alt="Antacid Tablets" />
                     <h2>Antacid Tablets</h2>
                     <p>Price: Ksh 180</p>
                     <p>Category: Digestive Health</p>
               </div>
               <div className="medicine-card">
                  <img
                       src="https://www.vitabiotics.com/cdn/shop/files/ultra_vitamin_c_front_CTSRC120T1WL4E.png"
                       alt="Ultra Vitamin C Plus" />
                     <h2>Ultra Vitamin C Plus</h2>
                     <p>Price: Ksh 200</p>
                     <p>Category: Vitamins</p>
               </div>
               <div className="medicine-card">
                  <img 
                       src="https://storagemydawadocsprod.blob.core.windows.net/productimages/00895/00895_1.jpg" 
                       alt="Ascoril Cough Syrup" />
                     <h2>Ascoril Cough Syrup</h2>
                     <p>Price: Ksh 250</p>
                     <p>Category: Cough and Cold</p>
               </div>
               <div className="medicine-card">
                  <img 
                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvMChjSDT78zCIQwXAfsHmeK04rz_3Db4vDRww4RSxg&s=10"
                       alt="Panadol" />
                    <h2>Panadol</h2>
                    <p>Price: Ksh 120</p>
                    <p>Category: Pain Relief</p>
               </div>
               <div className="medicine-card">
                  <img 
                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gPGYwQlueZUCpYteAssPJN9n1N7SX_PjcXmidnkV5A&s=10" 
                       alt="Strepsils" />
                   <h2>Strepsils</h2>
                   <p>Price: Ksh 180</p>
                   <p>Category: Throat Relief</p>
               </div>
               <div className="medicine-card">
                  <img 
                       src="https://thehealthpharmacy.co.uk/wp-content/uploads/2024/02/20250524_124713.jpg" 
                       alt="Loratadine" />
                   <h2>Loratadine</h2>
                   <p>Price: Ksh 150</p>
                   <p>Category: Allergy Relief</p>
               </div>
               <div className="medicine-card">
                  <img 
                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWc44eQlFchLNCi3ZdwQ5AEW5Eb_86a97JPcmlJ0j0ng&s=10" 
                       alt="Omeprazole" />
                    <h2>Omeprazole</h2>
                    <p>Price: Ksh 200</p>
                    <p>Category: Digestive Health</p>
               </div>
               <div className="medicine-card">
                  <img
                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzkZnI1glzSa-H_XJqeT_42JO2RQ5H5G_ZCSa1kO8d-w&s=10"
                       alt="Oral Rehydration Salts" />
                    <h2>Oral Rehydration Salts (ORS)</h2>
                    <p>Price: Ksh 50</p>
                    <p>Category: Rehydration</p>
               </div>
               <div className="medicine-card">
                  <img 
                       src="https://storagemydawadocsprod.blob.core.windows.net/cmsimages/ask-Photoroom%20(4)_2026-10-30T090506.68Z.jpg" 
                       alt="Calcim Tablets" />
                    <h2>Calcuim Tablets</h2>
                    <p>Price: Ksh 250</p>
                    <p>Category: Supplements</p>
               </div>
               <div className="medicine-card">
                  <img 
                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNCVDenBckGSXnrwB6lZE_id3ltQvYY1wMghugrInvw&s=10" 
                       alt="Saline Nazal Spray" />
                    <h2>Saline Nasal Spray</h2>
                    <p>Price: Ksh 300</p>
                    <p>Category: Nasal Care</p>
               </div>
               <div className="medicine-card">
                  <img 
                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8-R09rg_Gd1vGNem4a_cf7LGpF3dnCjwM4ZhBBAW6g&s" 
                       alt="Multivitamin Tablets" />
                    <h2>Multivitamin Tablets</h2>
                    <p>Price: Ksh 350</p>
                    <p>Category: Vitamins</p>
               </div>
               <div className="medicine-card">
                  <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctKkWzh_Y-nbgj1kGTFwmJxPF58pqD66PE-EI3FYlMw&s=10" 
                      alt="Zinc Tablets" />
                    <h2>Zinc Tablets</h2>
                    <p>Price: Ksh 100</p>
                    <p>Category: Supplements</p>
               </div>
             </div>  
        </div>
       
    )
 };


 export default MedicineCatalog;