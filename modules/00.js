// 引入vue
import Vue from 'vue';
// 引入scss
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
        // 当前索引值
        num: -1,
        // 是不是第一次选中
        hasEnterUpKey: false
    },
    // 计算属性数据
    computed: {
        // 处理信息
        dealMsg() {
            // 对msg处理,返回@符号前面的
            let index = this.msg.indexOf('@');
            // 如果有@符号,再截取
            if(index >= 0) {
                return  this.msg.slice(0, index);
            }
            return this.msg;

            // console.log(this.msg.slice(0, index));
        },
        // 过滤邮箱
        dealEmail() {
            // 获取@符号
            let index = this.msg.indexOf('@');
            // 存在@,邮箱过滤
            if(index >= 0) {
                // 获取@符号后面的内容
                let str = this.msg.slice(index + 1);
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
        clickChooseLi(e) {
            // 获取li的内容
            let msg = e.target.innerHTML;
            // console.log(msg)
            // 更新msg
            this.msg = msg;
        },
        // 根据li的个数，以及num的索引值，计算出选中li的索引值
        getIndex(len) {
            // 不论num多么大还是多么小，对len取余就是 -len ~ len 之间的数
            // 我们希望得到0到len之间的数，是正数，所以加上len结果就是 0 ~ 2*len 之间的数
            // 我们继续对len取余，结果就是 0 ~ len 之间的一个数，就是我们想要的
            // let num = this.num % len;   // -len ~ len
            // num = num + len;            // 0 ~ 2*len
            // num = num % len;            // 0 ~ len
            // return num;
            // 合并成一步
            return (this.num % len + len) % len;
        },
        // 改变样式
        changeStyle() {
            // 获取所有的li
            let lis = document.getElementsByTagName('li');
            // 获取num对应的真是索引值
            let index = this.getIndex(lis.length);
            // 排它法设置样式
            // for (var i = 0; i < lis.length; i++) {
            //     // 清除所有li的类
            //     lis[i].className = '';
            // }
            // // 设置特殊li的类
            // lis[index].className = 'hover';
            // 遍历类数组对象
            // Array.from(lis, (item, i) => {
            //     item.className = '';
            // })
            // lis[index] = 'hover'
            // 合并
            // Array.from(lis, (item, i) => {
            //     // item.className = '';
            //     if (i === index) {
            //         item.className = 'hover';
            //     } else {
            //         item.className = '';
            //     }
            // })
            // 简化
            Array.from(lis, (item, i) => item.className = i === index ? 'hover' : '')
        },
        // 输入向上键，选中上一个
        choosePrevLi() {
            // 输入了向上键再更改索引值
            if(this.hasEnterUpKey) {
                this.num --;
            }
            // 改变样式
            this.changeStyle();
            // 输入了向上键
            this.hasEnterUpKey = true;
        },
        // 输入向下键，选中下一个
        chooseNextLi() {
            this.num ++;
            // 改变样式
            this.changeStyle();
            // 一旦输入了向下键，索引值也对应上了，所以也算输入了向上键。可以正常更改num值了
            this.hasEnterUpKey = true;
        },
        // 输入enter键，选中当前的
        enterChooseLi() {
            // 获取所有的li
            let lis = document.getElementsByTagName('li');
            // 获取索引值
            let index = this.getIndex(lis.length);
            // 获取li的内容，更新msg
            this.msg = lis[index].innerHTML;
        }
    }
})