<template>
  <div
    class="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
    @click="emit('select', game)"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="flex flex-col items-center gap-1 w-2/5">
        <img
          v-if="game.teamhome_logo"
          :src="game.teamhome_logo"
          :alt="game.teamhome_name"
          class="w-12 h-12 object-contain"
        />
        <span class="text-sm font-semibold text-center">{{ game.teamhome_name }}</span>
      </div>

      <div class="flex flex-col items-center">
        <span v-if="isFinished" class="text-xl font-bold">
          {{ game.goal_home }} : {{ game.goal_away }}
        </span>
        <span v-else class="text-lg font-bold text-gray-400">VS</span>
        <span class="text-xs text-gray-500 mt-1">{{ formattedDate }}</span>
      </div>

      <div class="flex flex-col items-center gap-1 w-2/5">
        <img
          v-if="game.teamaway_logo"
          :src="game.teamaway_logo"
          :alt="game.teamaway_name"
          class="w-12 h-12 object-contain"
        />
        <span class="text-sm font-semibold text-center">{{ game.teamaway_name }}</span>
      </div>
    </div>

    <div v-if="game.odd_home" class="grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
      <div class="bg-gray-50 rounded p-1">
        <div>Heim</div>
        <div class="text-blue-600 font-bold">{{ game.odd_home?.toFixed(2) }}</div>
      </div>
      <div class="bg-gray-50 rounded p-1">
        <div>Unentschieden</div>
        <div class="text-blue-600 font-bold">{{ game.odd_draw?.toFixed(2) }}</div>
      </div>
      <div class="bg-gray-50 rounded p-1">
        <div>Auswärts</div>
        <div class="text-blue-600 font-bold">{{ game.odd_away?.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Match } from '@/types'

interface Props {
  game: Match
}
const props = defineProps<Props>()

const emit = defineEmits<{
  select: [game: Match]
}>()

const isFinished = computed<boolean>(() => ['FT', 'AET', 'PEN'].includes(props.game.fixture_status))

const formattedDate = computed<string>(() => {
  if (!props.game.fixture_date) return ''
  return new Date(props.game.fixture_date).toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>
