import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    height: undefined,
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize); 

    const cleanup = () => {
      window.removeEventListener("resize", handleResize);
    };

    return cleanup
  }, []);

  return windowSize

}

export default useWindowSize;
