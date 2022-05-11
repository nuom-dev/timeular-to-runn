<template>
  <!-- Profile dropdown -->
  <div
    v-click-outside="
      () => {
        show = false;
      }
    "
    class="ml-3 relative p-1"
  >
    <button
      id="user-menu-button"
      :aria-expanded="show"
      aria-haspopup="true"
      class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      type="button"
      @click="show = !show"
    >
      <span class="sr-only">Open user menu</span>
      <img
        v-if="profilePicture"
        :src="profilePicture"
        alt="Profile"
        class="h-8 w-8 rounded-full "
      />
      <client-only>
        <mdicon class="text-gray-400" name="account-circle" />
      </client-only>
    </button>
    <div
      v-show="show"
      aria-labelledby="user-menu-button"
      aria-orientation="vertical"
      class="md:origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
      role="menu"
      tabindex="-1"
    >
      <!-- here -->
      <div class="text-md flex flex-col">
        <header class="border-b px-4 py-2">
          {{ userName }}
        </header>
        <nuxt-link
          v-for="menu of menus"
          :key="menu.link"
          :to="menu.link"
          class="px-4 py-2 text-primary hover:bg-gray-100"
          role="menuitem"
          tabindex="-1"
          @click.native="show = false"
        >
          {{ menu.label }}
        </nuxt-link>
        <footer class="text-primary border-t px-4 py-2 hover:bg-gray-100">
          <nuxt-link class="group rounded-lg flex items-center text-base font-medium" to="/logout">
            <mdicon class="flex-shrink-0 h-6 w-6 mr-2" name="logout-variant" />
            <span>Logout</span>
          </nuxt-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClickOutside from 'vue-click-outside'

export interface UserMenuItemModel {
  label: string;
  link: string;
}

@Component({
  // do not forget this section
  directives: {
    ClickOutside,
  },
})
export default class UserMenu extends Vue {
  @Prop({ default: '' }) userName!: string;
  @Prop({ default: '' }) profilePicture!: string;
  @Prop({ default: '' }) menus!: { link: string; label: string }[];

  show = false;
}
</script>

<style scoped></style>
