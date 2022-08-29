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
export function Switcher({ active, children, ...props }: Props) {
  return (
    <button
      className="flex items-center gap-3 transition p-3 font-bold max-w-max"
      {...props}
    >
      <div className="flex items-center">
        <span
          className={cn('rounded-lg w-[34px] h-[14px]', {
            'bg-emerald-300': active,
            'bg-gray-400': !active,
          })}
        />
        <span
          className={cn('transition w-5 h-5 p-2 rounded-full absolute z-10 shadow', {
            'translate-x-4 bg-emerald-600': active,
            'bg-white': !active,
          })}
        />
      </div>
      <span className=''>{children}</span>
    </button>
  );
}
