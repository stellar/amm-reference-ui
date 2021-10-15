import { useEffect, useMemo, useState } from "react";
import { DetailsTooltip } from "@stellar/design-system";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryGroup } from "victory";
import { Card } from "components/Card";
import { formatAmount } from "helpers/formatAmount";
import { ChartData } from "types/types.d";

import "./styles.scss";

type TimeFrames = { label: string; segments: number | undefined }[];

interface ChartProps {
  chartData: ChartData[];
  colorRgb: number[];
  header: {
    title: string;
    description: string;
    h1Color?: string;
  };
  timeframes?: TimeFrames;
}

export const Chart = ({
  chartData,
  colorRgb,
  header,
  timeframes = [],
}: ChartProps) => {
  const customStyle = {
    ...(header.h1Color ? { "--Chart-header-color": header.h1Color } : {}),
  } as React.CSSProperties;
  const allTimeframes = useMemo(
    () => [...timeframes, { label: "ALL", segments: undefined }],
    [timeframes],
  );
  const rgbStr = colorRgb.toString();

  const isTimeframeSelectorRequired = allTimeframes.length > 1;

  const [selectedData, setSelectedData] = useState(chartData);
  const [currentTimeframe, setCurrentTimeframe] = useState(
    allTimeframes.length - 1,
  );

  useEffect(() => {
    if (isTimeframeSelectorRequired) {
      setSelectedData(
        chartData.slice(0, allTimeframes[currentTimeframe].segments),
      );
    }
  }, [allTimeframes, chartData, currentTimeframe, isTimeframeSelectorRequired]);

  const generateTimeframeButtons = () =>
    allTimeframes.map((t, i) => (
      <button
        className={`Chart__header__button--${
          currentTimeframe === i ? "active" : ""
        } Chart__header__button`}
        key={t.label}
        onClick={() => setCurrentTimeframe(i)}
      >
        {t.label}
      </button>
    ));

  if (!chartData.length) {
    return null;
  }

  const chartNote = chartData[0].y - chartData[1].y;
  const isChartNoteNegative = chartNote < 0;
  const chartNotePercentage = (
    (Math.abs(chartNote) / chartData[1].y) *
    100
  ).toFixed(2);

  return (
    <section className="Chart" style={customStyle}>
      <Card>
        <header className="Chart__header">
          <div className="Chart__header__row">
            <div className="Chart__header__label">
              <DetailsTooltip
                details={header.description}
                tooltipPosition={DetailsTooltip.tooltipPosition.left}
              >
                <span>{header.title}</span>
              </DetailsTooltip>
            </div>
            {isTimeframeSelectorRequired ? (
              <div className="Chart__header__timeframe">
                {generateTimeframeButtons()}
              </div>
            ) : null}
          </div>
          <div className="Chart__header__row">
            <div className="Chart__header__values">
              <div className="Chart__header__text">
                ${formatAmount(chartData[0].y)}
              </div>
              <div
                className={`Chart__header__note Chart__header__note--${
                  isChartNoteNegative ? "negative" : "positive"
                }
        `}
              >
                ${formatAmount(chartNote)} ({chartNotePercentage}%)
              </div>
            </div>
          </div>
        </header>

        <svg className="Chart__gradient_def">
          <defs>
            <linearGradient id="chartGradient" x1=".5" x2=".5" y2="1">
              <stop stopColor={`rgba(${rgbStr}, 1.0)`} stopOpacity=".1" />
              <stop offset="1.417" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="Chart__wrapper">
          <VictoryChart
            height={350}
            width={700}
            padding={{ top: 30, bottom: 30, left: 10, right: 10 }}
          >
            <VictoryAxis
              style={{
                axis: { stroke: "#fff" },
                tickLabels: { fill: "rgba(0, 0, 0, 0.6)" },
              }}
            />

            <VictoryGroup
              style={{
                data: { strokeWidth: 2, fillOpacity: 0.6 },
              }}
            >
              <VictoryArea
                animate={{ duration: 1000 }}
                style={{
                  data: {
                    fill: "url(#chartGradient)",
                    stroke: `rgba(${rgbStr}, 0.6)`,
                  },
                }}
                data={selectedData}
                interpolation="basis"
                sortOrder="descending"
              />
            </VictoryGroup>
          </VictoryChart>
        </div>
      </Card>
    </section>
  );
};
