<template>
  <div class="flex-shrink-0 px-4 my-2 flex items-center">
    <img :alt="alt" :src="logo" class="mx-auto max-h-16 w-2/3">
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class SidebarLogo extends Vue {
  @Prop({default: ''}) logo!: string
  @Prop({default: ''}) alt!: string
}
</script>

<style scoped>

</style>
