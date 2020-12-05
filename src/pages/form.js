import React from 'react';

import DefaultField from "../fields/default";
import PostCodeField from "../fields/postCodeField";
import SingleChoiceField from "../fields/singleChoice";

class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0,
            values: {}
        }

        this.questions = this.props.questions

        this.fields = {
            PostCodeField: PostCodeField,
            SingleChoiceField: SingleChoiceField
        }

        this.back = this.back.bind(this)
        this.next = this.next.bind(this)
        this.updateField = this.updateField.bind(this)
    }

    componentDidMount() {
        this.setState({
            values: this.props.fields
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentQuestion === this.state.currentQuestion) {
            return
        }

        let question = this.questions[this.state.currentQuestion]

        if ("if_or" in question) {
            let display = false
            for (let i = 0; i < question["if_or"].length; i++) {
                let condition = question["if_or"][i]
                let test_value = this.props.fields[condition["field"]]
                if (test_value === condition["value"]) {
                    display = true
                }
            }

            if (!display) {
                let current = this.state.currentQuestion
                if (current === (this.questions.length - 1)) {
                    this.props.onNext(null)
                }
                this.setState({
                    currentQuestion: current + 1,
                })
            }
        }
    }

    back(e) {
        let current = this.state.currentQuestion
        if (current === 0) {
            this.props.onBack(e)
        }
        this.setState({
            currentQuestion: current - 1
        })
    }

    next(e) {
        let current = this.state.currentQuestion
        let field = this.questions[current]["field"]
        this.props.updateField(
            field,
            this.state.values[field] || ''
        )
        if (current === (this.questions.length - 1)) {
            this.props.onNext(e)
        }
        this.setState({
            currentQuestion: current + 1,
        })
    }

    updateField(value) {
        let v = this.state.values
        let current = this.state.currentQuestion
        let field = this.questions[current]["field"]
        v[field] = value
        this.setState({
            values: v
        })
    }

    render() {
        let question = this.questions[this.state.currentQuestion]

        let FieldComponent = DefaultField
        if (question["component"] in this.fields) {
            FieldComponent = this.fields[question["component"]]
        }

        let props = {}
        if ("props" in question) {
            props = question["props"]
        }

        let options = {}
        if ("options" in question) {
            options = question["options"]
        }

        return (
            <article>
                <header>
                    <h2>{question["label"]}</h2>
                </header>
                <section style={{minHeight: '250px'}}>
                    <p>
                        {question["descr"]}
                    </p>
                    <FieldComponent {...props}
                                    key={this.state.currentQuestion}
                                    updateValue={this.updateField}
                                    options={options}
                                    name={question["field"]}
                                    value={this.props.fields[question["field"]]}
                    />
                </section>
                <footer>
                    <button onClick={this.back}>Back</button>
                    <button className="color-green" onClick={this.next}>Next</button>
                </footer>
            </article>
        )
    }

}

export default FormPage