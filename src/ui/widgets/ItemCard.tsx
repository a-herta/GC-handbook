import React from 'react'

import TextState from '@/ui/components/TextState'

import type { Item as ItemType, ItemInfo } from '@/backend/types'
import { itemTypeToString } from '@/backend/types'
import { copyToClipboard, itemIcon } from '@/utils'
import { connected, giveItem } from '@/backend/server'
import { give } from '@/backend/commands'

/**
 * Converts a description string into a list of paragraphs.
 *
 * @param description The description to convert.
 */
function toDescription(description: string | undefined) {
  if (!description) return []

  return description.split('\\n').map((line, index) => (
    <p className={'text-[14px]'} key={index}>
      {line}
    </p>
  ))
}

interface IProps {
  item: ItemType | null
  info: ItemInfo | null
}

interface IState {
  icon: boolean
  count: number | string
}

const defaultState = {
  icon: true,
  count: 1
}

class ItemCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = defaultState
  }

  /**
   * Updates the count of the item.
   *
   * @param event The change event.
   * @private
   */
  private updateCount(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (isNaN(parseInt(value)) && value.length > 1) return

    this.setState({ count: value })
  }

  /**
   * Adds to the count of the item.
   *
   * @param positive Is the count being added or subtracted?
   * @param multiple Is the count being multiplied by 10?
   * @private
   */
  private addCount(positive: boolean, multiple: boolean) {
    let { count } = this.state
    if (count === '') count = 1
    if (typeof count == 'string') count = parseInt(count)
    if (count < 1) count = 1

    let increment = 1
    if (!positive) increment = -1
    if (multiple) increment *= 10

    count = Math.max(1, count + increment)

    this.setState({ count })
  }

  /**
   * Adds the item to the player's connected inventory.
   * @private
   */
  private async addToInventory(): Promise<void> {
    const item = this.props.item?.id ?? 102
    const amount =
      typeof this.state.count == 'string' ? parseInt(this.state.count) : this.state.count

    if (connected) {
      await giveItem(item, amount)
    } else {
      await copyToClipboard(give.basic(item, amount))
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    if (this.props.item != prevProps.item) {
      this.setState(defaultState)
    }
  }

  render() {
    const { item, info } = this.props
    const data = info?.data

    return item ? (
      <div
        className={
          'flex flex-col justify-between w-full h-full max-w-75 min-h-75 max-h-175 p-5 box-border rounded-[10px] bg-[--primary-color]'
        }
      >
        <div className={'flex flex-col gap-2.5'}>
          <div className={'flex flex-row justify-between'}>
            <div className={'flex flex-col gap-2.5'}>
              <p className={'font-bold text-[20px] max-w-42.5 max-h-15'}>
                {data?.name ?? item.name}
              </p>
              <p className={'text-[16px]'}>{data?.type ?? itemTypeToString(item.type)}</p>
            </div>

            {this.state.icon && (
              <img
                className={'w-16 h-16'}
                alt={item.name}
                src={itemIcon(item)}
                onError={() => this.setState({ icon: false })}
              />
            )}
          </div>

          <div className={'flex flex-col overflow-y-scroll max-w-62.5 max-h-115'}>
            {toDescription(data?.description)}
          </div>
        </div>

        <div className={'flex flex-col gap-1.25 pt-2.5'}>
          <div
            className={
              'flex flex-row justify-between w-full h-full max-w-65 max-h-11.5 rounded-[10px] px-3.25 box-border items-center bg-[--secondary-color]'
            }
          >
            <div
              onClick={() => this.addCount(false, false)}
              onContextMenu={e => {
                e.preventDefault()
                this.addCount(false, true)
              }}
              className={
                'select-none flex w-7.5 h-5 text-[24px] items-center justify-center text-[--text-primary-color] bg-[--background-color] hover:cursor-pointer'
              }
            >
              -
            </div>
            <input
              type={'text'}
              value={this.state.count}
              className={
                'max-w-26.25 h-12 text-[24px] text-center bg-transparent text-[--text-primary-color] border-transparent focus:outline-none'
              }
              onChange={this.updateCount.bind(this)}
              onBlur={() => {
                if (this.state.count == '') {
                  this.setState({ count: 1 })
                }
              }}
            />
            <div
              onClick={() => this.addCount(true, false)}
              onContextMenu={e => {
                e.preventDefault()
                this.addCount(true, true)
              }}
              className={
                'select-none flex w-7.5 h-5 text-[24px] items-center justify-center text-[--text-primary-color] bg-[--background-color] hover:cursor-pointer'
              }
            >
              +
            </div>
          </div>

          <button
            className={
              'w-full h-11.5 max-w-65 rounded-[10px] text-center justify-center border-transparent text-[24px] text-[--text-primary-color] bg-[--secondary-color] select-none transition-all duration-100 ease-in-out hover:cursor-pointer hover:scale-105 active:scale-90'
            }
            onClick={this.addToInventory.bind(this)}
          >
            <TextState
              initial={connected}
              event={'connected'}
              text1={'Copy Command'}
              text2={'Add to Inventory'}
            />
          </button>
        </div>
      </div>
    ) : undefined
  }
}

export default ItemCard
