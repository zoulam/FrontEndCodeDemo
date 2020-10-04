<script>
import Test from './Test'
export default {
  //   props: {
  //     tag: String,
  //   },
  //   data() {
  //     return {
  //       people: ["zoulam", "luluxi", "lala"],
  //     };
  //   },

  // render 函数最终还是被编译成template，但是灵活性高
  // render(createElement) {
  // arg1 组件名/标签名
  // arg2 标签的详细设置
  // agr3：子元素
  // return createElement('h1',{},'hello vue')


//     动态渲染;
//     return createElement(
//       this.tag,
//       {},
//       this.people.map((name) =>
//         createElement(
//           "li",
//           {
//             attrs: { class: "test" },
//             on: {
//               click: () => {
//                 console.log("li click!");
//               },
//             },
//           },
//           `${name}`
//         )
//       )
//     );
//   },

  // 引入组件
  render(createElement){
      return createElement(Test,{
          props:{
              msg:'render component'
          }
      },)
  }
};
</script>

<style>
</style>