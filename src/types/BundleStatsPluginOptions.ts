import { BundleStats } from './BundleStats';

export interface BundleStatsPluginOptions {
    outputFile?: string;
    onComplete?: (stats: BundleStats) => void;
}
