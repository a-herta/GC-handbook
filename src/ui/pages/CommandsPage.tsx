import React from 'react'

import Card from '../widgets/Card'

import { listCommands } from '@/backend/data'

class CommandsPage extends React.PureComponent {
  render() {
    return (
      <div className={'flex h-full w-full bg-[--background-color] flex-col p-6'}>
        <h1 className={'max-w-68.75 max-h-15 text-[48px] font-bold text-center mb-7.5'}>
          Commands
        </h1>

        <div className={'flex flex-col gap-3.75 mb-7 overflow-y-scroll'}>
          {listCommands().map(command => (
            <Card
              key={command.name[0]}
              title={command.name[0]}
              alternate={
                command.name.length == 1 ? undefined : `(aka /${command.name.slice(1).join(', /')})`
              }
              description={command.description}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default CommandsPage
