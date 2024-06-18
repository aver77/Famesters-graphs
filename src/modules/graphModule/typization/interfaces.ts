import { ModelEnum, TypeEnum } from "./enums";

type TDate = `${number}.${number}.${number}`;

export interface IUsage {
    type: TypeEnum;
    model: ModelEnum;
    created_at: TDate;
    usage_input: `${number}`;
    usage_output: `${number}`;
}

export interface ICost {
    model: ModelEnum;
    input: `${number}`;
    output: `${number};`;
}

export interface IChart {
    type: TypeEnum;
    model: ModelEnum;
    y: number;
    x: TDate;
    category: TDate;
}
