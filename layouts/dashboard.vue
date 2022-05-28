<template>
  <div
    :style="cssVars"
    class="h-screen bg-primary overflow-hidden flex font-primary"
  >
    <notification-menu />
    <Sidebar :logo="logo" />
    <mobile-sidebar
      :logo="logo"
      :show="showSidebar"
      @close="showSidebar = false"
    />
    <div class="relative flex-grow flex flex-col h-screen">
      <header-bar
        :show-on-desktop="false"
        @toggle="showSidebar = !showSidebar"
      />
      <div class="relative flex-grow h-full overflow-y-auto">
        <main class="h-full relative focus:outline-none">
          <Nuxt />
        </main>
      </div>
      <footer
        class="w-full mt-auto text-xs text-gray-400 flex flex-col items-center justify-center text-center"
      >
        <span class="flex items-center mb-1">
          <mdicon name="copyright" size="12" />{{ currentYear }}
          {{ platformName }}
          <mdicon name="trademark" size="12" />
        </span>
        <span>{{ trademark }}</span>
      </footer>
    </div>
    <LoadingOverlay :loading-message="isLoading" />
  </div>
</template>

<script lang="ts">
import firebase from 'firebase/compat/app';
import { Action, Component, Getter, Vue, Watch } from 'nuxt-property-decorator';
import { AuthUser } from '~/store/auth';
import Sidebar from '~/components/Sidebars/sidebar.vue';
import MobileSidebar from '~/components/Sidebars/mobile-sidebar.vue';
import HeaderBar from '~/components/Header/header-bar.vue';
import LoadingOverlay from '~/components/Modals/LoadingOverlay.vue';
import NotificationMenu from '~/components/Notifications/notification-menu.vue';

@Component({
  components: {
    Sidebar,
    MobileSidebar,
    HeaderBar,
    LoadingOverlay,
    NotificationMenu,
  },
})
export default class DashboardLayout extends Vue {
  @Getter('auth/user') user!: null | AuthUser;
  @Getter('isLoading') isLoading!: string;
  @Getter('logoUrl') logoUrl!: string;
  @Getter('altText') altText!: string;
  @Getter('config/platformName') platformName!: string;
  @Getter('config/trademark') trademark!: string;
  @Action('config/bindConfigDocuments')
  bindConfigDocuments!: () => Promise<void>;

  @Action('config/setActiveMenu') setActiveMenu!: (link: string) => void;
  @Action('admin/bindCompany') bindCompany!: () => void;
  @Action('admin/unbindCompany') unbindCompany!: () => void;

  unsubscribe?: firebase.Unsubscribe;
  showSidebar = false;
  currentYear: number = new Date().getFullYear();
  color = '';

  get logo() {
    return { src: this.logoUrl, alt: this.altText };
  }

  get cssVars() {
    return {
      '--anotherColor': this.color,
    };
  }

  changeColor() {
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  @Watch('user', { immediate: true })
  onUserChange() {
    if (!this.user) {
      this.$router.push('/');
      return;
    }

    this.$router.push('/times');
  }

  async created() {
    // await this.bindConfigDocuments()
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('auth/userLoggedIn');
      } else {
        this.$store.dispatch('auth/userLoggedOut');
      }
    });
  }

  @Watch('$route.path', { immediate: true })
  onPageChange() {
    this.setActiveMenu(this.$route.path);
    // set item active
    // this.items = this.items.map(i => ({
    //   ...i,
    //   active: this.$route.path === i.link || this.$route.path === i.link + '/',
    // }));
  }

  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.$store.dispatch('config/unbindConfig');
    this.unbindCompany();
  }
}
</script>

<style scoped></style>
