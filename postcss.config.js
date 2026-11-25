import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const tw = tailwindcss();

const scopedTailwind = {
  postcssPlugin: 'scoped-tailwindcss',
  plugins: tw.plugins.map((fn) => async (root, result) => {
    const file = root?.source?.input?.file ?? '';
    if (file.includes('node_modules')) return;
    return fn(root, result);
  }),
};

export default {
  plugins: [scopedTailwind, autoprefixer()],
};
