import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';

let plugins = [
  babel({
    babelrc: false,
    presets: [
      ['es2015', { modules: false }],
      ['react']
    ],
    plugins: [
      'external-helpers',
    ]
  }),
  process.env.NODE_ENV === 'production' ? uglify() : undefined,
].filter(x => x);

let targets = [
  {
    dest: 'lib/react-remote-data-js.umd.min.js',
    format: 'umd',
    moduleName: 'ReactRemoteDataJS'
  },
  {
    dest: 'lib/react-remote-data-js.umd.js',
    format: 'umd',
    moduleName: 'ReactRemoteDataJS'
  },
  {
    dest: 'lib/index.js',
    format: 'cjs'
  }
]

const config = {
  entry: 'src/index.js',
  plugins,
  targets,
};

export default config;
