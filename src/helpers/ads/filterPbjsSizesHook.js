export default (slot) => {
  window.pbjs = window.pbjs || {};
  const currentWidth = window.innerWidth;
  const sizeConfig = window.pbjs.getConfig()['sizeConfig'];

  if (!sizeConfig) {
    return slot;
  }

  //Get all available size config breakpoints
  const allBreakPointValues = sizeConfig
    .map((breakpoint) => +breakpoint.mediaQuery.replace(/[^0-9]/g, ''))
    .reverse();

  //Get current breakpoint supported sizes
  const currentBreakpointSizes =
    sizeConfig.reverse().filter((breakpoint, index) => {
      if (!allBreakPointValues[index + 1]) {
        return breakpoint;
      } else if (
        currentWidth >= allBreakPointValues[index] &&
        currentWidth < allBreakPointValues[index + 1]
      ) {
        return breakpoint;
      }
    })[0].sizesSupported || false;

  if (!currentBreakpointSizes) {
    return slot;
  }

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
