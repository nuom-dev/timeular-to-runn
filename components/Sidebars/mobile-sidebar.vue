<template>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div
    v-show="show"
    aria-modal="true"
    class="pt-16 absolute h-full w-full self-stretch z-40 justify-end flex lg:hidden"
    role="dialog"
  >
    <div class="flex-shrink-0 w-14">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
    <!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div aria-hidden="true" class="absolute mt-16 inset-0 bg-gray-600 bg-opacity-75"></div>

    <!--
      Off-canvas menu, show/hide based on off-canvas menu state.

      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    -->
    <div class="relative max-w-xs w-full bg-sidebar pt-5 pb-4 flex flex-col">
      <!--
        Close button, show/hide based on off-canvas menu state.

        Entering: "ease-in-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="absolute top-0 left-0 -ml-16 pt-2">
        <button
          class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          @click="$emit('close')"
        >
          <span class="sr-only">Close sidebar</span>
          <!-- Heroicon name: outline/x -->
          <svg
            aria-hidden="true"
            class="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>

      <div class="flex-grow flex flex-col justify-between">
        <nav class="px-2 ">
          <sidebar-item
            v-for="item of topItems"
            :key="item.link"
            v-bind="item"
            @click.native="$emit('close')"
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
</template>

<script lang="ts">
import {Component, Getter, Prop, Vue} from "nuxt-property-decorator";
import SidebarLogo from "~/components/Sidebars/sidebar-logo.vue";
import SidebarItem from "~/components/Sidebars/sidebar-item.vue";
import {SidebarItemModel} from "~/components/Sidebars/sidebar.types";

@Component({
  components: {SidebarItem, SidebarLogo},
})
export default class MobileSidebar extends Vue {
  @Prop({default: () => ({src: '', alt: 'Logo'})}) logo!: { src: string; alt: string };
  @Prop({default: false}) show!: boolean;
  @Getter('config/sidebarMenus') items!: SidebarItemModel[];
  @Getter('config/activeMenuLink') activeMenuLink!: string;

  get bottomItems() {
    return this.items.filter(i => i.isBottom)
      .map(i => ({...i, active: i.link === this.activeMenuLink}))
      .sort((a, b) => {
        if (!a.order && !b.order) return 0
        else if (!a.order && b.order) return 1
        else if (a.order && !b.order) return -1
        else if (a.order && b.order) return a.order - b.order
        else return 0
      })
  }

  get topItems() {
    return this.items.filter(i => !i.isBottom)
      .map(i => ({...i, active: i.link === this.activeMenuLink}))
      .sort((a, b) => {
        if (!a.order && !b.order) return 0
        else if (!a.order && b.order) return 1
        else if (a.order && !b.order) return -1
        else if (a.order && b.order) return a.order - b.order
        else return 0
      })
  }
}
</script>

<style scoped></style>
