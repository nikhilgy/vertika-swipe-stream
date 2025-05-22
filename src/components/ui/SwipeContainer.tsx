
import React, { useState, useRef, useEffect } from "react";

interface SwipeContainerProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

const SwipeContainer: React.FC<SwipeContainerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 100
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Reset when swiping ends
  const resetSwipeState = () => {
    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
    setSwipeOffset(0);
  };

  // Handle swipe detection
  useEffect(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }

    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }

    resetSwipeState();
  }, [touchEnd, touchStart, threshold, onSwipeLeft, onSwipeRight]);

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsSwiping(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStart || !isSwiping) return;
    setSwipeOffset(touchStart - e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isSwiping) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseLeave = () => {
    if (isSwiping) {
      resetSwipeState();
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !isSwiping) return;
    const currentX = e.targetTouches[0].clientX;
    setSwipeOffset(touchStart - currentX);
    setTouchEnd(currentX);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    // touchEnd is already set during move
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateX(${-swipeOffset * 0.3}px)`,
        transition: swipeOffset ? "none" : "transform 0.3s ease"
      }}
    >
      {children}
    </div>
  );
};

export default SwipeContainer;
