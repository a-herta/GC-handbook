import React from 'react'

import SideBar from '@/ui/views/SideBar'
import Content from '@/ui/views/Content'
import Overlay from '@/ui/views/Overlay'
import PlainText from '@/ui/views/PlainText'

import type { Page } from '@/backend/types'
import { isPage } from '@/backend/types'

// Based on the design at: https://www.figma.com/file/PDeAVDkTDF5vvUGGdaIZ39/GM-Handbook.
// Currently designed by: Magix.

interface IState {
  initial: Page | null
  plain: boolean
}

class App extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props)

    // Check if the window's href is a page.
    let targetPage = null
    const page = window.location.href.split('/').pop()

    if (page != undefined && page != '') {
      // Convert the page to a Page type.
      const pageName = page.charAt(0).toUpperCase() + page.slice(1)
      // Check if the page is a valid page.
      if (isPage(pageName)) targetPage = pageName as Page
    }

    this.state = {
      initial: targetPage as Page | null,
      plain: false
    }
  }

  render() {
    return (
      <div className={'flex flex-row w-full h-full'}>
        <SideBar />

        {this.state.plain ? <PlainText /> : <Content initial={this.state.initial} />}

        <Overlay />
      </div>
    )
  }
}

export default App
