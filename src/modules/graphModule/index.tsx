import React, { useEffect, useState } from "react";
import { IChart, ICost, IUsage } from "./typization/interfaces";
import { generateChartData, loadCsvData } from "./utils";
import Chart from "./Chart";
import Filters from "./filters";

const GraphModule = () => {
    const [usagesData, setUsagesData] = useState<IUsage[]>([]);
    const [costsData, setCostsData] = useState<ICost[]>([]);

    useEffect(() => {
        loadCsvData("/usages.csv", setUsagesData);
        loadCsvData("/costs.csv", setCostsData);
    }, []);

    const chartData: IChart[] = generateChartData(usagesData, costsData);

    return (
        <Filters chartData={chartData}>
            <Chart />
        </Filters>
    );
};

export default GraphModule;
