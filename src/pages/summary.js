import React from 'react'

import PostCodeField from "../fields/postCodeField";
import SingleChoiceField from "../fields/singleChoice";
import DefaultField from "../fields/default";

class SummaryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editField: '',
            loading: false,
            sent: false,
            sub_id: ''
        }

        this.fields = {
            PostCodeField: PostCodeField,
            SingleChoiceField: SingleChoiceField
        }

        this.edit = this.edit.bind(this)
        this.updateField = this.updateField.bind(this)
        this.send = this.send.bind(this)
    }

    edit(e) {
        this.setState({
            editField: e.target.name
        })
    }

    updateField(value) {
        this.props.updateField(this.state.editField, value)
    }

    send() {
        this.setState({
            loading: true
        })

        fetch(`${process.env.REACT_APP_DOMAIN}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.fields),
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                sub_id: data["id"]
            })
        })

        this.setState({
            loading: false,
            sent: true
        })
    }

    render() {
        const rows = this.props.questions.map((question) => {
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
                    return
                }
            }

            let value = this.props.fields[question["field"]]
            if ("options" in question) {
                value = question["options"][value]
            }

            if (question["field"] === this.state.editField) {
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
                    <tr key={question["field"]}>
                        <td style={{width: "200px"}}>
                            <strong>{question["label"]}</strong>
                        </td>
                        <td>
                            <FieldComponent {...props}
                                            key={question["field"]}
                                            updateValue={this.updateField}
                                            options={options}
                                            name={question["field"]}
                                            value={this.props.fields[question["field"]]}
                            />
                        </td>
                        <td>
                            <a href="#" name="" onClick={this.edit}>Save</a>
                        </td>
                    </tr>
                )
            }

            return (
                <tr key={question["field"]}>
                    <td style={{width: "200px"}}>
                        <strong>{question["label"]}</strong>
                    </td>
                    <td>
                        {question["prefix"] || ''}{value}
                    </td>
                    <td>
                        <a href="#" name={question["field"]} onClick={this.edit}>Edit</a>
                    </td>
                </tr>
            )
        })

        return (
            <article>
                <header>
                    {this.state.sent && (
                        <h2>Thank you!</h2>
                    )}
                    {this.state.sent === false && (
                        <h2>Check your answers</h2>
                    )}
                </header>

                {this.state.sent && (
                    <section>
                        <p>
                            Your contribution really helps, thank you for your time.
                        </p>
                        <blockquote>
                            <p>
                                Anonymous Submission ID:
                            </p>
                            <h1>{this.state.sub_id}</h1>
                        </blockquote>
                        <p>
                            If you wish to remove your submission from our survey, please get in touch with this
                            ID and we will delete it.
                        </p>
                    </section>
                )}
                {this.state.sent === false && (
                    <p>
                        Please take a moment to check through your answers and update anything that doesn't look right.
                    </p>
                )}


                {this.state.sent === false && (
                    <table>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                )}

                {this.state.sent === false && (
                    <footer>
                        <p>
                            If you go back to the start, your answers will still be there.
                        </p>
                        <button onClick={this.props.onBack}>Back to first question</button>
                        <button className="color-green"
                                onClick={this.send}
                                disabled={this.state.loading}
                        >
                            Save & Finish
                        </button>
                    </footer>
                )}

            </article>
        )
    }
}

export default SummaryPage