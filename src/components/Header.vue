<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-section">
        <img src="@/assets/wello3.svg" alt="Wello Logo" class="logo">
        <h1>WELLOS 95</h1>
      </div>
      
      <nav class="navigation">
        <div class="nav-item" v-for="item in menuItems" :key="item.name" @click="handleClick(item.action)">
          <div class="nav-icon">{{ item.icon }}</div>
          <span>{{ item.name }}</span>
        </div>
      </nav>

      <div class="user-section">
        <div class="time">{{ currentTime }}</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menuItems: [
        { name: '시작', icon: '🏠', action: 'start' },
        { name: '정보', icon: 'ℹ️', action: 'about' },
        { name: '설정', icon: '⚙️', action: 'settings' }
      ],
      currentTime: ''
    }
  },
  methods: {
    handleClick(action) {
      this.$emit('menu-click', action);
    },
    updateTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      this.currentTime = `${hours}:${minutes}`;
    }
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 60000); // 1분마다 시간 업데이트
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #D98392, #FFF8BC);
  padding: 0.8em;
  user-select: none;
  box-shadow: 0 0.2em 0.5em rgba(217, 131, 146, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.8em 1.2em;
  border-radius: 0.8em;
  border: 0.125em solid #D98392;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1em;
}

.logo {
  width: 2.5em;
  height: 2.5em;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1) rotate(5deg);
}

h1 {
  color: #D98392;
  font-size: 1.5em;
  font-weight: 800;
  margin: 0;
  text-shadow: 0.1em 0.1em 0.2em rgba(217, 131, 146, 0.2);
}

.navigation {
  display: flex;
  gap: 1.5em;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  border: 0.125em solid transparent;
}

.nav-item:hover {
  transform: translateY(-0.2em);
  border-color: #D98392;
  box-shadow: 0 0.2em 0.4em rgba(217, 131, 146, 0.2);
}

.nav-icon {
  font-size: 1.2em;
}

.user-section {
  background: linear-gradient(45deg, #D98392, #FFF8BC);
  padding: 0.5em 1em;
  border-radius: 0.5em;
  color: #333;
  font-weight: bold;
  border: 0.125em solid white;
  box-shadow: 0 0.2em 0.4em rgba(217, 131, 146, 0.2);
}

.time {
  font-family: 'Courier New', monospace;
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .navigation {
    display: none;
  }
  
  .header-content {
    justify-content: space-between;
  }
}
</style>