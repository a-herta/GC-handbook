import React from 'react'

import ServerSettings from '../widgets/ServerSettings'

import type { Overlays } from '@/backend/types'

import events from '@/backend/events'

interface IState {
  page: Overlays
}

class Overlay extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props)

    this.state = {
      page: 'None'
    }
  }

  /**
   * Sets the page to display.
   *
   * @param page The page to display.
   */
  private setPage(page: Overlays): void {
    this.setState({ page })
  }

  /**
   * Gets the page to display.
   */
  private getPage(): React.ReactNode {
    switch (this.state.page) {
      default:
        return undefined
      case 'ServerSettings':
        return <ServerSettings />
    }
  }

  componentDidMount() {
    events.on('overlay', this.setPage.bind(this))
  }

  componentWillUnmount() {
    events.off('overlay', this.setPage.bind(this))
  }

  render() {
    return this.state.page != 'None' ? (
      <div
        className={
          'flex absolute justify-center items-center w-screen h-screen bg-black/35 animate-in fade-in transition-all'
        }
      >
        {this.getPage()}
      </div>
    ) : undefined
  }
}

export default Overlay
