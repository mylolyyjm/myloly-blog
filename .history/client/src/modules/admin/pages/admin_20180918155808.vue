<template>
    <div>
        <el-form>
            <el-form-item>
                <el-input class="el-input-article" v-model="title" placeholder="请输入标题"></el-input>
            </el-form-item>
             <el-form-item>
                <el-input class="el-input-article" v-model="abstract" placeholder="请输入摘要"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select class="el-input-article" v-model="tag">
                    <el-option placeholder="请选择标签" v-for="(item,index) of tag_list" :key="index" :value="item.name" :label="item.name"></el-option>    
                </el-select>  
            </el-form-item>
            <el-form-item>
                <el-switch v-model="value3"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="100"
                    off-value="0">
                </el-switch>    
            </el-form-item>          
        </el-form>
        <mavon-editor v-model="markdown_value"/>
        <el-button class="btn-upload-article" type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                tag: '',
                tag_list: [],
                markdown_value: '',
                abstract: '',
            }
        },
        created() {
            this.axios.get('/api/articles').then((res) => {
                console.log(res);
            })
        },
        methods: {
            submit() {
                let send_data = {
                    title: this.title,
                    content: this.markdown_value,
                    abstract: this.abstract,
                    tags: this.tag_list.join(','),
                }
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
