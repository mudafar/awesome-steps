/* eslint react/no-did-mount-set-state: 0 */
import React, {cloneElement, Children, Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import {isFlexSupported} from './utils';

export default class Steps extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        iconPrefix: PropTypes.string,
        direction: PropTypes.string,
        labelPlacement: PropTypes.string,
        children: PropTypes.any,
        status: PropTypes.string,
        size: PropTypes.string,
        progressDot: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func,
        ]),
        style: PropTypes.object,
        current: PropTypes.number,
        secondaryCurrent: PropTypes.number,
    };
    static defaultProps = {
        prefixCls: 'rc-steps',
        iconPrefix: 'rc',
        direction: 'horizontal',
        labelPlacement: 'horizontal',
        current: 0,
        secondaryCurrent: undefined,
        status: 'process',
        size: '',
        progressDot: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            flexSupported: true,
            lastStepOffsetWidth: 0,
            upperContentHeight: 0,
        };
        this.calcStepOffsetWidth = debounce(this.calcStepOffsetWidth, 150);
    }

    componentDidMount() {
        this.calcStepOffsetWidth();
        if (!isFlexSupported()) {
            this.setState({
                flexSupported: false,
            });
        }

        this.calculateUpperContentMaxHeight();
    }

    componentDidUpdate() {
        this.calcStepOffsetWidth();
    }

    componentWillUnmount() {
        if (this.calcTimeout) {
            clearTimeout(this.calcTimeout);
        }
        if (this.calcStepOffsetWidth && this.calcStepOffsetWidth.cancel) {
            this.calcStepOffsetWidth.cancel();
        }
    }

    calculateUpperContentMaxHeight = () => {
        if (this.domNode) {
            const upperContentNodes = this.domNode.getElementsByClassName("rc-steps-item-upper-content");
            if (upperContentNodes) {
                const upperHeights = Array.from(upperContentNodes).map(el => el.clientHeight);
                const upperContentHeight = Math.max(...upperHeights);
                this.setState({upperContentHeight});
                console.log("Max: ", upperContentHeight);
            }
        }
    };


    calcStepOffsetWidth = () => {
        if (isFlexSupported()) {
            return;
        }
        // Just for IE9
        const domNode = findDOMNode(this);
        if (domNode.children.length > 0) {
            if (this.calcTimeout) {
                clearTimeout(this.calcTimeout);
            }
            this.calcTimeout = setTimeout(() => {
                // +1 for fit edge bug of digit width, like 35.4px
                const lastStepOffsetWidth = (domNode.lastChild.offsetWidth || 0) + 1;
                // Reduce shake bug
                if (this.state.lastStepOffsetWidth === lastStepOffsetWidth ||
                    Math.abs(this.state.lastStepOffsetWidth - lastStepOffsetWidth) <= 3) {
                    return;
                }
                this.setState({lastStepOffsetWidth});
            });
        }
    };

    render() {
        const {
            prefixCls, style = {}, className, children, direction,
            labelPlacement, iconPrefix, status, size, current, progressDot, secondaryCurrent,
            ...restProps,
        } = this.props;
        const {lastStepOffsetWidth, flexSupported} = this.state;
        const filteredChildren = React.Children.toArray(children).filter(c => !!c);
        const lastIndex = filteredChildren.length - 1;
        const adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
        const classString = classNames(prefixCls, `${prefixCls}-${direction}`, className, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
            [`${prefixCls}-dot`]: !!progressDot,
        });
        let lastStepNumber = 0;
        let lastSubStepNumber = 0;
        const marginStyle = direction === 'horizontal' && labelPlacement === 'vertical'
            ? {marginTop: this.state.upperContentHeight + 15}
            : {};

        return (
            <div className={classString} style={{...marginStyle, ...style}} {...restProps}
                 ref={element => this.domNode = element}>
                {
                    Children.map(filteredChildren, (child, index) => {
                        if (!child) {
                            return null;
                        }
                        if (!child.props.subStep) {
                            lastStepNumber++;
                            lastSubStepNumber = lastStepNumber;
                        } else {
                            lastSubStepNumber += 0.01;
                        }

                        const childProps = {
                            stepNumber: child.props.subStep ? lastSubStepNumber : lastStepNumber,
                            prefixCls,
                            iconPrefix,
                            wrapperStyle: style,
                            progressDot,
                            upperContentHeight: this.state.upperContentHeight,
                            ...child.props,
                        };
                        if (!flexSupported && direction !== 'vertical' && index !== lastIndex) {
                            childProps.itemWidth = `${100 / lastIndex}%`;
                            childProps.adjustMarginRight = -Math.round(lastStepOffsetWidth / lastIndex + 1);
                        }
                        // fix tail color
                        if (status === 'error' && index === current - 1) {
                            childProps.className = `${prefixCls}-next-error`;
                        }

                        if (direction === 'horizontal' && labelPlacement === 'vertical') {
                            childProps.showUpperContent = true;
                        }

                        let stepNumber = child.props.subStep ? lastSubStepNumber - 1 : lastStepNumber - 1;

                        stepNumber = Number(stepNumber.toFixed(2));

                        if (!child.props.status) {
                            if (stepNumber === current) {
                                childProps.status = status;
                            } else if (stepNumber < current) {
                                childProps.status = 'finish';
                            } else {
                                childProps.status = 'wait';
                            }
                        }


                        if (stepNumber === secondaryCurrent && childProps.upperTitle && childProps.upperTitle.length) {
                            childProps.secondaryCurrent = true;
                        }

                        return cloneElement(child, childProps);
                    })
                }
            </div>
        );
    }
}
