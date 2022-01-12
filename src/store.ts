import { defineStore } from "pinia";
import { File } from "./file";

type FilesState = { [name: string]: File };

export interface State {
  files: FilesState;
}

function loadFilesFromLocalStorage(): FilesState {
  const files: FilesState = {};
  for (const file of Object.keys(localStorage)) {
    const fileContents = localStorage.getItem(file);
    if (fileContents !== null && file !== 'loglevel:webpack-dev-server') {
      files[file] = { name: file, contents: fileContents };
    }
  }

  return files;
}

export const useStore = defineStore("main", {
  state: () => ({
    files: loadFilesFromLocalStorage(),
  }),
  getters: {
    fileNames(state) {
      return Object.keys(state.files);
    },
    nextUntitled(_) {
      const regex = /Untitled(\d+)?/;
      const untitledIndices: number[] = this.fileNames
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
    fileExists(_) {
      return (fileName: string) => this.fileNames.includes(fileName);
    },
    contents(_) {
      return (fileName: string) => this.files[fileName]?.contents;
    }
  },
  actions: {
    saveFile(file: File) {
      this.files[file.name] = file;
      localStorage.setItem(file.name, file.contents);
    }
  }
});
