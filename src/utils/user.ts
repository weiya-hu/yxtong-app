export const util ={
    validate_mobile:(mobile)=>{
        if(mobile){
            let pattern={mobile: /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))+\d{8})$/ };
            if(!pattern.mobile.test(mobile)){
                return '电话号码输入不正确';
            }
            return '';
        }else{
            return '电话号码不能为空'
        }
        
    },
    validate_captcha:(val)=>{
        if(val){
            let pattern={captcha: /^\w{5}$/ };
            if(!pattern.captcha.test(val)){
                return '验证码格式输入不正确';
            }
            return "";
        }else{
            return '验证码不能为空'
        }
        
    },
    validate_yzm:(val)=>{
        if(val){
            let pattern={yzm: /^\w{6}$/ };
            if(!pattern.yzm.test(val)){
                return '短信验证码格式输入不正确';
            }
            return "";
        }else{
            return '短信验证码不能为空'
        }
        
    },
    validate_password:(val)=>{
        if(val){
            // let pattern={vali: /^\w{6,16}$/ };
            let pattern={vali: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\W]{6,18}$/ };

            if(!pattern.vali.test(val)){
                return '密码长度在6~18之间,不能只是数字或字母';
            }
            return '';
        }else{
            return '密码不能为空'
        }
        
    },
    validate_passwordRegister:(val)=>{
        if(val){
            let pattern={vali: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/ }
            if(!pattern.vali.test(val)){
                return '密码长度在6~18之间,不能只是数字或字母'
            }
            return '';
        }else{
            return '密码不能为空'
        }
        
    },
    getUrlParam:(name)=>{
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substring(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    },

}