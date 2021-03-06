<template>
  <div
    class="relative bg-white rounded-lg drop-shadow-lg filter md:w-96 w-full px-4 py-4 my-2 flex flex-row justify-start items-center"
  >
    <div
      v-if="!autoClose"
      class="absolute right-2 top-2"
      @click="$emit('click')"
    >
      <i class="cursor-pointer material-icons">close</i>
    </div>
    <div :class="iconClasses" class="w-8 text-center mx-3">
      <i class="material-icons">{{ iconName }}</i>
    </div>
    <div>
      <h1 class="text-black font-semibold text-sm mb-2">{{ title }}</h1>
      <p class="text-gray-500 font-normal text-xs">{{ message }}</p>
      <div v-if="action">
        <label class="text-gray-500 font-normal text-xs">Action</label>
        <button
          id="actionButton"
          class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          @click="$emit(action)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Prop } from 'vue-property-decorator';
import { NotificationType } from '~/store/notifications';

@Component
export default class Notification extends Vue {
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '' }) message!: string;
  @Prop({ default: '' }) type!: NotificationType;
  @Prop({ default: '' }) icon!: string;
  @Prop({ default: '' }) iconColors!: string;
  @Prop({ default: false }) autoClose!: boolean;
  @Prop({ default: '' }) action?: string;

  get iconName() {
    switch (this.type) {
      case 'info':
        return 'info';
      case 'error':
        return 'error';
      case 'success':
        return 'task_alt';
      default:
        return this.icon;
    }
  }

  get iconClasses() {
    switch (this.type) {
      case 'info':
        return 'text-brand-primary';
      case 'error':
        return 'text-red-600';
      case 'success':
        return 'text-green-500';
      default:
        return this.iconColors;
    }
  }

  mounted() {
    if (this.autoClose) {
      let time = 5000;
      if (typeof this.autoClose === 'number') {
        time = this.autoClose * 1000;
      }
      setTimeout(() => {
        this.$emit('close');
      }, time);
    }
  }
}
</script>

<style scoped></style>
