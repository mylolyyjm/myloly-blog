<template>
    <div class="article-pos">
        <article class="article">
            <div class="time-author clearfix">
                <p class="time" v-text="article_content.lastEditTime"></p>
                <p class="author">cty</p>
                <p class="by">by</p>
            </div>
            <div class="title">
                <p>我不求道，道自然来。</p>
                <p v-text="article_content.title"></p>                
            </div>
            <div class="tag">
                <p>cty</p>
                <p>yjm</p>
            </div>
            <section class="content">
                一杯酒，敬温华，市井小二，折剑江湖。 <br>
                一杯酒，敬老黄，劣马黄酒，行六千里。 <br>
                一杯酒，敬轩辕，书生意气，问天求死。 <br>
                一杯酒，齐静春，言念君子，温其如玉。 <br>
                一杯酒，徐凤年，人生百年，修得凤年。 <br>
                一杯酒，李淳罡，剑来剑去，老此江湖。 <br>
                一杯酒，李当心，眼前有她，天下无禅。 <br>
                一杯酒，洪洗象，我不修道，道自然来。 <br>
                一杯酒，陈浮生，身前大道，身后蒹葭。
            </section>
            <section class="content" v-text="article_content.content"></section>
        </article>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                article_content: {
                    abstract: '',
                    content: '',
                    createTime: '',
                    id: '',
                    image_url: '',
                    lastEditTime: '',
                    publish: '',
                    tags: '',
                    title: '',
                },
            }
        },
        created() {
            let index = window.location.href.split('article/')[1];
            this.article_content = this.$store.state.article.article_list[index];
        }
        computed() {}
    }
</script>

<style lang="scss" scoped>
    @import '../assets/css/commom.css';
    .article {
            overflow: hidden;
            width: 320px;
            // height: 500px;
            background: #fff;
            margin: 20px auto;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
            transition: all 300ms linear 0s;
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
            .title {
                padding: 15px 30px;
                p {
                    &:first-of-type {
                        font-weight: 600;
                        line-height: 1.25;
                        font-family: "Josefin Sans", sans-serif;
                        color: #333;
                        font-size: 18px;
                    }
                }
            }
            .content {
                padding: 15px 30px;
                font-size: 14px;
            }
            .tag {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                padding: 0 30px;
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
    @media screen and (max-width: 768px) {
        .article {
            width: 320px;
            .time-author {
                width: 320px;
            }
            .tag {
                justify-content: center;
            }
        }
    }
    @media screen and (min-width: 768px) {
        .article {
            width: 768px;
            .time-author {
                width: 768px;
            }
            .tag {
                justify-content: flex-start;
            }
        }
    }
</style>

