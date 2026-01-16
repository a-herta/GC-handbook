import React from 'react'

interface IProps {
  title: string
  alternate?: string
  description?: string | string[]

  height?: number | string
  button?: React.ReactNode
  rightOffset?: number

  onClick?: () => void
  onOver?: () => void
  onOut?: () => void
}

class Card extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <div
        className={
          'flex flex-row justify-between w-full max-w-377.5 rounded-[15px] p-2.5 box-border bg-[--primary-color]'
        }
        onClick={this.props.onClick}
        onMouseOver={this.props.onOver}
        onMouseOut={this.props.onOut}
        style={{
          height: this.props.height,
          cursor: this.props.onClick ? 'pointer' : undefined
        }}
      >
        <div className={'flex flex-col justify-between'}>
          <div className={'flex flex-row w-full h-full gap-3.75 items-center'}>
            <p className={'text-[32px] font-bold'}>{this.props.title}</p>
            {this.props.alternate && <p className={'text-[24px]'}>{this.props.alternate}</p>}
          </div>

          <div style={{ alignItems: 'center' }}>
            {this.props.description ? (
              Array.isArray(this.props.description) ? (
                this.props.description.map((line, index) => (
                  <p className={'pb-1.25'} key={index}>
                    {line}
                  </p>
                ))
              ) : (
                <p className={'pb-1.25'}>{this.props.description}</p>
              )
            ) : undefined}
          </div>
        </div>

        {this.props.button ? (
          <div
            className={'flex self-center justify-center mr-3.25'}
            style={{ marginRight: this.props.rightOffset ?? 0 }}
          >
            {this.props.button}
          </div>
        ) : undefined}
      </div>
    )
  }
}

export default Card
