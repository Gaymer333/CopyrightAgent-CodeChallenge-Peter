export enum OrderEnum {
	writen,
	name,
	hex,
	rgb
}

export enum OrderDirectionsEnum {
	asc,
	desc
}

export enum ReturnMethodEnum {
	hex,
	rgb,
	both
}

export enum RunMethodEnum {
	sync,
	async
}

export type Color = {
    name: string;
    HEX: string;
    RGB: {
        R: number;
        G: number;
        B: number;
    };
}