import React, { ComponentProps, FC } from "react";
import cx from "classnames";

import styles from "./styles.module.scss";

interface ISelect extends ComponentProps<"select"> {
    optionsList: string[] | { name: string; value: string | number }[];
    placeholder: string;
}

const Select: FC<ISelect> = ({ placeholder, optionsList, ...rest }) => {
    const { className, ...restProps } = rest;

    return (
        <select className={cx(styles.select, className)} {...restProps}>
            <option value={""}>{placeholder}</option>
            {optionsList.map((optionsEl) => {
                if (typeof optionsEl === "object") {
                    return <option value={optionsEl.value}>{optionsEl.name}</option>;
                } else {
                    return <option value={optionsEl}>{optionsEl}</option>;
                }
            })}
        </select>
    );
};

export default Select;
