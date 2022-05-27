import { ActionTree, GetterTree, MutationTree } from 'vuex/types';
import {firestoreAction} from "vuexfire";
import { RootState } from '~/store/index';
import {USERS_COLLECTION} from "~/functions/src/constants";
import {User } from '~/functions/src/users/user.model';



export interface UserState {
  user: User | null;
}

export const state = (): UserState => ({
  user:  null,
});

export const getters: GetterTree<UserState, RootState> = {
  timeular: (state)=> state.user?.timeular || null,
  user: (state)=> state.user || null,
  projectsMapping: (state)=> state.user?.projectsMapping || {},
};

export const mutations: MutationTree<UserState> = {
  CLEAR_USER: (state) => (state.user = null),
};

export const actions: ActionTree<UserState, RootState> = {
  bindUser: firestoreAction(async function ({ bindFirestoreRef, rootState, dispatch, rootGetters }) {
    if (process.server) return;

    // @ts-ignore
    console.log({user: this.$fire.auth.currentUser})

    // @ts-ignore
    if (!this.$fire.auth.currentUser) return;
    // @ts-ignore
    const db = this.$fire.firestore;

    // @ts-ignore
    const currentUser = this.$fire.auth.currentUser;
    const userRef = db.collection(USERS_COLLECTION).doc(currentUser.uid);

    await bindFirestoreRef('user', userRef);
  }),
  unbindUser: firestoreAction(async ({ unbindFirestoreRef, commit }) => {
    await unbindFirestoreRef('user');
    commit('CLEAR_USER');
  }),
  async updateUser({rootGetters}, data: Partial<User>) {
    const uid = rootGetters['auth/user'].uid;
    if(!uid) return;
    const response = await this.$fire.firestore.collection(USERS_COLLECTION).doc(uid).update(data);
    console.log({userUpdateResponse: response})
  },
  updateTimeularSettings(_context, settings: {apiKey?: string, apiSecret?: string}) {
    if (!this.$fire.auth.currentUser) return;
    const db = this.$fire.firestore;
    const currentUser = this.$fire.auth.currentUser;
    const userRef = db.collection(USERS_COLLECTION).doc(currentUser.uid);

    return userRef.update({
        timeular: settings
      })
  },
  updateProjectsMapping({state}, {activityId, projectId}: {activityId: string, projectId: string}) {
    if (!this.$fire.auth.currentUser) return;
    if(!activityId || !projectId) return;

    const db = this.$fire.firestore;
    const currentUser = this.$fire.auth.currentUser;
    const userRef = db.collection(USERS_COLLECTION).doc(currentUser.uid);

    const currentMapping = state.user?.projectsMapping || {};

    return userRef.update({
      projectsMapping: {
        ...currentMapping,
        [activityId]: projectId
      }
    })
  }
};
