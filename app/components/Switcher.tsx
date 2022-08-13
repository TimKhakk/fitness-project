import cn from 'classname';
import type { ReactNode } from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active: boolean;
  children: ReactNode;
}
export default function Switcher({ active, children, ...props }: Props) {
  return (
    <button
      className={cn('transition py-1 px-3 rounded font-bold flex max-w-max', {
        'btn-primary': active,
        'btn-secondary': !active,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
