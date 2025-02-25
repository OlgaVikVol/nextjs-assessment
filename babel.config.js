module.exports = {
  presets: [
    'next/babel',
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }]  // 👈 Add runtime option
  ],
};
