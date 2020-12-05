import React from 'react';


class StartPage extends React.Component {

    render() {
        return (
            <article>
                <header>
                    <h2>Before you start</h2>
                </header>
                <section>
                    <p>
                        Welcome to our annual housing survey.
                    </p>
                    <p>
                        The purpose of this survey is to help us understand how people live in Peterborough, how much it
                        costs them, and if they're satisfied with their situation.
                    </p>
                    <p>
                        The survey is anonymous, we don't store any information that could be used to identify you.
                    </p>
                    <blockquote>
                        <p>
                            This should take about 5-7 minutes.
                        </p>
                        <p>
                            Don't use your browser's back button once you click start.
                        </p>
                    </blockquote>
                </section>
                <footer>
                    <button className="color-green" onClick={this.props.onNext}>Start</button>
                </footer>
            </article>
        )
    }

}

export default StartPage