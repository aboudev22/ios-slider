import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { useRef, useState } from "react";

export default function App() {
  const brightness = { min: 0, max: 100 };
  const [height, setHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { point: { x: number; y: number } }
  ) => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.clientHeight;
    const deltaY =
      info.point.y - containerRef.current.getBoundingClientRect().top;
    let newValue = 100 - Math.round((deltaY / containerHeight) * 100);
    newValue = Math.max(brightness.min, Math.min(brightness.max, newValue));
    setHeight(newValue);
  };
  return (
    <div className="h-screen w-screen bg-transparent flex justify-center items-center">
      <div
        ref={containerRef}
        className="relative bg-blue-500/20 border-2 w-36 h-52 border-blue-500/40 overflow-hidden rounded-2xl flex justify-center items-end pb-4"
      >
        <motion.div animate={{ rotate: height }} className="z-[4]">
          <Sun className="text-blue-500" />
        </motion.div>
        <div
          style={{ height: `${height}%` }}
          className="absolute z-[3] bg-white left-0 right-0 bottom-0"
        />
        <motion.div
          drag="y"
          onDrag={handleDrag}
          dragConstraints={containerRef}
          className="absolute z-[5] top-0 bottom-0 left-0 right-0 cursor-grab active:cursor-grabbing"
        />
      </div>
    </div>
  );
}
