import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { DetailsTooltip } from "@stellar/design-system";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryGroup } from "victory";
import { Card } from "components/Card";
import { fetchPoolHistoryAction } from "ducks/poolHistory";
import { useRedux } from "hooks/useRedux";

import "./styles.scss";

type TimeFrames = { label: string; segments: number | undefined }[];

interface ChartProps {
  header: {
    title: string;
    description: string;
  };
  poolId: string;
  timeframes?: TimeFrames;
}

interface ChartData {
  x: string | undefined;
  y: number | undefined;
}

export const Chart = ({ header, poolId, timeframes = [] }: ChartProps) => {
  const allTimeframes = useMemo(
    () => [...timeframes, { label: "ALL", segments: undefined }],
    [timeframes],
  );

  const isTimeframeSelectorRequired = allTimeframes.length > 1;

  const { poolHistory } = useRedux("poolHistory");
  const [chartData, setChartData] = useState([
    { x: undefined, y: undefined },
  ] as ChartData[]);
  const [selectedData, setSelectedData] = useState(chartData);
  const [currentTimeframe, setCurrentTimeframe] = useState(
    allTimeframes.length - 1,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPoolHistoryAction("1"));
  }, [poolId, dispatch]);

  useEffect(() => {
    const formattedData = poolHistory.data.map((entry) => ({
      x: new Date(entry.ts * 1000).getDate().toString(),
      y: Number(entry.total_value_locked),
    }));
    setChartData(formattedData);
    setSelectedData(formattedData);
  }, [poolHistory]);

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
        onClick={() => setCurrentTimeframe(i)}
      >
        {t.label}
      </button>
    ));

  return (
    <section className="Chart">
      <Card>
        <header className="Chart__header">
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
        </header>

        <svg className="Chart__gradient_def">
          <defs>
            <linearGradient id="chartGradient" x1=".5" x2=".5" y2="1">
              <stop stopColor="#3e1bdb" stopOpacity=".1" />
              <stop offset="1.417" stopColor="#fff" />
            </linearGradient>
          </defs>
        </svg>

        <VictoryChart padding={{ left: 10, right: 10 }} width={740}>
          <VictoryAxis />
          <VictoryGroup
            style={{
              data: { strokeWidth: 2, fillOpacity: 0.6 },
            }}
          >
            <VictoryArea
              style={{
                data: {
                  fill: "url(#chartGradient)",
                  stroke: "rgba(62, 27, 219, 0.6)",
                },
              }}
              data={selectedData}
              interpolation="basis"
              sortOrder="descending"
            />
          </VictoryGroup>
        </VictoryChart>
      </Card>
    </section>
  );
};
