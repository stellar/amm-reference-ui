import React from "react";
import { IconButton, Icon } from "@stellar/design-system";
import { Tooltip } from "components/Tooltip";
import "./styles.scss";

interface StatItemProps {
  label: string;
  details?: React.ReactNode;
  note?: string;
  isNoteNegative?: boolean;
  children: React.ReactNode;
}

export const StatItem = ({
  label,
  details,
  note,
  isNoteNegative,
  children,
}: StatItemProps) => (
  <div className="StatItem">
    <div className="StatItem__label">
      <span>{label}</span>

      {details ? (
        <Tooltip position={Tooltip.position.TOP} content={details}>
          <IconButton
            icon={<Icon.Info />}
            altText="Details"
            customSize="1rem"
          />
        </Tooltip>
      ) : null}
    </div>
    <div className="StatItem__text">{children}</div>
    {note ? (
      <div
        className={`StatItem__note StatItem__note--${
          isNoteNegative ? "negative" : "positive"
        }`}
      >
        {note}
      </div>
    ) : null}
  </div>
);
