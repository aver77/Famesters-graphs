import React, { cloneElement, FC, ReactElement, useState } from "react";
import { IChart, IFilters } from "../typization/interfaces";
import { getFilteredChartData } from "../utils";

import styles from "./styles.module.scss";
import { ModelEnum, TypeEnum } from "../typization/enums";

interface IFiltersComponent {
    chartData: IChart[];
    children: ReactElement;
}

const Filters: FC<IFiltersComponent> = ({ chartData, children }) => {
    const [filters, setFilters] = useState<IFilters>({
        type: "",
        model: ""
    });

    const filteredChartData = getFilteredChartData(chartData, filters);

    return (
        <div>
            {cloneElement(children, { chartData: filteredChartData })}
            <div className={styles.filtersContainer}>
                <select
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, type: e.target.value as TypeEnum }))
                    }
                >
                    <option value={""}>Select type filter</option>
                    {Object.values(TypeEnum).map((typeValue) => (
                        <option value={typeValue}>{typeValue}</option>
                    ))}
                </select>
                <select
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, model: e.target.value as ModelEnum }))
                    }
                >
                    <option value={""}>Select model filter</option>
                    {Object.values(ModelEnum).map((typeValue) => (
                        <option value={typeValue}>{typeValue}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filters;
