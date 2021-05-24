// 引入库
import Vue from 'vue';
// 引入样式
import './demo.scss';

// vue实例化
new Vue({
    // 视图
    el: '#app',
    // 静态数据
    data: {
        // 输入的内容
        msg: '',
        // 邮箱名称
        email: ['qq', '163', '126', '189', 'sina', 'hotmail', 'gmail', '21cn'],
        // 存储所有li的类
        cls: [],
        // 当前索引值
        num: -1,
        // 是不是第一次选中
        hasEnterUpKey: false
    },
    // 计算属性数据
    computed: {
        // 处理信息
        dealMsg(v) {
            // 对msg处理,返回@符号前面的
            var index = this.msg.indexOf('@');
            // 如果有@符号,再截取
            if (index >= 0) {
                return  this.msg.slice(0, index);
            }
            return this.msg;
            // else {
            //     return this.msg;
            // }
            // console.log(this.msg.slice(0, index));
        },
        // 过滤邮箱
        dealEmail() {
            // 获取@符号
            var index = this.msg.indexOf('@');
            // 存在@,邮箱过滤
            if (index >= 0) {
                // 获取@符号后面的内容
                var str = this.msg.slice(index + 1);
                // console.log(str);
                // 过滤邮箱
                return this.email.filter(item => {
                    // 让item添加后缀名
                    item += item == '189' ? '.c' : '.co';
                    // 返回值是过滤的条件: 是否以str开头
                    return item.indexOf(str) === 0;
                })
            }
            // 返回全部邮箱
            return this.email;
        }
    },
    // 方法
    methods: {
        // 点击li，选中li
        // clickChooseLi(msg) {
        //     // console.log(msg);
        //     this.msg = msg;
        // },
        // 根据li的个数，以及num的索引值，计算出选中li的索引值
        getIndex(len) {
            return (this.num % len + len) % len;
        },
        // 改变样式
        changeStyle() {
            // 根据显示邮箱的个数，获取索引值
            var index = this.getIndex(this.dealEmail.length);
            // 排它法
            var cls = [];
            // 设置特殊的
            cls[index] = 'hover';
            // 更新数据
            this.cls = cls;
        },
        // 输入向上键，选中上一个
        choosePrevLi() {
            // 输入了向上键再更改索引值
            if (this.hasEnterUpKey) {
                this.num--;
            }
            // 改变样式
            this.changeStyle();
            // 输入了向上键
            this.hasEnterUpKey = true;
        },
        // 输入向下键，选中下一个
        chooseNextLi() {
            this.num++;
            // 改变样式
            this.changeStyle();
            // 一旦输入了向下键，索引值也对应上了，所以也算输入了向上键。可以正常更改num值了
            this.hasEnterUpKey = true;
        },
        // 输入enter键，选中当前的
        enterChooseLi() {
            // 根据显示邮箱的个数，获取索引值
            var index = this.getIndex(this.dealEmail.length);
            // 获取邮箱名称
            var item = this.dealEmail[index];
            // 更新msg
            this.msg = this.dealMsg + '@' + item + (item == '189' ? '.cn' : '.com')
        }
    }
})