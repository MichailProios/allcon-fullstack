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

export function useLoading(finishMs?: number) {
  const step = useRef(5);
  const [loadingValue, setLoadingValue] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      let timeout: number = 0;

      if (loadingValue < 20) {
        step.current = 5;
      } else if (loadingValue < 40) {
        step.current = 4;
      } else if (loadingValue < 60) {
        step.current = 3;
      } else if (loadingValue < 80) {
        step.current = 2;
      } else {
        step.current = 1;
      }

      if (loadingValue <= 98) {
        timeout = window.setTimeout(() => {
          setLoadingValue(loadingValue + step.current);
        }, 500);
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [loadingValue, isLoading]);

  const startLoading = () => {
    setLoadingValue(0);
    setLoading(true);
  };

  const finishLoading = () => {
    setLoadingValue(100);
    setTimeout(() => {
      setLoading(false);
    }, finishMs || 200);
  };

  return { loadingValue, isLoading, startLoading, finishLoading };
}

export function useFirstRender() {
  const ref = useRef(true);
  const firstRender = ref.current;
  ref.current = false;
  return firstRender;
}
