import {
    createApp
} from 'vue'

// 导入elementUI 以及 elementIcon
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

// 导入路由
import router from './router'

import App from './App.vue'
import './index.css'

const app = createApp(App)

// 使用elementUI
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 使用路由
app.use(router)

app.mount('#app')