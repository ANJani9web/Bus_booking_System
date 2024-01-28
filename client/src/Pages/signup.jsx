// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // Use useNavigate hook for navigation

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:8000/users/signup", {
//         email: email,
//         password: password,
//         bookings: []
//       })
//       .then((res) => {
//         console.log(res.data);
//         navigate("/login");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
//       <div className="container mx-auto">
//         <div className="-mx-4 flex flex-wrap">
//           <div className="w-full px-4">
//             <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
//               <div className="mb-10 text-center md:mb-16">
//                 <a href="/" className="mx-auto inline-block max-w-[160px]">
//                   <h1>Bus booking</h1>
//                 </a>
//               </div>
//               <form onSubmit={handleSignup}>
//                 <div className="mb-6">
//                   <input
//                     type="text"
//                     placeholder="Email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-blue transition hover:bg-opacity-90"
//                 >
//                   Signup
//                 </button>
//               </form>
//               <p className="text-base text-body-color dark:text-dark-6">
//                 <span className="pr-0.5">Already have an account?</span>
//                 <a href="/login" className="text-primary hover:underline">
//                   Login
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/users/signup", {
        email: email,
        password: password,
        bookings: [],
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-900">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Bus Booking System
        </h2>
        <p className="mt-1 mb-4 text-center text-gray-600 dark:text-gray-400">
          Create your account
        </p>
        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                id="email"
                placeholder="example@domain.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                id="password"
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              type="submit"
            >
              Signup
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-base text-body-color dark:text-dark-6">
          <span className="pr-0.5">Already have an account?</span>
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
