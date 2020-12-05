import React from 'react'


class PostCodeField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            incode: '',
            outcode: ''
        }

        this.update = this.update.bind(this)
    }

    componentDidMount() {
        if (this.props.value == null) {
            return
        }
        let string = this.props.value.split(" ")
        this.setState({
            outcode: string[0],
            incode: string[1]
        })
    }

    update(e) {
        let part = e.target.name
        let new_value = e.target.value
        this.setState({
            [part]: new_value
        })

        let post_code = ''
        if (part === 'incode') {
            post_code = `${this.state.outcode} ${new_value}`.toUpperCase()
        } else {
            post_code = `${new_value} ${this.state.outcode}`.toUpperCase()
        }

        this.props.updateValue(post_code)
    }

    render() {
        return (
            <fieldset className="tg-field">
                <p className="hint">Example: PE1 1HF</p>
                <input type={this.props.type}
                       name="outcode"
                       data-width={4}
                       value={this.state.outcode}
                       onInput={this.update} />
                <input type={this.props.type}
                       name="incode"
                       data-width={3}
                       value={this.state.incode}
                       onInput={this.update} />
            </fieldset>
        )
    }
}

export default PostCodeField