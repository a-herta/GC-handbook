import React from 'react'

import Card from '../widgets/Card'

import { SceneType } from '@/backend/types'
import { getScenes } from '@/backend/data'
import { connected, teleportTo } from '@/backend/server'
import { action } from '@/backend/commands'
import { copyToClipboard } from '@/utils'

/**
 * Converts a scene type to a string.
 *
 * @param type The scene type.
 */
function sceneTypeToString(type: SceneType): string {
  switch (type) {
    default:
      return 'Unknown'
    case SceneType.None:
      return 'None'
    case SceneType.World:
      return 'World'
    case SceneType.Activity:
      return 'Activity'
    case SceneType.Dungeon:
      return 'Dungeon'
    case SceneType.Room:
      return 'Room'
    case SceneType.HomeRoom:
      return 'Home Room'
    case SceneType.HomeWorld:
      return 'Home World'
  }
}

class ScenesPage extends React.PureComponent {
  /**
   * Teleports the player to the specified scene.
   * @private
   */
  private async teleport(scene: number): Promise<void> {
    if (connected) {
      await teleportTo(scene)
    } else {
      await copyToClipboard(action.teleport(scene))
    }
  }

  render() {
    return (
      <div className={'flex h-full w-full bg-[--background-color] flex-col p-6'}>
        <h1 className={'max-w-45 max-h-15 text-[48px] font-bold text-center mb-7.5'}>Scenes</h1>

        <div className={'flex flex-col gap-3.75 mb-7 overflow-y-scroll'}>
          {getScenes().map(scene => (
            <Card
              key={scene.id}
              title={scene.identifier}
              alternate={`ID: ${scene.id}  ${sceneTypeToString(scene.type)}`}
              button={
                <button
                  className={
                    'w-23.5 h-8.5 m-0 rounded-[10px] border-transparent text-[20px] text-[--text-primary-color] bg-[--background-color] select-none transition-all duration-100 ease-in-out hover:cursor-pointer active:scale-90'
                  }
                  onClick={() => this.teleport(scene.id)}
                >
                  Teleport
                </button>
              }
              rightOffset={13}
              height={75}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default ScenesPage
