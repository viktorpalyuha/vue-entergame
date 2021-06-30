<template>
  <div :id="divId"></div>
</template>

<script>
import { onUnmounted } from '@vue/runtime-core';
import filterPbjsSizes from '../../helpers/ads/filterPbjsSizesHook';

export default {
  props: ['path', 'sizes', 'divId', 'mapping', 'pbjsSlot'],
  setup(props) {
    let addSpace;

    function setPbjs() {
      window.pbjs.que.push(function () {
        const newPbjsSlot = filterPbjsSizes(props.pbjsSlot);
        window.pbjs.addAdUnits(newPbjsSlot);
        window.pbjs.requestBids({
          bidsBackHandler: initAdserver,
          timeout: 1000
        });
      });
      function initAdserver() {
        window.googletag.cmd.push(function () {
          window.pbjs.setTargetingForGPTAsync &&
            window.pbjs.setTargetingForGPTAsync();
          window.googletag.pubads().refresh();
        });
      }
    }

    if (window.pbjs) {
      setPbjs();
    } else {
      setTimeout(() => {
        setPbjs();
      }, 3000);
    }

    window.googletag.cmd.push(function () {
      addSpace = window.googletag.defineSlot(
        props.path,
        props.sizes,
        props.divId
      );

      if (addSpace) {
        addSpace
          .defineSizeMapping(props.mapping())
          .addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.pubads().disableInitialLoad();
        window.googletag.enableServices();
        window.googletag.pubads().display(props.divId);
      }
    });

    const refreshInterval = setInterval(() => {
      window.googletag.pubads().refresh();
    }, 30000);

    onUnmounted(() => {
      window.googletag.destroySlots([addSpace]);
      window.pbjs.removeAdUnit(props.pbjsSlot.code);
      clearInterval(refreshInterval);
    });
  }
};
</script>
