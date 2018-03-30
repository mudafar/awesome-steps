import React, {Component} from 'react'

import Steps from 'awesome-steps'
import 'awesome-steps/dist/style.css'

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            secondaryCurrent: 0,
            labelPlacement: "vertical",
            direction: "horizontal",
            secondaryCurrentActive: false,
        };

    }


    handleStepClick = (stepNumber) => {

        if (this.state.secondaryCurrentActive) {
            this.setState({secondaryCurrent: stepNumber})
        } else  {
            this.setState({current: stepNumber})
        }
    };


    toggleSecondaryCurrent = () => {
        this.setState({secondaryCurrentActive: !this.state.secondaryCurrentActive})
    };

    toggleDirection = () => {
        const direction = this.state.direction === 'horizontal' ? 'vertical' : 'horizontal';
        this.setState({direction})

    };

    toggleLabelPlacement = () => {
        const labelPlacement = this.state.labelPlacement === 'horizontal' ? 'vertical' : 'horizontal';
        this.setState({labelPlacement})

    };


    render() {
        return (
            <div className="center react-component">
                <Steps current={this.state.current}
                       secondaryCurrent={this.state.secondaryCurrent}
                       labelPlacement={this.state.labelPlacement}
                       direction={this.state.direction}>

                    <Steps.Step title="First"
                                description="Large description can be placed here..."
                                upperTitle="Upper title 1"
                                onClick={() => this.handleStepClick(0)}
                    />
                    <Steps.Step title="Sub1"
                                onClick={() => this.handleStepClick(0.01)}
                                subStep
                    />
                    <Steps.Step title="Sub2"
                                onClick={() => this.handleStepClick(0.02)}
                                subStep
                    />
                    <Steps.Step title="Second"
                                description="Description"
                                upperTitle="Upper title 2"
                                onClick={() => this.handleStepClick(1)}
                    />
                    <Steps.Step title="Third"
                                description="Description"
                                upperTitle="Upper title 3"
                                onClick={() => this.handleStepClick(2)}
                    />
                    <Steps.Step title="Sub3"
                                onClick={() => this.handleStepClick(2.01)}
                                subStep
                    />
                    <Steps.Step title="Fourth"
                                description="Description"
                                onClick={() => this.handleStepClick(3)}
                    />
                    <Steps.Step title="Sub4"
                                onClick={() => this.handleStepClick(3.01)}
                                subStep
                    />
                </Steps>


                <br/><br/><br/>


                Horizontal label: <input
                name="horizontalLabel"
                type="checkbox"
                checked={this.state.labelPlacement === "horizontal"}
                onChange={this.toggleLabelPlacement} />

                <br/><br/>

                Vertical direction: <input
                name="VerticalDirection"
                type="checkbox"
                checked={this.state.direction === "vertical"}
                onChange={this.toggleDirection} />

                <br/><br/>

                Secondary click: <input
                    name="secondaryCurrent"
                    type="checkbox"
                    checked={this.state.secondaryCurrentActive}
                    onChange={this.toggleSecondaryCurrent} />


            </div>
        )
    }
}
