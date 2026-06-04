<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Match, Prediction } from '@/types'
import { useBetStore } from '@/stores/betStore'

interface Props {
  game: Match
}

interface BetForm {
  prediction: Prediction | null
  amount: number | null
}

interface PredictionOption {
  value: Prediction
  label: string
  odds: number | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  submitted: []
}>()
const betStore = useBetStore()
const form = ref<BetForm>({ prediction: null, amount: null })
const isSubmitting = ref<boolean>(false)
const MAX_AMOUNT = 1000

const predictionOptions = computed<PredictionOption[]>(() => [
  { value: 'home', label: props.game.teamhome_name, odds: props.game.odd_home },
  { value: 'draw', label: 'Unentschieden', odds: props.game.odd_draw },
  { value: 'away', label: props.game.teamaway_name, odds: props.game.odd_away },
])

const selectedOdds = computed<number>(() => {
  const option = predictionOptions.value.find((o) => o.value === form.value.prediction)
  return option?.odds ?? 0
})

const potentialWin = computed<number>(() =>
  (form.value.amount ?? 0) > 0 ? (form.value.amount ?? 0) * selectedOdds.value : 0,
)

const validationError = computed<string | null>(() => {
  if (form.value.amount !== null && form.value.amount <= 0) return 'Einsatz muss größer als 0 sein.'
  if ((form.value.amount ?? 0) > MAX_AMOUNT) return `Maximum Einsatz: ${MAX_AMOUNT} Coins`
  return null
})

const isValid = computed<boolean>(
  () =>
    form.value.prediction !== null &&
    (form.value.amount ?? 0) > 0 &&
    validationError.value === null,
)

async function submitBet(): Promise<void> {
  if (!isValid.value || !form.value.prediction || !form.value.amount)
    return (isSubmitting.value = true)
  try {
    await betStore.createBet({
      match_id: String(props.game.fixture_id),
      amount: form.value.amount,
      odds: selectedOdds.value,
      prediction: form.value.prediction,
    })
    emit('submitted')
  } catch (err: unknown) {
    console.error('Wette fehlgeschlagen:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center"
    @click.self="emit('close')"
  >
    <div class="bg-white rounded-t-2xl w-full p-6 sm:rounded-2xl sm:max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">Wette platzieren</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600">x</button>
      </div>
      <div class="text-center mb-4 text-sm text-gray-600">
        {{ game.teamhome_name }} vs. {{ game.teamaway_name }}
      </div>
    </div>

    <form @submit.prevent="submitBet">
      <div class="grid grid-cols-3 gap-2 mb-4">
        <button
          v-for="option in predictionOptions"
          :key="option.value"
          type="button"
          :class="[
            'py-3 rounded-lg border-2 text-sm font-medium transition-colors',
            form.prediction === option.value
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-gray-200 text-gray-600 hover:border-gray-300',
          ]"
          @click="form.prediction = option.value"
        >
          <div>{{ option.label }}</div>
          <div class="text-xs text-gray-500">{{ option.odds?.toFixed(2) }}</div>
        </button>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Einsatz (Coins)</label>
        <input
          v-model.number="form.amount"
          type="number"
          min="1"
          :max="MAX_AMOUNT"
          placeholder="z.B. 100"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="validationError" class="text-red-500 text-xs mt-1">{{ validationError }}</p>
      </div>

      <div v-if="potentialWin > 0" class="bg-green-50 rounded-lg p-3 mb-4 text-center">
        <span class="text-sm text-gray-600">Möglicher Gewinn: </span>
        <span class="font-bold text-green-700">{{ potentialWin.toFixed(0) }} Coins</span>
      </div>

      <button
        type="submit"
        :disabled="!isValid || isSubmitting"
        class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        {{ isSubmitting ? 'Wird platziert...' : 'Wette abgeben' }}
      </button>
    </form>
  </div>
</template>
