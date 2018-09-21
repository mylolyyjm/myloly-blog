<!--
  created by xiwei 2017/9/4
  单张图片上传oss组件
  属性：
  width, height, name, index(name值相同时使用index方便获取操作对象，主要在循环中使用)，
  file(默认显示的图片url), path
  事件：
  success(), remove()
-->
<template>
  <div class="single-pic-upload">
    <div class="upload-wrapper">
      <input type="file" ref="input_hook" @change="autoUpload">
      <div v-show="status != 'success'" class="click-wrapper" @click="selectPhoto" ref="click_wrapper_hook">
        <i v-show="status == 'waiting'" class="fa fa-cloud-upload" aria-hidden="true"></i>
        <div class="uploading" v-show="status == 'uploading'">上传中...</div>
      </div>
      <div v-show="status == 'success'" class="photo-wrapper" ref="photo_wrapper_hook">
        <img :src="uploaded_path">
        <div class="menu">
          <div class="icon-wrapper">
            <i class="fa fa-search-plus" aria-hidden="true" @click="is_show_big_photo=true"></i>
            <i class="fa fa-trash-o" v-show="is_show_delete" aria-hidden="true" @click="trashPhoto"></i>
          </div>
        </div>
      </div>
      <div class="big-photo-wrapper" v-show="is_show_big_photo" @click="is_show_big_photo=false">
        <div class="shade"></div>
        <div class="big-photo">
          <div class="photo">
            <img :src="uploaded_path">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const ossUpload = require('../../');
  export default{
    props: {
      file: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: '',
      },
      index: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 160
      },
      height: {
        type: Number,
        default: 160
      },
      path: {
        type: String,
        default: 'single-pic-upload/'
      },
      is_replace: {
        type: Boolean,
        default: false
      },
      is_show_delete: {
        type: Boolean,
        default: true
      },
      is_dimension: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        status: 'waiting',
        file_url: 'http://oss.aliyuncs.com',
        file_data: {},

        js_sign_url: '//xdb.citytogo.cn/tuan/component/index/get-js-sign/?path=',
        uploaded_path: '',
        is_show_big_photo: false,
      }
    },
    created () {
      if (typeof this.file === 'string' && this.file) {
        this.uploaded_path = this.file;
        if (this.is_replace) {
          this.uploaded_path = this.uploaded_path.replace(/#/g, ',');
        }
        this.status = 'success';
      }
      this.js_sign_url = this.js_sign_url + this.path;
      if (this.js_sign_url.charAt(this.js_sign_url.length - 1) !== '/') {
        this.get_js_sign += '/';
      }

      this._setSize();
      this.$watch('file', (path) => {
        if (path) {
          this.uploaded_path = path;
          if (this.is_replace) {
            this.uploaded_path = this.uploaded_path.replace(/#/g, ',');
          }
          this.status = 'success';
        } else {
          this.uploaded_path = '';
          this.status = 'waiting';
        }
      })
    },
    methods: {
      _setSize () {
        this.$nextTick(_ => {
          this.$refs.click_wrapper_hook.style.width = this.width + 'px';
          this.$refs.click_wrapper_hook.style.height = this.height + 'px';
          this.$refs.click_wrapper_hook.style.lineHeight = this.height + 'px';
          this.$refs.click_wrapper_hook.style.fontSize = this.width / 3 + 'px';
          this.$refs.photo_wrapper_hook.style.width = this.width + 'px';
          this.$refs.photo_wrapper_hook.style.height = this.height + 'px';
        })
      },
      selectPhoto () {
        this.$refs.input_hook.click();
      },
      autoUpload: function (event) {
        this.status = 'uploading';
        let file = event.target.files[0];
        if (file.size > 1024 * 1024 * 8) {
          alert(`'${file.name}'超过8M，无法上传`);
          return false;
        }
        if (this.is_dimension && (file.offsetWidth !== 702 || file.offsetHeight !== 208)) {
          alert(`'${file.name}'尺寸不为702*208，无法上传`);
          return false;
        }
        ossUpload({
          file: file,
          onSuccess: () => {
            this.uploaded_path = file.src_url;
            this.status = 'success';
            this.$emit('success', {
              name: this.name,
              index: this.index,
              path: 'https:' + this.uploaded_path
            });
            this.$refs.input_hook.value = '';
          },
          onError: () => {
          }
        }, this, this.js_sign_url);
      },
      trashPhoto () {
        this.$emit('remove', {
          name: this.name,
          index: this.index,
          path: this.uploaded_path
        });
        this.$refs.input_hook.value = '';
        this.uploaded_path = '';
        this.status = 'waiting';
      }
    }
  }
</script>

<style  scoped lang="scss">
  .single-pic-upload {
    input {
      display: none;
    }
    .click-wrapper {
      width: 160px;
      height: 160px;
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      cursor: pointer;
      text-align: center;
      border-radius: 5px;
      line-height: 160px;
      color: #97a8be;
      font-size: 50px;
      &:hover {
        border: 1px dashed #58B7FF;
      }
      .uploading {
        color: rgba(56, 47, 47, 0.5);;
        font-size: 18px;
      }
    }
    .photo-wrapper {
      position: relative;
      width: 160px;
      height: 160px;
      border-radius: 5px;
      img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
      }
      .menu {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 5px;
        font-size: 0;
        top: 0;
        left: 0;
        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-size: 22px;
          text-align: center;
          .icon-wrapper {
            width: 100%;
            position: absolute;
            top: 50%;
            margin-top: -11px;
            text-align: center;
            letter-spacing: 10px;
            padding-left: 5px;
            i {
              cursor: pointer;
            }
          }
        }
      }
    }
    .big-photo-wrapper {
      width: 100%;
      height: 100%;
      text-align: center;
      .shade {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(48, 48, 48, 0.1);
        z-index: 998;
      }
      .big-photo {
        position: fixed;
        top: 60px;
        left: 175px;
        right: 0;
        z-index: 999;
        max-height: 95%;
        text-align: center;
        overflow-y: scroll;
        .photo {
          display: inline-block;
          background-color: #fff;
          padding: 15px;
          min-width: 30%;
          max-width: 90%;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>