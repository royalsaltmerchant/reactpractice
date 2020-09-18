import React from 'react'
import ReactDOM from 'react-dom'
//import GiveWeather from './components/GiveWeather.js'
import GiveWeather2 from './components/GiveWeather2.js';

class App extends React.Component {

  render() {
    return (
      <div>
        <GiveWeather2/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));