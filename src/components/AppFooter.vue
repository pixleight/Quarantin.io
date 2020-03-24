<template>
  <v-footer app dark>
    <v-btn
      absolute
      dark
      fab
      top
      large
      color="secondary"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-container>
      <v-row>
        <v-col>
          footer
        </v-col>
      </v-row>
    </v-container>
    <svg class="svg">
      <mask id='m' fill='#fff'>
        <rect id='r' width='100%' height='100%'/>
        <circle id='c' r='40' fill='#000'/>
      </mask>
      <use xlink:href='#r' :fill='$vuetify.theme.currentTheme.primary' mask='url(#m)' />
    </svg>
  </v-footer>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
footer {
  background: none !important;
}

.container {
  position: relative;
  z-index: 2;
}

button {
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
}

svg {
  position: absolute;
	top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

circle {
  transform: translateX(50%);
}
</style>