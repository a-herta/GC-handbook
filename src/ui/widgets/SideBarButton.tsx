import React from 'react'

import type { Page } from '@/backend/types'
import { navigate } from '@/backend/events'

interface IProps {
  name: string
  icon: string
  anchor: Page
}

class SideBarButton extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  /**
   * Redirects the user to the specified anchor.
   * @private
   */
  private redirect(): void {
    navigate(this.props.anchor)
  }

  /**
   * Checks if this component should be showed.
   */
  private shouldShow(): boolean {
    return !window.hide.includes(this.props.anchor.toLowerCase())
  }

  render() {
    return this.shouldShow() ? (
      <div
        className={
          'flex flex-row gap-3.75 pl-6.75 h-16 items-center hover:cursor-pointer hover:brightness-90 transition-all duration-200 ease-in-out'
        }
        onClick={() => this.redirect()}
      >
        <img className={'max-w-16 max-h-16'} src={this.props.icon} alt={this.props.name} />

        <p className={'text-[22px] leading-7.25 max-w-55'}>{this.props.name}</p>
      </div>
    ) : undefined
  }
}

export default SideBarButton
