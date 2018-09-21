<template>
    <div>
        <el-form>
            <el-form-item>
                <el-input class="el-input-article" v-model="title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select class="el-input-article" v-model="tag">
                    <el-option placeholder="请选择标签" v-for="(item,index) of tag_list" :key="index" :value="item.name" :label="item.name"></el-option>    
                </el-select>  
            </el-form-item>            
        </el-form>
        <mavon-editor v-model="markdown_value"/>
        <el-button class="btn-upload-article" type="primary">提交</el-button>
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
            }
        },
        created() {
            this.axios.get('/api/articles').then((res) => {
                console.log(res);
            })
        },
    }
</script>

<style lang="scss">
    @import 'mavon-editor/dist/css/index.css';
    .el-input-article {
        width: 400px;
        margin-top: 20px;
        .el-input {
            
        }
    }
    .btn-upload-article {
        margin-top: 10px;
    }
</style>
