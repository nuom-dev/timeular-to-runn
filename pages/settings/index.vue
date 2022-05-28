<template></template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';

@Component
export default class SettingsPage extends Vue {
  asyncData({ redirect }: Context) {
    redirect('/settings/timeular');
  }
}
</script>

<style scoped></style>
