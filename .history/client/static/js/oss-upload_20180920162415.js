/**
 * Created by ZhangZhelun on 2017-04-01.
 */
/**
 * @param opt elm封装的请求信息
 * @param vm Vue实例
 * @param server_url 获取签名的服务器地址
 * @return none 在直传oss完成，会根据状态触发success或error函数
 */
module.exports = (opt, vm, server_url) => {
    // todo: file_url, file_data 等 vm 属性名做配置项 - 不要写死
    
    const randomString = (len = 32) => {
      let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      let maxPos = chars.length;
      let pwd = '';
  
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    };
  
    const getSuffix = (filename) => {
      let pos = filename.lastIndexOf('.');
  
      return pos != -1 ? filename.substring(pos) : ''
    };
  
    let file = opt.file;
  
    /* 还未获取过签名 ||  签名即将已经过期 */
    if (!vm.file_data.expire || vm.file_data.expire < Date.now() + 3000) {
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", server_url, false);
      xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xmlhttp.send(null);
      let res = JSON.parse(xmlhttp.responseText);
  
      vm.file_url = res.host;
      vm.file_data = {
        dir: res.dir,
        OSSAccessKeyId: res.accessid,
        policy: res.policy,
        signature: res.signature,
        expire: res.expire * 1000
      }
    }
  
    /* oss下的路径地址 */
    let dir_name = vm.file_data.dir + randomString(10) + getSuffix(file.name);
  
    /* 直传成功后的图片地址 */
    file.src_url = '//pic.tugou.com/' + dir_name;
  
    vm.file_data.key = dir_name;
  
    let form_data = new FormData();
    for (let key in vm.file_data) {
      form_data.append(key, vm.file_data[key]);
    }
    form_data.append('file', file);
  
    Vue.http.post(vm.file_url, form_data)
      .then(res => {
        opt.onSuccess()
      })
      .catch(err => {
        opt.onError()
      });
  };
  