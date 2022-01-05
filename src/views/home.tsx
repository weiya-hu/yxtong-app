
import { Component } from 'react'
import PopupLogin from './login/popupLogin'
import {doLogin} from '../service/login'


export default class Home extends Component {
    state={
        popupLoginShow:false
    }
    getinfo=async()=>{
        let data = {
            username: 'admin',
            passwd: '123',
            code: 'hjkj'
        }
        const res =await doLogin()
        console.log(res)
    }
    componentDidMount(){
        this.getinfo()
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