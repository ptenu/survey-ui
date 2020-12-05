import React from 'react'


class SingleChoiceField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }

        this.update = this.update.bind(this)
    }

    componentDidMount() {
        this.setState({
            value: this.props.value || ''
        })
    }

    update(e) {
        let new_value = e.target.value
        this.setState({value: new_value})
        this.props.updateValue(new_value)
    }

    render() {
        let keys = Object.keys(this.props.options)
        const options = keys.map((key) => {
            if (keys.length <= 5) {
                return (
                    <div className="tg-checkbox" key={key}>
                        <input type="radio"
                               value={key}
                               name={this.props.name}
                               onChange={this.update}
                               checked={key === this.state.value}
                        />
                        <label>{this.props.options[key]}</label>
                    </div>
                )
            }

            return (
                <option key={key}
                        value={key}>
                    {this.props.options[key]}
                </option>
            )
        })

        return (
            <fieldset className="tg-field">
                {keys.length > 5 && (
                    <select style={{maxWidth: "600px"}}
                            onChange={this.update}
                            defaultValue={this.props.value}
                    >
                        <option value="">-- Pick one --</option>
                        {options}
                    </select>
                )}

                {keys.length <= 5 && (
                    <div>
                        <p className="hint">Pick one option</p>
                        {options}
                    </div>
                )}
            </fieldset>
        )
    }
}

export default SingleChoiceField