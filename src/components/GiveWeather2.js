import React from 'react'

//main var for fetch url 
var url = '';

//class and bind
class GiveWeather2 extends React.Component {
    constructor() {
        super()
        this.state = {
            tog: 'off',
            loading: false,
            buttontext: 'Get Weather',
            unitprompt: false
        }
    this.myClick = this.myClick.bind(this)
    this.onChangeValue = this.onChangeRadio.bind(this)
    }
//

//Events
onChangeRadio(event) {
    console.log(event.target.value)
    if(event.target.value === 'fahrenheit') {
        url = 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco&units=imperial&appid=6b04193aa2d1531aa6072e2ba7eca3c8'
    }
    else if(event.target.value === 'celsius') {
        url = 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco&units=metric&appid=6b04193aa2d1531aa6072e2ba7eca3c8'
    }
    else if(event.target.value === 'kelvin') {
        url = 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco&appid=6b04193aa2d1531aa6072e2ba7eca3c8'
    }
}

myClick() {
    console.log(this.state.tog)
    console.log(this.state.unitprompt)
    if(this.state.unitprompt === false && url === '') {
        this.setState({
            unitprompt: true
        })
    }
    else if (this.state.unitprompt === true) {
        this.setState({
            unitprompt: false
        })
    }

    if(this.state.tog === "off" && url !== '') {
        this.setState({
            tog: 'on',
            loading: true,
            buttontext: 'Stop Weather',
        })
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    name: [data['name']],
                    coordlon: [data['coord']['lon']],
                    coordlat: [data['coord']['lat']],
                    weatherid: [data['weather'][0]['id']],
                    weathermain: [data['weather'][0]['main']],
                    weatherdescription: [data['weather'][0]['description']],
                    weathericon: [data['weather'][0]['icon']],
                    base: [data['base']],
                    maintemp: [data['main']['temp']],
                    mainfeelslike: [data['main']['feels_like']],
                    maintempmin: [data['main']['temp_min']],
                    maintempmax: [data['main']['temp_max']],
                    mainpressure: [data['main']['pressure']],
                    mainhumidity: [data['main']['humidity']],
                    visibility: [data['visibility']],
                    windspeed: [data['wind']['speed']],
                    winddeg: [data['wind']['deg']],
                    cloudsall: [data['clouds']['all']],
                    dt: [data['dt']],
                    systype: [data['sys']['type']],
                    sysid: [data['sys']['id']],
                    syscountry: [data['sys']['country']],
                    syssunrise: [data['sys']['sunrise']],
                    syssunset: [data['sys']['sunset']],
                    timezone: [data['timezone']],
                    thisid: [data['id']],
                    cod: [data['cod']]

                })
            })

    } else if (this.state.tog === 'on') {
        this.setState({
            tog: 'off',
            buttontext: 'Get Weather',
            unitprompt: false
        })
    }
}
//end of events
//Render
    render() {
//prereturn
        var imgurl = 'http://openweathermap.org/img/wn/' + this.state.weathericon + '@2x.png';
        let chooseunit = {
            display: 'none'
        }
        let toggleStyle = {
            display: 'none'
        }
        let loadinginfo = {
            display: 'none',
        }

        if(this.state.unitprompt === true) {
            chooseunit = {
                display: 'block'
            }
        }

        if(this.state.loading === true) {
            loadinginfo = {
                display: 'block'
            }
        }
        else if(this.state.tog === "on" && url !== '') {
            toggleStyle = {
                display: 'flex'
            }

        }
//end prereturn
//return
        return (
            <div>
                
                <div className="buttoning">
                <button onClick={this.myClick}>{this.state.buttontext}</button>
                <br/>
                
                <div className="radiounits" onChange={this.onChangeRadio}>
                    <div>
                    <label htmlFor="fahrenheit">Fahrenheit</label>
                        <input type="radio" name="units" value="fahrenheit"> 
                        </input>
                    </div>
                    <div>
                    <label htmlFor="celsius">Celsius</label>
                        <input type="radio" name="units" value="celsius"> 
                        </input>
                    </div>
                    <div>
                    <label htmlFor="kelvin">Kelvin</label>
                        <input type="radio" name="units" value="kelvin"> 
                        </input>
                    </div>
                    <p className="chooseunitstyle" style={chooseunit}>*Please choose a unit of measurement</p>
                </div>

                <p className="loadinginfo" style={loadinginfo}>Loading...</p>
                </div>

                <div style={toggleStyle}>
                <ul className="outer">
                        <li className="outli">Name: {this.state.name}</li>
                        <br/>
                        <li className="outli">Coordinates: 
                        <ul className="inner">
                            <li>longitude: {this.state.coordlon}</li>
                            <li>Latitude: {this.state.coordlat}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className="outli">Weather: 
                        <ul className="inner">
                            <li>ID: {this.state.weatherid}</li>
                            <li>Main: {this.state.weathermain}</li>
                            <li>Description: {this.state.weatherdescription}</li>
                            <li><img src={imgurl} alt="icon"></img></li>
                        </ul>
                        </li>
                        <br/>
                        <li className="outli">Temperature: 
                        <ul className="inner">
                            <li>Temp: {this.state.maintemp}</li>
                            <li>Feels_Like: {this.state.mainfeelslike}</li>
                            <li>Temp_Min: {this.state.maintempmin}</li>
                            <li>Temp_Max: {this.state.maintempmax}</li>
                            <li>Pressure: {this.state.mainpressure}</li>
                            <li>Humdity: {this.state.mainhumidity}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className="outli">Visibility: {this.state.visibility}</li>
                        <br/>
                        <li className="outli">Wind: 
                        <ul className="inner">
                            <li>Speed: {this.state.windspeed}</li>
                            <li>Deg: {this.state.winddeg}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className="outli">Clouds: 
                        <ul className="inner">
                            <li>All: {this.state.cloudsall}</li>
                        </ul>
                        </li>
                        <br/>
                        {/* <li className="outli">Sys: 
                        <ul className="inner">
                            <li>Type: {this.state.systype}</li>
                            <li>ID: {this.state.sysid}</li>
                            <li>Country: {this.state.syscountry}</li>
                            <li>Sunrise: {this.state.syssunrise}</li>
                            <li>Sunset: {this.state.syssunset}</li>
                        </ul>
                        </li>
                        <br/> */}
                        <li className="outli">Timezone: {this.state.timezone}</li>
                        <br/>
                        <li className="outli">ID: {this.state.thisid}</li>
                        <br/>
                        {/*
                        <li className="outli">Cod: {this.state.cod}</li>
                        <br/> */}
                    </ul>
                </div>
                    
            </div>
        )
    }
}
//end return
//end render
//export
export default GiveWeather2;