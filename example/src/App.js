import React, {Component} from 'react'

import Steps from 'awesome-steps'
import 'awesome-steps/dist/style.css'

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {current: 0, labelPlacement: "vertical", direction: "horizontal"};

    }


    handleStepClick = (stepNumber) => {
        this.setState({current: stepNumber})
    };

    setHorizontalLabelPlacement = () => {
        this.setState({labelPlacement: "horizontal"})

    };

    setVerticalLabelPlacement = () => {
        this.setState({labelPlacement: "vertical"})

    };


    setVerticalDirection = () => {
        this.setState({direction: "vertical"})

    };

    setHorizontalDirection = () => {
        this.setState({direction: "horizontal"})

    };

    render() {
        return (
            <div>
                <Steps current={this.state.current}
                       secondaryCurrent={1}
                       labelPlacement={this.state.labelPlacement}
                       direction={this.state.direction}>

                    <Steps.Step title="first" description="description" upperTitle="Upper title"
                                onClick={() => this.handleStepClick(0)}/>
                    <Steps.Step title="sub"
                                onClick={() => this.handleStepClick(0.01)}
                                subStep
                    />
                    <Steps.Step title="sub"
                                onClick={() => this.handleStepClick(0.02)}
                                subStep
                    />
                    <Steps.Step title="second" description="description" upperTitle="Upper title "
                                onClick={() => this.handleStepClick(1)}/>
                    <Steps.Step title="third" description="description" upperTitle="Upper title "
                                onClick={() => this.handleStepClick(2)}/>
                    <Steps.Step title="sub"
                                onClick={() => this.handleStepClick(2.01)}
                                subStep
                    />
                    <Steps.Step title="sub"
                                onClick={() => this.handleStepClick(2.02)}
                                subStep
                    />
                    <Steps.Step title="fourth" description="description"
                                onClick={() => this.handleStepClick(3)}/>
                    <Steps.Step title="sub"
                                onClick={() => this.handleStepClick(3.01)}
                                subStep
                    />
                </Steps>


                <br/><br/><br/><br/>

                <button onClick={this.setHorizontalLabelPlacement}>Horizontal label</button>
                <br/><br/>
                <button onClick={this.setVerticalLabelPlacement}>Vertical label</button>
                <br/><br/>
                <button onClick={this.setHorizontalDirection}>Horizontal direction</button>
                <br/><br/>
                <button onClick={this.setVerticalDirection}>Vertical direction</button>


            </div>
        )
    }
}
