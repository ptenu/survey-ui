import React from 'react'


class DefaultField extends React.Component {
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
        return (
            <fieldset className="tg-field">
                <input type={this.props.type}
                       data-width={this.props["data-width"]}
                       value={this.state.value}
                       onInput={this.update} />
            </fieldset>
        )
    }
}

export default DefaultField