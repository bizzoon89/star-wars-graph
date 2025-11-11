import { useEffect, useRef } from 'react';

/**
 * Infinite scroll wrapper component.
 * Triggers `onReachEnd` when the sentinel (bottom div) enters the viewport.
 *
 * onReachEnd - callback fired when the end of the list becomes visible
 * children - rendered list content
 */

export const InfiniteList = ({ onReachEnd, children }: { onReachEnd: () => void; children: React.ReactNode }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) onReachEnd();
      },
      { rootMargin: '320px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [onReachEnd]);

  return (
    <div>
      <div>{children}</div>
      <div
        ref={sentinelRef}
        aria-hidden
      />
    </div>
  );
};
