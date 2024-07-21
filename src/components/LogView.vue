<template>
  <div class="log-view" v-if="!logList.length">Пожалуйста подождите...</div>
  <q-virtual-scroll
    v-else
    class="log-view"
    :items="logList"
    component="q-list"
    v-slot="{ item, index }"
  >
    <q-item :key="index" dense>
      {{ item }}
    </q-item>
  </q-virtual-scroll>
</template>

<script setup lang="ts">
import { Logger } from 'src/composable/logger';
import { onMounted } from 'vue';

const props = defineProps<{ filePath: string; countLast: number }>();

const { reInit, logList } = Logger();
defineExpose({ reInit });
onMounted(() => {
  reInit(props.filePath, props.countLast);
});
</script>

<style scoped lang="scss">
.log-view {
  width: 100%;
  background-color: #393939;
  color: #f3f3f3;
  padding: 5px;
  height: calc(100vh - 200px);
}
</style>
