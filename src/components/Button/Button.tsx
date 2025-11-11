import cn from 'classnames';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

/*  Reusable button component with style variants. */

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'retry';
  className?: string;
}

export const Button = ({ variant = 'primary', children, className, ...props }: IButton) => {
  return (
    <button
      className={cn(
        'inline-flex items-center text-white justify-center rounded-lg font-medium text-sm px-4 py-2 transition-colors duration-300 ease-in-out cursor-pointer shadow-sm',
        {
          'bg-blue-400 text-white hover:bg-blue-500': variant === 'primary',
          'bg-indigo-600 hover:bg-indigo-500': variant === 'retry',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
