import React, { useState } from "react";
import { IFilters } from "./typization/interfaces";

const Filters = () => {
    const [filters, setFilters] = useState<IFilters>({
        type: "all",
        model: "all"
    });

    return <div></div>;
};

export default Filters;
