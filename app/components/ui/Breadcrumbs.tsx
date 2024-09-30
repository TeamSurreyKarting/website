import { clsx } from 'clsx';
import Link from 'next/link';
import { FaChevronRight } from "react-icons/fa6";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx( 'grid grid-cols-2 md:flex text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-lightning-gold-400' : 'text-nile-blue-300',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block"><FaChevronRight className="text-sm" /></span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
