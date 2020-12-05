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
        if (current === (this.questions.length-1)) {
            return
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
                    <div>
                        <FieldComponent {...props}
                                        key={this.state.currentQuestion}
                                        updateValue={this.updateField}
                                        options={options}
                                        name={question["field"]}
                                        value={this.state.values[question["field"]]} />
                    </div>
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