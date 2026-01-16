import React from 'react'

import HomeButton from '../widgets/HomeButton'

import { ReactComponent as DiscordLogo } from '@/assets/discord.svg'

import Icon_Version_Highlights from '@data/assets/Icon_Version_Highlights.webp'
import Icon_Character_Lumine from '@data/assets/Icon_Character_Lumine.webp'
import Icon_Inventory from '@data/assets/Icon_Inventory.webp'
import Icon_Tutorial_Monster from '@data/assets/Icon_Tutorial_Monster.webp'
import Icon_Map from '@data/assets/Icon_Map.webp'
import Icon_Quests from '@data/assets/Icon_Quests.webp'
import Icon_Achievements from '@data/assets/Icon_Achievements.webp'

import { openUrl } from '@/utils'

class HomePage extends React.Component<unknown, unknown> {
  constructor(props: unknown) {
    super(props)
  }

  render() {
    return (
      <div
        className={
          'h-full w-full overflow-y-scroll p-0 flex flex-col justify-between gap-12.5 bg-[--background-color]'
        }
      >
        <div className={'flex w-full flex-col items-center gap-6'}>
          <h1 className={'mt-7.75 mb-3.75'}>Welcome back, Traveler~</h1>

          <div className={'flex w-full max-w-344 gap-6 justify-center flex-wrap'}>
            <HomeButton name={'Commands'} anchor={'Commands'} icon={Icon_Version_Highlights} />
            <HomeButton name={'Characters'} anchor={'Avatars'} icon={Icon_Character_Lumine} />
            <HomeButton name={'Items'} anchor={'Items'} icon={Icon_Inventory} />
            <HomeButton name={'Entities'} anchor={'Entities'} icon={Icon_Tutorial_Monster} />
            <HomeButton name={'Scenes'} anchor={'Scenes'} icon={Icon_Map} />
            <HomeButton name={'Quests'} anchor={'Quests'} icon={Icon_Quests} />
            <HomeButton name={'Achievements'} anchor={'Achievements'} icon={Icon_Achievements} />
          </div>
        </div>

        <div className={'flex flex-row justify-between mb-12.5'}>
          <div
            className={
              'flex flex-row gap-7.5 bg-[--primary-color] h-25 self-end ml-15 mr-0 rounded-[10px] box-border p-2.75'
            }
          >
            <p className={'text-[16px]'}>
              <b>This tool is not affiliated with HoYoverse.</b>
              <br />
              Genshin Impact, game content and materials are
              <br />
              trademarks and copyrights of HoYoverse.
            </p>

            <div
              className={
                'flex max-w-37.5 p-2.5 rounded-[10px] gap-2 self-center items-center hover:cursor-pointer hover:bg-[#5865F2] hover:shadow-[0_0_10px_0_rgba(0,0,0,0.75)]'
              }
              onClick={() => openUrl('https://discord.gg/grasscutter')}
            >
              <DiscordLogo className={'w-full h-full max-w-11 max-h-7.5'} />
              <p className={'text-[16px]'}>Join the Community!</p>
            </div>
          </div>

          <div
            className={
              'flex flex-col gap-2.5 bg-[--primary-color] max-w-75 mt-3.25 mr-15 mb-0 ml-0 rounded-[10px] box-border p-2.75'
            }
          >
            <div className={'flex flex-row gap-1.25'}>
              <p className={'text-[18px] font-bold'}>Credits</p>
              <p className={'text-[10px] self-center'}>(hover to see info)</p>
            </div>

            <div className={'flex flex-col'}>
              <a
                className={'text-[--text-primary-color] no-underline pr-2.5 hover:underline'}
                href={'https://paimon.moe'}
              >
                paimon.moe
              </a>
              <a
                className={'text-[--text-primary-color] no-underline pr-2.5 hover:underline'}
                href={'https://gitlab.com/Dimbreath/AnimeGameData'}
              >
                Anime Game Data
              </a>
              <a
                className={'text-[--text-primary-color] no-underline pr-2.5 hover:underline'}
                href={'https://genshin-impact.fandom.com'}
              >
                Genshin Impact Wiki
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
