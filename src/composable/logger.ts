import { ref } from 'vue';

export function Logger() {
  let sessionId = '0';
  const logList = ref<Array<string>>([]);
  let eventSource: EventSource;
  function handler(event: { data: string }) {
    const parsed = JSON.parse(event.data);
    logList.value.unshift(parsed.msg);
  }
  function reInit(fileName: string, countLast: number) {
    logList.value = [];

    eventSource?.removeEventListener(sessionId, handler);
    eventSource?.close();
    sessionId = `${Date.now() + Math.trunc(Math.random() * 1000)}`;

    eventSource = new EventSource(
      `api/logger/sse/${sessionId}?fileName=${fileName}&countLast=${countLast}`
    );
    eventSource.addEventListener(sessionId, handler);
  }
  return {
    logList,
    reInit,
  };
}
