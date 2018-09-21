<template>
    <div>
        <el-form>
            <el-form-item>
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="tag">
                    <el-option placeholder="请选择标签" v-for="(item,index) of tag_list" :key="index" :value="item.name" :label="item.name"></el-option>    
                </el-select>  
            </el-form-item>            
        </el-form>
        
        <mavon-editor v-model="markdown_value"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                markdown_value: '',
            }
        },
        created() {
            this.aixos.get('/api/articles')
        },
    }
</script>

<style>
    @import 'mavon-editor/dist/css/index.css';
    .el-input {
        width: 400px;
        margin-top: 20px;
    }
</style>
