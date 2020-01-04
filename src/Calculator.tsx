import * as React from "react"
import DigitButton from "./DigitButton"
import Display from "./Display"
import * as S from "sodiumjs"

interface Props {
}

// PureComponente => effizientere Variante für Update-Prüfung (shouldComponentUpdate()) sollte über Sodium erledigt werden
export default class Calculator extends React.PureComponent<Props> {

    private readonly digit1 = React.createRef<DigitButton>()
    private readonly digit2 = React.createRef<DigitButton>()
    private readonly digit3 = React.createRef<DigitButton>()
    private readonly digit4 = React.createRef<DigitButton>()
    private readonly digit5 = React.createRef<DigitButton>()
    private readonly digit6 = React.createRef<DigitButton>()
    private readonly digit7 = React.createRef<DigitButton>()
    private readonly digit8 = React.createRef<DigitButton>()
    private readonly digit9 = React.createRef<DigitButton>()
    private readonly digit0 = React.createRef<DigitButton>()
    private readonly display = React.createRef<Display>()

    //private

    constructor(props:Props) {
        super(props)
        console.log('constructor on calculator ')
    }

    componentDidMount(): void {
        console.log('componentDidMount() Calculator')

        const combinedDigitsStream = this.combineDigitStreams()

        const displayCell = combinedDigitsStream.hold(0);
        this.display.current!.displayCell = displayCell
    }

    private combineDigitStreams(): S.Stream<number> {
        return this.digit1.current!.digitStream
            .orElse(this.digit2.current!.digitStream)
            .orElse(this.digit3.current!.digitStream)
            .orElse(this.digit4.current!.digitStream)
            .orElse(this.digit5.current!.digitStream)
            .orElse(this.digit6.current!.digitStream)
            .orElse(this.digit7.current!.digitStream)
            .orElse(this.digit8.current!.digitStream)
            .orElse(this.digit9.current!.digitStream)
            .orElse(this.digit0.current!.digitStream)
    }

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th colSpan={3}><Display ref={this.display}/></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><DigitButton digit={7} ref={this.digit7}/></td>
                    <td><DigitButton digit={8} ref={this.digit8}/></td>
                    <td><DigitButton digit={9} ref={this.digit9}/></td>
                </tr>
                <tr>
                    <td><DigitButton digit={4} ref={this.digit4}/></td>
                    <td><DigitButton digit={5} ref={this.digit5}/></td>
                    <td><DigitButton digit={6} ref={this.digit6}/></td>
                </tr>
                <tr>
                    <td><DigitButton digit={1} ref={this.digit1}/></td>
                    <td><DigitButton digit={2} ref={this.digit2}/></td>
                    <td><DigitButton digit={3} ref={this.digit3}/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><DigitButton digit={0} ref={this.digit0}/></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        )
    }
}

