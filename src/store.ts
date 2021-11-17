import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      files: [],
    };
  },
  getters: {
    files(state: any) {
      return state.files; 
    },
  },

  mutations: {
    addFile(state: any, file: string) {
      state.files.push(file); 
    }
  },
  actions: {
    addFile(context: any, file: string) {
      context.commit("addFile", file)
    }
  }
});

export default store;
