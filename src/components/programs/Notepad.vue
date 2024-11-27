<template>
  <div class="notepad">
    <div class="menu-bar">
      <div class="menu-item" @click="toggleMenu('file')">
        파일(F)
        <div class="dropdown-menu" v-if="activeMenu === 'file'">
          <div class="menu-item" @click.stop="newFile">새로 만들기(N)</div>
          <div class="menu-item" @click.stop="openFile">열기(O)...</div>
          <div class="menu-item" @click.stop="saveFile">저장(S)</div>
          <div class="separator"></div>
          <div class="menu-item" @click.stop="$emit('close')">끝내기(X)</div>
        </div>
      </div>
      <div class="menu-item" @click="toggleMenu('edit')">
        편집(E)
        <div class="dropdown-menu" v-if="activeMenu === 'edit'">
          <div class="menu-item" @click.stop="undo">실행 취소(U)</div>
          <div class="separator"></div>
          <div class="menu-item" @click.stop="cut">잘라내기(T)</div>
          <div class="menu-item" @click.stop="copy">복사(C)</div>
          <div class="menu-item" @click.stop="paste">붙여넣기(P)</div>
          <div class="menu-item" @click.stop="deleteSelection">삭제(L)</div>
          <div class="separator"></div>
          <div class="menu-item" @click.stop="selectAll">모두 선택(A)</div>
        </div>
      </div>
    </div>
    <textarea 
      ref="textarea"
      class="notepad-textarea"
      v-model="content"
      @keydown="handleKeydown"
      @click="closeMenus"
      placeholder="텍스트를 입력하세요..."
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'Notepad',
  data() {
    return {
      content: '',
      history: [''],
      currentHistoryIndex: 0,
      activeMenu: null
    }
  },
  mounted() {
    // 전역 클릭 이벤트로 메뉴 닫기
    document.addEventListener('click', this.closeMenus)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenus)
  },
  methods: {
    toggleMenu(menu) {
      this.activeMenu = this.activeMenu === menu ? null : menu
    },
    closeMenus() {
      this.activeMenu = null
    },
    handleKeydown(e) {
      // Ctrl + Z
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault()
        this.undo()
      }
      // Ctrl + A
      else if (e.ctrlKey && e.key === 'a') {
        e.preventDefault()
        this.selectAll()
      }
      // Ctrl + X
      else if (e.ctrlKey && e.key === 'x') {
        e.preventDefault()
        this.cut()
      }
      // Ctrl + C
      else if (e.ctrlKey && e.key === 'c') {
        e.preventDefault()
        this.copy()
      }
      // Ctrl + V
      else if (e.ctrlKey && e.key === 'v') {
        e.preventDefault()
        this.paste()
      }
      
      // 내용이 변경될 때마다 히스토리에 저장
      this.$nextTick(() => {
        if (this.content !== this.history[this.currentHistoryIndex]) {
          this.currentHistoryIndex++
          this.history.splice(this.currentHistoryIndex)
          this.history.push(this.content)
        }
      })
    },
    undo() {
      if (this.currentHistoryIndex > 0) {
        this.currentHistoryIndex--
        this.content = this.history[this.currentHistoryIndex]
      }
    },
    cut() {
      const textarea = this.$refs.textarea
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      if (start !== end) {
        navigator.clipboard.writeText(this.content.substring(start, end))
        this.content = this.content.substring(0, start) + this.content.substring(end)
      }
    },
    copy() {
      const textarea = this.$refs.textarea
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      if (start !== end) {
        navigator.clipboard.writeText(this.content.substring(start, end))
      }
    },
    async paste() {
      try {
        const text = await navigator.clipboard.readText()
        const textarea = this.$refs.textarea
        const start = textarea.selectionStart
        
        this.content = this.content.substring(0, start) + 
                      text + 
                      this.content.substring(textarea.selectionEnd)
      } catch (err) {
        console.error('클립보드 접근 실패:', err)
      }
    },
    deleteSelection() {
      const textarea = this.$refs.textarea
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      if (start !== end) {
        this.content = this.content.substring(0, start) + this.content.substring(end)
      }
    },
    selectAll() {
      this.$refs.textarea.select()
    },
    newFile() {
      if (this.content && !confirm('저장하지 않은 변경 사항이 있습니다. 계속하시겠습니까?')) {
        return
      }
      this.content = ''
      this.history = ['']
      this.currentHistoryIndex = 0
    },
    openFile() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.txt'
      input.onchange = e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = e => {
          this.content = e.target.result
          this.history = [this.content]
          this.currentHistoryIndex = 0
        }
        reader.readAsText(file)
      }
      input.click()
    },
    saveFile() {
      const blob = new Blob([this.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'notepad.txt'
      a.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.notepad {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
}

.menu-bar {
  display: flex;
  background: #c0c0c0;
  border-bottom: 1px solid #848484;
  padding: 2px;
}

.menu-item {
  position: relative;
  padding: 2px 8px;
  cursor: default;
  user-select: none;
}

.menu-item:hover {
  background: #000080;
  color: white;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  min-width: 180px;
  z-index: 1000;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.dropdown-menu .menu-item {
  padding: 4px 20px;
}

.separator {
  height: 1px;
  background: #848484;
  margin: 4px 2px;
  border-bottom: 1px solid white;
}

.notepad-textarea {
  flex: 1;
  margin: 2px;
  resize: none;
  border: 1px solid #848484;
  border-right-color: #fff;
  border-bottom-color: #fff;
  padding: 5px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  background: white;
}
</style> 