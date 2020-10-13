import React from 'react'
import Select from 'react-select'
import countryCodeData from './countrycode.json'
import stateCodeData from './statecode.json'

//url

const urlbase = 'http://api.openweathermap.org/data/2.5/weather?appid=6b04193aa2d1531aa6072e2ba7eca3c8'
const googlePredictionUrlBase = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&key=AIzaSyDDWFmvc22fxUIqYAG3DNI9y9clzXbWdAY'
const googleUrlBase = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCkzZnIUzlDVDEJ-aOKjOcKTPNLBdpGQHY&address='
//class and bind
class GiveWeather2 extends React.Component {
    constructor() {
        super()
        this.state = {
            toggle: 'off',
            loading: false,
            buttontext: 'Get Weather',
            city: '5391959',
            units: '',
            countrySelect: '',
            stateSelect: '',
            citySelect: null,
            googleUrl: '',
            myCity: '',
            theirCity: '',
            myCountry: '',
            myState: '',
            googleLat: '',
            googleLon: '',
            url: '',
            googleLocation: '',
            predictions: [],
            predictionOptions: []
        }
    this.myClick = this.myClick.bind(this)
    this.onChangeRadio = this.onChangeRadio.bind(this)
    this.onChangeCityA = this.onChangeCityA.bind(this)
    this.onChangeCityB = this.onChangeCityB.bind(this)
    this.onChangeCountry = this.onChangeCountry.bind(this)
    this.onChangeState = this.onChangeState.bind(this)
    this.getLonLat = this.getLonLat.bind(this)
    this.getGoogle = this.getGoogle.bind(this)
    this.getUrl = this.getUrl.bind(this)
    this.getLocationAuto = this.getLocationAuto.bind(this)
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
                myCountry: '',
                myState: '',
                theirCity: '',
                stateSelect: null,
                citySelect: null
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
                myState: event.value,
                myStateLabel: event.label
            }, () => {
                console.log(this.state.myState)
                this.setState({
                    googleUrl: googleUrlBase + this.state.myStateLabel
                }, () => {
                    console.log(this.state.googleUrl)
                    fetch(this.state.googleUrl)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        this.setState({
                            googleStateLat: data['results'][0]['geometry']['location']['lat'],
                            googleStateLon: data['results'][0]['geometry']['location']['lng']
                        }, () => {
                            console.log(this.state.googleStateLat, this.state.googleStateLon)
                        })
                    })
                })
            })
        } else if(event === null) {
            this.setState({
                myState: null,
                theirCity: '',
                citySelect: null,
            })
        }
    })
}
onChangeCityA(event) {
    this.setState({
        theirCity: event.target.value
    }, () => {
        console.log(this.state.theirCity)
        if(this.state.theirCity !== '') {
        this.getLocationAuto()
        } else {
            this.setState({
                predictionOptions: []
            }, () => {
                console.log(this.state.predictionOptions)
            })
        }
    })
}
onChangeCityB(event) {
    if(event !== null) {
        this.setState({
            citySelect: event
        })
    } else {
        this.setState({
            citySelect: null
        })
    }
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
    console.log(this.state.citySelect)
}
getLonLat() {
    if(this.state.myState === '' && this.state.myCountry !== '') {
        this.setState({
            googleUrl: `${googleUrlBase}${this.state.citySelect.value},+${this.state.myCountry}`
        }, () => {
            console.log(this.state.googleUrl)
            this.getGoogle()
        })
    }
    else if(this.state.myState !== '') {
        this.setState({
            googleUrl: `${googleUrlBase}${this.state.citySelect.value},+${this.state.myState}`
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
            })
        }
    })
}
getLocationAuto() {
    this.setState({
        googleLocation: `${googlePredictionUrlBase}&components=country:${this.state.myCountry}&location=${this.state.googleStateLat},${this.state.googleStateLon}&radius=2000&input=${this.state.theirCity}`,
        predictions: []
    }, () => {
        console.log(this.state.googleLocation)
        fetch(this.state.googleLocation)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            for(var n = 0; n < data['predictions'].length; n++) {
                var predictions = [data['predictions'][n]['terms'][0].value]
                // console.log(predictions)
                this.setState({
                    predictions: [...this.state.predictions, predictions]
                }, () => {
                    this.setState({
                        predictionOptions: [
                                {
                                    "label": this.state.predictions[0],
                                    "value": this.state.predictions[0]
                                },
                                {
                                    "label": this.state.predictions[1],
                                    "value": this.state.predictions[1]
                                },
                                {
                                    "label": this.state.predictions[2],
                                    "value": this.state.predictions[2]
                                },
                                {
                                    "label": this.state.predictions[3],
                                    "value": this.state.predictions[3]
                                },
                                {
                                    "label": this.state.predictions[4],
                                    "value": this.state.predictions[4]
                                }
                        ]
                    })
                })
            }
        })
    })
}
//end of events
//Render
    render() {
        var imgurl = `http://openweathermap.org/img/wn/${this.state.weathericon}@2x.png`

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
        }
        if(this.state.myCountry !== '' && this.state.myCountry !== 'US' && this.state.myCountry !== null) {
            cityForm = {
                display: 'flex'
            }
        }
        if(this.state.myState !== '' && this.state.myState !== null) {
            cityForm = {
                display: 'flex'
            }
        }
        if(this.state.citySelect !== null) {
            radioUnits = {
                display: 'flex'
            }
        }
        if(this.state.units !== '' && this.state.citySelect !== null) {
            getWeatherDiv = {
                display: 'flex'
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
//return
        return (
            <div>
                
                <div className="inputinfo" style={inputInfo}>
                <div className="countryform" style={countryForm}>
                    <label htmlFor="countryinput">Country Name: </label>
                    <br/>
                    <Select name="countryinput" value={this.state.countrySelect} onChange={this.onChangeCountry} options={countryCodeData} isClearable={true}/>
                </div>
                <br/>
                <div className='stateform' style={stateForm}>
                    <label htmlFor="stateinput">State Name: </label>
                    <br/>
                    <Select name="stateinput" value={this.state.stateSelect} onChange={this.onChangeState} options={stateCodeData} isClearable={true}/>
                </div>
                <br/>
                <div className='cityform' style={cityForm} onChange={this.onChangeCityA}>
                    <label htmlFor="cityinput">City Name: </label>
                    <br/>
                    <Select name="cityinput" value={this.state.citySelect} onChange={this.onChangeCityB} options={this.state.predictionOptions} isClearable={true} placeholder="Type City Name..."/>
                </div>
                <br/>
                <div className="radiounits" style={radioUnits} onChange={this.onChangeRadio}>
                    <div>
                    <label htmlFor="fahrenheit">Fahrenheit</label><br/>
                        <input className="radiobutton" type="radio" name="units" value="imperial"> 
                        </input>
                    </div>
                    <br/>
                    <div>
                    <label htmlFor="celsius">Celsius</label><br/>
                        <input className="radiobutton" type="radio" name="units" value="celsius"> 
                        </input>
                    </div>
                </div>
                </div>
                <p className="loadinginfo" style={loadinginfo}>Loading...</p>

                <div className="maindiv" style={toggleStyle}>
                    <ul className="outer">
                        <li className="name">{this.state.name}</li>
                        <li className="name">{this.state.syscountry}</li>
                        <li className="name">{this.state.myState}</li>
                        <br/>
                        <li className="maintemperature">{this.state.maintemp}°</li>
                        <li>Feels_Like: {this.state.mainfeelslike}°</li>
                        <li>Temp_Min: {this.state.maintempmin}°</li>
                        <li>Temp_Max: {this.state.maintempmax}°</li>
                        <br/>
                        <li className="weather">{this.state.weatherdescription}</li>
                        <li className="weather"><img src={imgurl} alt="icon"></img></li>
                    </ul>
                </div>
                <br/>
                <div className="getweatherdiv" style={getWeatherDiv}>
                <button className="getweather" onClick={this.myClick}>{this.state.buttontext}</button>
                <br/>
                </div>    
            </div>
        )
    }
}
//end return
//end render
//export
export default GiveWeather2;