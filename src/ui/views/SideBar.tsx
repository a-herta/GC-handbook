import React, { type ChangeEvent } from 'react'

import SideBarButton from '../widgets/SideBarButton'

import Icon_Version_Highlights from '@data/assets/Icon_Version_Highlights.webp'
import Icon_Character_Lumine from '@data/assets/Icon_Character_Lumine.webp'
import Icon_Inventory from '@data/assets/Icon_Inventory.webp'
import Icon_Tutorial_Monster from '@data/assets/Icon_Tutorial_Monster.webp'
import Icon_Map from '@data/assets/Icon_Map.webp'
import Icon_Quests from '@data/assets/Icon_Quests.webp'
import Icon_Achievements from '@data/assets/Icon_Achievements.webp'

import events, { navigate } from '@/backend/events'
import { targetPlayer, lockedPlayer, setTargetPlayer } from '@/backend/server'

interface IState {
  uid: string | null
  uidLocked: boolean
}

class SideBar extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props)

    this.state = {
      uid: targetPlayer > 0 ? targetPlayer.toString() : null,
      uidLocked: lockedPlayer
    }
  }

  /**
   * Invoked when the player's UID changes.
   * @private
   */
  private updateUid(): void {
    this.setState({
      uid: targetPlayer > 0 ? targetPlayer.toString() : null,
      uidLocked: lockedPlayer
    })
  }

  /**
   * Invoked when the UID input changes.
   *
   * @param event The event.
   * @private
   */
  private onChange(event: ChangeEvent<HTMLInputElement>): void {
    const input = event.target.value
    const uid = input == '' ? null : input
    if (uid && uid.length > 10) return

    setTargetPlayer(parseInt(uid ?? '0'))
  }

  /**
   * Invoked when the UID input is right-clicked.
   *
   * @param event The event.
   * @private
   */
  private onRightClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    // Remove focus from the input.
    event.currentTarget.blur()
    event.preventDefault()

    // Open the server settings overlay.
    events.emit('overlay', 'ServerSettings')
  }

  componentDidMount() {
    events.on('connected', this.updateUid.bind(this))
  }

  componentWillUnmount() {
    events.off('connected', this.updateUid.bind(this))
  }

  render() {
    return (
      <div className={'flex flex-col h-full w-full max-w-75 bg-[--secondary-color] gap-10'}>
        <h1
          className={
            'mt-10.5 leading-10.25 text-[34px] max-w-[256px] max-h-32 text-center self-center select-none hover:cursor-pointer'
          }
          onClick={() => navigate('Home')}
        >
          The Ultimate Anime Game Handbook
        </h1>

        <div className={'flex flex-col justify-between h-full'}>
          <div className={'flex flex-col gap-3.75 select-none'}>
            <SideBarButton name={'Commands'} anchor={'Commands'} icon={Icon_Version_Highlights} />
            <SideBarButton name={'Characters'} anchor={'Avatars'} icon={Icon_Character_Lumine} />
            <SideBarButton name={'Items'} anchor={'Items'} icon={Icon_Inventory} />
            <SideBarButton name={'Entities'} anchor={'Entities'} icon={Icon_Tutorial_Monster} />
            <SideBarButton name={'Scenes'} anchor={'Scenes'} icon={Icon_Map} />
            <SideBarButton name={'Quests'} anchor={'Quests'} icon={Icon_Quests} />
            <SideBarButton name={'Achievements'} anchor={'Achievements'} icon={Icon_Achievements} />
          </div>

          <div
            className={
              'flex w-full h-full max-w-62.5 max-h-12.5 mb-6 box-border self-center items-center rounded-[10px] bg-[--background-color]'
            }
          >
            <input
              type={'text'}
              className={
                'bg-transparent border-none text-[--text-primary-color] text-[20px] w-full p-2.75 focus:outline-none placeholder:text-[--text-secondary-color] disabled:cursor-not-allowed disabled:rounded-[10px] disabled:bg-[--background-color]'
              }
              placeholder={'Enter UID...'}
              value={this.state.uid ?? undefined}
              disabled={this.state.uidLocked}
              onChange={this.onChange.bind(this)}
              onContextMenu={this.onRightClick.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar
