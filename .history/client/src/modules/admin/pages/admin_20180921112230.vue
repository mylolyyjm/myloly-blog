<template>
    <div>
        <el-form method="post" enctype="multipart/form-data">
            <el-form-item>
                <el-input class="el-input-article" v-model="title" placeholder="请输入标题"></el-input>
            </el-form-item>
             <el-form-item>
                <el-input class="el-input-article" v-model="abstract" placeholder="请输入摘要"></el-input>
            </el-form-item>
            <el-form-item>
                <el-upload ref="pic_upload" drag action="" :http-request="upload" :file-list="file">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-select class="el-input-article" placeholder="请选择标签" v-model="tag" multiple>
                    <el-option v-for="(item,index) of tag_list" :key="index" :value="item.name" :label="item.name"></el-option>    
                </el-select>  
            </el-form-item>
            <el-form-item>
                <el-switch v-model="publish" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
                </el-switch>    
            </el-form-item>          
        </el-form>
        <mavon-editor v-model="markdown_value"/>
        <el-dialog title="添加新标签" :visible.sync="dialog_visible" size="tiny" :before-close="handleClose">
            <el-input v-model="tag_adding"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="confirmAddTag">确 定</el-button>
            </span>
            </el-dialog>
        <el-button class="btn-upload-article" @click="addTagDialog">添加标签</el-button>        
        <el-button class="btn-upload-article" type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    import OSS from 'ali-oss';
    export default {
        data() {
            return {
                title: '',
                tag: '',
                tag_list: [],
                markdown_value: '',
                article_pic: '',
                abstract: '',
                publish: 0,
                tag_adding: '',
                dialog_visible: false,
                oss_sign: {},
                file: [],
            }
        },
        created() {
            this.axios.get('/api/tags').then((res) => {
                if (res.data.success) {
                    this.tag_list = res.data.tag_list;
                }
            }).catch((err) => {
                
            });
        },
        methods: {
            timeStamp() {
                const time = new Date();
                const y = time.getFullYear();
                const m = time.getMonth() + 1;
                const d = time.getDate();
                const h = time.getHours();
                const mm = time.getMinutes();
                const s = time.getSeconds();
                const ms = time.getMilliseconds();
                return "" + y + this.add0(m) + this.add0(d) + this.add0(h) + this.add0(mm) + this.add0(s) + this.add0(ms);
            },
            add0(m) {
                return m < 10 ? '0' + m : m;
            },
            upload(file) {
                log
                this.ossUpload();
            },
            async ossUpload(file) {
                try {
                    let vm = this;
                    
                    await this.axios.get('/api/getOssSign').then(res => {
                        this.oss_sign = res.data;
                    })
                    const client = new OSS(this.oss_sign);
                    const suffix = file.name.substr(file.name.lastIndexOf("."));
                    const file_name = file.name.substr(0, file.name.lastIndexOf("."))
                    const time_stamp = this.timeStamp();
                    
                    const save_path = 'article/' + time_stamp + suffix; //  路径+时间戳+后缀名
                    console.log(save_path,file);
                    
                    let res = await client.multipartUpload(save_path, file);
                    console.log(res);
                    
                    if (res.res.status === 200) {
                        this.$refs.pic_upload.$img2Url(file_name, 'http://article-images.oss-cn-beijing.aliyuncs.com/' + save_path)
                    } else {
                        this.$Message.error('图片上传失败，状态码：' + res.res.status);
                    }
                } catch (e) {
                    console.log(e)
                }
            },
            uploadSuccess(obj) {

            },
            removePic(obj) {

            },
            addTagDialog() {
                this.dialog_visible = true;                
            },
            handleClose() {
                this.tag_adding = '';
                this.dialog_visible = false;
            },
            confirmAddTag() {
                let send_data = {
                    name: this.tag_adding,
                };
                this.axios.post('/api/createTag', send_data).then((res) => {
                    if (res.data.success) {
                        this.$message.success('添加成功');
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
                this.tag_adding = '';
                this.dialog_visible = false;
            },
            submit() {
                let send_data = {
                    title: this.title,
                    content: this.markdown_value,
                    abstract: this.abstract,
                    tags: this.tag_list,
                    publish: this.publish,
                }
                this.axios.post('/api/createArticles', send_data).then(res => {
                    this.$message.success('提交成功');
                })
            }
        }
    }
</script>

<style lang="scss">
    @import 'mavon-editor/dist/css/index.css';
    .el-input-article {
        width: 400px;
        margin-top: 20px;
        .el-input {
            width: 400px;            
        }
    }
    .btn-upload-article {
        margin-top: 10px;
    }
</style>
