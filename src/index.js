import React from 'react'
import ReactDOM from 'react-dom'
import GiveWeather from './components/GiveWeather.js'

class App extends React.Component {

  render() {
    return (
      <div>
        <GiveWeather/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));