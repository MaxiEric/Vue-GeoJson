<template>
  <div>
    <p>
      {{ type }}
    </p>
    {{ text }}
  </div>
</template>

<script>

export default {
  name: 'GeoJson2Popup',
  props: ['type', 'text']
}
</script>
