import React, { FC } from "react";
import { IChart } from "./typization/interfaces";
import { getHighChartsOptions } from "./utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsBoost from "highcharts/modules/boost";

HighchartsBoost(Highcharts);

interface IGraphModule {
    chartData?: IChart[];
}

const GraphModule: FC<IGraphModule> = ({ chartData = [] }) => {
    return <HighchartsReact highcharts={Highcharts} options={getHighChartsOptions(chartData)} />;
};

export default GraphModule;
