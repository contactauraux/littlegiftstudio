import React from 'react';
import { cn } from '../../lib/utils';

export function InfiniteSlider({
  children,
  direction = 'vertical',
  speed = 35,
  speedOnHover = 15,
  className,
  reverse = false,
}) {
  const duration = `${speed}s`;

  return (
    <div
      className={cn(
        'group flex overflow-hidden select-none',
        direction === 'vertical' ? 'flex-col max-h-[550px]' : 'flex-row max-w-full',
        className
      )}
    >
      <div
        className={cn(
          'flex shrink-0 gap-4',
          direction === 'vertical'
            ? 'flex-col animate-infinite-scroll-y group-hover:[animation-play-state:paused]'
            : 'flex-row animate-infinite-scroll-x group-hover:[animation-play-state:paused]'
        )}
        style={{
          animationDuration: duration,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>

      {/* Duplicate for continuous seamless loop */}
      <div
        aria-hidden="true"
        className={cn(
          'flex shrink-0 gap-4 mt-4',
          direction === 'vertical'
            ? 'flex-col animate-infinite-scroll-y group-hover:[animation-play-state:paused]'
            : 'flex-row animate-infinite-scroll-x group-hover:[animation-play-state:paused]'
        )}
        style={{
          animationDuration: duration,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
    </div>
  );
}
