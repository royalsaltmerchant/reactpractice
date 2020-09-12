import React from 'react'

var url = 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco&units=imperial&appid=6b04193aa2d1531aa6072e2ba7eca3c8';

class GiveWeather extends React.Component {
    constructor() {
        super()
        this.state = {
            classouter: 'none',
            classinner: 'none',
            classoutli: 'none',
            tog: 'off',
            name: '',
            coordlon: '',
            coordlat: '',
            weatherid: '',
            weathermain: '',
            weatherdescription: '',
            weathericon: '',
            weatherbase: '',
            maintemp: '',
            mainfeelslike: '',
            maintempmin: '',
            maintempmax: '',
            mainpressure: '',
            mainhumidity: '',
            visibility: '',
            windspeed: '',
            winddeg: '',
            cloudsall: '',
            dt: '',
            systype: '',
            sysid: '',
            syscountry: '',
            syssunrise: '',
            syssunset: '',
            timezone: '',
            id: '',
            cod: ''
        }
    this.myClick = this.myClick.bind(this)
    }

    componentDidMount() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    name: [data['name']],
                    coordlon: [data['coord']['lon']],
                    coordlat: [data['coord']['lat']],
                    weatherid: [data['weather'][0]['id']],
                    weathermain: [data['weather'][0]['main']],
                    weatherdescription: [data['weather'][0]['description']],
                    weathericon: [data['weather'][0]['icon']],
                    maintemp: [data['main']['temp']],
                    mainfeelslike: [data['main']['feels_like']],
                    maintempmin: [data['main']['temp_min']],
                    maintempmax: [data['main']['temp_max']],
                    mainpressure: [data['main']['pressure']],
                    mainhumidity: [data['main']['pressure']],
                    visibility: [data['visibility']],
                    windspeed: [data['wind']['speed']],
                    winddeg: [data['wind']['deg']],
                    cloudsall: [data['clouds']['all']],
                    dt: [data['dt']],
                    systype: ['sys'['type']],
                    sysid: [data['sys']['id']],
                    syscountry: [data['sys']['country']],
                    syssunrise: [data['sys']['sunrise']],
                    syssunset: [data['sys']['sunset']],
                    timezone: [data['timezone']],
                    id: [data['id']],
                    cod: [data['cod']]

                })
            })
    }

myClick() {
    if (this.state.tog === 'off') {
        this.setState({
            tog: 'on',
            classouter: 'outer',
            classinner: 'inner',
            classoutli: 'outli'
        })
    } else {
        this.setState({
            tog: 'off',
            classouter: 'none',
            classinner: 'none',
            classoutli: 'none'
        })
    }
}

    render() {
        return (
            <div>
                <div className="buttoning">
                <button onClick={this.myClick}>Get Weather</button>
                </div>
                <div>
                    <ul className={this.state.classouter}>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Name: ' + this.state.name : null}</li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Coordinates:' : null}
                        <ul className={this.state.classinner}>
                            <li>{this.state.tog === "on" ? 'longitude: ' + this.state.coordlon : null}</li>
                            <li>{this.state.tog === "on" ? 'Latitude: ' + this.state.coordlat : null}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Weather:' : null}
                        <ul className={this.state.classinner}>
                            <li>{this.state.tog === "on" ? 'ID: ' + this.state.weatherid : null}</li>
                            <li>{this.state.tog === "on" ? 'Main: ' + this.state.weathermain : null}</li>
                            <li>{this.state.tog === "on" ? 'Description: ' + this.state.weatherdescription : null}</li>
                            <li>{this.state.tog === "on" ? 'Icon: ' + this.state.weathericon : null}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Main:' : null}
                        <ul className={this.state.classinner}>
                            <li>{this.state.tog === "on" ? 'Temp: ' + this.state.maintemp : null}</li>
                            <li>{this.state.tog === "on" ? 'Feels_Like: ' + this.state.mainfeelslike : null}</li>
                            <li>{this.state.tog === "on" ? 'Temp_Min: ' + this.state.maintempmin : null}</li>
                            <li>{this.state.tog === "on" ? 'Temp_Max: ' + this.state.maintempmax : null}</li>
                            <li>{this.state.tog === "on" ? 'Pressure: ' + this.state.mainpressure : null}</li>
                            <li>{this.state.tog === "on" ? 'Humdiity: ' + this.state.mainhumidity : null}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Visibility: ' + this.state.visibility : null}</li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Wind:' : null}
                        <ul className={this.state.classinner}>
                            <li>{this.state.tog === "on" ? 'Speed: ' + this.state.coordlon : null}</li>
                            <li>{this.state.tog === "on" ? 'Deg: ' + this.state.coordlat : null}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Clouds:' : null}
                        <ul className={this.state.classinner}>
                            <li>{this.state.tog === "on" ? 'All: ' + this.state.cloudsall : null}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'DT: ' + this.state.dt : null}</li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Sys:' : null}
                        <ul className={this.state.classinner}>
                            <li>{this.state.tog === "on" ? 'Type: ' + this.state.systype : null}</li>
                            <li>{this.state.tog === "on" ? 'ID: ' + this.sys.sysid : null}</li>
                            <li>{this.state.tog === "on" ? 'Country: ' + this.state.syscountry : null}</li>
                            <li>{this.state.tog === "on" ? 'Sunrise: ' + this.state.syssunrise : null}</li>
                            <li>{this.state.tog === "on" ? 'Sunset: ' + this.state.syssunset : null}</li>
                        </ul>
                        </li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Timezone: ' + this.state.timezone : null}</li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'ID: ' + this.state.id : null}</li>
                        <br/>
                        <li className={this.state.classoutli}>{this.state.tog === "on" ? 'Cod: ' + this.state.cod : null}</li>
                        <br/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default GiveWeather;