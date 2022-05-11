import { ActionTree, GetterTree, MutationTree } from 'vuex/types';
import { RootState } from '~/store/index';
import {Activity, Entry} from "~/functions/src/timeular/timeular.models";



export interface TimeularState {
  activities: Activity[];
  entries: Entry[];
}

export const state = (): TimeularState => ({
  activities: [],
  entries: []
});

export const getters: GetterTree<TimeularState, RootState> = {
  activities: (state) => state.activities,
  activitiesMap: (state) => state.activities.reduce((obj: Record<string,Activity>, activity) => {
    obj[activity.id] = activity;
    return obj;
  },{}),
  entries: (state) => state.entries
};

export const mutations: MutationTree<TimeularState> = {
  setActivities(state, activities: Activity[]) {
    state.activities = activities;
  },
  setEntries(state, entries: Entry[]) {
    state.entries = entries;
  }
};

export const actions: ActionTree<TimeularState, RootState> = {
  loadActivities({ commit }) {
    this.$fire.functions.httpsCallable('timeular-getActivities')().then(response => {
      console.log(response)
      commit('setActivities', response.data.activities);
    })
  },
  getEntries({ commit }, {startDate, endDate}: {startDate: Date, endDate: Date}) {
    this.$fire.functions.httpsCallable('timeular-getEntries')({startDate, endDate})
      .then(response => {
        console.log(response)
        commit('setEntries', response.data.timeEntries);
      })
  }
};
