import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: Props) {
  return (
    <label className="label">
      <input className="input" {...props} />
      {label && <span className="span-label">{label}{props.required && ' *'}</span>}
    </label>
  );
}
