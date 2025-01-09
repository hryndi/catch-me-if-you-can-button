import { useEffect, useState } from "react";

const useButtonProperties = (buttonRef: React.RefObject<HTMLButtonElement>) => {
  const [buttonProps, setButtonProps] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonProps(rect);
    } else {
      console.error("MousePositionError has occurred.");
    }
  }, [buttonRef.current]);

  return { buttonProps };
};

export default useButtonProperties;
