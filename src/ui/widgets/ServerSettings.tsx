import React from 'react'

import emitter from '@/backend/events'
import {
  targetPlayer,
  address,
  port,
  setServerDetails,
  url,
  setTargetPlayer
} from '@/backend/server'
import { getWindowDetails } from '@/utils'

interface IState {
  webview: boolean

  address: string
  port: number
}

class ServerSettings extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props)

    this.state = {
      webview: false,
      address: address,
      port: Number(port)
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.escapeListener.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.escapeListener.bind(this))
    window.removeEventListener('message', this.handleAuthentication.bind(this))
  }

  /**
   * Invoked when the escape key is pressed.
   *
   * @param e The keyboard event.
   * @private
   */
  private escapeListener(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      // Hide the overlay.
      emitter.emit('overlay', 'None')
    }
  }

  /**
   * Invoked when the component tries to authenticate.
   * @private
   */
  private authenticate(): void {
    setServerDetails(this.state.address, this.state.port).then(() => {
      this.setState({ webview: true })
    })

    // Add the event listener for authentication.
    window.addEventListener('message', this.handleAuthentication.bind(this))
  }

  /**
   * Finishes the authentication process.
   *
   * @param e The message event.
   * @private
   */
  private handleAuthentication(e: MessageEvent): void {
    const data = e.data // The data sent from the server.
    if (data == null) return // If the data is null, return.

    // Check if the data is an object.
    if (typeof data != 'object') return
    // Get the data type.
    const type = data['type'] ?? null
    if (type != 'handbook-auth') return

    // Get the data.
    const uid = data['uid'] ?? null
    const token = data['token'] ?? null

    // Hide the overlay.
    emitter.emit('overlay', 'None')
    // Set the token and user ID.
    setTargetPlayer(Number(uid), token)
  }

  /**
   * Invoked when the save button is clicked.
   * @private
   */
  private save(): void {
    // Hide the overlay.
    emitter.emit('overlay', 'None')

    // Save the server settings.
    setServerDetails(this.state.address, this.state.port.toString())
  }

  render() {
    const { disable } = getWindowDetails()

    return (
      <div
        className={
          'flex flex-col justify-between items-center rounded-[10px] bg-[--primary-color] w-full h-full max-w-155 max-h-100 p-2.5 box-border'
        }
      >
        {this.state.webview ? (
          <iframe
            className={'w-full h-full border-0'}
            src={`${url()}/handbook/authenticate?uid=${targetPlayer}`}
          />
        ) : (
          <>
            <div className={'flex items-center flex-col w-full gap-3.75 h-[80%]'}>
              <h1 className={'font-bold text-[34px] text-center mb-3.75 select-none'}>
                Server Settings
              </h1>

              <div
                className={
                  'flex flex-row justify-between rounded-[10px] bg-[--secondary-color] w-full h-full max-w-147.5 max-h-12.5 p-2.5 box-border'
                }
                style={{
                  opacity: disable ? 0.5 : 1,
                  cursor: disable ? 'not-allowed' : 'default',
                  userSelect: disable ? 'none' : 'auto'
                }}
              >
                <div>
                  <p className={'text-[20px] select-none'}>Address:</p>
                  <input
                    type={'text'}
                    value={this.state.address}
                    onChange={e => {
                      const target = e.target as HTMLInputElement
                      const value = target.value

                      this.setState({ address: value })
                    }}
                    disabled={disable}
                    className={
                      'border-none bg-none text-[18px] text-[--text-primary-color] focus:outline-none active:outline-none'
                    }
                    style={{
                      cursor: disable ? 'not-allowed' : 'text',
                      userSelect: disable ? 'none' : 'auto'
                    }}
                  />
                </div>

                <div>
                  <p className={'text-[20px] select-none'}>Port:</p>
                  <input
                    type={'text'}
                    value={this.state.port == 0 ? '' : this.state.port}
                    onChange={e => {
                      const target = e.target as HTMLInputElement
                      const value = target.value

                      if (isNaN(Number(value)) || value.length > 5) {
                        return
                      }

                      this.setState({ port: Number(value) })
                    }}
                    disabled={disable}
                    className={
                      'border-none bg-none text-[18px] text-[--text-primary-color] focus:outline-none active:outline-none'
                    }
                    style={{
                      cursor: disable ? 'not-allowed' : 'text',
                      userSelect: disable ? 'none' : 'auto'
                    }}
                  />
                </div>
              </div>

              <button
                className={
                  'text-[20px] rounded-[10px] bg-[--secondary-color] w-full h-full max-w-52.5 max-h-11.5 cursor-pointer text-white'
                }
                onClick={this.authenticate.bind(this)}
              >
                Authenticate
              </button>
            </div>

            <div className={'flex items-center flex-col w-full gap-3.75'}>
              <button
                className={
                  'text-[20px] rounded-[10px] bg-[--secondary-color] w-full h-11.5 max-w-30 cursor-pointer text-white'
                }
                onClick={this.save.bind(this)}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default ServerSettings
