import { Component } from 'react'
import './login.scss'


import logowhite from 'public/images/logow.png'
import mainimg from 'public/images/main.png'
import topimg from 'public/images/top.png'
import LoginComponent from './component/loginComponent'

export default class Login extends Component {
    componentDidMount(){
        document.title = '康州数智-登录'
        document.body.style.overflow='hidden'
    }
    render(){
        return (
            <div id='login'>
                <div className='contain'>
                    <div className='logo fleximg'>
                        <img src={logowhite} alt="logo" />
                    </div>
                    <div className='main flexl'>
                        <div className='leftimg fleximg'>
                            <img src={mainimg} />
                        </div>
                        <LoginComponent /> 
                    </div>
                    <div className='fleximg topimg'>
                        <img src={topimg}/>
                    </div>
                    {/* <div className='fleximg downimg'>
                        <img src={downimg}/>
                    </div> */}
                </div>

            </div>
        )
        
    }
    
}