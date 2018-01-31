import React, {Component} from 'react'

import Steps from 'awesome-steps'
import 'awesome-steps/dist/style.css'

export default class App extends Component {
    render() {
        return (
            <div>
                <Steps current={1} labelPlacement="vertical" direction="horizontal">
                    <Steps.Step title="first" description="description" upperTitle="Upper title"/>
                    <Steps.Step title="second" description="description" upperTitle="Upper title 234"/>
                    <Steps.Step title="third" description="description" upperTitle="Upper title 3424"/>
                </Steps>
            </div>
        )
    }
}
