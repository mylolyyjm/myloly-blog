export async function setOssSign(ctx) { // 设置oss签名
    const policy = {
        "expiration": "2020-01-01T12:00:00.000Z", // 设置Policy的失效时间，如果超过失效时间，就无法通过此Policy上传文件
        "conditions": [
            {"bucket": "article-pic" },
            ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制，如果超过限制，文件上传到OSS会报错
        ]
    };
    const oss_sign = {
        success: true,
        message: "success",
        accessid: "LTAIUnwXfl95clYk",
        host: "https://article-images.oss-cn-beijing.aliyuncs.com",
        policy: new Buffer(JSON.stringify(policy)).toString('base64'),
        signature: new Buffer(JSON.stringify(policy) + 'qpbgTYAKXnNn4HSZwOyLzIwm8nv0pC').toString('base64'),
        success_action_status:'200', // 让服务端返回200,不然，默认会返回204
        expire: Date.parse(new Date()) / 1000,
        dir: "article/pic/"
    };
    ctx.body = oss_sign;
}