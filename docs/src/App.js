import React from "react"
import ResizeObserver from "./../../src"

import { hot } from 'react-hot-loader'

class App extends React.Component {
  state = {
    contentRect: null
  }
  handleResize = ({ target, contentRect }) => {
    this.setState({
      contentRect: JSON.stringify(contentRect),
    })
  }
  render () {
    const { contentRect } = this.state
    return <div>
      <div className="hero text-center">
        <h1>
          A react component to observe resizing of a DOM component
        </h1>
        <p className='text-center'>Element with background color is wrapped inside Resize Observer component</p>
      </div>
      <textarea placeholder='resize it. this will NOT trigger the resizing of out element.'></textarea>
      <div style={{ display: 'flex'}}>
        <div style={{
          maxWidth: '50%',
        }}>
          <textarea placeholder='resize it. this is an side element to our resizer observer' style={{ maxWidht: '100%'}}></textarea>
        </div>
        <div style={{
          flex: 1,
        }}>
          <ResizeObserver
            style={{
              background: 'gainsboro'
            }}
            onResize={this.handleResize}>
            <textarea placeholder='resize it. this is inside our resize observer'></textarea>
            <div>
              {contentRect}
            </div>
          </ResizeObserver>
        </div>
      </div>
    </div>
  }
}

export default hot(module)(App)
