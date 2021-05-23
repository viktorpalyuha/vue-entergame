let billboardMapping = () => {
  return window.googletag
    .sizeMapping()
    .addSize(
      [1024, 768],
      [
        [728, 90],
        [750, 200]
      ]
    )
    .addSize([640, 480], [300, 250])
    .addSize([0, 0], [])
    .build();
};

let smallBannerMapping = () => {
  return window.googletag
    .sizeMapping()
    .addSize(
      [1024, 768],
      [
        [300, 250],
        [468, 60],
        [240, 400]
      ]
    )
    .addSize(
      [640, 480],
      [
        [240, 400],
        [300, 250]
      ]
    )
    .addSize([0, 0], [])
    .build();
};

export { billboardMapping, smallBannerMapping };
