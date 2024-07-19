<template>
  <div class="log-view">
    <div v-for="(log, idx) in logList" :key="idx" class="log-item">
      {{ log }}
    </div>
  </div>
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
  min-height: 200px;
  background-color: black;
  color: white;
  padding: 5px;
}
</style>
