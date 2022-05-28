<template>
  <div
    :class="{
      'lg:hidden': !showOnDesktop,
    }"
    class="relative z-40 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex justify-end pr-6"
  >
    <div class="w-32 absolute left-4 top-4 lg:hidden">
      <nuxt-link :to="linkTo">
        <img :src="logoUrl" />
      </nuxt-link>
    </div>
    <div class="ml-4 flex items-center lg:ml-6">
      <!--      <user-menu :menus="menus" :user-name="user && user.firstName + ' ' + user.lastName" />-->

      <button
        class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
        @click="$emit('toggle')"
      >
        <span class="sr-only">Open sidebar</span>
        <i class="material-icons">menu</i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Getter, Prop, Vue } from 'nuxt-property-decorator';
import UserMenu, { UserMenuItemModel } from '~/components/Header/user-menu.vue';
import { AuthUser } from '~/store/auth';

@Component({
  components: { UserMenu },
})
export default class HeaderBar extends Vue {
  // @Prop({ default: '' }) menus!: { link: string; label: string }[];
  @Getter('config/userMenus') menus!: UserMenuItemModel[];
  @Prop({ default: true }) showOnDesktop!: boolean;
  @Getter('auth/user') user?: AuthUser;
  @Getter('logoUrl') logoUrl!: string;

  get linkTo() {
    return '/times';
  }
}
</script>

<style scoped></style>
