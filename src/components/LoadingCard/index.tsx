import { Loader } from "@stellar/design-system";
import { Card } from "components/Card";

import "./styles.scss";

export const LoadingCard = () => (
  <Card>
    <div className="LoadingCard">
      <Loader size="3rem" />
    </div>
  </Card>
);
