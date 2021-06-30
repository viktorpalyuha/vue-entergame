export default () => {
  window.pbjs.setConfig({
    sizeConfig: [
      {
        mediaQuery: '(min-width: 1024px)',
        sizesSupported: [
          [728, 90],
          [750, 200],
          [300, 250],
          [468, 60],
          [240, 400]
        ],
        labels: ['desktop']
      },
      {
        mediaQuery: '(min-width: 640px)',
        sizesSupported: [
          [300, 250],
          [240, 400]
        ],
        labels: ['tablet']
      },
      {
        mediaQuery: '(min-width: 0px)',
        sizesSupported: [],
        labels: ['phone']
      }
    ]
  });
};
