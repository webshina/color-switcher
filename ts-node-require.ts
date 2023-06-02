export {};

require('tsconfig-paths').register();
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
});
