<template>
  <div class="about-wello">
    <div class="about-header">
      <img src="@/assets/wello2.png" alt="Wello Logo" class="logo">
      <h1>WELLOS</h1>
      <div class="version">Version 1.0</div>
    </div>

    <div class="about-content">
      <div class="info-section">
        <p>WELLOS 95</p>
        <p class="copyright">© 2024 wello-X All rights reserved.</p>
      </div>

      <div class="system-info">
        <div class="info-row">
          <span class="label">MADE BY:</span>
          <span>wello-X</span>
        </div>
        <div class="info-row">
          <span class="label">C#M</span>
          <span><a href="https://csm.kr">csm.kr</a></span>
        </div>
      </div>

      <div class="credits">
        <p>Made with Vue.js</p>
        <p>Inspired by Windows 95</p>
      </div>
    </div>

    <div class="about-footer">
      <button class="win-btn" @click="$emit('close')">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutWello'
}
</script>

<style scoped>
.about-wello {
  background: #c0c0c0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  user-select: none;
}

.about-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background: white;
  padding: 20px;
  border: 2px solid #848484;
}

.logo {
  width: 64px;
  margin-bottom: 10px;
}

h1 {
  font-size: 24px;
  margin: 10px 0;
}

.version {
  color: #666;
}

.about-content {
  flex: 1;
  background: white;
  padding: 16px;
  border: 2px solid #848484;
}

.info-section {
  margin-bottom: 20px;
  text-align: center;
}

.copyright {
  color: #666;
  margin-top: 10px;
}

.system-info {
  margin: 20px 0;
  padding: 10px;
  background: #f0f0f0;
  border: 1px solid #848484;
}

.info-row {
  display: flex;
  margin: 5px 0;
}

.label {
  width: 100px;
  color: #444;
}

.credits {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.about-footer {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.win-btn {
  min-width: 80px;
  padding: 4px 16px;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  cursor: pointer;
}

.win-btn:active {
  border: 2px solid #848484;
  border-right-color: #fff;
  border-bottom-color: #fff;
}
</style> 