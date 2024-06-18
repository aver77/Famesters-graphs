import p from "papaparse";
import { ModelEnum, TypeEnum } from "./typization/enums";
import { IChart, ICost, IFilters, IUsage } from "./typization/interfaces";
import { Point, Options, PointOptionsObject } from "highcharts";

export const loadCsvData = <T>(dataUrl: `/${string}`, setter: (v: T[]) => void) => {
    fetch(dataUrl)
        .then((csv) => csv.text())
        .then((csvText) => {
            p.parse<T>(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    setter(result.data);
                }
            });
        })
        .catch(() => setter([]));
};

export const generateChartData = (
    usagesData: IUsage[],
    costsData: ICost[],
    filters?: IFilters
): IChart[] => {
    const groupedCostsByModel: Record<ModelEnum, ICost> = costsData.reduce(
        (acc, currV) => {
            return {
                ...acc,
                [currV.model]: currV
            };
        },
        {} as Record<ModelEnum, ICost>
    );

    const mappedUsagesData = usagesData.map((usage) => {
        const { type, model, usage_input, usage_output, created_at } = { ...usage };
        const currentModel = groupedCostsByModel[model];
        const calculatedPrice =
            +usage_input * +currentModel.input + +usage_output * +currentModel.output;
        return {
            type,
            model,
            y: calculatedPrice,
            x: created_at,
            category: created_at
        };
    });

    if (!filters?.model && !filters?.type) {
        return mappedUsagesData;
    } else {
        return mappedUsagesData.filter((mappedUsage) => {
            let shouldNotBeFiltered = true;
            if (filters?.model && filters.model !== "all") {
                shouldNotBeFiltered &&= mappedUsage.model === filters.model;
            }
            if (filters?.type && filters.type !== "all") {
                shouldNotBeFiltered &&= mappedUsage.type === filters.type;
            }
            return shouldNotBeFiltered;
        });
    }
};

export const getHighChartsOptions = (filteredChartData: IChart[]): Options => {
    const xDateCategories = [...new Set(filteredChartData.map((el) => el.x))].sort(
        (date1, date2) => {
            function parseDate(dateStr: string) {
                const [day, month, year] = dateStr.split(".").map(Number);
                return new Date(year, month - 1, day);
            }

            const d1 = parseDate(date1 + "");
            const d2 = parseDate(date2 + "");

            if (d1 < d2) {
                return -1;
            }
            if (d1 > d2) {
                return 1;
            }
            return 0;
        }
    );

    return {
        chart: {
            type: "line",
            zooming: {
                type: "xy"
            }
        },
        title: {
            text: "Large Data Chart with Extra Data"
        },
        xAxis: {
            title: {
                text: "Dates"
            },
            categories: xDateCategories
        },
        yAxis: {
            title: {
                text: "Prices"
            }
        },
        series: [
            {
                type: "line",
                data: filteredChartData.map((el) => ({
                    ...el,
                    x: xDateCategories.indexOf(el.x)
                })) as PointOptionsObject[],
                turboThreshold: 100000,
                boostThreshold: 10000
            }
        ],
        boost: {
            useGPUTranslations: true,
            usePreallocated: true
        },
        tooltip: {
            formatter: function () {
                const type = (this.point as Point & { type: TypeEnum }).type;
                const model = (this.point as Point & { model: ModelEnum }).model;
                return `<b>X:</b> ${this.x}<br><b>Y:</b> ${this.y}<br><b>Type:</b> ${type}<br><b>Model:</b> ${model}`;
            }
        }
    };
};
