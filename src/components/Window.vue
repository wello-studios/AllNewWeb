<template>
  <div 
    class="window"
    :class="{ 'window-maximized': isMaximized }"
    :style="windowStyle"
    v-show="!isMinimized"
  >
    <!-- 타이틀 바 -->
    <div 
      class="title-bar"
      @mousedown="startDrag"
      @dblclick="maximize"
    >
      <div class="title-bar-text">{{ title }}</div>
      <div class="title-bar-controls">
        <button aria-label="최소화" @click.stop="minimize"></button>
        <button aria-label="최대화" @click.stop="maximize"></button>
        <button aria-label="닫기" @click.stop="close"></button>
      </div>
    </div>

    <!-- 창 내용 -->
    <div class="window-body">
      <component 
        v-if="programComponent"
        :is="programComponent"
        @close="close"
      />
      <div v-else v-html="content"></div>
    </div>

    <!-- 크기 조절 핸들 -->
    <div 
      v-if="!isMaximized"
      class="resize-handle resize-handle-right"
      @mousedown="startResize('right')"
    ></div>
    <div 
      v-if="!isMaximized"
      class="resize-handle resize-handle-bottom"
      @mousedown="startResize('bottom')"
    ></div>
    <div 
      v-if="!isMaximized"
      class="resize-handle resize-handle-corner"
      @mousedown="startResize('corner')"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Window',
  props: {
    title: String,
    content: String,
    programComponent: {
      type: [Object, null],
      default: null
    },
    initialX: {
      type: Number,
      default: 100
    },
    initialY: {
      type: Number,
      default: 100
    },
    initialWidth: {
      type: Number,
      default: 800
    },
    initialHeight: {
      type: Number,
      default: 600
    },
    isMinimized: Boolean
  },
  data() {
    return {
      x: this.initialX,
      y: this.initialY,
      width: this.initialWidth,
      height: this.initialHeight,
      isDragging: false,
      isResizing: false,
      resizeType: null,
      dragStartX: 0,
      dragStartY: 0,
      windowStartX: 0,
      windowStartY: 0,
      windowStartWidth: 0,
      windowStartHeight: 0,
      isMaximized: false,
      previousState: null
    }
  },
  computed: {
    windowStyle() {
      if (this.isMaximized) {
        return {
          top: '0',
          left: '0',
          width: '100%',
          height: 'calc(100vh - 28px)', // 작업 표시줄 높이 제외
        }
      }
      return {
        top: `${this.y}px`,
        left: `${this.x}px`,
        width: `${this.width}px`,
        height: `${this.height}px`,
      }
    }
  },
  mounted() {
    this.$emit('mounted')
  },
  methods: {
    startDrag(e) {
      if (this.isMaximized) return
      
      this.isDragging = true
      this.dragStartX = e.clientX
      this.dragStartY = e.clientY
      this.windowStartX = this.x
      this.windowStartY = this.y

      window.addEventListener('mousemove', this.drag)
      window.addEventListener('mouseup', this.stopDrag)
    },
    drag(e) {
      if (!this.isDragging) return

      const deltaX = e.clientX - this.dragStartX
      const deltaY = e.clientY - this.dragStartY

      this.x = this.windowStartX + deltaX
      this.y = this.windowStartY + deltaY
    },
    stopDrag() {
      this.isDragging = false
      window.removeEventListener('mousemove', this.drag)
      window.removeEventListener('mouseup', this.stopDrag)
    },
    startResize(type) {
      this.isResizing = true
      this.resizeType = type
      this.dragStartX = event.clientX
      this.dragStartY = event.clientY
      this.windowStartWidth = this.width
      this.windowStartHeight = this.height

      window.addEventListener('mousemove', this.resize)
      window.addEventListener('mouseup', this.stopResize)
    },
    resize(e) {
      if (!this.isResizing) return

      const deltaX = e.clientX - this.dragStartX
      const deltaY = e.clientY - this.dragStartY

      if (this.resizeType === 'right' || this.resizeType === 'corner') {
        this.width = Math.max(200, this.windowStartWidth + deltaX)
      }
      if (this.resizeType === 'bottom' || this.resizeType === 'corner') {
        this.height = Math.max(100, this.windowStartHeight + deltaY)
      }
    },
    stopResize() {
      this.isResizing = false
      window.removeEventListener('mousemove', this.resize)
      window.removeEventListener('mouseup', this.stopResize)
    },
    minimize() {
      this.$emit('update:isMinimized', true)
      this.$emit('minimize')
    },
    maximize() {
      if (!this.isMaximized) {
        this.previousState = {
          x: this.x,
          y: this.y,
          width: this.width,
          height: this.height
        }
      } else {
        Object.assign(this, this.previousState)
      }
      this.isMaximized = !this.isMaximized
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.window {
  position: absolute;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  box-shadow: 1px 1px 0 black;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 100px;
}

.window-maximized {
  border: 2px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
}

.title-bar {
  background: #000080;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  cursor: default;
}

.title-bar-text {
  margin-left: 2px;
}

.title-bar-controls {
  display: flex;
  gap: 2px;
}

.title-bar-controls button {
  width: 16px;
  height: 14px;
  border: 1px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  background: #c0c0c0;
  padding: 0;
  position: relative;
}

.window-body {
  flex: 1;
  padding: 8px;
  overflow: auto;
}

.resize-handle {
  position: absolute;
  background: transparent;
}

.resize-handle-right {
  right: -3px;
  top: 0;
  width: 6px;
  height: 100%;
  cursor: e-resize;
}

.resize-handle-bottom {
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 6px;
  cursor: s-resize;
}

.resize-handle-corner {
  right: -3px;
  bottom: -3px;
  width: 12px;
  height: 12px;
  cursor: se-resize;
}
</style>