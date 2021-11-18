import { Store } from 'vuex';// path to store file

declare module '@vue/runtime-core' {
  interface State {
    files: string[],
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

