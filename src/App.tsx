import { useEffect, useRef } from "react";
import useMousePosition from "./useMousePosition";

function App() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const offset = 80;
  const mousePosition = useMousePosition();

  const onClickHandler = () => {
    window.alert("nice try diddy!");
    const currWindow = window.open("about:blank", "_self");
    currWindow?.close();
  };

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      const buttonRect = buttonRef.current?.getBoundingClientRect();
      if (!buttonRect) return;
      if (!buttonRef.current) return;

      const { clientX: mouseX, clientY: mouseY } = ev;
      const { left: buttonX, top: buttonY, width: buttonWidth, height: buttonHeight } = buttonRect;
      const centeredBtnPositionX = buttonX + buttonWidth / 2;
      const centeredBtnPositionY = buttonY + buttonHeight / 2;

      const distanceBetweenX = Math.abs(mouseX - centeredBtnPositionX);
      const distanceBetweenY = Math.abs(mouseY - centeredBtnPositionY);

      let newPositionX: null | number = null;
      let newPositionY: null | number = null;
      let willMoveRight = false;

      if (distanceBetweenX < offset && distanceBetweenY < offset) {
        const moveX = mouseX < centeredBtnPositionX ? 1 : -1;
        const moveY = mouseY < centeredBtnPositionY ? 1 : -1;
        newPositionX = buttonX + moveX * Math.max(offset, distanceBetweenX * 2);
        newPositionY = buttonY + moveY * Math.max(offset, distanceBetweenY * 2);
        willMoveRight = moveX === 1;
      }
      if (willMoveRight && typeof newPositionX === "number") {
        newPositionX += buttonWidth / 2;
      }
      const winBox = document.body.getBoundingClientRect();

      if (newPositionX !== null) {
        if (newPositionX < winBox.left) {
          newPositionX = winBox.right - buttonWidth - offset;
        } else if (newPositionX + buttonWidth > winBox.right) {
          newPositionX = winBox.left + offset;
        }
      }

      if (newPositionY !== null) {
        if (newPositionY < winBox.top) {
          newPositionY = winBox.bottom - buttonHeight - offset;
        } else if (newPositionY + buttonHeight > winBox.bottom) {
          newPositionY = winBox.top + offset;
        }
      }

      if (newPositionX !== null && newPositionY !== null) {
        buttonRef.current.style.left = `${newPositionX}px`;
        buttonRef.current.style.top = `${newPositionY}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => buttonRef.current?.removeEventListener("click", handleMouseMove);
  }, [mousePosition]);

  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <button
          ref={buttonRef}
          onClick={onClickHandler}
          id="catch-me-if-you-can"
          className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-lg  p-2 bg-green-300 rounded-lg font-semibold shadow-md"
        >
          Can't Touch me
        </button>
      </div>
    </>
  );
}

export default App;
