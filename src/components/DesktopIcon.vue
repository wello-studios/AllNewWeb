<template>
  <div 
    class="desktop-icon"
    :class="{ selected }"
    :style="positionStyle"
    @click.stop="handleClick"
    @dblclick.stop="handleDoubleClick"
    @contextmenu.prevent.stop="handleContextMenu"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <img :src="icon" :alt="name">
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'DesktopIcon',
  props: {
    name: String,
    icon: String,
    selected: Boolean,
    gridX: Number,
    gridY: Number
  },
  computed: {
    positionStyle() {
      return {
        left: `${this.gridX * 80}px`,
        top: `${this.gridY * 100}px`
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('select')
    },
    handleDoubleClick() {
      this.$emit('open')
    },
    handleContextMenu(event) {
      this.$emit('context-menu', event)
    },
    handleDragStart(event) {
      this.$emit('dragstart', event)
      event.dataTransfer.setData('text/plain', JSON.stringify({
        name: this.name,
        gridX: this.gridX,
        gridY: this.gridY
      }))
    },
    handleDragEnd(event) {
      this.$emit('dragend', event)
    }
  }
}
</script>

<style scoped>
.desktop-icon {
  position: absolute;
  width: 70px;
  text-align: center;
  padding: 5px;
  cursor: default;
}

.desktop-icon img {
  width: 32px;
  height: 32px;
  margin-bottom: 5px;
}

.desktop-icon span {
  display: block;
  color: white;
  font-size: 12px;
  text-shadow: 1px 1px 1px black;
  word-break: break-word;
}

.desktop-icon.selected {
  background: #000080;
}

.desktop-icon.selected span {
  background: #000080;
}
</style> 