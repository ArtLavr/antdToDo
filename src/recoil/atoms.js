import { atom, useRecoilTransactionObserver_UNSTABLE } from 'recoil';

import data from '../data/data.json';
import hashtag from '../data/hashtags.json';

export const todoListState = atom({
  key: 'todoListState',
  default: data,
});
export const hashtagListState = atom({
  key: 'hashtagListState',
  default: hashtag,
});
export const activeHashtagState = atom({
  key: 'activeHashtagState',
  default: '#all',
});
export const activeNewTaskMenuState = atom({
  key: 'activeNewTaskMenuState',
  default: false,
});
export function UsePersistStorage() {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    processSnapshot(snapshot);
  });
  return null;
}
async function processSnapshot(snapshot) {
  const persistedTodoList = await snapshot.getPromise(todoListState);
  const persistedHashtagList = await snapshot.getPromise(hashtagListState);
  localStorage.setItem(
    'tasky_storage',
    JSON.stringify({
      todoList: persistedTodoList,
      hashtagList: persistedHashtagList,
    })
  );
  console.log(persistedTodoList, persistedHashtagList);
}
export function initState({ set }) {
  const data = localStorage.getItem('tasky_storage');
  if (!data) return;
  const receivedData = JSON.parse(data);
  set(todoListState, receivedData.todoList);
  set(hashtagListState, receivedData.hashtagList);
}
