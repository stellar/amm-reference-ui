import { useEffect, useState } from "react";
import { Chart } from "components/Chart";
import { ChartData, LiquidityPoolHistory } from "types/types.d";

import "./styles.scss";

interface DetailsChartProps {
  poolHistory: { data: LiquidityPoolHistory[] };
}

export const DetailsChart = ({ poolHistory }: DetailsChartProps) => {
  const [chartData, setChartData] = useState([] as ChartData[]);
  useEffect(() => {
    const formattedData = poolHistory.data.map((entry) => ({
      x: new Date(entry.ts * 1000).getDate().toString(),
      y: Number(entry.total_value_locked),
    }));
    setChartData(formattedData);
  }, [poolHistory]);

  return (
    <div className="DetailsChart">
      <Chart
        chartData={chartData}
        colorRgb={[62, 27, 219]}
        header={{
          title: "TVL",
          description: "Total Value Locked",
        }}
        timeframes={[
          { label: "1M", segments: 30 },
          { label: "1W", segments: 7 },
        ]}
      />
    </div>
  );
};
