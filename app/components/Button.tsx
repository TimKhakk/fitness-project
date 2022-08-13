import type { ReactNode } from 'react';
import cn from 'classname';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  className?: string;
}

export default function Button({ children, className, ...props }: Props) {
  return (
    <button className={cn("transition py-1 px-3 rounded font-bold flex max-w-max", className)} {...props}>
      {children}
    </button>
  );
}
