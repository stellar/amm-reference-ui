import { Layout } from "@stellar/design-system";

interface HeaderProps {
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const Header = ({ setIsDarkMode }: HeaderProps) => (
  <Layout.Header
    projectTitle="AMM Reference UI"
    projectLink="https://stellar.org"
    hasDarkModeToggle
    onDarkModeToggleEnd={(isDarkMode) => {
      setIsDarkMode(isDarkMode);
    }}
  />
);
