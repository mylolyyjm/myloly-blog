<template>
    <div class="article-pos">
        <article class="article" v-for="(item, index) of 12" :key="index" @click="goToArticle(item)">
            <img class="image" src="../assets/images/123.jpg" alt="">
            <div class="time-author clearfix">
                <p class="time">feb 17, 2016</p>
                <p class="author">cty</p>
                <p class="by">by</p>
            </div>
            <div class="content">
                <p>最初，我只是想整理一份技术清单，理清思路。但是内容越写越多，索性就做成一个教程，放在 Github 上面。这份教程一共四章，可以在两天内学完，适合那些已掌握前端基本技能（HTML、CSS、JS）、想进一步进修、成为 JavaScript 全栈工程师的读者。</p>
                <p>In the broadest sense, is the natural, physical, or material world or universe...</p>
            </div>
            <div class="tag">
                <p>cty</p>
                <p>yjm</p>
            </div>
        </article>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';    
    export default {
        data() {
            return {

            }
        },
        created() {
            this.aa();
        },
        methods: {
            ...mapActions([
                'getAllArticle'
            ]),
            aa() {
                this.getAllArticle();
            },
            goToArticle(item) {
                this.$router.push(`/article/${item}`);
            }
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
