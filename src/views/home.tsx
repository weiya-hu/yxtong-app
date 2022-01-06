
import { Component } from 'react'
import PopupLogin from './login/popupLogin'


export default class Home extends Component {
    state={
        popupLoginShow:false
    }
    
    componentDidMount(){

    }
    login=()=>{
        this.setState({
            popupLoginShow:!this.state.popupLoginShow
        })
    }
    render(){
        let {popupLoginShow}=this.state
        return <div id='home'>
            <div onClick={this.login}>去登录</div>
            {popupLoginShow &&
                <div className='block'>
                    <PopupLogin show={(val)=>this.setState({popupLoginShow:val})}/>
                </div>

            }
            
        </div>
    }
   
    
}