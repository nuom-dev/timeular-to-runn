import { ActionTree, GetterTree, MutationTree } from 'vuex/types';
import { vuexfireMutations } from 'vuexfire';
import { AuthState } from '~/store/auth';
import { UserState } from '~/store/user';

export interface RootState {
  auth: AuthState;
  user: UserState;
  startDate: Date;
  endDate: Date;
  loading: string;
  platformLogos: {
    default: string;
    small?: string;
    altText: string;
  };
}

export const state = () => ({
  startDate: new Date(),
  endDate: new Date(),
  loading: '',
  platformLogos: {
    default:
      'https://assets-global.website-files.com/60893c95d5c9871201e719d5/60894c461d15a242648ac3ab_logo-black.svg',
    small:
      'https://assets-global.website-files.com/60893c95d5c9871201e719d5/60894c461d15a242648ac3ab_logo-black.svg',
    altText: 'Consciously Logo',
  },
});

export const getters: GetterTree<RootState, RootState> = {
  startDate: (state) => state.startDate,
  endDate: (state) => state.endDate,
  isLoading: (state) => state.loading,
  logoUrl: (state) => state.platformLogos.default,
  logoSmall: (state) => state.platformLogos.small,
  altText: (state) => state.platformLogos.altText,
};

export const mutations: MutationTree<RootState> = {
  ...vuexfireMutations,
  setStartDate: (state, date: Date) => (state.startDate = date),
  setEndDate: (state, date: Date) => (state.endDate = date),
  SET_LOADING: (state, loading: string) => (state.loading = loading),
};

export const actions: ActionTree<RootState, RootState> = {
  startLoading({ commit }, _loading?: string) {
    let loading = _loading;
    if (!loading) loading = ' ';
    commit('SET_LOADING', loading);
  },
  endLoading({ commit }) {
    commit('SET_LOADING', '');
  },
};
