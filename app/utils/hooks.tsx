import { useEffect, useState, useRef } from "react";

export function useScrollButtonVisibility() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScrollButtonVisiblity = () => {
        window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
      };
      window.addEventListener("scroll", handleScrollButtonVisiblity);
      return () => {
        window.removeEventListener("scroll", handleScrollButtonVisiblity);
      };
    }
  }, []); // Empty array ensures that effect is only run on mount
  return showButton;
}

type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
};

export function useWindowDimensions() {
  const [windowDimensions, setWindowSize] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowDimensions;
}

export function useWindowDimensionsInitial() {
  const [windowDimensions, setWindowSize] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      // window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      // return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowDimensions;
}

export function useFirstRender() {
  const ref = useRef(true);
  const firstRender = ref.current;
  ref.current = false;
  return firstRender;
}

export function useContainerDimensions(myRef: React.RefObject<any>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => ({
      width: (myRef && myRef.current.offsetWidth) || 0,
      height: (myRef && myRef.current.offsetHeight) || 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  return dimensions;
}
