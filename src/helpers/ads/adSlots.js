import { billboardSizes, smallBannerSizes } from './adsSizes.js';

const billboard = {
  code: '/19968336/header-bid-tag-1',
  mediaTypes: {
    banner: {
      sizes: billboardSizes
    }
  },
  bids: [
    {
      bidder: 'appnexus',
      params: {
        placementId: 13144370
      }
    }
  ]
};

const smallBanner = {
  code: '/19968336/header-bid-tag-2',
  mediaTypes: {
    banner: {
      sizes: smallBannerSizes
    }
  },
  bids: [
    {
      bidder: 'appnexus',
      params: {
        placementId: 13144370
      }
    }
  ]
};

export { billboard, smallBanner };
