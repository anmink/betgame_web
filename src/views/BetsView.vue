<script setup lang="ts">
import { onMounted } from 'vue'
import type { Prediction, BetStatus } from '@/types'
import { useBetStore } from '@/stores/betStore'

const betStore = useBetStore()
onMounted(() => betStore.fetchBets())

function predictionLabel(prediction: Prediction): string {
  const labels: Record<Prediction, string> = {
    home: 'Heimsieg',
    draw: 'Unentschieden',
    away: 'Auswärtssieg',
  }
  return labels[prediction]
}

function statusLabel(status: BetStatus): string {
  const labels: Record<BetStatus, string> = {
    pending: 'Offen',
    won: 'Gewonnen',
    lost: 'Verloren',
  }
  return labels[status]
}

function statusClass(status: BetStatus): string {
  const classes: Record<BetStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    won: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
  }
  return classes[status]
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6">Meine Wetten</h1>

    <div v-if="betStore.isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="betStore.bets.length === 0" class="text-center py-12 text-gray-500">
      <p class="mb-4">Du hast noch keine Wette platziert.</p>
      <RouterLink to="/" class="text-blue-600 underline">Zu den Spielen</RouterLink>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="bet in betStore.bets"
        :key="bet.id"
        class="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center"
      >
        <div>
          <div class="font-semibold text-sm">
            {{ bet.matches?.teamhome_name ?? 'Unbekannt' }} vs
            {{ bet.matches?.teamaway_name ?? 'Unbekannt' }}
          </div>
          <div class="text-xs text-gray-500 mt-0.5">
            {{ predictionLabel(bet.prediction) }} • {{ bet.amount }} Coins • Quote
            {{ bet.odds.toFixed(2) }}
          </div>
        </div>
        <span :class="statusClass(bet.status)" class="text-xs font-medium px-2 py-1 rounded-full">{{
          statusLabel(bet.status)
        }}</span>
      </div>
    </div>
  </div>
</template>
