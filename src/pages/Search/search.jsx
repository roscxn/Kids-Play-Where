// import React, { useState } from "react";

// const Search = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const response = await fetch(`/api/locations/search?query=${searchQuery}`);
//     const data = await response.json();
//     // Handle the search results
//   };

//   return (
//     <div
//       className="hero min-h-30-screen"
//       style={{
//         backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20210912/pngtree-aesthetic-background-pink-pastel-image_866344.jpg")`,
//       }}
//     >
//       <div className="hero-overlay bg-opacity-10"></div>
//       <div className="hero-content text-center text-neutral-content">
//         <div className="max-w-md h-50">
//           <h1 className="mb-5 text-5xl font-bold">Search</h1>
//           <form onSubmit={handleSearch}>
//             <div className="form-control">
//               <div className="input-group">
//                 <input
//                   type="text"
//                   placeholder="Search…"
//                   className="input input-bordered"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button type="submit" className="btn btn-square">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;
