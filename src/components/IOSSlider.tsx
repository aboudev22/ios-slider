import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { useRef, useState } from "react";

export default function IOSSlider() {
  const bright = { min: 0, max: 100 };
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
    newValue = Math.max(bright.min, Math.min(bright.max, newValue));
    setHeight(newValue);
  };
  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-16 h-32 pb-4 border-1 border-slate-500/80 rounded-2xl flex justify-center items-end"
    >
      <Sun className="text-slate-500/80 z-[4]" />
      <motion.div
        drag="y"
        onDrag={handleDrag}
        className="absolute cursor-grab top-0 bottom-0 w-full z-[5]"
      />
      <div
        className="absolute bottom-0 w-full bg-white z-[3]"
        style={{ height: `${height}%` }}
      />
    </div>
  );
}
