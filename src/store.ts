import { createStore } from 'vuex';
import { File } from './file';

type FilesState = { [name: string]: File };

export interface State {
  files: FilesState;
}

function loadFilesFromLocalStorage(): FilesState {
  const files: FilesState = {};
  for (const file of Object.keys(localStorage)) {
    const fileContents = localStorage.getItem(file);
    if (fileContents !== null) {
      files[file] = { name: file, contents: fileContents };
    }
  }

  return files;
}

const store = createStore({
  state() {
    return {
      files: loadFilesFromLocalStorage(),
    } as State;
  },
  getters: {
    fileNames(state: State) {
      return Object.keys(state.files); 
    },
    // Why is type narrowing not working?
    nextUntitled(_: State, getters: any) {
      const regex = /Untitled(\d+)?/;
      const untitledIndices: number[] = getters.fileNames
        .map((file: string) => file.match(regex))
        .filter((matches: RegExpMatchArray | null) => matches)
        .map((matches: RegExpMatchArray | null) => matches as RegExpMatchArray)
        .map((matches: RegExpMatchArray) => matches as string[])
        .map((matches: string[]) => matches[1])
        .filter((matchedNumber: string) => matchedNumber)
        .map((matchedNumber: string) => +matchedNumber);
      untitledIndices.sort();

      if (untitledIndices.length === 0) {
        return "Untitled1";
      } else {
        return `Untitled${untitledIndices[untitledIndices.length - 1] + 1}`;
      }
    },
    fileExists(_: State, getters: any) {
      return (fileName: string) => getters.fileNames.includes(fileName);
    },
    contents(state: State) {
      return (fileName: string) =>  state.files[fileName]?.contents;
    },
  },

  mutations: {
    saveFile(state: State, payload: File ) {
      state.files[payload.name] = payload; 
    }
  },
  actions: {
    saveFile(context: any, payload: File) {
      context.commit("saveFile", payload)
      localStorage.setItem(payload.name, payload.contents);
    }
  }
});

export default store;
