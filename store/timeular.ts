import { ActionTree, GetterTree, MutationTree } from 'vuex/types';
import { RootState } from '~/store/index';
import { Activity, Entry } from '~/functions/src/timeular/timeular.models';
import { USERS_COLLECTION } from '~/functions/src/constants';

export interface TimeularState {
  activities: Activity[];
  entries: Entry[];
}

export const state = (): TimeularState => ({
  activities: [],
  entries: [],
});

export const getters: GetterTree<TimeularState, RootState> = {
  activities: (state) => state.activities,
  activitiesMap: (state) =>
    state.activities.reduce((obj: Record<string, Activity>, activity) => {
      obj[activity.id] = activity;
      return obj;
    }, {}),
  entries: (state) => state.entries,
};

export const mutations: MutationTree<TimeularState> = {
  setActivities(state, activities: Activity[]) {
    state.activities = activities;
  },
  setEntries(state, entries: Entry[]) {
    state.entries = entries;
  },
  setEntrySaved(state, entryId: string) {
    const entries = [...state.entries];
    const index = entries.findIndex((e) => e.id === entryId);
    if (index !== -1) {
      entries[index].saved = true;
    }
    state.entries = entries;
  },
};

export const actions: ActionTree<TimeularState, RootState> = {
  loadActivities({ commit }) {
    this.$fire.functions
      .httpsCallable('timeular-getActivities')()
      .then((response) => {
        commit('setActivities', response.data.activities);
      });
  },
  getEntries(
    { commit, dispatch },
    { startDate, endDate }: { startDate: Date; endDate: Date }
  ) {
    dispatch('startLoading', 'Saving Entry', { root: true });
    this.$fire.functions
      .httpsCallable('timeular-getEntries')({ startDate, endDate })
      .then(async (response) => {
        console.log(response);
        commit('setEntries', response.data.timeEntries);

        const entries: Entry[] = response.data.timeEntries;
        const entriesIds = entries.map((a) => a.id);
        await dispatch('isEntryAlreadySaved', entriesIds);
        dispatch('endLoading', '', { root: true });
        dispatch(
          'notifications/addNotification',
          { message: '', type: 'success', title: 'Entries loaded' },
          { root: true }
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch('endLoading', '', { root: true });
        dispatch(
          'notifications/showError',
          { error: error.message, title: "Couldn't get the entries" },
          { root: true }
        );
      });
  },
  async isEntryAlreadySaved({ rootGetters, commit, dispatch }, ids: string[]) {
    const uid = rootGetters['auth/user'].uid;
    if (!uid) return false;

    const promises = ids.map((id) =>
      this.$fire.firestore
        .collection(USERS_COLLECTION)
        .doc(uid)
        .collection('savedEntries')
        .doc(id)
        .get()
    );

    // const entrySnap = await this.$fire.firestore.collection(USERS_COLLECTION).doc(uid).collection('savedEntries').doc(entryId).get();

    const snaps = await Promise.all(promises);

    for (const snap of snaps) {
      if (snap.exists) {
        commit('setEntrySaved', snap.id);
      }
    }
    dispatch('endLoading', '', { root: true });
  },
};
