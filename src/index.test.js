import React from "react"
import ReactDOM from "react-dom"
import ResizeObserver from "./"

test("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<ResizeObserver />, div)
})
