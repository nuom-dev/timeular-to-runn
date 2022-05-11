<template>
  <div
    aria-hidden="true"
    class="
      flex
      bg-gray-500 bg-opacity-75
      transition-opacity
      overflow-y-auto overflow-x-hidden
      fixed
      inset-0
      top-4
      z-50
      justify-center
      items-center
      h-modal
      md:h-full md:inset-0
      text-center
    "
  >
    <div :class="{ 'sm:max-w-4xl': wide, 'sm: max-w-xl': !wide }" class="relative px-4 w-full  h-full md:h-auto">

      <!-- Modal content -->
      <div
        v-click-outside="
          (evt) => {
            // log('clicked outside', evt);
            allowClickOutside && canBeClosed && $emit('close');
          }
        "
        :class="{ 'sm:max-w-4xl': wide, 'sm: max-w-xl': !wide }"
        class="
        relative
          px-4
          pt-5
          pb-4
          bg-white
          rounded-lg
          shadow
          dark:bg-gray-700
          md:my-8 md:align-middle
          w-full
          md:p-6
        "
      >
        <div v-if="!disableClose" class="absolute top-2.5 right-2.5 cursor-pointer" @click="$emit('close')">
          <mdicon name="close" size="24" />
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ClickOutside from "vue-click-outside";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  directives: { ClickOutside },
})
export default class Modal extends Vue {
  @Prop({ default: '' }) icon!: string;
  @Prop({ default: '' }) iconSvg?: string;
  @Prop({ default: false }) wide!: boolean;
  @Prop({ default: true }) allowClickOutside!: boolean;
  @Prop({ default: false }) disableClose!: boolean;

  canBeClosed = false;
  timer: any = null;

  get canClickOutside(): boolean {
    return this.disableClose ? false : this.allowClickOutside;
  }

  mounted() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.canBeClosed = this.disableClose ? false : true;
      this.timer = null;
    }, 1000);
  }

  log(...args: any[]) {
    console.log(...args);
  }
}
</script>

<style scoped></style>
