import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { animated, useSpring } from 'react-spring';
import 'tailwindcss/tailwind.css';

interface IProps {
  children: React.ReactNode;
  initHeight?: number;
}

export const TopDisplay: React.FC<IProps> = ({
  children,
  initHeight = 400,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const props = useSpring({
    height: showMore ? height : Math.min(height, initHeight),
    config: {
      tension: 280,
      friction: 60,
    },
    overflow: 'hidden',
  });

  useEffect(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div className="relative w-full">
      <animated.div style={props} className="overflow-hidden">
        <div ref={innerRef}>{children}</div>
      </animated.div>
      {height > initHeight && (
        <button
          onClick={() => {
            setShowMore((prev) => !prev);
          }}
          className="flex justify-center w-full mt-2 py-3 bg-gradient-to-b from-transparent to-black/50 text-white"
          style={{
            position: showMore ? 'relative' : 'absolute',
            bottom: 0,
          }}
        >
          {showMore ? (
            <MdKeyboardArrowUp size={20} />
          ) : (
            <MdKeyboardArrowDown size={20} />
          )}
        </button>
      )}
    </div>
  );
};
