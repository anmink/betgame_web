<script setup lang="ts"></script>

<template>
  <nav class="bg-white border-b px-4 py-3 flex gap-4">
    <RouterLink to="/" class="font-semibold text-blue-600">Spiele</RouterLink>
    <RouterLink to="/bets" class="font-semibold text-blue-600">Meine Wetten</RouterLink>
  </nav>
  <RouterView />
</template>
