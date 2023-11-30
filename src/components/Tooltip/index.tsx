// TODO: move to SDS
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPopper, preventOverflow, flip } from "@popperjs/core";
// TODO: move to assets in SDS
import { ReactComponent as TooltipPointIcon } from "./tooltip-point.svg";
import "./styles.scss";

enum TooltipPosition {
  BOTTOM = "bottom",
  BOTTOM_START = "bottom-start",
  BOTTOM_END = "bottom-end",
  LEFT = "left",
  LEFT_START = "left-start",
  LEFT_END = "left-end",
  RIGHT = "right",
  RIGHT_START = "right-start",
  RIGHT_END = "right-end",
  TOP = "top",
  TOP_START = "top-start",
  TOP_END = "top-end",
}

interface TooltipComponent {
  position: typeof TooltipPosition;
}

interface TooltipProps {
  content: React.ReactNode;
  position: TooltipPosition;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> & TooltipComponent = ({
  content,
  position,
  children,
}) => {
  const tooltipEl = useRef<HTMLDivElement | null>(null);
  const referenceEl = useRef<HTMLDivElement | null>(null);

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const positionTooltip = useCallback(() => {
    if (referenceEl?.current && tooltipEl?.current) {
      createPopper(referenceEl?.current, tooltipEl.current, {
        placement: position,
        modifiers: [
          preventOverflow,
          flip,
          {
            name: "offset",
            options: {
              offset: [0, 16],
            },
          },
        ],
      });
    }
  }, [position, referenceEl]);

  useLayoutEffect(() => {
    positionTooltip();
  }, [positionTooltip]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    // Do nothing if clicking tooltip itself or link inside the tooltip
    if (
      event.target === tooltipEl?.current ||
      tooltipEl?.current?.contains(event.target as Node)
    ) {
      return;
    }

    if (!referenceEl?.current?.contains(event.target as Node)) {
      setIsTooltipVisible(false);
    }
  }, []);

  useLayoutEffect(() => {
    if (isTooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTooltipVisible, handleClickOutside]);

  return (
    <div className="TooltipNew">
      <div
        ref={referenceEl}
        className="TooltipNew__component"
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
        role="button"
      >
        {children}
      </div>
      <div
        ref={tooltipEl}
        className="TooltipNew__content"
        style={{ visibility: isTooltipVisible ? "visible" : "hidden" }}
      >
        <div className="TooltipNew__content__container">{content}</div>
        <div data-popper-arrow className="TooltipNew__content__arrow">
          <TooltipPointIcon />
        </div>
      </div>
    </div>
  );
};

Tooltip.displayName = "Tooltip";
Tooltip.position = TooltipPosition;
