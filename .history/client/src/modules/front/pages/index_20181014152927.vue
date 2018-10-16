<template>
    <div class="article-pos">
        <article class="article" v-for="(item, index) of article_list" :key="index" @click="goToArticle(item,index)">
            <img class="image" :src="item.image_url" alt="">
            <div class="time-author clearfix">
                <p class="time" v-text="item.lastEditTime"></p>
                <p class="author">cty</p>
                <p class="by">by</p>
            </div>
            <div class="content" v-html="item.title"></div>
            <div class="tag">
                <p>cty</p>
                <p>yjm</p>
            </div>
        </article>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';    
    import { log } from 'util';
    import { setTimeout } from 'timers';
    export default {
        data() {
            return {
                article_list: [],
            }
        },
        created() {
            this.getAllArticles();

            this.article_list = this.$store.state.article.article_list;
        },
        computed: {
            article_list() {
                return this.$store.state.article.article_list
            }
        },
        methods: {
            ...mapActions([
                'getAllArticles'
            ]),
            goToArticle(item, index) {
                this.$router.push(`/article/${index}`);
            },
        }
    }
</script>


<style scoped lang="scss">
    @import '../assets/css/commom.css';
    .article-pos {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .article{
        overflow: hidden;
        width: 320px;
        // height: 500px;
        background: #fff;
        margin: 20px auto;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
        transition: all 300ms linear 0s;
        .image {
            display: block;
            width: 320px;
            height: 240px;
        }
        .time-author {
            width: 320px;
            height: 20px;
            color: #b2b2b2;
            font-family: "Kanit", sans-serif;
            letter-spacing: 0.75px;
            font-size: 13px;
            font-weight: bold;
            padding: 15px 30px;
            .time {
                float: left;
            }
            .by,.author {
                float: right;
            }
            .author {
                margin-top: -2px;
            }
            .by {
                text-transform: lowercase;
                margin-right: 6px;
                font: 700 italic 14px/1 "Josefin Sans", sans-serif;
            }
        }
        .content {
            padding: 15px 30px;
            p {
                width: 260px;
                &:first-of-type {
                    font-weight: 600;
                    line-height: 1.25;
                    font-family: "Josefin Sans", sans-serif;
                    color: #333;
                    font-size: 18px;
                    margin-bottom: 22px;
                }
                &:last-of-type {
                    color: #808080;
                    font: 500 italic 15px/21px "Roboto", sans-serif;
                }
            }
        }
        .tag {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0 30px 15px;
            p {
                display: inline-block;
                margin-right: 10px;
                font-size: 16px;
                box-shadow: grey;
                background: -webkit-linear-gradient(330deg, #81db34 0%, #34d9da 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                color: #34d9da;
            }
        }
    }
</style>
