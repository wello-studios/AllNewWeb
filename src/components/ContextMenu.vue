<template>
  <div 
    v-if="isVisible" 
    class="context-menu"
    :style="position"
  >
    <div 
      v-for="item in currentMenuItems" 
      :key="item.id"
      class="context-menu-item"
      :class="{ disabled: item.disabled, separator: item.type === 'separator' }"
      @click="handleItemClick(item)"
    >
      <template v-if="item.type !== 'separator'">
        <span class="item-text">{{ item.label }}</span>
        <span v-if="item.submenu" class="arrow">▶</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  data() {
    return {
      isVisible: false,
      x: 0,
      y: 0,
      menuItems: {
        desktop: [
          { id: 'view', label: '보기', submenu: [
            { id: 'large-icons', label: '큰 아이콘' },
            { id: 'small-icons', label: '작은 아이콘' },
            { type: 'separator' },
            { id: 'auto-arrange', label: '자동 정렬' }
          ]},
          { type: 'separator' },
          { id: 'new', label: '새로 만들기', submenu: [
            { id: 'new-folder', label: '폴더' },
            { id: 'new-shortcut', label: '바로가기' }
          ]},
          { type: 'separator' },
          { id: 'properties', label: '속성' }
        ],
        icon: [
          { id: 'open', label: '열기' },
          { type: 'separator' },
          { id: 'cut', label: '잘라내기' },
          { id: 'copy', label: '복사' },
          { id: 'delete', label: '삭제' },
          { type: 'separator' },
          { id: 'properties', label: '속성' }
        ]
      },
      currentContext: 'desktop'
    }
  },
  computed: {
    position() {
      return {
        left: `${this.x}px`,
        top: `${this.y}px`
      }
    },
    currentMenuItems() {
      return this.menuItems[this.currentContext]
    }
  },
  methods: {
    show(event, context = 'desktop') {
      this.x = event.clientX
      this.y = event.clientY
      this.currentContext = context
      this.isVisible = true
      
      // 화면 밖으로 나가지 않도록 조정
      this.$nextTick(() => {
        const menu = this.$el
        const rect = menu.getBoundingClientRect()
        
        if (rect.right > window.innerWidth) {
          this.x -= rect.width
        }
        if (rect.bottom > window.innerHeight) {
          this.y -= rect.height
        }
      })
      
      document.addEventListener('click', this.hide)
    },
    hide() {
      this.isVisible = false
      document.removeEventListener('click', this.hide)
    },
    handleItemClick(item) {
      if (item.disabled || item.type === 'separator') return
      
      this.$emit('item-click', {
        context: this.currentContext,
        action: item.id
      })
      this.hide()
    }
  }
}
</script>

<style scoped>
.context-menu {
  position: fixed;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  padding: 2px;
  min-width: 180px;
  z-index: 9999;
}

.context-menu-item {
  padding: 4px 20px;
  display: flex;
  align-items: center;
  cursor: default;
}

.context-menu-item:not(.disabled):not(.separator):hover {
  background: #000080;
  color: white;
}

.context-menu-item.disabled {
  color: #848484;
}

.context-menu-item.separator {
  height: 1px;
  background: #848484;
  margin: 4px 0;
  border-bottom: 1px solid white;
  padding: 0;
}

.item-text {
  flex-grow: 1;
}

.arrow {
  margin-left: 10px;
  font-size: 10px;
}
</style>