<template>
  <div role="status">
    <img src="@/assets/images/loading/load.gif" alt="" :style="{ width: size, height: size }" />
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: '80px'
    }
  }
}
</script>
