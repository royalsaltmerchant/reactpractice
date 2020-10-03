import React from 'react'
import Select from 'react-select'
import countryCodeData from './countrycode.json'
import stateCodeData from './statecode.json'

//url
const urlbase = 'http://api.openweathermap.org/data/2.5/weather?appid=6b04193aa2d1531aa6072e2ba7eca3c8'
const googleUrlBase = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCkzZnIUzlDVDEJ-aOKjOcKTPNLBdpGQHY&address='
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
            units: '',
            countrySelect: '',
            stateSelect: '',
            googleUrl: '',
            myCity: '',
            myCountry: '',
            myState: '',
            googleLat: '',
            googleLon: '',
            url: '',
        }
    this.myClick = this.myClick.bind(this)
    this.onChangeRadio = this.onChangeRadio.bind(this)
    this.onChangeCity = this.onChangeCity.bind(this)
    this.onChangeCountry = this.onChangeCountry.bind(this)
    this.onChangeState = this.onChangeState.bind(this)
    this.getLonLat = this.getLonLat.bind(this)
    this.getGoogle = this.getGoogle.bind(this)
    this.getUrl = this.getUrl.bind(this)
    }

//Events
onChangeCountry(event) {
    console.log(event)
    this.setState({
        countrySelect: event
    }, () => {
        if(event !== null) {
            this.setState({
                myCountry: event.value
            }, () => {
                console.log(this.state.myCountry)
             })
        } else if(event === null) {
            this.setState({
                myCountry: null
            })
        }
    })
}
onChangeState(event) {
    console.log(event)
    this.setState({
        stateSelect: event
    }, () => {
        if(event !== null) {
            this.setState({
                myState: event.value
            }, () => {
                console.log(this.state.myState)
            })
        }
    })
}
onChangeCity(event) {
    this.setState({
        myCity: event.target.value
    }, () => {
        console.log(this.state.myCity)
    })
}
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
myClick() {
    this.getLonLat()
    console.log(this.state.toggle)
    console.log(this.state.unitprompt)
}
getLonLat() {
    if(this.state.myState === '' && this.state.myCountry !== '') {
        this.setState({
            googleUrl: `${googleUrlBase}${this.state.myCity},+${this.state.myCountry}`
        }, () => {
            console.log(this.state.googleUrl)
            this.getGoogle()
        })
    }
    else if(this.state.myState !== '') {
        this.setState({
            googleUrl: `${googleUrlBase}${this.state.myCity},+${this.state.myState}`
        }, () => {
            console.log(this.state.googleUrl)
            this.getGoogle()
        })
    }
}
getGoogle() {
    fetch(this.state.googleUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    googleLat: data['results'][0]['geometry']['location']['lat'],
                    googleLon: data['results'][0]['geometry']['location']['lng']
                }, () => {
                    console.log(this.state.googleLat)
                    console.log(this.state.googleLon)
                    this.getUrl()
                })
            })
}
getUrl() {
    this.setState({
        url: `${urlbase}&lat=${this.state.googleLat}&lon=${this.state.googleLon}&units=${this.state.units}`
    }, () => {
        console.log(this.state.url)
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
    
        if(this.state.toggle === "off" && this.state.url !== '' && this.state.units !== '') {
            this.setState({
                toggle: 'on',
                loading: true,
                buttontext: 'Stop Weather'
            },
            () => {fetch(this.state.url)
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
    })
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
        let radioUnits = {
            display: 'none'
        }
        let countryForm = {
            display: ''
        }
        let stateForm = {
            display: 'none'
        }
        let cityForm = {
            display: 'none'
        }
        let getWeatherDiv = {
            display: 'none'
        }

        if(this.state.myCountry === 'US') {
            stateForm = {
                display: 'flex'
            }
        } else if(this.state.myCountry === null) {
            stateForm = {
                display: 'none'
            }
        }
        if(this.state.myCountry !== '' && this.state.myCountry !== 'US' && this.state.myCountry !== null) {
            cityForm = {
                display: 'flex'
            }
        }

        else if(this.state.myState !== '' && this.state.myState !== null) {
            cityForm = {
                display: 'flex'
            }
        }

        if(this.state.myCity !== '') {
            radioUnits = {
                display: 'flex'
            }
        }

        if(this.state.units !== '') {
            getWeatherDiv = {
                display: 'flex'
            }
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
        if(this.state.toggle === "on" && this.state.url !== '') {
            toggleStyle = {
                display: 'flex'
            }

        }
//end prereturn
//return
        return (
            <div>
                
                <div className="getweatherdiv" style={getWeatherDiv}>
                <button className="getweather" onClick={this.myClick}>{this.state.buttontext}</button>
                <br/>
                </div>
                <div className="inputinfo" style={inputInfo}>
                <div className="countryform" style={countryForm}>
                    <label htmlFor="countryinput">Country Name: </label>
                    <Select name="countryinput" value={this.state.countrySelect} onChange={this.onChangeCountry} options={countryCodeData} isClearable={true}/>
                </div>
                <br/>
                <div className='stateform' style={stateForm}>
                    <label htmlFor="stateinput">State Name: </label>
                    <Select name="stateinput" value={this.state.stateSelect} onChange={this.onChangeState} options={stateCodeData} isClearable={true}/>
                </div>
                <br/>
                <div className='cityform' style={cityForm} onChange={this.onChangeCity}>
                    <label htmlFor="cityinput">City Name: </label>
                    <textarea name="cityinput" rows="1" cols="30">
                    </textarea>
                </div>
                <br/>
                <div className="radiounits" style={radioUnits} onChange={this.onChangeRadio}>
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
        <li className="name"><p>{this.state.name}</p><p>{this.state.syscountry}</p><p>{this.state.myState}</p></li>
                        <li className="coordinates">Coordinates: 
                        <ul className="inner">
                            <li>longitude: {this.state.coordlon}</li>
                            <li>Latitude: {this.state.coordlat}</li>
                        </ul>
                        </li>
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