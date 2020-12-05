import React from 'react';

import './scss/style.scss';

// Pages
import StartPage from "./pages/start";
import FormPage from "./pages/form";
import SummaryPage from "./pages/summary";

// Base url

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            questions: [],
            fields: {},
            errors: [],
            base_url: process.env.REACT_APP_DOMAIN
        }

        this.pages = [
            StartPage,
            FormPage,
            SummaryPage
        ]

        this.back = this.back.bind(this)
        this.next = this.next.bind(this)
        this.get_questions = this.get_questions.bind(this)
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        this.get_questions()
    }

    back(e) {
        let current = this.state.currentPage
        if (current === 0) {
            return
        }
        this.setState({
            currentPage: current - 1
        })
    }

    next(e) {
        let current = this.state.currentPage
        if (current === (this.pages.length-1)) {
            return
        }
        this.setState({
            currentPage: current + 1
        })
    }

    get_questions() {
        fetch(`${process.env.REACT_APP_DOMAIN}/`).then((response) => {
            if (response.status !== 200) {
                this.setState({
                    errors: ["There was an issue connecting to the survey system. Please try again in 5-10 minutes."]
                })
                return
            }

            response.json().then((data) => {
                this.setState({
                    questions: data["questions"]
                })
            })

        })
    }

    update(field, value) {
        let fields = this.state.fields
        fields[field] = value
        this.setState({
            fields: fields
        })
    }

    render() {
        let Page = this.pages[this.state.currentPage]

        return (
            <div id="ptu_survey">
                <Page onBack={this.back}
                      onNext={this.next}
                      questions={this.state.questions}
                      fields={this.state.fields}
                      updateField={this.update}
                />
            </div>
        )
    }
}


export default App;
