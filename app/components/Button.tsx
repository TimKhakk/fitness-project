import type { ReactNode } from 'react';
import cn from 'classname';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  className?: string;
  variant?: 'primary'
}

const CLASSNAME = 'button'

export function Button({ children, className, variant, ...props }: Props) {
  return (
    <button className={cn(CLASSNAME, {
      [`${CLASSNAME}-${variant}`]: variant,
    })} {...props}>
      {children}
    </button>
  );
}
