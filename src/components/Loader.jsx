// import React from "react";
// import { motion } from "framer-motion";

// const loadingContainer = {
//   width: "4rem",
//   height: "4rem",
//   display: "flex",
//   justifyContent: "space-around",
// };

// const loadingCircle = {
//   display: "block",
//   width: "0.5rem",
//   height: "2rem",
//   backgroundColor: "#3A36DB",
//   borderRadius: "0.5rem",
// };

// const LoadingScreen = () => {
//   return (
//     <div>
//       <div className="fixed w-full min-h-screen z-50 bg-black opacity-30" />
//       <div className="flex fixed w-full justify-center items-center h-screen">
//         <motion.div
//           style={loadingContainer}
//           initial="start"
//           animate="end"
//           variants={{
//             start: {
//               transition: {
//                 staggerChildren: 0.2,
//               },
//             },
//             end: {
//               transition: {
//                 staggerChildren: 0.2,
//                 staggerDirection: -1, // Reverse the stagger direction
//               },
//             },
//           }}
//         >
//           <motion.span
//             style={loadingCircle}
//             variants={{
//               start: {
//                 y: "0%",
//               },
//               end: {
//                 y: "60%",
//               },
//             }}
//             transition={{
//               duration: 0.4,
//               yoyo: Infinity,
//               ease: "easeInOut",
//             }}
//             animate={{ y: ["0%", "60%", "0%"] }} // Use animate with an array to create a continuous loop
//           ></motion.span>
//           <motion.span
//             style={loadingCircle}
//             variants={{
//               start: {
//                 y: "0%",
//               },
//               end: {
//                 y: "60%",
//               },
//             }}
//             transition={{
//               duration: 0.4,
//               yoyo: Infinity,
//               ease: "easeInOut",
//             }}
//             animate={{ y: ["0%", "60%", "0%"] }} // Use animate with an array to create a continuous loop
//           ></motion.span>
//           <motion.span
//             style={loadingCircle}
//             variants={{
//               start: {
//                 y: "0%",
//               },
//               end: {
//                 y: "60%",
//               },
//             }}
//             transition={{
//               duration: 0.4,
//               yoyo: Infinity,
//               ease: "easeInOut",
//             }}
//             animate={{ y: ["0%", "60%", "0%"] }} // Use animate with an array to create a continuous loop
//           ></motion.span>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;








import React from "react";
import "./LoadingScreen.css"; // Import CSS file with animation styles

const LoadingScreen = () => {
  return (
    <div>
      <div className="fixed w-full min-h-screen z-9999 bg-black opacity-30" />
      <div className="flex fixed w-full justify-center items-center h-screen">
        <div className="loading-container">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;









