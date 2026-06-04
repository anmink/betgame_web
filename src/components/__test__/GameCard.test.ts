import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Match } from '@/types'
import GameCard from '../GameCard.vue'

const sampleGame: Match = {
  fixture_id: 1001,
  fixture_date: '2025-03-15T18:00:00',
  fixture_status: 'NS',
  league_id: 78,
  league_name: 'Bundesliga',
  league_round: 'Regular Season - 26',
  teamhome_name: 'Bayern München',
  teamhome_logo: 'https://example.com/bayern.png',
  teamhome_winner: null,
  teamaway_name: 'Borussia Dortmund',
  teamaway_logo: 'https://example.com/bvb.png',
  teamaway_winner: null,
  goal_home: null,
  goal_away: null,
  odd_home: 1.65,
  odd_draw: 3.8,
  odd_away: 5.2,
}

describe('GameCard', () => {
  it('zeigt Heimmannschaft an', () => {
    const wrapper = mount(GameCard, { props: { game: sampleGame } })
    expect(wrapper.text()).toContain('Bayern München')
  })

  it('zeigt Auswärtsmannschaft an', () => {
    const wrapper = mount(GameCard, { props: { game: sampleGame } })
    expect(wrapper.text()).toContain('Borussia Dortmund')
  })

  it('zeigt Fixture State an', () => {
    const wrapper = mount(GameCard, { props: { game: sampleGame } })
    expect(wrapper.text()).toContain('NS')
  })

  it('zeigt Spielergebnis an, wenn Spiel beendet (fixture_statue = FT)', () => {
    const finishedGame: Match = {
      ...sampleGame,
      fixture_status: 'FT',
      goal_home: 2,
      goal_away: 1,
    }
    const wrapper = mount(GameCard, { props: { game: finishedGame } })
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('1')
  })

  it('zeigte Quoten an', () => {
    const wrapper = mount(GameCard, { props: { game: sampleGame } })
    expect(wrapper.text()).toContain('1.65')
    expect(wrapper.text()).toContain('3.8')
    expect(wrapper.text()).toContain('5.2')
  })

  it('emit Click', async () => {
    const wrapper = mount(GameCard, { props: { game: sampleGame } })
    await wrapper.trigger('click')
    const emitted = wrapper.emitted('select')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([sampleGame])
  })
})
