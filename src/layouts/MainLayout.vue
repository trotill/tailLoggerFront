<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white header">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Просмотр лог файлов
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts"></script>

<style scoped>
.header {
  display: flex;
  height: 60px;
}
</style>
