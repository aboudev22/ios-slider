import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { useRef, useState } from "react";

export default function App() {
  const brigthParams = { min: 0, max: 100 };
  const refContainer = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(5);
  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { point: { x: number; y: number } }
  ) => {
    if (!refContainer.current) return;
    const containerHeight = refContainer.current.clientHeight;
    const deltaY =
      info.point.y - refContainer.current.getBoundingClientRect().top;
    let newValue = 100 - Math.round((deltaY / containerHeight) * 100);
    newValue = Math.max(brigthParams.min, Math.min(brigthParams.max, newValue));
    setHeight(newValue);
  };
  return (
    <div className="w-screen h-screen bg-transparent flex justify-center items-center">
      <div
        ref={refContainer}
        className="relative overflow-hidden w-32 h-56 flex justify-center items-end pb-4 rounded-2xl bg-blue-500/20 border-1 border-blue-500/30"
      >
        <motion.div animate={{ rotate: height }} className="z-[4]">
          <Sun className="text-blue-500" />
        </motion.div>
        <motion.div
          drag="y"
          onDrag={handleDrag}
          dragConstraints={refContainer}
          className="absolute z-[5] top-0 bottom-0 left-0 right-0 cursor-grab active:cursor-grabbing"
        />
        <div
          style={{ height: `${height}%` }}
          className="absolute z-[3] bottom-0 left-0 right-0 bg-white"
        />
      </div>
    </div>
  );
}
