import { useEffect, useState } from "react";
import { Card } from "components/Card";
import { Chart } from "components/Chart";
import { getCssVar } from "helpers/cssHelpers";
import { ChartData, LiquidityPoolHistory } from "types/types.d";

import "./styles.scss";

interface DetailsChartProps {
  isDarkMode: boolean;
  poolHistory: { data: LiquidityPoolHistory[] };
}

const findSegmentBoundaryIndex = (
  data: LiquidityPoolHistory[],
  daysAgo: number,
) => {
  /* iterate over chartData and find the timestamp 
  that corresponds to the relative date we're looking. 
  For ex, for 30 days ago, find which timestamp is ~ 30 days ago */

  const today = new Date();
  const priorDateTs = new Date().setDate(today.getDate() - daysAgo);

  const index = data.findIndex((datum) => datum.ts < priorDateTs);

  /* if the most recent entry is the only one that falls within our boundary
  OR if we can't find any entries that fall within our boundary, 
  just return the last 2 entries so we have something to look at */
  return index > 0 ? index : 2;
};

export const DetailsChart = ({
  isDarkMode,
  poolHistory,
}: DetailsChartProps) => {
  const [chartData, setChartData] = useState([] as ChartData[]);
  const [thirtyDayIndex, setThirtyDayIndex] = useState(30);
  const [sevenDayIndex, setSevenDayIndex] = useState(7);

  const generateTheme = () => ({
    primaryColor: getCssVar("--pal-brand-primary"),
    bgColor: getCssVar("--pal-background-primary"),
    tickLabels: getCssVar("--pal-text-secondary"),
  });

  const [theme, setTheme] = useState(generateTheme());

  useEffect(() => {
    const formattedData = poolHistory.data.map((entry) => {
      const dateInstance = new Date(entry.ts);

      return {
        x: `${dateInstance.getMonth() + 1}/${dateInstance.getDate()}`,
        y: entry.totalValueLocked,
      };
    });
    setChartData(formattedData);
    setThirtyDayIndex(
      findSegmentBoundaryIndex(poolHistory.data.slice(0, 30), 30),
    );
    setSevenDayIndex(findSegmentBoundaryIndex(poolHistory.data.slice(0, 7), 7));
  }, [poolHistory]);

  useEffect(() => {
    setTheme(generateTheme());
  }, [isDarkMode]);

  return (
    <div className="DetailsChart">
      <Card>
        <Chart
          chartData={chartData}
          header={{
            title: "TVL",
            description: "Total Value Locked",
          }}
          theme={theme}
          timeframes={[
            { label: "1W", segments: sevenDayIndex },
            { label: "1M", segments: thirtyDayIndex },
          ]}
        />
      </Card>
    </div>
  );
};
