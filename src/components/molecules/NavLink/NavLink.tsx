import './NavLink.scss';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'overlay';
}

export function NavLink({ href, children, onClick, variant = 'default' }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`nav-link nav-link--${variant}`}
    >
      <span className="nav-link__text">{children}</span>
    </a>
  );
}
