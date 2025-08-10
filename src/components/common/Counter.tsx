import React from 'react'

interface CounterProps {
    initialValue: number
}

interface CounterState {
    counter: number
}

class Counter extends React.Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props)
        this.state = {
            counter: props.initialValue
        }
    }

    increment = (): void => {
        this.setState(state => ({
            counter: state.counter + 1
        }))
    }

    decrement = (): void => {
        this.setState(state => ({
            counter: state.counter - 1
        }))
    }

    render() {
        return React.createElement(
            'div',
            {className: 'flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md'},
            React.createElement(
                'h2',
                {className: 'text-2xl font-bold text-gray-800'},
                'Counter'
            ),
            React.createElement(
                'div',
                {className: 'text-4xl font-bold text-blue-600'},
                this.state.counter
            ),
            React.createElement(
                'div',
                {className: 'flex flex-row space-x-4'},
                React.createElement(
                    'button',
                    {
                        className: 'px-4 py-2 bg-red-500 hover:bg-red-600 transition-colors rounded text-white',
                        onClick: this.decrement
                    },
                    'Decrement'
                ),
                React.createElement(
                    'button',
                    {
                        className: 'px-4 py-2 bg-green-500 hover:bg-green-600 transition-colors rounded text-white',
                        onClick: this.increment
                    },
                    'Increment'
                )
            )
        )
    }
}

export default Counter