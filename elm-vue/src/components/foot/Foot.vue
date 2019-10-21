<template>
    <div class="foot">
        <div>
            <i class="el-icon-eleme"></i>
            <p>外卖</p>
        </div>
        <div>
            <i class="el-icon-discover"></i>
            <p>搜索</p>
        </div>
        <div>
            <i class="el-icon-tickets"></i>
            <p>订单</p>
        </div>
        <div>
            <i class="el-icon-user"></i>
            <p>我的</p>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Foot"
    }
</script>

<style lang="scss" scoped>
.foot{
    width:100%;
    height: 0.95rem;
    border-top:0.01rem solid #e1e1e1;
    display: flex;
    background:white;
    >div{
        width:25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding:0.2rem 0;
        font-size: 0.22rem;
        color:#444;
        i{
            font-size: 0.4rem;
        }
    }
}
</style>