// <script setup lang="ts">
// import MyIndex from './MyIndex.vue'
// import DocumentationIcon from './icons/IconDocumentation.vue'
// import ToolingIcon from './icons/IconTooling.vue'
// import EcosystemIcon from './icons/IconEcosystem.vue'
// import CustomInput from './CustomInput.vue'
// import HomeView from './HomeView.vue'

import {
  VueElement,
  computed,
  defineComponent,
  onMounted,
  onServerPrefetch,
  reactive,
  ref,
  useAttrs,
  watch
} from 'vue'

//一下主要学习安全机制和路径即可
// 1.安全机制
// 2.路径
// 3.国际化
// 4.配置
import { Check, Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue'
import { ElButton, ElSelect } from 'element-plus'
import OktaVue, { LoginCallback } from '@okta/okta-vue'
import { OktaAuth } from '@okta/okta-auth-js'

// import { useI18n } from 'vue-i18n'
// // import SupportIcon from './icons/IconSupport.vue'
// //就是prop里的擦书需要在引用该组件时提供的参数
// //需要使用驼峰命名,传入时注意使用
// // 第一种方式
// // const props = defineProps(['foo'])
// // 第二种方式
// // defineProps({
// //   title: String,
// //   likes: Number
// // })
// // 静态 vs. 动态 Prop   相应地，还有使用 v-bind 或缩写 : 来进行动态绑定的 props
// defineProps({
//   msg: {
//     type: [String, Number],
//     required: true,
//     default: 'myIndex default for this!'
//   },
//   myObj: {
//     type: Object,
//     required: false
//   },
//   setup: () => {
//     return {
//       msg: String
//     }
//   }
// })
interface Book {
  title: string
  author: string
  year: number
}
// defineEmits(() => {})

// 它的存在是完全让传入的整个对象获得对应的类型，它的存在就是完全为了服务 TypeScript 而存在的。
export default defineComponent({
  name: 'MyIndex',
  components: {
    //myindex,
  },
  props: {
    name: {
      default: 'mike'
    },
    msg: {
      type: [String, Number],
      required: true,
      default: 'myIndex default for this!'
    }
    // book: {
    //   type: Book,
    //   required: false
    // }
  },
  emits: {},
  //   setup函数是处于 生命周期函数 beforeCreate 和 Created 两个钩子函数之间的函数
  //   setup函数只能是同步的不能是异步的
  setup: (props, ctx) => {
    // const { locale } = useI18n()
    const { elButton } = ElButton
    // const { Check, Delete, Edit, Message, Search, Star }
    interface Book {
      title: string
      author: string
      year: number
    }
    let book: Book = {
      title: '',
      author: '',
      year: 0
    }

    book.author = 'mike'
    console.log('setup 何时加载=', props, ctx, book)

    const msg = ref('this is my home down home !')
    const html1 = `<span style="color:red">this shuld be red</span>`

    const pm = ref('pm')
    // const msg = ref('this is my home down home !');

    const author = reactive({
      name: 'john doe',
      books: ['vue2', 'vue3', 'vue4', 'eg:others']
    })
    const publishedmsg = computed(() => {
      return author.books.length > 0 ? 'yes' : 'no'
    })
    const isActive = ref(true)
    const hasError = ref(true)
    const classObject = reactive({
      active: true,
      'text-danger': false
    })
    const awesome = ref(true)
    const myObject = reactive({
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    })
    const elBtnClick = (e: any) => {
      alert('elbtnclick')

      window.alert('elBtnClick from window alert')
      //   locale.value = 'en' //"cn"
      const emt = window.document.getElementById('id')?.children
    }
    function say(this: any, message: any) {
      alert(message)
      this.msg = message
      console.log(this.msg)
    }
    function warn(message: any, event: { preventDefault: () => void }) {
      // 这里可以访问原生事件,有时我们需要在内联事件处理器中访问原生 DOM 事件$event
      console.log(event)
      if (event) {
        event.preventDefault()
      }
      alert(message)
    }
    const text = ref(0)
    const message = ref('')
    window.onload = () => {
      let html2 = `<span style="color:red">this shuld be red</span>`
      console.log('this is myindex msg' + html2)

      const state = reactive({ count: 0 })

      console.log(state)
      //   window.history
      // window.location
      // window.console
      // window.screen
      // window.navigator
      //   window.sessionStorage.setItem
      // window.localStorage
    }
    const data = ref(null)

    onServerPrefetch(async () => {
      // 组件作为初始请求的一部分被渲染
      // 在服务器上预抓取数据，因为它比在客户端上更快。
      //   data.value = await fetchOnServer(/* ... */)
    })
    const refel = ref(null)
    onMounted(async () => {
      console.log('mounted hasbeen onladed!')
      if (!data.value) {
        // 如果数据在挂载时为空值，这意味着该组件
        // 是在客户端动态渲染的。将转而执行
        // 另一个客户端侧的抓取请求
        // data.value = await fetchOnClient(/* ... */)
      }
      if (refel.value) {
        ;(refel.value as any).focus()
      }
    })
    //侦听
    const question = ref('')
    const answer = ref('Questions usually contain a question mark. ;-)')

    // 可以直接侦听一个 ref
    watch(
      question,
      async (newQuestion, oldQuestion) => {
        console.log('oldqusntion=' + oldQuestion)
        if (newQuestion.indexOf('?') > -1) {
          answer.value = 'Thinking...'
          try {
            const res = await fetch('https://yesno.wtf/api')
            answer.value = (await res.json()).answer
          } catch (error) {
            answer.value = 'Error! Could not reach the API. ' + error
          }
        }
      },
      { immediate: true, deep: true }
    )
    // // 调用给父组件的emits事件,触发与监听事件
    // const emit = defineEmits(['someEvent', 'callback', 'callduty'])
    //emit('someEvent', 'callback', 'callduty')

    const searchText = ref('input some search text in here !')
    const attrs = useAttrs()
    return {
      msg,
      attrs,
      pm,
      author,
      publishedmsg,
      isActive,
      hasError,
      classObject,
      awesome,
      myObject,
      text,
      message,
      question,
      answer,
      html1,
      say,
      warn,
      //   locale,
      elButton,
      elBtnClick,
      Check,
      Delete,
      Edit,
      Message,
      Search,
      Star
    }
  }
})
