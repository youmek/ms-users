interface BaseListBodyJsonResponse {
    id: number;
    metadata:  { [key: string]: any; };
    properties:  { [key: string]: any; };
    items: { [key: string]: any; }[];
}