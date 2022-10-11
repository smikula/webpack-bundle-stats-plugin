# webpack-bundle-stats-plugin

Webpack-bundle-stats-plugin is a Webpack plugin that exports internal details about Webpack's bundle compilation process.  Webpack has [its own mechanism for exporting compilation stats](https://webpack.js.org/api/stats), but it doesn't contain the full breadth of data available at compilation time.  The goal of this plugin is to make all that data accessible in a form that can be consumed by other tools.

## Usage

```typescript
new BundleStatsPlugin(options)
```

### Options

The `options` object supports the following properties:
- `outputFile` (`string`): File path to which write the output JSON (optional)
- `onComplete` (`(stats: BundleStats) => void`): Callback to call with the `BundleStats` object (optional)
