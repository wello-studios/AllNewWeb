<template>
  <div class="my-computer">
    <div class="menu-bar">
      <div class="menu-item" @click="toggleMenu('file')">
        파일(F)
        <div class="dropdown-menu" v-if="activeMenu === 'file'">
          <div class="menu-item">열기</div>
          <div class="menu-item">탐색</div>
          <div class="separator"></div>
          <div class="menu-item" @click="$emit('close')">닫기</div>
        </div>
      </div>
      <div class="menu-item" @click="toggleMenu('view')">
        보기(V)
        <div class="dropdown-menu" v-if="activeMenu === 'view'">
          <div class="menu-item" @click="changeView('large')">큰 아이콘</div>
          <div class="menu-item" @click="changeView('list')">간단히</div>
          <div class="menu-item" @click="changeView('details')">자세히</div>
        </div>
      </div>
    </div>

    <div class="toolbar">
      <button class="win-btn" @click="goBack">
        <img src="" alt="뒤로">
        뒤로
      </button>
      <div class="separator-vertical"></div>
      <button class="win-btn" @click="deleteSelected" :disabled="!hasSelection">
        <img src="" alt="삭제">
        삭제
      </button>
      <button class="win-btn" @click="showProperties" :disabled="!hasSelection">
        <img src="" alt="속성">
        속성
      </button>
    </div>

    <div class="address-bar">
      <span>위치:</span>
      <input type="text" :value="currentPath" readonly class="address-input">
    </div>

    <div class="content" :class="viewMode">
      <div class="folder-list">
        <div class="folder-section">
          <div class="section-title">시스템 폴더</div>
          <div 
            v-for="folder in systemFolders" 
            :key="folder.name"
            class="folder-item"
            :class="{ selected: folder.selected }"
            @click="selectItem(folder)"
            @dblclick="openFolder(folder)"
          >
            <img :src="folder.icon" :alt="folder.name">
            <div class="item-details">
              <span class="item-name">{{ folder.name }}</span>
              <span class="item-type">{{ folder.type }}</span>
              <span class="item-size">{{ folder.size }}</span>
            </div>
          </div>
        </div>

        <div class="folder-section">
          <div class="section-title">하드 디스크</div>
          <div 
            v-for="drive in drives" 
            :key="drive.name"
            class="folder-item"
            :class="{ selected: drive.selected }"
            @click="selectItem(drive)"
            @dblclick="openDrive(drive)"
          >
            <img :src="drive.icon" :alt="drive.name">
            <div class="item-details">
              <span class="item-name">{{ drive.name }}</span>
              <span class="item-type">{{ drive.type }}</span>
              <span class="item-size">{{ drive.freeSpace }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="status-bar">
      <div class="status-left">{{ statusText }}</div>
      <div class="status-right">{{ selectedItems.length }}개 선택됨</div>
    </div>

    <!-- 속성 대화상자 -->
    <div v-if="showPropertiesDialog" class="properties-dialog">
      <div class="dialog-title">속성</div>
      <div class="dialog-content">
        <div v-if="selectedItems[0]">
          <img :src="selectedItems[0].icon" :alt="selectedItems[0].name">
          <div>이름: {{ selectedItems[0].name }}</div>
          <div>종류: {{ selectedItems[0].type }}</div>
          <div>크기: {{ selectedItems[0].size || selectedItems[0].freeSpace }}</div>
        </div>
      </div>
      <div class="dialog-buttons">
        <button @click="showPropertiesDialog = false">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyComputer',
  data() {
    return {
      activeMenu: null,
      viewMode: 'details',
      currentPath: '내 컴퓨터',
      showPropertiesDialog: false,
      systemFolders: [
        {
          name: '제어판',
          type: '시스템 폴더',
          icon: new URL('', import.meta.url).href,
          selected: false
        },
        {
          name: '프린터',
          type: '시스템 폴더',
          icon: new URL('', import.meta.url).href,
          selected: false
        }
      ],
      drives: [
        {
          name: '로컬 디스크 (C:)',
          type: '로컬 디스크',
          icon: new URL('', import.meta.url).href,
          freeSpace: '1.2 GB 남음',
          selected: false
        },
        {
          name: '로컬 디스크 (D:)',
          type: '로컬 디스크',
          icon: new URL('', import.meta.url).href,
          freeSpace: '2.8 GB 남음',
          selected: false
        }
      ]
    }
  },
  computed: {
    selectedItems() {
      return [...this.systemFolders, ...this.drives].filter(item => item.selected)
    },
    hasSelection() {
      return this.selectedItems.length > 0
    },
    statusText() {
      return `총 ${this.systemFolders.length + this.drives.length}개 항목`
    }
  },
  methods: {
    toggleMenu(menu) {
      this.activeMenu = this.activeMenu === menu ? null : menu
    },
    changeView(mode) {
      this.viewMode = mode
      this.activeMenu = null
    },
    selectItem(item) {
      // Ctrl 키가 눌려있지 않으면 다른 선택 해제
      if (!event.ctrlKey) {
        [...this.systemFolders, ...this.drives].forEach(i => i.selected = false)
      }
      item.selected = !item.selected
    },
    openFolder(folder) {
      console.log(`Opening folder: ${folder.name}`)
    },
    openDrive(drive) {
      console.log(`Opening drive: ${drive.name}`)
    },
    goBack() {
      console.log('Going back')
    },
    deleteSelected() {
      if (confirm('선택한 항목을 삭제하시겠습니까?')) {
        console.log('Deleting selected items')
      }
    },
    showProperties() {
      this.showPropertiesDialog = true
    }
  }
}
</script>

<style scoped>
.my-computer {
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
  padding: 2px 8px;
  cursor: default;
}

.toolbar {
  display: flex;
  padding: 4px;
  gap: 4px;
  border-bottom: 1px solid #848484;
}

.address-bar {
  display: flex;
  align-items: center;
  padding: 4px;
  gap: 4px;
  border-bottom: 1px solid #848484;
}

.address-input {
  flex: 1;
  border: 1px solid #848484;
  background: white;
  padding: 2px 4px;
}

.content {
  flex: 1;
  padding: 8px;
  overflow: auto;
  background: white;
}

.drive-item {
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: default;
  gap: 8px;
}

.drive-item:hover {
  background: #e8e8e8;
}

.drive-item.selected {
  background: #000080;
  color: white;
}

.drive-item img {
  width: 32px;
  height: 32px;
}

.drive-info {
  color: #666;
  margin-left: auto;
}

.status-bar {
  padding: 2px 4px;
  border-top: 1px solid #848484;
}

.folder-section {
  margin-bottom: 20px;
}

.section-title {
  font-weight: bold;
  padding: 5px;
  background: #e6e6e6;
  border-bottom: 1px solid #848484;
}

.folder-item {
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: default;
}

.folder-item.selected {
  background: #000080;
  color: white;
}

.folder-item img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.item-details {
  display: flex;
  flex: 1;
}

.item-name {
  flex: 1;
  min-width: 150px;
}

.item-type {
  flex: 1;
  min-width: 100px;
}

.item-size {
  flex: 1;
  min-width: 100px;
  text-align: right;
}

.properties-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  padding: 2px;
  min-width: 300px;
}

.dialog-title {
  background: #000080;
  color: white;
  padding: 3px;
  font-weight: bold;
}

.dialog-content {
  padding: 10px;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 5px;
}

.separator-vertical {
  width: 1px;
  height: 20px;
  background: #848484;
  margin: 0 5px;
  border-right: 1px solid white;
}

.win-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}

.win-btn img {
  width: 16px;
  height: 16px;
}

.win-btn:disabled {
  color: #848484;
  cursor: default;
}

.status-bar {
  display: flex;
  justify-content: space-between;
}
</style> 