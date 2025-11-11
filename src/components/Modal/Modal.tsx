import { ReactNode, useEffect, useState } from 'react';

/**
 * Reusable modal component with fade and scale animations.
 * Blocks background scroll while open and closes on Escape or overlay click.
 *
 * onClose - callback to close the modal
 * children - modal inner content
 * title - optional modal title
 */

export const Modal = ({ onClose, children, title }: { onClose: () => void; children: ReactNode; title?: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate fade-in
    setIsVisible(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 250); // wait for fade-out animation
  };

  return (
    <div
      role='dialog'
      aria-modal='true'
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 
        ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Overlay */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300'
        onClick={handleClose}
      />

      {/* Modal content */}
      <div
        className={`relative w-full max-w-4xl rounded-2xl bg-white shadow-xl transform transition-all duration-300 
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <header className='flex items-center justify-between px-4 py-4 border-b'>
          <h2 className='text-2xl font-semibold text-blue-900'>{title}</h2>
          <button
            onClick={handleClose}
            className='text-slate-600 cursor-pointer hover:text-slate-900 text-2xl leading-none'
            aria-label='Close'
          >
            ×
          </button>
        </header>
        <div className='p-4'>{children}</div>
      </div>
    </div>
  );
};
