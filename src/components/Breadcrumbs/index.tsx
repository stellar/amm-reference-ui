import { TextLink } from "@stellar/design-system";
import "./styles.scss";

interface BreadcrumbsLink {
  link: string;
  text: string;
}

interface BreadcrumbsProps {
  links: BreadcrumbsLink[];
  onClick: (route: string) => void;
}

const generateKey = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

export const Breadcrumbs = ({ links, onClick }: BreadcrumbsProps) => (
  <div className="Breadcrumbs">
    {links.map((ln) => (
      <div className="Breadcrumbs__link" key={generateKey(ln.text)}>
        <TextLink onClick={() => onClick(ln.link)}>{ln.text}</TextLink>
      </div>
    ))}
  </div>
);
