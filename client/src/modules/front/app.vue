<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style lang="stylus">
    #app 
        width 100%
        background: #f5f4f4;
        margin 0
        padding 0
    .fade-enter-active, .fade-leave-active
        transition all .5s
    .fade-enter, .fade-leave-active
        opacity 0
    .fade-enter
        transform translateX(50px)
    .fade-leave-active
        transform translateX(-50px)
</style>

