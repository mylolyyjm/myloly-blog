<template>
    <div id="article-edit">
        <el-form inline class="article-form" method="post" enctype="multipart/form-data">
            <el-form-item label="标题: ">
                <el-input class="el-input-article" v-model="title" placeholder="请输入标题"></el-input>
            </el-form-item>
             <el-form-item label="摘要: ">
                <el-input class="el-input-article" v-model="abstract" placeholder="请输入摘要"></el-input>
            </el-form-item>
            <el-form-item label="标签: ">
                <el-select class="el-input-article" placeholder="请选择标签" v-model="tag" multiple>
                    <el-option v-for="(item,index) of tag_list" :key="index" :value="item.name" :label="item.name"></el-option>    
                </el-select>  
            </el-form-item>
            <el-form-item label="图片上传: ">
                <el-upload ref="pic_upload" drag action="string" :http-request="upload" :file-list="file">
                    <div class="el-upload__text">拖动或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>        
            <el-form-item label="是否发布: ">
                <el-switch v-model="publish" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0"></el-switch>    
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
    import { timeStamp, param } from '../../../../static/js/utils.js';
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                title: '',
                tag: '',
                markdown_value: '',
                article_pic: '',
                abstract: '',
                publish: 0,
                tag_adding: '',
                dialog_visible: false,
                oss_sign: {},
                file: [],
                article_image: '',
            }
        },
        created() {
            let article
            if (param('id')) {
                this.getArticleById(param('id'));
            }
            this.getAllTags();
        },
        computed: {
            tag_list() {
                return this.$store.state.article.tag_list;
            },
        },
        methods: {
            ...mapActions([
                'createArticle',
                'getArticleById',
                'createTag',
                'getAllTags',
            ]),
            upload(option) {
                this.ossUpload(option.file);
            },
            async ossUpload(file) {
                try {
                    await this.axios.get('/api/getOssSign').then(res => {
                        this.oss_sign = res.data;
                    })
                    const client = new OSS(this.oss_sign);
                    const suffix = file.name.substr(file.name.lastIndexOf("."));
                    const file_name = file.name.substr(0, file.name.lastIndexOf("."))
                    const time_stamp = timeStamp();
                    
                    const save_path = 'article/' + time_stamp + suffix; //  路径+时间戳+后缀名
                    
                    let res = await client.multipartUpload(save_path, file);
                    if (res.res.status === 200) {
                        this.article_image = res.res.requestUrls[0].split('?');
                    } else {
                        this.$Message.error('图片上传失败，状态码：' + res.res.status);
                    }
                } catch (e) {
                    console.log(e)
                }
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
                this.createTag(send_data).then((res) => {
                    if (res.data.success) {
                        this.$message.success('success');
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
                    image_url: this.article_image,
                    tags: this.tag_list,
                    publish: this.publish,
                }
                this.createArticle(send_data).then((res) => {
                    if (res.data.success) {
                        this.$message.success('success');
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    @import 'mavon-editor/dist/css/index.css';
    #article-edit {
        .el-input-article {
        width: 400px;
        .el-input {
            width: 400px;            
        }
        }
        .btn-upload-article {
            margin-top: 10px;
        }
        .article-form {
            .el-form-item {
                margin-bottom: 10px;
            }
            .el-upload-dragger {
                width: 200px;
                height: 37px
            }
        }
        .v-note-wrapper {
            min-height: 600px;
        }
    }
</style>
