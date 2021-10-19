import "./styles.scss";

interface DataVisualizationGridProps {
  children: React.ReactNode;
}

export const DataVisualizationGrid = ({
  children,
}: DataVisualizationGridProps) => (
  <section className="DataVisualizationGrid">{children}</section>
);
