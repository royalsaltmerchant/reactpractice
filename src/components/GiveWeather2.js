import React from 'react'
import jsondata from './city.list.json'
import countryCodeData from './countrycode.json'
import stateCodeData from './statecode.json'

//url `&units=${this.state.units}&id=${this.state.city}`
let url = ''
let urlbase = 'http://api.openweathermap.org/data/2.5/weather?appid=6b04193aa2d1531aa6072e2ba7eca3c8'
let myCountry = ''
let myCity = ''
let myState = ''
//class and bind
class GiveWeather2 extends React.Component {
    constructor() {
        super()
        this.state = {
            toggle: 'off',
            loading: false,
            buttontext: 'Get Weather',
            unitprompt: false,
            city: '5391959',
            units: ''
        }
    this.myClick = this.myClick.bind(this)
    this.onChangeRadio = this.onChangeRadio.bind(this)
    this.onChangeCity = this.onChangeCity.bind(this)
    this.onChangeCountry = this.onChangeCountry.bind(this)
    this.onChangeState = this.onChangeState.bind(this)
    this.getId = this.getId.bind(this)
    }

//Events
onChangeRadio(event) {
    console.log(event.target.value)
    if(event.target.value === 'imperial') {
        this.setState({
            units: 'imperial'
        })
    }
    else if(event.target.value === 'celsius') {
        this.setState({
            units: 'metric'
        })
    }
}
onChangeCity(event) {
    let theirCity = event.target.value
    console.log(theirCity)
    for(var i = 0; i < jsondata.length; i++) {
        if(theirCity === jsondata[i]['name']) {
            myCity = jsondata[i]['name']
            console.log(myCity)
        }
    }
}
onChangeCountry(event) {
    let theirCountry = event.target.value
    console.log(theirCountry)
    for(var j = 0; j < countryCodeData.length; j++) {
        if(theirCountry === countryCodeData[j]["name"]) {
            myCountry = countryCodeData[j]["code"]
            console.log(myCountry)
        }
    }
}
onChangeState(event) {
    let theirState = event.target.value
    console.log(theirState)
    for(var y = 0; y < stateCodeData.length; y++) {
        if(theirState === stateCodeData[y]["name"]) {
            myState = stateCodeData[y]["abbreviation"]
            console.log(myState)
        }
    }
}
getId() {
    let cityId = ''
    for(var i = 0; i < jsondata.length; i++) {
        if(myCountry === jsondata[i]['country'] && myCity === jsondata[i]['name'] && myState === jsondata[i]['state']) {
            cityId = jsondata[i]['id']
            console.log(cityId)
            this.setState({
                city: cityId
            }, () => {
                url = urlbase + `&id=${this.state.city}&units=${this.state.units}`
            })
        }
    } 
}
myClick() {
    this.getId()
    console.log(this.state.toggle)
    console.log(this.state.unitprompt)
    if(this.state.unitprompt === false && this.state.units === '') {
        this.setState({
            unitprompt: true
        })
    }
    else if (this.state.unitprompt === true) {
        this.setState({
            unitprompt: false
        })
    }

    if(this.state.toggle === "off" && url !== '' && this.state.units !== '') {
        this.setState({
            toggle: 'on',
            loading: true,
            buttontext: 'Stop Weather'
        },
        () => {fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
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
        })

    } else if (this.state.toggle === 'on') {
        this.setState({
            toggle: 'off',
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
            display: 'none'
        }
        let inputInfo = {
            display: ''
        }

        if(this.state.unitprompt === true) {
            chooseunit = {
                display: 'block'
            }
        }
        if(this.state.loading === true) {
            loadinginfo = {
                display: 'flex'
            }
        }
        if(this.state.buttontext === 'Stop Weather') {
            inputInfo = {
                display: 'none'
            }
        }
        if(this.state.toggle === "on" && url !== '') {
            toggleStyle = {
                display: 'flex'
            }

        }
//end prereturn
//return
        return (
            <div>
                
                <div className="getweatherdiv">
                <button className="getweather" onClick={this.myClick}>{this.state.buttontext}</button>
                <br/>
                </div>
                <div className="inputinfo" style={inputInfo}>
                <p className="example">Example:</p>
                <p className="example">San Francisco: United States: California</p>
                <div className='form' onChange={this.onChangeCity}>
                    <label htmlFor="cityinput">City Name: </label>
                    <textarea name="cityinput" rows="1" cols="30">
                    </textarea>
                </div>
                <br/>
                <div className='form' onChange={this.onChangeCountry}>
                    <label htmlFor="countryinput">Country Name: </label>
                    <textarea name="countryinput" rows="1" cols="30">
                    </textarea>
                </div>
                <br/>
                <div className='form' onChange={this.onChangeState}>
                    <label htmlFor="stateinput">State Name: </label>
                    <textarea name="stateinput" rows="1" cols="30">
                    </textarea>
                    <p>*Case Sensitive</p>
                </div>
                <br/>
                <div className="radiounits" onChange={this.onChangeRadio}>
                    <div>
                    <label htmlFor="fahrenheit">Fahrenheit</label>
                        <input type="radio" name="units" value="imperial"> 
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
                </div>
                <p className="loadinginfo" style={loadinginfo}>Loading...</p>

                <div className="maindiv" style={toggleStyle}>
                <ul className="outer">
        <li className="name"><p>{this.state.name}</p><p>{this.state.syscountry}</p><p>{myState}</p></li>
                        {/* <li className="coordinates">Coordinates: 
                        <ul className="inner">
                            <li>longitude: {this.state.coordlon}</li>
                            <li>Latitude: {this.state.coordlat}</li>
                        </ul>
                        </li> */}
                        <br/>
                        <li className="temperature"> 
                        <ul className="inner">
                            <li className="maintemperature">{this.state.maintemp}°</li>
                            <li>Feels_Like: {this.state.mainfeelslike}°</li>
                            <li>Temp_Min: {this.state.maintempmin}°</li>
                            <li>Temp_Max: {this.state.maintempmax}°</li>
                            <li>Pressure: {this.state.mainpressure}</li>
                            <li>Humdity: {this.state.mainhumidity}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className="weather">
                        <ul className="inner">
                            {/* <li>ID: {this.state.weatherid}</li> */}
                            {/* <li>Main: {this.state.weathermain}</li> */}
                            <li>{this.state.weatherdescription}</li>
                            <li><img src={imgurl} alt="icon"></img></li>
                        </ul>
                        </li>
                        <br/>
                        {/* <li className="visibility">Visibility: {this.state.visibility}</li>
                        <br/> */}
                        {/* <li className="wind">Wind: 
                        <ul className="inner">
                            <li>Speed: {this.state.windspeed}</li>
                            <li>Deg: {this.state.winddeg}</li>
                        </ul>
                        </li> */}
                        {/* <br/>
                        <li className="clouds">Clouds: 
                        <ul className="inner">
                            <li>All: {this.state.cloudsall}</li>
                        </ul>
                        </li> */}
                        {/* <br/>
                        <li className="outli">Sys: 
                        <ul className="inner">
                            <li>Type: {this.state.systype}</li>
                            <li>ID: {this.state.sysid}</li>
                            <li>Country: {this.state.syscountry}</li>
                            <li>Sunrise: {this.state.syssunrise}</li>
                            <li>Sunset: {this.state.syssunset}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className="outli">Timezone: {this.state.timezone}</li>
                        <br/>
                        <li className="outli">ID: {this.state.thisid}</li>
                        <br/>
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