import React from 'react'

import Tree, { type RawNodeDatum } from 'react-d3-tree'

import PrimaryQuest from '../widgets/quest/PrimaryQuest'

const defaultTree: RawNodeDatum = {
  name: 'No Quest Selected',
  attributes: {
    questId: -1
  },
  children: []
}

interface IState {
  tree: RawNodeDatum | null
}

class QuestsPage extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props)

    this.state = {
      tree: null
    }
  }

  render() {
    return (
      <div className={'flex justify-between w-full h-full'}>
        <div className={'flex w-[50%] h-full'}>
          <PrimaryQuest
            quest={{
              id: 351,
              title: 'Across the Sea'
            }}
          />
        </div>

        <div className={'w-full h-full'}>
          <Tree data={this.state.tree ?? defaultTree} />
        </div>
      </div>
    )
  }
}

export default QuestsPage
