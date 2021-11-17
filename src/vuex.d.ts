import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    files: string[],
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
