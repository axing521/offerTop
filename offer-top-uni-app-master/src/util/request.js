
// const BASE_URL = 'http://127.0.0.1:3000/api';
const BASE_URL = 'https://qcveq1.app.cloudendpoint.cn/api';
const failCodeMap = new Map([
    [400, { msg: '请求错误' }],
    [401, { msg: '未认证' }],
    [403, { msg: '未授权' }],
    [404, { msg: '请求地址错误' }],
    [405, { msg: '请求方式错误' }],
    [408, { msg: '请求超时' }],
    [422, { msg: '验证错误' }],
    [500, { msg: '服务器内部错误' }],
    [501, { msg: '服务未实现' }],
    [502, { msg: '网关错误' }],
    [503, { msg: '服务不可用' }],
    [504, { msg: '网关超时' }],
    [505, { msg: 'HTTP版本不受支持' }]
]);
export const request = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + options.url,
            method: options.method,
            data: options.data || {},
            success: (res) => {
                let err = failCodeMap.get(res.statusCode);
                if (err) {
                    uni.showToast({
                        icon: 'error',
                        title: `${err} ${JSON.stringify(res.data)}`
                    });
                } else {
                    resolve(res)
                }
            },
            fail: (err) => {
                uni.showToast({
                    icon: 'error',
                    title: `${JSON.stringify(err)}`
                })
            },
            complete: () => {
                uni.hideLoading();
            }
        })
    })
}