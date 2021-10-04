import "./styles.scss";

interface BreadcrumbsLink {
  link: string;
  text: string;
}

interface BreadcrumbsProps {
  links: BreadcrumbsLink[];
}

const generateKey = (text: string) => text.toLowerCase().replace(" ", "-");

export const Breadcrumbs = ({ links }: BreadcrumbsProps) => (
  <div className="Breadcrumbs">
    {links.map((ln) => (
      <div className="Breadcrumbs__link">
        <a key={generateKey(ln.text)} href={ln.link}>
          {ln.text}
        </a>
      </div>
    ))}
  </div>
);
