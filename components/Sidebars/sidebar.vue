<template>
  <div class="hidden lg:flex lg:flex-shrink-0 bg-sidebar">
    <div class="w-64 flex flex-col">
      <div class="border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow">
        <sidebar-logo :alt="logo.alt" :logo="logo.src" />
        <div class="flex-grow mt-5 flex flex-col justify-between">
          <nav class="px-2 relative">
            <sidebar-item
              v-for="item of topItems"
              :key="item.link"
              v-bind="item"
            />
          </nav>
          <nav class="px-2">
            <sidebar-item
              v-for="item of bottomItems"
              :key="item.link"
              v-bind="item"
            />
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Getter, Prop, Vue } from 'nuxt-property-decorator';
import SidebarItem from '~/components/Sidebars/sidebar-item.vue';
import SidebarLogo from '~/components/Sidebars/sidebar-logo.vue';
import { SidebarItemModel } from '~/components/Sidebars/sidebar.types';

@Component({
  components: { SidebarItem, SidebarLogo },
})
export default class Sidebar extends Vue {
  // @Prop({ default: () => [] }) items!: SidebarItemModel[];
  @Prop({ default: () => ({ src: '', alt: 'Logo' }) }) logo!: {
    src: string;
    alt: string;
  };

  @Getter('config/sidebarMenus') items!: SidebarItemModel[];
  @Getter('config/activeMenuLink') activeMenuLink!: string;

  get bottomItems() {
    return this.items
      .filter((i) => i.isBottom)
      .map(this.itemMap)
      .sort(this.itemSort);
  }

  get topItems() {
    return this.items
      .filter((i) => !i.isBottom)
      .map(this.itemMap)
      .sort(this.itemSort);
  }

  itemMap(item: SidebarItemModel): SidebarItemModel {
    return {
      ...item,
      active: item.link === this.activeMenuLink,
      subActive: this.activeMenuLink.startsWith(item.link),
      ...(item.subItems && {
        subItems: item.subItems.map(this.itemMap).sort(this.itemSort),
      }),
    };
  }

  itemSort(a: SidebarItemModel, b: SidebarItemModel) {
    if (!a.order && !b.order) return 0;
    else if (!a.order && b.order) return 1;
    else if (a.order && !b.order) return -1;
    else if (a.order && b.order) return a.order - b.order;
    else return 0;
  }
}
</script>

<style scoped></style>
