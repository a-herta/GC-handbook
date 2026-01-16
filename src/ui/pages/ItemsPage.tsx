import React, { type ChangeEvent } from 'react'

import MiniCard from '../widgets/MiniCard'
import ItemCard from '../widgets/ItemCard'
import VirtualizedGrid from '../components/VirtualizedGrid'

import { ItemCategory } from '@/backend/types'
import type { Item as ItemType, ItemInfo } from '@/backend/types'
import { getItems, sortedItems } from '@/backend/data'
import { fetchItemData, itemIcon } from '@/utils'

interface IState {
  filters: ItemCategory[]
  search: string

  selected: ItemType | null
  selectedInfo: ItemInfo | null
}

class ItemsPage extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props)

    this.state = {
      filters: [],
      search: '',

      selected: null,
      selectedInfo: null
    }
  }

  /**
   * Gets the items to render.
   * @private
   */
  private getItems(): ItemType[] {
    let items: ItemType[] = []

    // Add items based on filters.
    const filters = this.state.filters
    if (filters.length == 0) {
      items = getItems()
    } else {
      for (const filter of filters) {
        // Add items from the category.
        items = items.concat(sortedItems[filter])
        // Remove duplicate items.
        items = items.filter((item, index) => {
          return items.indexOf(item) == index
        })
      }
    }

    // Filter out items that don't match the search.
    const search = this.state.search.toLowerCase()
    if (search != '') {
      items = items.filter(item => {
        return item.name.toLowerCase().includes(search)
      })
    }

    return items
  }

  /**
   * Invoked when the search input changes.
   *
   * @param event The event.
   * @private
   */
  private onChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ search: event.target.value })
  }

  /**
   * Should the item be showed?
   *
   * @param item The item.
   * @private
   */
  private showItem(item: ItemType): boolean {
    // Check if the item has an icon.
    if (item.icon.length == 0) return false
    // Check if the item is a TCG card.
    if (item.icon.includes('Gcg')) return false

    return item.id > 0
  }

  /**
   * Sets the selected item.
   *
   * @param item The item.
   * @private
   */
  private async setSelectedItem(item: ItemType): Promise<void> {
    let data: ItemInfo | null = null
    try {
      data = await fetchItemData(item)
    } catch {
      /* empty */
    }

    this.setState({
      selected: item,
      selectedInfo: data
    })
  }

  render() {
    const items = this.getItems()

    return (
      <div className={'flex h-full w-full flex-row justify-between bg-[--background-color] p-6'}>
        <div className={'flex flex-col w-[80%]'}>
          <div className={'flex flex-row gap-7.5 items-center mb-7.5'}>
            <h1
              className={
                'max-w-32.5 max-h-15 text-[48px] font-bold text-center flex justify-center items-center'
              }
            >
              Items
            </h1>

            <div
              className={
                'flex w-full h-full max-w-116.25 max-h-15 box-border items-center rounded-[10px] bg-[--primary-color]'
              }
            >
              <input
                type={'text'}
                className={
                  'bg-transparent border-none text-[--text-primary-color] text-[20px] w-full p-2.75 focus:outline-none placeholder:text-[--text-secondary-color]'
                }
                placeholder={'Search...'}
                onChange={this.onChange.bind(this)}
              />
            </div>
          </div>

          {items.length > 0 ? (
            <VirtualizedGrid
              list={items.filter(item => this.showItem(item))}
              itemHeight={64}
              itemsPerRow={18}
              gap={5}
              itemGap={5}
              render={item => (
                <MiniCard
                  key={item.id}
                  data={item}
                  icon={itemIcon(item)}
                  onClick={() => this.setSelectedItem(item)}
                />
              )}
            />
          ) : undefined}
        </div>

        <div className={'flex w-full max-w-75 min-h-75 max-h-175 self-center'}>
          <ItemCard item={this.state.selected} info={this.state.selectedInfo} />
        </div>
      </div>
    )
  }
}

export default ItemsPage
