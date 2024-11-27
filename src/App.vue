<template>
  <div v-if="isBooting" class="boot-screen">
    <div class="boot-content">
      <img src="@/assets/wello.svg" alt="WELLOS" class="boot-logo">
      <div class="boot-text">
        <div>WELLOS 95</div>
        <div class="boot-message">{{ bootMessage }}</div>
      </div>
      <div class="boot-progress">
        <div class="progress-bar" :style="{ width: bootProgress + '%' }"></div>
      </div>
    </div>
  </div>
  <div v-else-if="!isShutdown" class="win95">
    <div class="desktop">
      <!-- 바탕화면 아이콘들 -->
      <div class="desktop-icons">
        <div 
          v-for="icon in desktopIcons" 
          :key="icon.id"
          class="icon"
          @dblclick="openWindow(icon)"
        >
          <img :src="icon.icon" :alt="icon.name">
          <span>{{ icon.name }}</span>
        </div>
      </div>

      <!-- 윈도우들 -->
      <Window
        v-for="window in activeWindows"
        :key="window.id"
        :title="window.title"
        :content="window.content"
        :program-component="window.component"
        :is-minimized="window.isMinimized"
        :initial-x="window.x"
        :initial-y="window.y"
        :initial-width="window.initialWidth"
        :initial-height="window.initialHeight"
        @close="closeWindow(window)"
      />

      <!-- 작업 표시줄 -->
      <div class="taskbar">
        <button class="start-button" @click="toggleStartMenu">
          <img src="@/assets/wello.svg" alt="시작">
          시작
        </button>
        <div class="task-buttons">
          <button 
            v-for="window in activeWindows"
            :key="window.id"
            class="task-button"
            :class="{ active: !window.isMinimized }"
            @click="toggleWindow(window)"
          >
            {{ window.title }}
          </button>
        </div>
        <div class="time">{{ currentTime }}</div>
      </div>

      <!-- 시작 메뉴 -->
      <StartMenu 
        :is-open="startMenuOpen"
        @menu-click="handleStartMenuClick"
      />
    </div>
  </div>
  <div v-else class="shutdown-screen"></div>
</template>

<script>
import Window from './components/Window.vue'
import StartMenu from './components/StartMenu.vue'
import MyComputer from './components/programs/MyComputer.vue'
import AboutWello from './components/programs/AboutWello.vue'
import AboutTeam from './components/programs/AboutTeam.vue'

export default {
  name: 'App',
  components: {
    Window,
    StartMenu,
    MyComputer,
    AboutWello,
    AboutTeam
  },
  data() {
    return {
      currentTime: '',
      startMenuOpen: false,
      activeWindows: [],
      windowIdCounter: 0,
      desktopIcons: [
        { 
          id: 1,
          name: '내 컴퓨터',
          icon: new URL('@/assets/mypc.svg', import.meta.url).href,
          component: MyComputer
        },
        { 
          id: 1,
          name: 'ABOUR TEAM',
          icon: new URL('@/assets/wello2.svg', import.meta.url).href,
          component: AboutTeam
        },
        {
          id: 2,
          name: 'WELLOOS 정보',
          icon: new URL('@/assets/wello.svg', import.meta.url).href,
          component: AboutWello,
          initialWidth: 400,
          initialHeight: 450
        }
      ],
      isShutdown: false,
      isBooting: true,
      bootProgress: 0,
      bootMessage: 'WELLOS 부팅...',
      bootMessages: [
        'WELLOS 95를 부팅하는 중...',
        '시스템 파일 로딩',
        '컴포넌트 초기화',
        '프로그램을 불러오는중...',
        '새로운 시작'
      ]
    }
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 1000)
    this.startBootSequence()
  },
  methods: {
    updateTime() {
      const now = new Date()
      this.currentTime = now.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    toggleStartMenu() {
      this.startMenuOpen = !this.startMenuOpen
    },
    openWindow(icon) {
      const window = {
        id: this.windowIdCounter++,
        title: icon.name,
        component: icon.component,
        isMinimized: false,
        x: 50 + (this.activeWindows.length * 30),
        y: 50 + (this.activeWindows.length * 30),
        initialWidth: icon.initialWidth || 800,
        initialHeight: icon.initialHeight || 600
      }
      this.activeWindows.push(window)
      this.startMenuOpen = false
    },
    closeWindow(window) {
      const index = this.activeWindows.indexOf(window)
      if (index > -1) {
        this.activeWindows.splice(index, 1)
      }
    },
    toggleWindow(window) {
      window.isMinimized = !window.isMinimized
    },
    handleStartMenuClick(action) {
      if (action === 'shutdown') {
        this.isShutdown = true;
      }
    },
    startBootSequence() {
      let messageIndex = 0;
      const bootInterval = setInterval(() => {
        this.bootProgress += 2;
        if (this.bootProgress >= 100) {
          clearInterval(bootInterval);
          setTimeout(() => {
            this.isBooting = false;
          }, 500);
        }
        if (this.bootProgress % 20 === 0 && messageIndex < this.bootMessages.length) {
          this.bootMessage = this.bootMessages[messageIndex];
          messageIndex++;
        }
      }, 50);
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "pretendard";
}

html, body {
  height: 100%;
  overflow: hidden;
}

.win95 {
  height: 100vh;
  background-color: #008080;
  display: flex;
  flex-direction: column;
}

.desktop {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.icon {
  width: 75px;
  text-align: center;
  margin: 20px;
  cursor: pointer;
}

.icon img {
  width: 32px;
  height: 32px;
}

.icon span {
  color: white;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 28px;
  background-color: #c0c0c0;
  display: flex;
  align-items: center;
  padding: 2px;
  border-top: 1px solid #fff;
  z-index: 9999;
}

.start-button {
  display: flex;
  align-items: center;
  padding: 2px 6px;
  margin-right: 4px;
}

.start-button img {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.task-buttons {
  display: flex;
  flex-grow: 1;
  margin: 0 4px;
}

.task-button {
  margin: 0 2px;
  padding: 2px 8px;
  min-width: 150px;
  text-align: left;
}

.time {
  margin-left: auto;
  padding: 0 10px;
  border: 1px solid #888;
  background: #fff;
}

.shutdown-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 99999;
}

.boot-screen {
  background-color: #000;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Courier New', monospace;
}

.boot-content {
  text-align: center;
}

.boot-logo {
  width: 150px;
  height: 150px;
  margin-bottom: 2em;
  filter: brightness(0) invert(1);
}

.boot-text {
  font-size: 1.5em;
  margin-bottom: 2em;
}

.boot-message {
  font-size: 0.8em;
  margin-top: 1em;
  color: #888;
}

.boot-progress {
  width: 300px;
  height: 20px;
  border: 2px solid #fff;
  margin: 0 auto;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #fff;
  transition: width 0.1s linear;
}
</style>