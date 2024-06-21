import React, { cloneElement, FC, ReactElement, useState } from "react";
import { IChart, IFilters } from "../typization/interfaces";
import { getFilteredChartData } from "../utils";

import styles from "./styles.module.scss";
import { ModelEnum, TypeEnum } from "../typization/enums";
import Select from "shared/ui/select";

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

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>, filterType: keyof IFilters) => {
        setFilters((prev) => ({ ...prev, [filterType]: e.target.value }));
    };

    return (
        <div>
            {cloneElement(children, { chartData: filteredChartData })}
            <div className={styles.filtersContainer}>
                <Select
                    onChange={(e) => handleFilter(e, "type")}
                    optionsList={Object.values(TypeEnum)}
                    placeholder={"Select type filter"}
                />
                <Select
                    onChange={(e) => handleFilter(e, "model")}
                    optionsList={Object.values(ModelEnum)}
                    placeholder={"Select model filter"}
                />
            </div>
        </div>
    );
};

export default Filters;
