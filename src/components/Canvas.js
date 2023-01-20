import { useRef } from "react";
import { useEffect } from "react";
import { SwarmDrawing } from "../utilities/SwarmDrawing";

let swarmDrawing = null;

const Canvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      swarmDrawing = new SwarmDrawing(canvas);
      swarmDrawing.beginAnimation();
    }
  }, [canvasRef]);

  const handleMouseDown = (e) => {
    swarmDrawing.updateGoal({ x: e.clientX, y: e.clientY });
  };

  return (
    <canvas id="canvas" ref={canvasRef} onMouseDown={handleMouseDown}></canvas>
  );
};

export default Canvas;
