import React, { useEffect, useState } from "react";
import { IChart, ICost, IUsage } from "./typization/interfaces";
import { generateChartData, getHighChartsOptions, loadCsvData } from "./utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsBoost from "highcharts/modules/boost";

HighchartsBoost(Highcharts);

const GraphModule = () => {
    const [usagesData, setUsagesData] = useState<IUsage[]>([]);
    const [costsData, setCostsData] = useState<ICost[]>([]);

    useEffect(() => {
        loadCsvData("/usages.csv", setUsagesData);
        loadCsvData("/costs.csv", setCostsData);
    }, []);

    const chartData: IChart[] = generateChartData(usagesData, costsData);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={getHighChartsOptions(chartData)} />
        </div>
    );
};

export default GraphModule;
