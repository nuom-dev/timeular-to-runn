<template>
  <div class="fixed top-2 right-8 z-10">
    <div
      v-show="show"
      aria-labelledby="user-menu-button"
      aria-orientation="vertical"
      class="md:origin-top-left absolute mt-2 md:w-96 w-80 focus:outline-none -right-4"
      role="menu"
      tabindex="-1"
    >
      <Notification
        v-for="(notification, index) of notificationList"
        v-show="!notification.read"
        :key="notification.title + '_' + index"
        v-bind="notification"
        @action="action(index)"
        @click="setNotificationSeen(index)"
        @close="setNotificationSeen(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator';
import Notification from './Notification.vue';
import { NotificationModel } from '~/store/notifications';

@Component({
  components: { Notification },
})
export default class NotificationMenu extends Vue {
  @Getter('notifications/notificationList')
  notificationList!: NotificationModel[];

  @Getter('notifications/showNotifications') show!: boolean;
  @Action('notifications/setNotificationSeen') setNotificationSeen!: (
    index: number
  ) => void;

  @Action('notifications/runNotificationAction') runNotificationAction!: (
    index: number
  ) => void;

  @Action('notifications/toggle') toggleNotificationList!: () => void;

  action(index: number) {
    this.runNotificationAction(index);
  }
}
</script>

<style scoped></style>
