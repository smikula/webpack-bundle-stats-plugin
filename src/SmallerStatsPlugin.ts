import * as fs from 'fs';
import { Compiler, Compilation } from 'webpack';
import { getStatsFromCompilation } from './getStatsFromCompilation';
import { PluginOptions } from './types/PluginOptions';

export class SmallerStatsPlugin {
    constructor(private options: PluginOptions = {}) {}

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('SmallerStatsPlugin', (compilation: Compilation) => {
            // TODO: Is there a better hook to tap than statsFactory?
            compilation.hooks.statsFactory.tap('SmallerStatsPlugin', () => {
                const stats = getStatsFromCompilation(compilation);

                if (this.options.outputFile) {
                    fs.writeFileSync(this.options.outputFile, JSON.stringify(stats, null, 2));
                }

                this.options.onComplete?.(stats);
            });
        });
    }
}
