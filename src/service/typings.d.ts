declare namespace API {
    type IResult<T = any> = {
        status: boolean
        errno?: number
        message: string
        body: T
    }
    /**
     * 登陆参数
     */
    type IDoLoginParams = {
        username: string
        passwd: string
        code: string
    }
    // 后台用户类型
    type IBgUser = {
        accumulat: number
        address: string
        balance: number
        birth: number
        channel_id: number
        city: string
        consumed: number
        create_ip: string
        district: string
        email: string
        idcard: string
        integral: number
        layer_path: string
        level: number
        province: string
        real_name: string
        referer_url: string
        update_time: number
        upper_id: number
        act: string
        create_time: number
        head: string
        id: number
        status: string
        name: string
        member_name: string
        channel_name: string
        mobile: string
        invite_code: string
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
