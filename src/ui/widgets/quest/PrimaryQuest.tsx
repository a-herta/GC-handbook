import React from 'react'

import { GiSupersonicArrow } from 'react-icons/gi'

import Collapsible from 'react-collapsible'
import NormalQuest from './NormalQuest'

import type { MainQuest } from '@/backend/types'
import { listSubQuestsFor } from '@/backend/data'

interface IProps {
  quest: MainQuest
}

function Trigger(props: IProps): React.ReactElement {
  return (
    <div
      className={
        'flex flex-row gap-2.5 p-2.5 box-border w-115.25 h-full min-w-25 min-h-6.25 max-h-15 bg-[--pq-bg]'
      }
    >
      <GiSupersonicArrow className={'text-[20px] pt-1.25 text-[--pq-text]'} />
      <div className={'flex flex-col'}>
        <p className={'font-bold text-[16px] text-[--pq-text] select-none cursor-pointer'}>
          {props.quest.title}
        </p>
        <p className={'text-[14px] text-[--pq-text2] select-none cursor-pointer'}>
          ID: {props.quest.id}
        </p>
      </div>
    </div>
  )
}

class PrimaryQuest extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <Collapsible
        className={'flex flex-col h-min'}
        openedClassName={'flex flex-col h-min'}
        trigger={<Trigger quest={this.props.quest} />}
        transitionTime={50}
      >
        <div className={'flex flex-col w-[97%] ml-auto mr-1.25 gap-2 p-2 bg-[--primary-color]'}>
          {listSubQuestsFor(this.props.quest).map(quest => (
            <NormalQuest key={quest.id} quest={quest} right />
          ))}
        </div>
      </Collapsible>
    )
  }
}

export default PrimaryQuest
