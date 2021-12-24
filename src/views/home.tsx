
import { Component } from 'react'
import * as ReactDOM from 'react-dom';
import $PopupLogin from './login/popupLogin'
import {doLogin} from '../service/login'


export default class Home extends Component {
    getinfo=async()=>{
        let data = {
            username: 'admin',
            passwd: '123',
            code: 'hjkj'
        }
        const res =await doLogin(data)
        console.log(res)
    }
    componentDidMount(){
        // $PopupLogin
        // this.getinfo()
        // let el = document.getElementById('#home');
        // ReactDOM.render( <PopupLogin />,el);
    }
    render(){
        return <div id='home' className='fleximg back'>
            {/* <PopupLogin /> */}
        </div>
    }
   
    
}