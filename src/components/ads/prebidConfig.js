import { billboardSizes, smallBannerSizes } from './adsSizes.js';

export default () => {
  var PREBID_TIMEOUT = 1000;
  var FAILSAFE_TIMEOUT = 3000;

  var adUnits = [
    {
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
    },
    {
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
    }
  ];

  // ======== DO NOT EDIT BELOW THIS LINE =========== //
  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];
  googletag.cmd.push(function () {
    googletag.pubads().disableInitialLoad();
  });

  var pbjs = pbjs || {};
  pbjs.que = pbjs.que || [];

  pbjs.que.push(function () {
    pbjs.addAdUnits(adUnits);
    pbjs.requestBids({
      bidsBackHandler: initAdserver,
      timeout: PREBID_TIMEOUT
    });
  });

  function initAdserver() {
    if (pbjs.initAdserverSet) return;
    pbjs.initAdserverSet = true;
    googletag.cmd.push(function () {
      pbjs.setTargetingForGPTAsync && pbjs.setTargetingForGPTAsync();
    });
  }

  // in case PBJS doesn't load
  setTimeout(function () {
    initAdserver();
  }, FAILSAFE_TIMEOUT);
};
