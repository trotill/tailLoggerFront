import { ref } from 'vue';
import { useQuasar } from 'quasar';

export function Logger() {
  let sessionId = '0';
  const logList = ref<Array<string>>([]);
  let eventSource: EventSource;
  const $q = useQuasar();
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
    eventSource.onerror = (e) => {
      console.error('SSE error', e);
      $q.notify({
        message: 'Ошибка, не удается открыть файл или подключиться',
        type: 'negative',
      });
    };
  }
  return {
    logList,
    reInit,
  };
}
