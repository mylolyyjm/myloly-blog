export async function setOssSign(ctx) { // 设置oss签名
    const policy = {
        "expiration": "2020-01-01T12:00:00.000Z", // 设置Policy的失效时间，如果超过失效时间，就无法通过此Policy上传文件
        "conditions": [
            ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制，如果超过限制，文件上传到OSS会报错
        ]
    };
    const oss_sign = {
        message: "success",
        accessid: "LTAIUnwXfl95clYk",
        host: "https://article-images.oss-cn-beijing.aliyuncs.com",
        policy: btoa(JSON.stringify(policy)),
        signature: btoa(JSON.stringify(policy) + 'qpbgTYAKXnNn4HSZwOyLzIwm8nv0pC'),
        expire: Date.parse(new Date()) / 1000,
        dir: "tuan/pic/"
    };
    if (ctx.request.body.path) {
        
    }
}