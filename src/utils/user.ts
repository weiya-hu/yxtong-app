export const util ={
    validate_mobile:(mobile)=>{
        if(mobile){
            let pattern={mobile: /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/ };
            if(!pattern.mobile.test(mobile)){
                return '电话号码输入不正确';
            }
            return '';
        }else{
            return '电话号码不能为空'
        }
        
    },
    validate_yzm:(val)=>{
        if(val){
            let pattern={yzm: /^\w{6}$/ };
            if(!pattern.yzm.test(val)){
                return '验证码格式输入不正确';
            }
            return "";
        }else{
            return '验证码不能为空'
        }
        
    },
    validate_password:(val)=>{
        if(val){
            let pattern={vali: /^\w{6,16}$/ };
            if(!pattern.vali.test(val)){
                return '密码最少6位，最长不超过16位';
            }
            return '';
        }else{
            return '密码不能为空'
        }
        
    },
    validate_passwordRegister:(val)=>{
        if(val){
            let pattern={vali: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/ }
            if(!pattern.vali.test(val)){
                return '密码最小长度6个字，最大长度16个字；必须包含字母、数字'
            }
            return '';
        }else{
            return '密码不能为空'
        }
        
    },

}