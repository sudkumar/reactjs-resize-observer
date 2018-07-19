// @flow
import * as React from "react"
import { default as Observer } from 'resize-observer-polyfill'

type entryType = {
  target: HTMLElement,
  contentRect: {
    top: number,
    left: number,
    bottom: number,
    right: number,
    x: number,
    y: number,
    width: number,
    height: number,
  }
};

type entriesType = Array<entryType>;

interface ObserverInterface {
  constructor((entries: entriesType) => void): void;
  observe(target: ?HTMLElement): void;
  unobserve(target: ?HTMLElement): void;
};

type Props = {
  children: React.Node,
  componentClass: string,
  innerDomRef: (ref: ?HTMLElement) => void,
  onResize: (entry: entryType) => void,
};
type State = {
  count: number
};

export class ResizeObserver extends React.Component<Props, State> {
  static defaultProps = {
    componentClass: 'div',
  }
  observer: ObserverInterface;
  domRef: ?HTMLElement;

  constructor (...args: any) {
    super(...args)
    const { onResize } = this.props
    this.observer = ((new Observer((entries) => {
      for (let entry of entries) {
        entry = ((entry: any): entryType)
        if (entry.target === this.domRef) {
          // fire the onResize event
          onResize(entry)
          break;
        }
      }
    }): any): ObserverInterface)
  }
  componentDidMount () {
    const { innerDomRef } = this.props
    this.attachObserver()
    innerDomRef && innerDomRef(this.domRef)
  }
  componentWillUnmount () {
    this.detachObserver()
  }
  render () {
    const { children, componentClass: Component, onResize, innerDomRef, ...otherProps } = this.props
    return <Component {...otherProps} ref={this.setDomRef}>
      {children}
    </Component>
  }

  setDomRef = (ref: ?HTMLElement): void => {
    this.domRef = ref
  }
  attachObserver = (): void => {
    this.observer.observe(this.domRef)
  }

  detachObserver = (): void => {
    this.observer.unobserve(this.domRef)
  }
}

export default ResizeObserver
