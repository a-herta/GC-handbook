import React from 'react'

import type { Avatar } from '@/backend/types'
import { colorFor, formatAvatarName } from '@/utils'

// Image base URL: https://paimon.moe/images/characters/(name).png

const ignored = [
  10000001 // Kate
]

const nameSwitch: { [key: number]: string } = {
  10000005: 'Lumine',
  10000007: 'Aether'
}

interface IProps {
  data: Avatar

  onClick?: () => void
}

class Character extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { name, quality, id } = this.props.data
    const qualityColor = colorFor(quality)

    // Check if the avatar is blacklisted.
    if (ignored.includes(id)) return undefined

    const characterName = nameSwitch[id] ?? name

    return (
      <div
        className={
          'flex flex-col max-w-24 max-h-33.75 rounded-[15px] h-full w-full overflow-hidden box-border hover:cursor-pointer hover:transition-all hover:duration-100 hover:ease-in-out hover:shadow-[0_0_10px_5px_var(--primary-color)]'
        }
        onClick={this.props.onClick}
      >
        <img
          className={'w-24 h-24 self-center'}
          alt={name}
          src={`https://paimon.moe/images/characters/${formatAvatarName(name, id)}.png`}
          style={{ backgroundColor: `var(${qualityColor})` }}
        />

        <div className={'flex justify-center items-center bg-[--primary-color] max-w-25 h-10'}>
          <p
            className={'text-center m-1'}
            style={{ fontSize: characterName.length >= 10 ? 13 : 17 }}
          >
            {characterName}
          </p>
        </div>
      </div>
    )
  }
}

export default Character
