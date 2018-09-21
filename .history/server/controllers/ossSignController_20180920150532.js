export async function setOssSign(ctx) { // 设置oss签名
    const oss_sign = {
        message: "success",
        accessid: "LTAIh2t0oqKM6QEj",
        host: "https://	article-images.oss-cn-beijing.aliyuncs.com",
        policy: "eyJleHBpcmF0aW9uIjoiMjAxOC0wOS0yMFQxNDo1Mjo0NVoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MDAwXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsInR1YW5cL3BpY1wvIl1dfQ==",
        signature: "63h/mNhKhTZ0rbneThqR2eOiYMc=",
        expire: 1537426365,
        dir: "tuan/pic/"
    };
    if (ctx.request.body.path) {
        
    }
}