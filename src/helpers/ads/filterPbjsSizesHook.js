export default (slot) => {
  const currentWidth = window.innerWidth;

  //Get all available size config breakpoints
  const allBreakPointValues = window.pbjs
    .getConfig()
    ['sizeConfig'].map(
      (breakpoint) => +breakpoint.mediaQuery.split(' ')[1].slice(0, -3)
    )
    .reverse();

  //Get current breakpoint supported sizes
  const currentBreakpointSizes = window.pbjs
    .getConfig()
    ['sizeConfig'].reverse()
    .filter((breakpoint, index) => {
      if (
        currentWidth >= allBreakPointValues[index] &&
        (currentWidth < allBreakPointValues[index + 1] ||
          !allBreakPointValues[index + 1])
      ) {
        return breakpoint;
      }
    })[0].sizesSupported;

  //Convert all sizes to the following format '728x90' for the convenient comparison later
  const currentBreakpointSizesInString = currentBreakpointSizes.map((size) =>
    size.join('x')
  );

  //Filtering sizes logic. First we get all the sizes of passed slot.
  //Secondly, we convert all the sizes to strings so that they can be conveniently filtered.
  //Thirdly, filter them, convert back to 2D array and convert each item to number.
  //Finally, making a copy of slot and setting new sizes to it.
  const allSlotSizes = slot.mediaTypes.banner.sizes;
  const allSlotSizesInString = allSlotSizes.map((size) => size.join('x'));
  const allowedSlotSizes = allSlotSizesInString
    .filter((size) => currentBreakpointSizesInString.includes(size))
    .map((size) => size.split('x').map((item) => +item));
  const slotWithCorrectSizes = {
    ...slot,
    mediaTypes: {
      ...slot.mediaTypes,
      banner: { ...slot.mediaTypes.banner, sizes: allowedSlotSizes }
    }
  };

  return slotWithCorrectSizes;
};
