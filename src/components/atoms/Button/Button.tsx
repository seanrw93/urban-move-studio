import './Button.scss';

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'button',
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? 'button--full' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="button__label">{children}</span>
    </button>
  );
}
