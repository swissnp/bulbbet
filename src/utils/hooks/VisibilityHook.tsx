import { useEffect, useRef, useState } from "react";

type Options = {
  threshold: number;
  reappear?: boolean;
};

export const useElementOnScreen = (
  options: Options,
): [React.RefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const makeAppear = (entries: { isIntersecting: boolean }[]) => {
    const [entry] = entries;
    if (entry?.isIntersecting) setIsVisible(true);
  };

  const makeAppearRepeating = (entries: { isIntersecting: boolean }[]) => {
    const [entry] = entries;
    setIsVisible(entry?.isIntersecting ?? false);
  };

  const callBack = options.reappear ? makeAppearRepeating : makeAppear;

  useEffect(() => {
    const containerRefCurrent = containerRef.current;
    const observer = new IntersectionObserver(callBack, options);
    if (containerRefCurrent) observer.observe(containerRefCurrent);

    return () => {
      if (containerRefCurrent) {
        observer.unobserve(containerRefCurrent);
      }
    };
  }, [containerRef, options, callBack]);

  return [containerRef, isVisible];
};

export const AnimateOnScroll = ({
  children,
  reappear,
  threshold = 0.5,
  className,
  classNameOnStart = "",
  classNameOnEnd = "",
}: {
  children: React.ReactNode;
  reappear: boolean;
  threshold?: number;
  className?: string;
  classNameOnStart?: string;
  classNameOnEnd?: string;
}) => {
  const [containerRef, isVisible] = useElementOnScreen({
    threshold: threshold,
    reappear: reappear,
  });

  return (
    <>
      <div
        ref={containerRef}
        className={`transition duration-700 ${
          isVisible
            ? `translate-y-0 opacity-100 blur-none ${classNameOnEnd}`
            : `translate-y-10 opacity-0 blur-lg ${classNameOnStart}`
        }  motion-reduce:transition-none motion-reduce:hover:transform-none ${className}`}
      >
        {children}
      </div>
    </>
  );
};
