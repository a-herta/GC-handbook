import React from 'react'

import type { Page } from '@/backend/types'
import { navigate } from '@/backend/events'

interface IProps {
  name: string
  icon: string
  anchor: Page
}

class HomeButton extends React.PureComponent<IProps> {
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
          'flex flex-col p-5 w-[min(10vw,196px)] h-[min(20vh,196px)] bg-[--primary-color] items-center justify-center gap-5 rounded-[10px] select-none hover:cursor-pointer hover:shadow-[0_0_10px_5px_var(--accent-color)] hover:scale-[1.01] transition-all duration-100 ease-in-out'
        }
        onClick={() => this.redirect()}
      >
        <img className={'max-w-32 max-h-32'} src={this.props.icon} alt={this.props.name} />

        <p className={'text-[min(1.3vw,30px)] text-center'}>{this.props.name}</p>
      </div>
    ) : undefined
  }
}

export default HomeButton
