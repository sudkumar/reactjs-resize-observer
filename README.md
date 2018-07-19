# Counter

### Installation

```shell
$ npm install --save reactjs-resize-observer
```

### Usage

```javascript
import ResizeObserver from "reactjs-resize-observer"

const MyComponent = () => {
  return <ResizeObserver onResize={({ target, { width, height, top, left, right, bottom, x, y } }) => {
    console.log(width, height)
    }}>
    A component which needs to do something when container resizes
  </ResizeObserver>
}

```

### Props

```javascript
// @flow
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
}
type Props = {
  children: React.Node,
  componentClass: string,
  innerDomRef: (ref: ?HTMLElement) => void,
  onResize: (entry: entryType) => void,
}

defaultProps = {
  componentClass: 'div',
}

```
