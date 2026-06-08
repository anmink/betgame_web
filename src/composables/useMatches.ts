// src/composables/useMatches.ts
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { MatchesResponse } from '@/types'
import { getMatches } from '@/services/api'

interface UseMatchesReturn {
  matches: Ref<MatchesResponse>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  refetch: () => Promise<void>
}

export function useMatches(): UseMatchesReturn {
  const matches = ref<MatchesResponse>({ current: [], past: [], future: [] })
  const isLoading = ref<boolean>(true)
  const error = ref<string | null>(null)

  async function fetchMatches(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const data = await getMatches()
      matches.value = data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Spiele konnten nicht geladen werden.'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchMatches)

  return { matches, isLoading, error, refetch: fetchMatches }
}
