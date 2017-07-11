import { Wind } from './wind';

export class Weather {
    icon: string = "default";
    temperature: number;
    unit: string;
    city: string;
    condition: string;
    wind: Wind;
    available: boolean;
    summary: string
}