//  * @param opt elm封装的请求信息
//  * @param vm Vue实例
//  * @param server_url 获取签名的服务器地址
//  * @return none 在直传oss完成，会根据状态触发success或error函数
//  */
import OSS from 'ali-oss';
async imgAdd(file_name, file) {
    try {
      const client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'your_key',
        accessKeySecret: 'your_secret',
        bucket: 'your_bucket'
      });
      const suffix = file.name.substr(file.name.indexOf("."));
      const time_stamp = this.timeStamp();
      const save_path = 'blog_images/' + time_stamp + suffix; //  路径+时间戳+后缀名
      let res = await client.multipartUpload(save_path, file);
      if (res.res.status === 200) {
        this.$refs.md.$img2Url(file_name, 'http://image-storage-ll.oss-cn-hangzhou.aliyuncs.com/' + save_path)
      } else {
        this.$Message.error('图片上传失败，状态码：' + res.res.status);
      }
    } catch (e) {
      console.log(e)
    }
  },