# awesome-steps [![npm][npm-image]][npm-url] [![JavaScript Style Guide][js-style-image]][js-style-url]


> The most advanced yet awesome React steps component

![Alt Text](https://raw.githubusercontent.com/mudafar/awesome-steps/master/example/awesome_steps.gif)


Based on [rc-steps]

## Features

- Horizontal and vertical direction.
- Horizontal and vertical label placement .
- Step with `icon`, `status`, `number`, `title`, `upperTitle` and/or `description`.
- Settable `current` and `secondaryCurrent` (upper title) active step. 


[npm-image]: https://img.shields.io/npm/v/npm.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/awesome-steps
[js-style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[js-style-url]: https://standardjs.com
[download-url]: https://npmjs.org/package/awesome-steps
[rc-steps]: https://github.com/react-component/steps


## Example
Online example: https://mudafar.github.io/awesome-steps/



## Installation

```bash
yarn add awesome-steps
```

or

```bash
npm install --save awesome-steps
```
 


## Usage
### Basic

```jsx
import React, {Component} from 'react'

import Steps from 'awesome-steps'
import 'awesome-steps/dist/style.css'

export default class App extends Component {

    render() {
        return (
            <Steps>
              <Steps.Step title="first" />
              <Steps.Step title="second" />
              <Steps.Step title="third" />
            </Steps>
        )
    }
}
```



### Advanced

```jsx
import React, {Component} from 'react'

import Steps from 'awesome-steps'
import 'awesome-steps/dist/style.css'

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {current: 0};
    }


    render() {
        return (
            <Steps  current={this.state.current}
                    labelPlacement={"horizontal"}
                    direction={"horizontal"}
            >
              <Steps.Step   title="first"
                            onClick={() => this.handleStepClick(0)} 
              />
              <Steps.Step   title="second"
                            onClick={() => this.handleStepClick(1)} 
              />
              <Steps.Step title="Sub2"
                          onClick={() => this.handleStepClick(1.01)}
                          subStep
              />              
              <Steps.Step   title="third"
                            onClick={() => this.handleStepClick(2)} 
              />
            </Steps>
        )
    }
    
    
    handleStepClick = (stepNumber) => {
        this.setState({current: stepNumber})
    };
    
}
```





## API
### Steps props:
<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th style="width: 50px;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>direction</td>
      <td>string</td>
      <td>horizontal</td>
      <td>Direction of Steps, enum: `horizontal` or `vertical`.</td>
    </tr>
    <tr>
      <td>current</td>
      <td>number</td>
      <td>0</td>
      <td>Index of current step (integer value).
          For subStep increment the index by 0.01 (see the advanced usage).
      </td>
    </tr>
    <tr>
      <td>secondaryCurrent</td>
      <td>number</td>
      <td>0</td>
      <td>Index of secondary current step (upper title).</td>
    </tr>
    <tr>
      <td>size</td>
      <td>string</td>
      <td></td>
      <td>Size of Steps, could be `small`.</td>
    </tr>
    <tr>
      <td>labelPlacement</td>
      <td>string</td>
      <td></td>
      <td>Placement of step title, could be `vertical`.</td>
    </tr>
    <tr>
      <td>status</td>
      <td>string</td>
      <td>wait</td>
      <td>Status of current Steps, could be `error` `process` `finish` `wait`.</td>
    </tr>
  </tbody>
</table>

### Steps.Step props:

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th style="width: 50px;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>title</td>
      <td>ReactNode</td>
      <td></td>
      <td>Title of step item.</td>
    </tr>
    <tr>
      <td>upperTitle</td>
      <td>ReactNode</td>
      <td></td>
      <td>Upper title of step item.</td>
    </tr>
    <tr>
      <td>description</td>
      <td>ReactNode</td>
      <td></td>
      <td>Description of step item.</td>
    </tr>
    <tr>
      <td>icon</td>
      <td>ReactNode</td>
      <td></td>
      <td>Set icon of step item.</td>
    </tr>
    <tr>
      <td>status</td>
      <td>string</td>
      <td></td>
      <td>Status of current Steps, could be `error` `process` `finish` `wait`.</td>
    </tr>
    <tr>
      <td>subStep</td>
      <td>Bool</td>
      <td>false</td>
      <td>Set as sub-step, this will make the step smaller, also remove the number.</td>
    </tr>
  </tbody>
</table>


## Style
### Class structure
- `<Steps/>`: rc-steps rc-steps-`[direction]` rc-steps-label-`[direction]`
- `<Step/>`: rc-steps-item rc-steps-item-`[status]` [rc-steps-item-secondary-current] [rc-steps-item-sub-step]
    * rc-steps-item-tail
    * rc-steps-item-icon
    * rc-steps-item-content
    * rc-steps-item-upper-content

`[direction]` and `[status]` use the same values from the API.

## Development

```bash
# download the source code
git clone https://github.com/mudafar/awesome-steps.git
cd awesome-steps
# install needed dependencies 
npm install
# start rollup in watch mode
npm start 
```
Open another terminal to run example:
```bash
cd example/
# install example's needed dependencies 
npm install
# use react-scripts to start a local server
npm start
```



## License

MIT © [Mudafar](https://github.com/mudafar)







