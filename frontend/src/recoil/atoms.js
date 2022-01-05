import { atom /* useRecoilTransactionObserver_UNSTABLE */ } from "recoil"

export const todoListState = atom({
  key: "todoListState",
  default: []
})
export const activeNewTaskMenuState = atom({
  key: "activeNewTaskMenuState",
  default: false
})
export const shouldUpdateTodosState = atom({
  key: "shouldUpdateTodos",
  default: false
})
