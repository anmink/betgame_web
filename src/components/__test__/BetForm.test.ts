import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Match } from '@/types'
import { createPinia, setActivePinia } from 'pinia'
import BetForm from '../BetForm.vue'

const sampleGame: Match = {
  fixture_id: 1001,
  fixture_date: '2025-03-15T18:00:00',
  fixture_status: 'NS',
  league_id: 78,
  league_name: 'Bundesliga',
  league_round: 'Regular Season - 26',
  teamhome_name: 'Bayern München',
  teamhome_logo: '',
  teamhome_winner: null,
  teamaway_name: 'Borussia Dortmund',
  teamaway_logo: '',
  teamaway_winner: null,
  goal_home: null,
  goal_away: null,
  odd_home: 1.65,
  odd_draw: 3.8,
  odd_away: 5.2,
}

describe('BetForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('rendert Teamnamen', () => {
    const wrapper = mount(BetForm, { props: { game: sampleGame } })
    expect(wrapper.text()).toContain('Bayern München')
    expect(wrapper.text()).toContain('Borussia Dortmund')
  })

  it('Submit-Button initial deaktiviert', () => {
    const wrapper = mount(BetForm, { props: { game: sampleGame } })
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('emittiert close-Event beim Klick auf X/ schließen', async () => {
    const wrapper = mount(BetForm, { props: { game: sampleGame } })
    const closeButton = wrapper.find('button:not([type="submit"])')
    await closeButton.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
