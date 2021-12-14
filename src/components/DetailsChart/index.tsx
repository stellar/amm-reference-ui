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

export const DetailsChart = ({
  isDarkMode,
  poolHistory,
}: DetailsChartProps) => {
  const [chartData, setChartData] = useState([] as ChartData[]);

  const generateTheme = () => ({
    primaryColor: getCssVar("--pal-brand-primary"),
    bgColor: getCssVar("--pal-background-primary"),
    tickLabels: getCssVar("--pal-text-secondary"),
  });

  const [theme, setTheme] = useState(generateTheme());

  useEffect(() => {
    const formattedData = poolHistory.data.map((entry) => {
      const dateInstance = new Date(entry.ts * 1000);

      return {
        x: `${dateInstance.getMonth() + 1}/${dateInstance.getDate()}`,
        y: entry.totalValueLocked,
      };
    });
    setChartData(formattedData);
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
            { label: "1W", segments: 7 },
            { label: "1M", segments: 30 },
          ]}
        />
      </Card>
    </div>
  );
};
