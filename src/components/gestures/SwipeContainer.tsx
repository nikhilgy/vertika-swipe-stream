
import React, { ReactNode } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

interface SwipeContainerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  swipeThreshold?: number;
  className?: string;
}

const SwipeContainer: React.FC<SwipeContainerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  swipeThreshold = 50,
  className = '',
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 0, 100], [15, 0, -15]);
  const rotateY = useTransform(x, [-100, 0, 100], [-15, 0, 15]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const { offset, velocity } = info;
    
    // Determine swipe direction based on offset and velocity
    const swipeThresholdWithVelocity = swipeThreshold + Math.abs(velocity.x) * 0.1;
    
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // Horizontal swipe
      if (offset.x > swipeThresholdWithVelocity) {
        onSwipeRight?.();
      } else if (offset.x < -swipeThresholdWithVelocity) {
        onSwipeLeft?.();
      }
    } else {
      // Vertical swipe
      if (offset.y > swipeThresholdWithVelocity) {
        onSwipeDown?.();
      } else if (offset.y < -swipeThresholdWithVelocity) {
        onSwipeUp?.();
      }
    }
  };

  return (
    <motion.div
      className={`touch-pan-y ${className}`}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        rotateX,
        rotateY,
      }}
      whileDrag={{ scale: 0.95 }}
      animate={{ x: 0, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};

export default SwipeContainer;
