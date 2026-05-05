import type {Partner} from "../partner/partner_type.ts";

export type Startup = {
    id?: number;
    name: string;
    sector: string;
    series: string;
    eval: number;
    equity: number;
    funds_accrued: number;
    projected_close: string;
    stage: string;
    partner?: Partner;
    founders?: string[];
    fundingByRound?: Record<string, number>;
    startupNotes: String[]
};