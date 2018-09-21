export async function setOssSign(ctx) { // 设置oss签名
    const oss_sign = {
        success: true,
        message: "success",
        region: 'oss-cn-beijing',
        accessKeyId: "LTAIUnwXfl95clYk",
        accessKeySecret: 'qpbgTYAKXnNn4HSZwOyLzIwm8nv0pC',
        bucket: "article-"
    };
    ctx.body = oss_sign;
}