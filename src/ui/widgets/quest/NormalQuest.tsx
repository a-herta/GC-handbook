import React from 'react'

import { IoLocationSharp } from 'react-icons/io5'

import type { Quest } from '@/backend/types'

interface IProps {
  quest: Quest
  right?: boolean
}

class NormalQuest extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { quest } = this.props

    return (
      <div
        className={`flex items-center justify-between w-107.75 h-full min-w-25 min-h-6.25 max-h-13.25 bg-[--quest-unselected] px-5 py-2.75 box-border hover:bg-[--quest-selected] group ${
          this.props.right ? 'ml-auto mr-0' : ''
        }`}
      >
        <div className={'flex flex-col'}>
          <p
            className={
              'font-bold text-[16px] text-[--qt-unselected] select-none cursor-pointer group-hover:text-[--qt-selected]'
            }
          >
            {quest.description}
          </p>
          <p
            className={
              'text-[13px] text-[--qt2-unselected] select-none cursor-pointer group-hover:text-[--qt-selected]'
            }
          >
            ID: {quest.id} | Main: {quest.mainId}
          </p>
        </div>

        <IoLocationSharp className={'text-[16px] text-[--quest-accent]'} />
      </div>
    )
  }
}

export default NormalQuest
