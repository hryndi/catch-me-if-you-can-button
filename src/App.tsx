import { useEffect, useRef } from "react";
import useMousePosition from "./useMousePosition";
import useButtonProperties from "./useButtonProperties";

function App() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const ButtonProps = useButtonProperties(buttonRef);
  const mousePosition = useMousePosition();
  const buttonWidth: number | null = ButtonProps?.buttonProps?.width ?? null;

  const onClickHandler = () => {
    window.alert("nice try diddy!");

    const currWindow = window.open("about:blank", "_self");
    currWindow?.close();
  };

  const distanceBetween = (boxPosition: null | number, boxSize: number | null, mousePosition: number | null) => {
    if (boxPosition === null || mousePosition === null || boxSize === null) {
      return console.error("one of the function properties is null");
    } else return boxPosition - mousePosition + boxSize / 2;
  };

  const setButtonPosition = (left: number, top: number) => {
    const windowBox = document.body.getBoundingClientRect();
    const distance = distanceBetween(left, windowBox.left, buttonWidth);
    if (buttonWidth && distance && distance < 0) {
      left = windowBox.right - buttonWidth;
    }
    if (buttonRef.current) {
      buttonRef.current.style.top = `${top}px`;
      buttonRef.current.style.left = `${left}px`;
    } else console.error("During setting button position an error has occured");
  };

  useEffect(() => {
    const OFFSET = 100;
    const buttonX: null | number = ButtonProps.buttonProps?.x ?? null;
    const buttonY: number | null = ButtonProps.buttonProps?.y ?? null;

    const buttonHeight: number | null = ButtonProps?.buttonProps?.height ?? null;
    const horisontalDistanceFrom = distanceBetween(buttonX, buttonWidth, mousePosition.x);
    const verticalDistanceFrom = distanceBetween(buttonY, buttonHeight, mousePosition.y);
    const horizontalOffset: null | number = buttonWidth !== null ? buttonWidth / 2 + OFFSET : null;
    const verticalOffset: null | number = buttonHeight !== null ? buttonHeight / 2 + OFFSET : null;

    if (
      horizontalOffset &&
      buttonX &&
      buttonY &&
      horisontalDistanceFrom &&
      verticalDistanceFrom &&
      verticalOffset &&
      Math.abs(horisontalDistanceFrom) <= horizontalOffset &&
      Math.abs(verticalDistanceFrom) <= verticalOffset
    ) {
      setButtonPosition(
        buttonX + (horizontalOffset / horisontalDistanceFrom) * 10,
        buttonY + (verticalOffset / verticalDistanceFrom) * 10
      );
    }
  }, [mousePosition.x, mousePosition.y, ButtonProps.buttonProps?.left, ButtonProps.buttonProps?.right]);

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
