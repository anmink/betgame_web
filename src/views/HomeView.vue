<!-- src/views/HomeView.vue -->
<template>
  <div class="max-w-2xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6">Aktuelle Spiele</h1>

    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      {{ error }}
      <button @click="refetch" class="ml-2 underline">Nochmal versuchen</button>
    </div>

    <div v-else-if="matches.length === 0" class="text-center py-12 text-gray-500">
      Keine Spiele verfügbar.
    </div>

    <div v-else class="space-y-8">
      <div v-for="match in matches" :key="match.round">
        <h2 class="text-lg font-semibold text-gray-700 mb-3">Spieltag {{ match.round }}</h2>
        <div class="space-y-3">
          <GameCard
            v-for="game in match.matches"
            :key="game.fixture_id"
            :game="game"
            @select="openBetForm"
          />
        </div>
      </div>
    </div>

    <BetForm
      v-if="selectedGame"
      :game="selectedGame"
      @close="selectedGame = null"
      @submitted="onBetSubmitted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Match } from '@/types'
import { useMatches } from '@/composables/useMatches'
import GameCard from '@/components/GameCard.vue'
import BetForm from '@/components/BetForm.vue'

const { matches, isLoading, error, refetch } = useMatches()
const selectedGame = ref<Match | null>(null)

function openBetForm(game: Match): void {
  selectedGame.value = game
}

function onBetSubmitted(): void {
  selectedGame.value = null
}
</script>
