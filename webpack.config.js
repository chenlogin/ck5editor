// webpack.config.js

'use strict';

const path = require( 'path' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );

module.exports = {
    // https://webpack.js.org/configuration/entry-context/
    entry: './app.js',

    // https://webpack.js.org/configuration/output/
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'app.bundle.js'
    },

    module: {
        rules: [
            {
                //test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                test: /theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: [ 'raw-loader' ]
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig( {
                                themeImporter: {
                                    themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                                },
                                minify: true
                            } )
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
      new CKEditorWebpackPlugin( {
          // The main language that will be built into the main bundle.
          language: 'zh-cn',

          // Additional languages that will be emitted to the `outputDirectory`.
          // This option can be set to an array of language codes or `'all'` to build all found languages.
          // The bundle is optimized for one language when this option is omitted.
          additionalLanguages: 'all',

          // For more advanced options see https://github.com/ckeditor/ckeditor5-dev/tree/master/packages/ckeditor5-dev-webpack-plugin.
      } ),
    ],

    // Useful for debugging.
    devtool: 'source-map',

    // By default webpack logs warnings if the bundle is bigger than 200kb.
    performance: { hints: false }
};
