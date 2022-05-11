import { ActionTree, GetterTree, MutationTree } from 'vuex/types';
import { RootState } from '~/store/index';

export type NotificationType = 'info' | 'success' | 'error';

export interface NotificationModel {
  title: string;
  message: string;
  type?: NotificationType;
  read?: boolean;
  action?: string;
  index?: number;
  event?: string;
  autoClose?: boolean | number;
  icon?: string;
  iconColors?: string;
}

export interface NotificationsState {
  notifications: NotificationModel[];
  show: boolean;
}

export const state = (): NotificationsState => ({
  notifications: [],
  show: true,
});

export const getters: GetterTree<NotificationsState, RootState> = {
  latestNotification: (state) => state.notifications[state.notifications.length - 1],
  showNotifications: (state) => state.show,
  notificationList: (state) => state.notifications.map((n) => ({ ...n, func: undefined })),
};

export const mutations: MutationTree<NotificationsState> = {
  ADD_NOTIFICATION: (state, notification: NotificationModel) => state.notifications.push({ ...notification }),
  SET_NOTIFICATION_SEEN: (state, index: number) => {
    const notifications = [...state.notifications];
    notifications[index] = { ...notifications[index], read: true };
    state.notifications = notifications;
  },
  CLEAR_DATA: (state) => {
    state.notifications = [];
  },
};

export const actions: ActionTree<NotificationsState, RootState> = {
  addNotification({ commit }, notification: NotificationModel) {
    commit('ADD_NOTIFICATION', notification);
  },
  async showError({ dispatch }, { title, error }: { title: string; error: any }) {
    const message = error.response?.data?.message || error.response?.message || error.message;
    const notification: NotificationModel = {
      title,
      message,
      type: 'error',
    };
    await dispatch('addNotification', notification);
  },
  setNotificationSeen({ commit }, notificationIndex: number) {
    commit('SET_NOTIFICATION_SEEN', notificationIndex);
  },
};
