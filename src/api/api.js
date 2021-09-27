import { get, post, put, Delete } from "./http.js"

// 登录
export const login = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/backend/auth/login', data))
    })
}
// token刷新
export const RefreshToken = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/user/refreshToken', data))
    })
}
// 数据看板
export const Dashboard = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/icco/dashboard', data))
    })
}
// 查询保险业务员的评估申请
export const Evallist = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/icco/eval_list', data))
    })
}
// 审核绑定
export const Auditlist = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/audit/list', data))
    })
}
// 获取当前保险公司地区信息
export const Areainfo = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/icco/area/info', data))
    })
}
// 修改保险业务员省份
export const Audit = data => {
    return new Promise(function (resolve) {
        resolve(put('/api/v1/backend/audit', data))
    })
}
// 审核保险业务员（保险公司管理员权限）
export const Iccoaudit = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/backend/audit', data))
    })
}
// 获取所有案由类型
export const Casetype = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/case_type', data))
    })
}
// 出单确认回显
export const Iccoeval = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/icco/eval', data))
    })
}
// 批量审核业务员
export const Audiobatch = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/backend/audit/batch', data))
    })
}
// 平台方接口
// 任务池查看（管理员、初审、复审权限）
export const Caselist = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/eval/list', data))
    })
}
// 查看保险公司地区（管理员权限）
export const Iccoarea = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/icco/area', data))
    })
}
// 任务查看（管理员、初审、复审权限）
export const Reviewcase = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/eval', data))
    })
}
// 获取案由类型列表(分页) (管理员权限)
// export const Admincasetype = data => {
//   return new Promise(function (resolve) {
//     resolve(get('/api/v1/admin/case_type', data))
//   })
// }
// 快速反馈（管理员、初审、复审权限）
export const Feedback = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/admin/review/case/feedback', data))
    })
}
// 审核员删除评估素材文件（管理员、初审、复审权限）
export const Casefile = data => {
    return new Promise(function (resolve) {
        resolve(Delete('/api/v1/admin/review/case/file', data))
    })
}
// 文件上传拿路径
export const Filecase = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/file/upload', data))
    })
}
// 上传文件（管理员、初审、复审权限）
export const Upsecase = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/admin/review/case/file', data))
    })
}
// 初审填写法律意见书、承保保全金额，复审修改（初审、复审权限
export const Caseinfo = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/admin/review/case/info', data))
    })
}
// 生成法律意见书
export const Lawopinion = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/admin/review/case/law_opinion', data))
    })
}
// 提交上级复核
export const Subreview = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/admin/review/case/sub_review', data))
    })
}
// 审核通过、拒绝、补充材料、提交复审（初审、复审权限
export const Prereview = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/admin/review/case/pre_review', data))
    })
}
// 获取所有审核人员信息（所有后台人员权限）
export const Reivewerinfo = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/admin/review/reivewer_info', data))
    })
}
// 核实（管理员、初审、复审权限）
export const Tradeverify = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/admin/review/case/trade_verify', data))
    })
}
// 修改出单状态（管理员、初审、复审权限）
export const Modifytrade = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/admin/review/case/modify_trade', data))
    })
}
// 获取保险公司信息列表
export const GetinsuranceList = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/icco', data))
    })
}
//获取保险公司地区信息列表
export const GetinsuranceAreaList = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/icco/area', data))
    })
}
// 删除保险公司
export const DeleteInsurance = data => {
    return new Promise(function (resolve) {
        resolve(Delete('/api/v1/admin/icco', data))
    })
}
//添加保险公司
export const IncreaseInsurance = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/admin/icco', data))
    })
}
// 编辑保险公司
export const EditInsurance = data => {
    return new Promise(function (resolve) {
        resolve(put('/api/v1/admin/icco', data))
    })
}
// 新增保险公司区域
export const IncreaseArea = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/admin/icco/area', data))
    })
}
//删除保险公司地区
export const DeleteArea = data => {
    return new Promise(function (resolve) {
        resolve(Delete('/api/v1/admin/icco/area', data))
    })
}
//编辑保险公司地区
export const EditArea = data => {
    return new Promise(function (resolve) {
        resolve(put('/api/v1/admin/icco/area', data))
    })
}
//获取保险公司以及管理用户
export const Getuser = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/account', data))
    })
}
// 新增保险公司以及管理用户
export const Increaseuser = data => {
    return new Promise(function (resolve) {
        resolve(post('/api/v1/backend/account', data))
    })
}
// 编辑保险公司以及管理用户
export const Edituser = data => {
    return new Promise(function (resolve) {
        resolve(put('/api/v1/backend/account', data))
    })
}
//删除保险公司以及管理用户
export const Deleteuser = data => {
    return new Promise(function (resolve) {
        resolve(Delete('/api/v1/backend/account', data))
    })
}

// 对账
export const Reconcilia = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/reconcilia', data))
    })
}
// 对账导出
export const Exportreconcilia = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/reconcilia/export', data, 'blob'))
    })
}
// 获取擅长领域

export const GetfieldList = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/field_expertise', data))
    })
}
// 获取律师列表
export const GetlawyerList = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/admin/lawyer/list', data))
    })
}

// 获取律师信息
export const GetlawyerDetail = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/admin/lawyer/one', data))
    })
}
// 修改律师信息
export const Editlawyer = data => {
    return new Promise(function (resolve) {
        resolve(put('/api/v1/admin/lawyer', data))
    })
}
// 获取业务员的业绩表
export const Getstatics = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/icco/admin/performance', data))
    })
}
// 获取业务员的提交量趋势表
export const GetTrendChart = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/icco/admin/submit/dataRange', data))
    })
}
// 获取业务员的出单量趋势表
export const GetTrendChartOrder = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/icco/admin/trade/dataRange', data))
    })
}
// 下载全部文件
// export const Casedownload = data => {
//   return new Promise(function (resolve) {
//     resolve(get('/api/v1/admin/review/case/download', data))
//   })
// }

// 获取数据看板数据（所有后台人员权限）
export const Commondashboard = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/admin/common/dashboard', data))
    })
}

// 删除评估申请
export const Reviewcasedata = data => {
    return new Promise(function (resolve) {
        resolve(Delete('/api/v1/admin/review/case', data))
    })
}

// 批量下载法律意见书（管理员权限）
export const LawOpinions = data => {
    return new Promise(function (resolve) {
        resolve(get('/api/v1/backend/eval/download/lawOpinions', data, 'blob'))
    })
}

// 取消绑定保险业务员（平台方管理员，保险公司管理员权限）
export const Auditunbind = data => {
    return new Promise(function (resolve) {
        resolve(Delete('/api/v1/backend/audit/unbind', data))
    })
}

// 个人修改密码接口
export const Authpassword = data => {
    return new Promise(function (resolve) {
        resolve(put('/api/v1/backend/auth/password', data))
    })
}