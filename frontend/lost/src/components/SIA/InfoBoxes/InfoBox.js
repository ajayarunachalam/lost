import React, {Component} from 'react'
import { Message, Divider } from 'semantic-ui-react'
import Draggable from 'react-draggable';

class InfoBox extends Component{

    constructor(props) {
        super(props)
        this.state = {
            style: {
                cursor: 'grab', 
                position:'fixed', 
                top: 200, 
                left: 200, 
                width: 250
            }
        }
    }

    componentDidMount(){
        this.updateStyle()
    }

    componentDidUpdate(prevProps){
        if (this.props.defaultPos !== prevProps.defaultPos){
            this.updateStyle()
        }
    }

    handleOnStop(e){
        if (this.props.onStop){
            this.props.onStop(e)
        }
    }

    updateStyle(){
        this.setState({
            style: {...this.state.style,
            ...this.props.defaultPos}
        })
    }

    onDismiss(e){
        if (this.props.onDismiss){
            this.props.onDismiss(e)
        }
    }

    
    render(){
        if (!this.props.visible) return null
        return(
        <Draggable handle=".handle" onStop={e => this.handleOnStop(e)}
        >
            <div className="handle" 
                style={this.state.style}>
        
            <Message 
                style={{opacity:0.98}}
                onDismiss={e => {this.onDismiss(e)}}
                size="small"
            >
                <Message.Header>{this.props.header}</Message.Header>
                <Divider></Divider>
                <Message.Content>
                    {this.props.content}
                </Message.Content>
            </Message>

            </div> 
        
        
        </Draggable>
        )
    }
}

export default InfoBox