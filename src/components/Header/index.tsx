// TODO: move to SDS Layout header
import React, { useEffect } from "react";
import {
  Layout,
  ProjectLogo,
  TextLink,
  ToggleDarkMode,
  ModeValue,
  NavButton,
  Icon,
} from "@stellar/design-system";
import "./styles.scss";

// TODO: breaking change: `children` prop is no longer used

interface HeaderProps {
  projectTitle: string;
  projectLink?: string;
  hasDarkModeToggle?: boolean;
  onDarkModeToggleEnd?: (isDarkMode: boolean) => void;
  onSignOut?: () => void;
  showButtonBorder?: boolean;
  menu?: {
    isEnabled: boolean;
    onOpen: () => void;
  };
  contentCenter?: React.ReactElement;
  contentRight?: React.ReactElement;
}

const stringToCamelcase = (str: string) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, "");

export const Header: React.FC<HeaderProps> = ({
  projectTitle,
  projectLink,
  hasDarkModeToggle,
  onDarkModeToggleEnd,
  onSignOut,
  showButtonBorder,
  menu,
  contentCenter,
  contentRight,
}: HeaderProps) => {
  // Set default mode to light, if there is no theme toggle
  useEffect(() => {
    if (!hasDarkModeToggle) {
      document.body.classList.add(ModeValue.light);
    }
  }, [hasDarkModeToggle]);

  return (
    <div className="Layout__header">
      <Layout.Inset>
        {/* Left */}
        <div className="Layout__header--left">
          <ProjectLogo title={projectTitle} link={projectLink} />
        </div>

        {/* Center */}
        {contentCenter ? (
          <div className="Layout__header--center">{contentCenter}</div>
        ) : null}

        {/* Right */}
        <div className="Layout__header--right">
          {contentRight ?? null}

          {onSignOut ? (
            <TextLink id="sign-out-button" role="button" onClick={onSignOut}>
              Sign out
            </TextLink>
          ) : null}

          {hasDarkModeToggle ? (
            <ToggleDarkMode
              storageKeyId={`stellarTheme:${stringToCamelcase(projectTitle)}`}
              showBorder={showButtonBorder}
              onToggleEnd={onDarkModeToggleEnd}
            />
          ) : null}

          {menu?.isEnabled ? (
            <NavButton
              id="open-side-nav-button"
              title="Open side navigation"
              onClick={menu.onOpen}
              icon={<Icon.Menu />}
              showBorder={showButtonBorder}
            />
          ) : null}
        </div>
      </Layout.Inset>
    </div>
  );
};
