<template>
  <div
    v-if="loadingMessage"
    class="absolute bg-white bg-opacity-80 inset-0 z-50 flex items-center flex-col"
  >
    <div class="my-auto">
      <LoadingSpinner class="text-brand-primary mb-6 h-24 w-24" />
      <p class="text-secondary w-full text-center font-bold text-lg">
        {{ loadingMessage }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Prop } from 'vue-property-decorator';
import LoadingSpinner from '~/components/Icons/LoadingSpinner.vue';

@Component({
  components: { LoadingSpinner },
})
export default class LoadingOverlay extends Vue {
  @Prop({ default: '' }) loadingMessage!: string;
}
</script>

<style scoped></style>
