const scaleNames = {
    c: 'celsius',
    f: 'fahrenheit'
}

function BoilingVerdict ({celsius}) {
    
    if(celsius >= 100) {
        return <div className="alert alert-success">L'eau bout</div>
    } else {
        return <div className="alert alert-info">L'eau ne bout pas</div>
    }
}

function toCelsius (far) {
    return (far -32) * 5 / 9
}

function toFar (celsius) {
    return (celsius * 9 / 5) + 32
}

class TemperatureInput extends React.Component {

    constructor (props) {
        super(props)
    }

    handleChange (e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render () {
        const name = "scale" + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div className="form-group mb-5">
                <label className="mr-2">Temperature (en {scaleName})</label>
                <input type="number" id={name} className="form-control" value={this.props.temperature} onChange={this.handleChange.bind(this)}/>
        </div>
    }
}

class Calculator extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: ''
        }
    }

    handleCelsiusChange (temperature) {
        this.setState({
            scale: 'c',
            temperature
        })
    }

    handleFarChange (temperature) {
        this.setState({
            scale: 'f',
            temperature
        })
    }

    render () {
        const temperature = this.state.temperature
        const scale = this.state.scale
        const celsius = scale === 'c' ? temperature : toCelsius(temperature)
        const far = scale === 'f' ? temperature : toFar(celsius)
        return <div>
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange.bind(this)}/>
            <TemperatureInput scale="f" temperature={far} onTemperatureChange={this.handleFarChange.bind(this)}/>
            <BoilingVerdict celsius={celsius} />
        </div>
    }
}


ReactDOM.render(<Calculator/>, document.getElementById('app'));