import { useRef } from "react";
import { useEffect } from "react";
import { SwarmDrawing } from "../utilities/SwarmDrawing";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const swarmDrawing = new SwarmDrawing(canvas);
      swarmDrawing.beginAnimation();
      setTimeout(() => {
        swarmDrawing.stopAnimation();
      }, 10000);
    }
  }, [canvasRef]);
  return <canvas id="canvas" ref={canvasRef}></canvas>;
};

export default Canvas;
