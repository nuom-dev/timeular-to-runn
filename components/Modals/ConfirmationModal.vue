<template>
  <div
    aria-hidden="true"
    class="flex bg-warm-gray-300 bg-opacity-75 transition-opacity overflow-y-auto overflow-x-hidden fixed inset-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 text-center"
  >
    <div
      :class="{ 'sm:max-w-4xl': wide, 'sm: max-w-xl': !wide }"
      class="relative px-4 w-full h-full md:h-auto"
    >
      <!-- Modal content -->
      <dialog
        :class="{ 'sm:max-w-4xl': wide, 'sm: max-w-xl': !wide }"
        class="relative px-4 pt-5 pb-4 bg-white rounded-lg shadow dark:bg-gray-700 md:my-8 md:align-middle w-full md:p-6 flex flex-col items-center"
      >
        <div
          class="my-8 text-brand-primary-dark bg-brand-primary-light rounded-full p-2 w-10 h-10"
        >
          <i v-if="iconName" class="material-icons">
            {{ iconName }}
          </i>
        </div>
        <h1 class="text-xl text-primary font-secondary mb-6">{{ title }}</h1>

        <p class="text-sm text-secondary font-primary" v-html="description" />

        <div class="my-10 flex flex-row justify-around w-full">
          <button
            class="py-2 px-4 bg-white border border-brand-primary rounded-full text-brand-primary"
            @click="$emit('cancel')"
          >
            {{ cancelLabel }}
          </button>
          <button
            class="py-2 px-4 bg-brand-primary border border-brand-primary rounded-full text-white"
            @click="$emit('confirm')"
          >
            {{ validateLabel }}
          </button>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script lang="ts">
import ClickOutside from 'vue-click-outside';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  directives: { ClickOutside },
})
export default class ConfirmationModal extends Vue {
  @Prop({ default: '' }) iconName!: string;
  @Prop({ default: false }) wide!: boolean;
  @Prop({ default: '', required: true }) title!: string;
  @Prop({ default: '' }) description!: string;
  @Prop({ default: 'Ok' }) validateLabel!: string;
  @Prop({ default: 'Cancel' }) cancelLabel!: string;
}
</script>

<style scoped></style>
