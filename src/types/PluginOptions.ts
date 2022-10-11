import { BundleStats } from './BundleStats';

export interface PluginOptions {
    outputFile?: string;
    onComplete?: (stats: BundleStats) => void;
}
