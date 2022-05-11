import { ActionTree, GetterTree, MutationTree } from 'vuex/types';
import { firestoreAction } from 'vuexfire';
import { RootState } from '~/store/index';
import { UserMenuItemModel } from '~/components/Header/user-menu.vue';
import { SidebarItemModel } from '~/components/Sidebars/sidebar.types';
import {CONFIG_COLLECTION} from "~/functions/src/constants";

export interface ConfigState {
  userMenu:  UserMenuItemModel[];
  sidebarMenu: SidebarItemModel[];
  activeMenu: string;
}

export const state = (): ConfigState => ({
  activeMenu: '',
  userMenu: [],
  sidebarMenu:[
    {
      label:'Timesheet',
      icon:'schedule_send',
      link:'/times'
    },
    {
      label: 'Settings',
      icon: 'settings',
      link: '/settings',
      isBottom: true
    }
  ],
});

export const getters: GetterTree<ConfigState, RootState> = {
  sidebarMenus: (state,) => state.sidebarMenu,
  userMenus: (state) =>state.userMenu ?? [],
  activeMenuLink: (state) => state.activeMenu,
};

export const mutations: MutationTree<ConfigState> = {
  SET_ACTIVE_MENU: (state, link: string) => (state.activeMenu = link),
};

export const actions: ActionTree<ConfigState, RootState> = {
  bindConfigDocuments: firestoreAction(async function ({ bindFirestoreRef, rootState, dispatch, rootGetters }) {
    if (process.server) return;
    // @ts-ignore
    if (!this.$fire.auth.currentUser) return;
    // @ts-ignore
    const db = this.$fire.firestore;



    const sidebarMenusRef = db.collection(CONFIG_COLLECTION).doc('sidebarMenu');
    const userMenusRef = db.collection(CONFIG_COLLECTION).doc('userMenu');

    await bindFirestoreRef('sidebarMenu', sidebarMenusRef);
    await bindFirestoreRef('userMenu', userMenusRef);
  }),
  unbindConfig: firestoreAction(async ({ unbindFirestoreRef }) => {
    await unbindFirestoreRef('sidebarMenu');
    await unbindFirestoreRef('userMenu');

  }),
  setActiveMenu({ commit }, link: string) {
    commit('SET_ACTIVE_MENU', link);
  },
};
