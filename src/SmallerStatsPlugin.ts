import { Compiler } from 'webpack';

export class SmallerStatsPlugin {
    apply(compiler: Compiler) {
        console.log('SmallerStatsPlugin', compiler);
    }
}
