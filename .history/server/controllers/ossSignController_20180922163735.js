export async function setOssSign(ctx) { // 设置oss签名
    const oss_sign = {
        region: 'oss-cn-beijing',
        accessKeyId: "LTAIUnwXfl95clYk",
        accessKeySecret: 'qpbgTYAKXnNn4HSZwOyLzIwm8nv0pC',
        bucket: "article-images"
    };
    ctx.body = oss_sign;
}