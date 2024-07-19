<template>
  <q-page class="row items-top justify-evenly">
    <div class="page">
      <div class="control-group row">
        <q-input
          v-model="filePath"
          hint="Путь к файлу"
          class="file-path"
          outlined
        />
        <q-input
          outlined
          ref="rowsCountRef"
          type="number"
          v-model="rowsCount"
          :rules="[(value:string) => +value >= 0 && +value<=1000 || 'Допустим только диапазон 0 - 1000']"
          hint="Количество последних строк"
          class="delim"
        />
        <q-btn
          label="Применить"
          class="apply-button"
          outline
          color="blue"
          :disable="validateCheck"
          @click="onApply"
        />
      </div>
      <div class="view">
        <LogView
          :file-path="filePath"
          :count-last="+rowsCount"
          ref="logViewRef"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import LogView from 'components/LogView.vue';
import { computed, ref } from 'vue';

defineOptions({
  name: 'IndexPage',
});
const filePath = ref('/var/log/syslog');
const rowsCount = ref(100);
const rowsCountRef = ref();
const logViewRef = ref();
const validateCheck = computed(() => {
  return !rowsCountRef.value?.validate();
});
function onApply() {
  logViewRef.value.reInit(filePath.value, rowsCount.value);
}
</script>

<style lang="scss" scoped>
.control-group {
  margin: 20px;
}
.delim {
  margin-left: 10px;
}
.view {
  margin: 20px;
}
.page {
  width: 100%;
  height: 100%;
}
.file-path {
  min-width: 400px;
}
.apply-button {
  height: 55px;
  margin-left: 10px;
}
</style>
