import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '98.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

console.log(`C#M By \n%c
    888       888          888 888          
    888   o   888          888 888          
    888  d8b  888          888 888          
    888 d888b 888  .d88b.  888 888  .d88b.  
    888d88888b888 d8P  Y8b 888 888 d88""88b 
    88888P Y88888 88888888 888 888 888  888 
    8888P   Y8888 Y8b.     888 888 Y88..88P 
    888P     Y888  "Y8888  888 888  "Y88P"  
    
    `
     +`%c학생들이 세상을 구한다.
     
     
     
     `,
    'color:#ffffff;font-family: "DungGeunMo";',
    'color:#ffffff; background:#000000;font-family: "pretendard";');
    console.log("%c여기 볼거 없어.",'font-family: "pretendard";')
    console.log("%c뭐 할거면 팀에 들어가서 하자! > > > > > https://csm.kr",'font-family: "pretendard"; font-size:16px;');

app.mount('#app')
