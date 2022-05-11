import { ActionTree, GetterTree, MutationTree } from 'vuex/types';
import { RootState } from '~/store/index';
import {Project} from "~/functions/src/runn/runn.models";


export interface TimeularState {
  projects: Project[];
}

export const state = (): TimeularState => ({
  projects: [],
});

export const getters: GetterTree<TimeularState, RootState> = {
  projects: (state) => state.projects,
  projectsMap: (state) => state.projects.reduce((obj: Record<string,Project>, project) => {
    obj[project.id] = project;
    return obj;
  },{}),
};

export const mutations: MutationTree<TimeularState> = {
  setProjects(state, projects: Project[]) {
    state.projects = projects;
  }
};

export const actions: ActionTree<TimeularState, RootState> = {
  loadProjects({ commit }) {
    this.$fire.functions.httpsCallable('runn-getProjects')().then((response: {data: Project[]}) => {
      console.log(response)
      commit('setProjects', response.data.sort((a, b) => a.client_name.localeCompare(b.client_name)));
    })
  }
};
