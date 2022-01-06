declare namespace API {
    type IResult<T = any> = {
        status: number
        errno?: number
        message: string
        body: T
    }
    /**
     * 登陆参数
     */
    type UserLogin = {
        type:number
        mobile:string
        acode:string
        captcha?:string
        sms?:string
        pass?:string
    }
    // 后台用户类型
    type IBgUser = {
        acode: string
        email: string
        head: string
        id: number
        invite_code: string
        mobile: string
        name: string
        real_name: string
        status: number
    }
    //企业信息
    type COmpany = {
        address: string
        city: string
        code: string
        contact: string
        create_time: number
        district: string
        id: number
        industry_id: number
        introduction: string
        legal_person: string
        license: string
        name: string
        province: string
        uid: number
        update_time: number
        url: string
    }
    //搜索会员信息所需参数
    type GEtMemberInfo = {
        current: number
        et?: number
        level?: number
        mobile?: string
        name?: string
        size?: number
        st?: number
        uid?: number
    }

    //搜索分页必须项
    type SEarchInfo = {
        current: number
        size: number
    }

    //会员等级
    type MEmberLevel = {
        id?: number
        name: string
        weigh: number
        remark: string
        update_time: number
        remarks?: string
        edit?: boolean
    }
    type UId = {
        uid: number
    }
}
