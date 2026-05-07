// import { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresen?ce } from 'motion/react';
// import { Sparkles } from 'lucide-react';

// interface Sparkle {
//   id: number;
//   x: number;
//   y: number;
//   size: number;
//   duration: number;
//   delay: number;
// }

// export function SparkleTrail() {
//   const [sparkles, setSparkles] = useState<Sparkle[]>([]);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const createSparkle = useCallback((x: number, y: number): Sparkle => {
//     return {
//       id: Date.now() + Math.random(),
//       x,
//       y,
//       size: Math.random() * 20 + 10,
//       duration: Math.random() * 0.5 + 0.5,
//       delay: Math.random() * 0.1,
//     };
//   }, []);

//   useEffect(() => {
//     let lastSparkleTime = 0;
//     const sparkleInterval = 50; // milliseconds between sparkles

//     const handleMouseMove = (e: MouseEvent) => {
//       const currentTime = Date.now();
//       setMousePosition({ x: e.clientX, y: e.clientY });

//       if (currentTime - lastSparkleTime > sparkleInterval) {
//         const newSparkles = Array.from({ length: 3 }, () =>
//           createSparkle(e.clientX, e.clientY)
//         );

//         setSparkles((prev) => [...prev, ...newSparkles]);
//         lastSparkleTime = currentTime;

//         // Clean up old sparkles
//         setTimeout(() => {
//           setSparkles((prev) =>
//             prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id))
//           );
//         }, 1500);
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [createSparkle]);

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       <AnimatePresence>
//         {sparkles.map((sparkle) => (
//           <motion.div
//             key={sparkle.id}
//             className="absolute"
//             style={{
//               left: sparkle.x,
//               top: sparkle.y,
//             }}
//             initial={{
//               opacity: 1,
//               scale: 0,
//               x: -sparkle.size / 2,
//               y: -sparkle.size / 2,
//             }}
//             animate={{
//               opacity: [1, 0.8, 0],
//               scale: [0, 1, 0.8],
//               x: [
//                 -sparkle.size / 2,
//                 -sparkle.size / 2 + (Math.random() - 0.5) * 30,
//               ],
//               y: [
//                 -sparkle.size / 2,
//                 -sparkle.size / 2 + (Math.random() - 0.5) * 30,
//               ],
//               rotate: [0, Math.random() * 360],
//             }}
//             exit={{ opacity: 0, scale: 0 }}
//             transition={{
//               duration: sparkle.duration,
//               delay: sparkle.delay,
//               ease: 'easeOut',
//             }}
//           >
//             <Sparkles
//               size={sparkle.size}
//               className="text-yellow-400"
//               fill="currentColor"
//               style={{
//                 filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.8))',
//               }}
//             />
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// }
