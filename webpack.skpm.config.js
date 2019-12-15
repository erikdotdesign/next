module.exports = function (config, entry) {
  config.node = entry.isPluginCommand ? false : {
    setImmediate: false
  };
  config.resolve.extensions = ['.sketch.js', '.js', '.tsx', '.ts', '.jsx'];
  config.output.filename = entry.isPluginCommand
  ? entry.script.replace(/\.(?!js)|\//g, '_')
  : entry.script.replace(/\.(?!tsx)|\//g, '_').replace('.tsx', '.js');
  config.module.rules.push({
    test:  /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [require('@babel/preset-env')],
          [require('@babel/preset-typescript')],
          [require('@babel/preset-react')]
        ],
        plugins: [
          [require('@babel/plugin-proposal-class-properties')],
          [require('@babel/plugin-proposal-object-rest-spread')],
          [require('@babel/plugin-proposal-export-default-from')]
        ]
      }
    }
  });
  config.module.rules.push({
    test: /\.(html)$/,
    use: [{
        loader: "@skpm/extract-loader",
      },
      {
        loader: "html-loader",
        options: {
          attrs: [
            'img:src',
            'link:href'
          ],
          interpolate: true,
        },
      },
    ]
  });
  config.module.rules.push({
    test: /\.(css)$/,
    use: [{
        loader: "@skpm/extract-loader",
      },
      {
        loader: "css-loader",
      },
    ]
  });
}
