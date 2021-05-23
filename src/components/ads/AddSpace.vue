<template>
  <div :id="divId"></div>
</template>

<script>
import { onUnmounted } from '@vue/runtime-core';
export default {
  props: ['path', 'sizes', 'divId', 'mapping'],
  setup(props) {
    let addSpace;

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
      }
    });

    window.googletag.cmd.push(function () {
      window.googletag.display(props.divId);
      window.googletag.pubads().refresh();
    });

    const refreshInterval = setInterval(() => {
      window.googletag.pubads().refresh();
    }, 30000);

    onUnmounted(() => {
      window.googletag.destroySlots([addSpace]);
      clearInterval(refreshInterval);
    });
  }
};
</script>
