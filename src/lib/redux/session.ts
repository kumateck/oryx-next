export const loadSessionStore = async () => {
  const rawPersistedState = await localStorage.getItem("persist:oryxerp");
  const persistedState = await JSON.parse(rawPersistedState as string);

  if (persistedState) {
    const auth = await JSON.parse(persistedState?.auth);

    return auth;
  }
  return null;
};
