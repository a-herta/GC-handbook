import React from 'react'

interface IProps {
  data: { name: string }
  icon: string

  onClick?: () => void
}

interface IState {
  popout: boolean
  icon: boolean
  loaded: boolean
}

class MiniCard extends React.Component<IProps, IState> {
  loading: NodeJS.Timeout | null = null

  containerRef: React.RefObject<HTMLDivElement | null>
  textRef: React.RefObject<HTMLDivElement | null>

  constructor(props: IProps) {
    super(props)

    this.state = {
      popout: false,
      icon: true,
      loaded: false
    }

    this.containerRef = React.createRef()
    this.textRef = React.createRef()
  }

  /**
   * Replaces the icon with the item's name.
   * @private
   */
  private replaceIcon(): void {
    this.setState({ icon: false, loaded: false })
  }

  private forceReplace(): void {
    if (!this.state.loaded) this.replaceIcon()
  }

  /**
   * Adjusts the font size of the text to fit the container.
   * @private
   */
  private adjustFontSize() {
    const container = this.containerRef.current
    const text = this.textRef.current

    if (!container || !text) {
      return
    }

    const containerWidth = container.offsetWidth
    const textWidth = text.scrollWidth

    const fontSize = parseFloat(window.getComputedStyle(text).fontSize)
    const availableWidth = containerWidth - 10
    const scaleFactor = availableWidth / textWidth

    if (scaleFactor < 1) {
      const newFontSize = fontSize * scaleFactor
      text.style.fontSize = newFontSize + 'px'
    }
  }

  componentDidMount() {
    this.loading = setTimeout(this.forceReplace.bind(this), 1e3)
    this.adjustFontSize()
  }

  componentWillUnmount() {
    if (this.loading) clearTimeout(this.loading)
    else this.loading = null
  }

  render() {
    return (
      <div
        className={
          'flex w-16 h-16 overflow-hidden justify-center transition-all duration-100 ease-in-out hover:cursor-pointer hover:brightness-90'
        }
        onClick={this.props.onClick}
      >
        <div
          className={'flex items-center max-w-16 max-h-16 rounded-[10px] bg-[--primary-color]'}
          ref={this.containerRef}
        >
          {this.state.icon && (
            <img
              className={'max-w-16 max-h-16 object-scale-down rounded-[10px]'}
              alt={this.props.data.name}
              src={this.props.icon}
              onError={this.replaceIcon.bind(this)}
              onLoad={() => this.setState({ loaded: true })}
            />
          )}

          {(!this.state.loaded || !this.state.icon) && (
            <p className={'w-16 max-h-16 text-center text-[12px]'} ref={this.textRef}>
              {this.props.data.name}
            </p>
          )}
        </div>
      </div>
    )
  }
}

export default MiniCard
