const DEBUG_SAVE_KEY = 'mq:debug';

export const Debug = {
  get(): boolean {
    if (localStorage.getItem(DEBUG_SAVE_KEY) === null) {
      Debug.set(false);
    }
    return localStorage.getItem(DEBUG_SAVE_KEY) == 'true';
  },
  set(debug: boolean): void {
    localStorage.setItem('mq:debug', String(debug));
  },
  toggle(): void {
    Debug.set(!Debug.get());
  },
};
