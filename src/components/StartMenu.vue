<template>
  <div class="start-menu" :style="{ display: isOpen ? 'flex' : 'none' }">
    <div class="start-menu-sidebar">
      <span>WELLOS 95</span>
    </div>
    <div class="start-menu-items">
      <div 
        v-for="item in menuItems" 
        :key="item.name"
        class="menu-item"
        @mouseenter="handleMouseEnter(item)"
        @mouseleave="handleMouseLeave(item)"
      >
        <img :src="item.icon" :alt="item.name">
        <span>{{ item.name }}</span>
        <span v-if="item.submenu" class="arrow">▶</span>
        
        <!-- 서브메뉴 -->
        <div 
          v-if="item.submenu && item.isHovered" 
          class="submenu"
        >
          <div 
            v-for="subItem in item.submenu" 
            :key="subItem.name"
            class="menu-item"
            @click="$emit('menu-click', subItem.action)"
          >
            <img :src="subItem.icon" :alt="subItem.name">
            <span>{{ subItem.name }}</span>
          </div>
        </div>
      </div>

      <!-- 구분선 -->
      <div class="separator"></div>

      <!-- 종료 버튼 -->
      <div class="menu-item shutdown" @click="$emit('menu-click', 'shutdown')">
        <img src="@/assets/wello.svg" alt="시스템 종료">
        <span>시스템 종료...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartMenu',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      menuItems: [
      ]
    }
  },
  methods: {
    handleMouseEnter(item) {
      if (item.submenu) {
        item.isHovered = true
      }
    },
    handleMouseLeave(item) {
      if (item.submenu) {
        item.isHovered = false
      }
    }
  }
}
</script>

<style scoped>
.start-menu {
  position: fixed;
  bottom: 28px;
  left: 0;
  width: 280px;
  height: 380px;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  display: flex;
  z-index: 9999;
}

.start-menu-sidebar {
  width: 30px;
  background: #808080;
  padding: 5px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  color: white;
}

.menu-item {
  position: relative;
  padding: 4px 8px;
  display: flex;
  align-items: center;
}

.menu-item img {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.arrow {
  margin-left: auto;
  font-size: 10px;
}

.submenu {
  position: absolute;
  left: 100%;
  top: 0;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  min-width: 180px;
}

.separator {
  height: 1px;
  background: #848484;
  margin: 4px 0;
  border-bottom: 1px solid white;
}

.shutdown {
  margin-top: auto;
  border-top: 1px solid #848484;
}
</style> 