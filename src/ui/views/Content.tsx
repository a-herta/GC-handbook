import React from 'react'

import HomePage from '../pages/HomePage'
import CommandsPage from '../pages/CommandsPage'
import AvatarsPage from '../pages/AvatarsPage'
import ItemsPage from '../pages/ItemsPage'
import EntitiesPage from '../pages/EntitiesPage'
import ScenesPage from '../pages/ScenesPage'
import QuestsPage from '../pages/QuestsPage'

import type { Page } from '@/backend/types'
import { addNavListener, removeNavListener } from '@/backend/events'

interface IProps {
  initial?: Page | null
}

interface IState {
  current: Page
}

class Content extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      current: props.initial ?? 'Home'
    }
  }

  /**
   * Navigates to the specified page.
   *
   * @param page The page to navigate to.
   * @private
   */
  private navigate(page: Page): void {
    this.setState({ current: page })
  }

  componentDidMount() {
    addNavListener(this.navigate.bind(this))
  }

  componentWillUnmount() {
    removeNavListener(this.navigate.bind(this))
  }

  render() {
    let page: React.ReactNode = undefined

    switch (this.state.current) {
      default:
        page = undefined
        break
      case 'Home':
        page = <HomePage />
        break
      case 'Commands':
        page = <CommandsPage />
        break
      case 'Avatars':
        page = <AvatarsPage />
        break
      case 'Items':
        page = <ItemsPage />
        break
      case 'Entities':
        page = <EntitiesPage />
        break
      case 'Scenes':
        page = <ScenesPage />
        break
      case 'Quests':
        page = <QuestsPage />
        break
    }

    return page ? <div className={'w-full h-full'}>{page}</div> : undefined
  }
}

export default Content
