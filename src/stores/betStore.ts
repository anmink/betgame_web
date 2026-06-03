import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Bet, CreateBetPayload } from '@/types'
import { getBets, placeBet, deleteBet } from '@/services/api'

export const useBetStore = defineStore('bets', () => {
  const bets = ref<Bet[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function fetchBets(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      bets.value = await getBets()
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Fehler beim Laden'
    } finally {
      isLoading.value = false
    }
  }

  async function createBet(payload: CreateBetPayload): Promise<Bet> {
    const newBet = await placeBet(payload)
    bets.value.push(newBet)
    return newBet
  }

  async function removeBet(betId: string): Promise<void> {
    await deleteBet(betId)
    bets.value = bets.value.filter((b: Bet) => b.id !== betId)
  }

  return { bets, isLoading, error, fetchBets, createBet, removeBet }
})
