import { BetterStats } from './BetterStats';

export interface PluginOptions {
    outputFile?: string;
    onComplete?: (stats: BetterStats) => void;
}
