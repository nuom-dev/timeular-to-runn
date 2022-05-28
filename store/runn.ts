import { ActionTree, GetterTree, MutationTree } from 'vuex/types';
import dayjs from 'dayjs';
import { RootState } from '~/store/index';
import { Project, Role } from '~/functions/src/runn/runn.models';
import { Activity, Entry } from '~/functions/src/timeular/timeular.models';

export interface TimeularState {
  projects: Project[];
  roles: Role[];
}

export const state = (): TimeularState => ({
  projects: [],
  roles: [],
});

export const getters: GetterTree<TimeularState, RootState> = {
  projects: (state) => state.projects,
  roles: (state) => state.roles,
  projectsMap: (state) =>
    state.projects.reduce((obj: Record<string, Project>, project) => {
      obj[project.id] = project;
      return obj;
    }, {}),
};

export const mutations: MutationTree<TimeularState> = {
  setProjects(state, projects: Project[]) {
    state.projects = projects;
  },
  setRoles(state, roles: Role[]) {
    state.roles = roles;
  },
};

export const actions: ActionTree<TimeularState, RootState> = {
  loadProjects({ commit }) {
    this.$fire.functions
      .httpsCallable('runn-getProjects')()
      .then((response: { data: Project[] }) => {
        console.log(response);
        commit(
          'setProjects',
          response.data.sort((a, b) =>
            a.client_name.localeCompare(b.client_name)
          )
        );
      });
  },
  loadRoles({ commit }) {
    this.$fire.functions
      .httpsCallable('runn-getRoles')()
      .then((response: { data: Role[] }) => {
        console.log(response);
        commit('setRoles', response.data);
      });
  },
  async saveEntry(
    { rootState, dispatch },
    entry: Entry & {
      timeularActivity: Activity;
      runnProject: Project | null;
    }
  ) {
    const addEntryFunction =
      this.$fire.functions.httpsCallable('runn-addEntry');

    const start = dayjs(entry.duration.startedAt);
    const end = dayjs(entry.duration.stoppedAt);
    const minutes = end.diff(start, 'minutes');

    try {
      dispatch('startLoading', 'Saving Entry', { root: true });
      const response = await addEntryFunction({
        entryId: entry.id,
        minutes,
        date: start.toDate().toISOString(),
        projectId: entry.runnProject?.id,
        runnId: rootState.user.user?.runn?.personId ?? '',
        roleId: rootState.user.user?.runn?.roleId ?? '',
      });
      console.log({ response });

      await dispatch('timeular/isEntryAlreadySaved', [entry.id], {
        root: true,
      });
      dispatch('endLoading', '', { root: true });
      dispatch(
        'notifications/addNotification',
        {
          message: entry.timeularActivity.name + ' Saved',
          type: 'success',
          title: 'Entry' + ' saved',
          autoClose: 0.7,
        },
        { root: true }
      );
    } catch (e) {
      console.error(e);
      dispatch('endLoading', '', { root: true });
      dispatch(
        'notifications/addNotification',
        {
          message: e.message,
          type: 'error',
          title: "Couldn't save this" + ' entry',
          autoClose: 0.7,
        },
        { root: true }
      );
    }
  },
  async updatePersonId({ rootGetters }) {
    const email = rootGetters['user/user']?.email;
    if (!email) return;
    const setPersonIdFunction =
      this.$fire.functions.httpsCallable('runn-setPersonId');
    await setPersonIdFunction({ email });
  },
};
