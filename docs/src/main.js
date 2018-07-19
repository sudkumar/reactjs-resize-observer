import React from 'react'
import ReactDOM from "react-dom"

import App from './App'

function render (Component) {
  const mountNode = document.getElementById('root')
  ReactDOM.render(<Component />, mountNode)
}

render(App)
