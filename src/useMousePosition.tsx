import { useEffect, useState } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = (ev: MouseEvent) => {
      setPosition({ x: ev.clientX, y: ev.clientY });
    };
    document.addEventListener("mousemove", updatePosition);
    return () => {
      document.removeEventListener("mousemove", updatePosition);
    };
  }, []);
  return position;
};

export default useMousePosition;
