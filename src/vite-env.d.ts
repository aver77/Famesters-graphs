declare module "*.woff";
declare module "*.woff2";
declare module "*.csv";
declare module "*.ttf";
declare module "*.pdf";
declare module "*.jpg";
declare module "*.png" {
    const value: any;
    export default value;
}
declare module "*.svg" {
    const value: any;
    export default value;
}
declare module "*.scss" {
    const content: { [className: string]: string };
    export = content;
}
