/*
 * @Author: scg
 * @Date: 2021-08-22 18:46:00
 * @LastEditTime: 2021-08-22 19:06:01
 * @LastEditors: scg
 * @Description: 
 */
export default {
    namespaced: true,
    state: {
        userName: uni.getStorageSync("user").userName,
        pic: uni.getStorageSync("user").pic
    },
    getters: {
    },
    mutations: {
        setUserInfo (state, userInfo = {}) {
            Object.entries(userInfo).forEach(([key, value]) => state[key] = value);
        },
    },
    actions: {
    },
};