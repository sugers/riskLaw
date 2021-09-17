export default{
    getLoginInInfo({commit},access_token){
        commit('LOGIN_IN',access_token)
    },
    getLoginOutInfo({commit},access_token){
        commit('LOGIN_OUT',access_token)
    },
    getLoginInInfo({commit},refresh_token){
        commit('LOGIN_IN',refresh_token)
    },
    getLoginOutInfo({commit},refresh_token){
        commit('LOGIN_OUT',refresh_token)
    }

}