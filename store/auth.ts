import { ActionTree, GetterTree, MutationTree } from 'vuex/types';
import { RootState } from '~/store/index';

export type AuthUser = {
  uid: string;
  email: string;
};

export interface AuthState {
  user: AuthUser | null;
}

export const state = (): AuthState => ({
  user: null,
});

export const getters: GetterTree<AuthState, RootState> = {
  user: (state) => state.user,
};

export const mutations: MutationTree<AuthState> = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser }) => {
    if (!authUser) {
      state.user = null;
      return;
    }
    const { uid, email } = authUser;
    state.user = { uid, email };
  },
  SET_USER: (state, authUser) => {
    state.user = authUser;
  },
  CLEAR_USER: (state) => (state.user = null),
};

export const actions: ActionTree<AuthState, RootState> = {
  onAuthStateChangedAction: ({ commit, dispatch }, data) => {
    const { authUser } = data;
    if (authUser) {
      commit('SET_USER', {
        uid: authUser.uid,
        email: authUser.email,
      });
      dispatch('user/bindUser', null, { root: true });
    } else {
      commit('CLEAR_USER');
    }
  },
  async userLoggedIn({ commit, dispatch }) {
    const user = await this.$fire.auth.currentUser;
    if (!user) {
      await this.$fire.auth.signOut();
      return;
    }

    commit('SET_USER', {
      uid: user.uid,
      email: user.email,
    });

    dispatch('user/bindUser', null, { root: true });
  },
  userLoggedOut: async ({ commit, dispatch }) => {
    await dispatch('user/unbindUser', null, { root: true });

    commit('CLEAR_USER');
  },
};
