<template>
  <div>
    <nuxt-link
      :class="{
        'text-sidebar-item-active bg-sidebar-item-active': active,
        'hover:bg-gray-50 hover:text-gray-800': !active,
        [`text-${color}`]: !!color && !active,
        'text-sidebar-item': !color && !active,
        'hidden md:block': hideOnMobile,
        'md:hidden': hideOnDesktop,
      }"
      :to="link"
      class="group rounded-lg p-2 m-2 flex items-center justify-between text-base font-medium"
    >
      <div class="flex flex-row">
        <i v-if="icon" class="material-icons mr-4 flex-shrink-0 h-6 w-6">{{
          icon
        }}</i>
        <span>{{ label }}</span>
      </div>
      <span
        v-if="count !== null"
        :class="{
          'bg-brand-primary text-brand-contrast': active,
          'bg-gray-100 text-tertiary': !active,
        }"
        class="px-2 text-sm rounded-full"
        >{{ countValue }}</span
      >
    </nuxt-link>
    <nav v-show="active || subActive" class="ml-12">
      <sidebar-item v-for="item of subItems" :key="item.link" v-bind="item" />
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { SidebarItemModel } from '~/components/Sidebars/sidebar.types';

@Component({
  components: {
    SidebarItem: () => import('./sidebar-item.vue'),
  },
})
export default class SidebarItem extends Vue {
  @Prop({ default: '' }) label!: string;
  @Prop({ default: '' }) icon!: string;
  @Prop({ default: false }) active!: boolean;
  @Prop({ default: false }) subActive!: boolean;
  @Prop({ default: '#' }) link!: string;
  @Prop({ default: '' }) color!: string;
  @Prop({ default: false }) hideOnMobile!: boolean;
  @Prop({ default: false }) hideOnDesktop!: boolean;
  @Prop({ default: null }) count!: string | null;
  @Prop({ default: () => [] }) subItems!: SidebarItemModel[];

  get countValue() {
    if (this.count) {
      return this.$store.getters[this.count];
    }
    return 0;
  }
}
</script>

<style scoped></style>
