import { Compiler, Compilation } from 'webpack';
import { getStatsFromCompilation } from './getStatsFromCompilation';

export class SmallerStatsPlugin {
    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('SmallerStatsPlugin', (compilation: Compilation) => {
            // TODO: Is there a better hook to tap than statsFactory?
            compilation.hooks.statsFactory.tap('SmallerStatsPlugin', () => {
                const betterStats = getStatsFromCompilation(compilation);
                console.log('SmallerStatsPlugin', compilation, betterStats);
                debugger;
            });
        });
    }
}
