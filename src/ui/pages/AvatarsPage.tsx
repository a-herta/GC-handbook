import React from 'react'

import Character from '../widgets/Character'

import type { Avatar } from '@/backend/types'
import { listAvatars } from '@/backend/data'
import { grantAvatar } from '@/backend/server'

class AvatarsPage extends React.PureComponent {
  /**
   * Grants the avatar to the user.
   *
   * @param avatar The avatar to grant.
   * @private
   */
  private async grantAvatar(avatar: Avatar): Promise<void> {
    console.log(await grantAvatar(avatar.id))
  }

  render() {
    return (
      <div
        className={
          'flex w-[calc(100%-352px)] bg-[--background-color] flex-col p-6 overflow-y-scroll'
        }
      >
        <h1 className={'max-w-68.75 max-h-15 text-[48px] font-bold text-center mb-7.5'}>
          Characters
        </h1>

        <div className={'flex flex-row flex-wrap gap-3.75 max-w-[90%]'}>
          {listAvatars().map(avatar =>
            avatar.id > 11000000 ? undefined : (
              <Character
                key={avatar.id}
                data={avatar}
                onClick={this.grantAvatar.bind(this, avatar)}
              />
            )
          )}
        </div>
      </div>
    )
  }
}

export default AvatarsPage
