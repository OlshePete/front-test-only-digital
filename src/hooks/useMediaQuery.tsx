import { useState, useEffect } from "react";

export default function useMediaQuery( mediaQuery: string ) {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(null);

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);

    return () => {
      // Cleanup by removing the event listener when the component unmounts
      if (mediaQueryList) {
        mediaQueryList.removeEventListener("change", handleMediaQueryChange);
      }
    };
  }, [mediaQuery]);

  const handleMediaQueryChange = (e: MediaQueryListEvent) => {
    setIsMatch(e.matches);
  };

  useEffect(() => {
    if (mediaQueryList) {
      mediaQueryList.addEventListener("change", handleMediaQueryChange);
      return () => {
        mediaQueryList.removeEventListener("change", handleMediaQueryChange);
      };
    }
  }, [mediaQueryList]);

  return isMatch;
}