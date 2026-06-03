import './Tag.scss';

interface TagProps {
  children: React.ReactNode;
  variant?: 'accent' | 'muted';
}

export function Tag({ children, variant = 'muted' }: TagProps) {
  return (
    <span className={`tag tag--${variant}`}>{children}</span>
  );
}
