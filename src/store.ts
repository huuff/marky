import { createStore } from 'vuex';

// TODO: Manage to get tis typed

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
    nextUntitled(_: any, getters: any) {
      const regex = /Untitled(\d+)?/;
      const untitledIndices: number[] = getters.files
        .map((file: string) => file.match(regex))
        .filter((matches: string[]) => matches)
        .map((matches: string[]) => matches[1])
        .filter((matchedNumber: string) => matchedNumber)
        .map((matchedNumber: string) => +matchedNumber)
        ;
      untitledIndices.sort();

      if (untitledIndices.length === 0) {
        return "Untitled";
      } else {
        return `Untitled${untitledIndices[untitledIndices.length - 1] + 1}`;
      }
    },
    fileExists(_:any, getters: any) {
      return (filename: string) => getters.files.includes(filename);
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
