import * as fs from 'fs';
import { Compiler, Stats } from 'webpack';
import { getStatsFromCompilation } from './getStatsFromCompilation';
import { BundleStatsPluginOptions } from './types/BundleStatsPluginOptions';

export class BundleStatsPlugin {
    constructor(private options: BundleStatsPluginOptions = {}) {}

    apply(compiler: Compiler) {
        compiler.hooks.done.tap('BundleStatsPlugin', (webpackStats: Stats) => {
            const stats = getStatsFromCompilation(webpackStats.compilation);

            if (this.options.outputFile) {
                fs.writeFileSync(this.options.outputFile, JSON.stringify(stats, null, 2));
            }

            this.options.onComplete?.(stats);
        });
    }
}
