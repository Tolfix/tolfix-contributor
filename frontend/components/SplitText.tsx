import { Component } from "react"

export class SplitText extends Component {
    render()
    {
        return(
            // @ts-ignore
            <span aria-label={this.props.copy} role={this.props.role}>
                {/* @ts-ignore */}
                {this.props.copy.split("").map(function(char, index){
                    let style = {"animation-delay": (0.5 + index / 10) + "s"}
                    return <span
                        aria-hidden="true"
                        key={index}
                        // @ts-ignore 
                        style={style}
                    >
                        {char}
                    </span>;
                })}
            </span>
        );
    }
}