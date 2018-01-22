import * as React from "react";



class WatchInjectionComponent extends React.Component<{}, State> {
    render() {
        const classes = ["D-Anime-Next-Btn"];
        if (this.state.autoJump) {
            classes.push("Enable");
        }
        return <>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <span onClick={this.onclick} className={classes.join(" ")}>
                <i className="material-icons">playlist_play</i>
            </span>
        </>
    }

    onclick = ()=> {
        this.setState({
            autoJump: !this.state.autoJump
        });
    };
}

class State {
    autoJump = false;
}