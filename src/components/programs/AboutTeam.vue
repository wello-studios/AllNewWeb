<template>
  <div class="about-team">
    <div class="about-header">
      <img src="@/assets/wello3.svg" alt="Wello Logo" class="logo">
      <h1>WELLO TEAM</h1>
    </div>

    <div class="about-content">
      <div class="team-grid">
        <div class="team-member" v-for="member in teamMembers" :key="member.name">
          <div class="member-avatar" v-if="!member.src">{{ member.name[0] }}</div>
          <img v-else :src="member.src" class="member-avatar" :alt="member.name">
          <div class="member-info">
            <h3>{{ member.name }}</h3>
            <a>{{ member.link }}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="about-footer">
      <button class="win-btn" @click="$emit('close')">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutTeam',
  data() {
    return {
      teamMembers: [
        { name: 'SKY', link: '마스코트' },
        { name: 'SliyaTheta', link: '기획자' },
        { name: 'NUUUG', link: '개발자', src: '../../../public/nuuug.png' },
        { name: 'Mir', link: '인사담당자' },
        { name: 'NEWE', link: '디자이너' },
        { name: '위센', link: '디자이너' }
      ]
    }
  }
}
</script>

<style scoped>
.about-team {
  background: linear-gradient(135deg, #D98392, #FFF8BC);
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  height: 100%;
  user-select: none;
}

.about-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5em;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5em;
  border: 0.125em solid #D98392;
  border-radius: 1em;
  box-shadow: 0 0.5em 1em rgba(217, 131, 146, 0.2);
}

.logo {
  width: 5em;
  margin-bottom: 0.825em;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0.2em 0.2em rgba(217, 131, 146, 0.3));
}

.logo:hover {
  transform: scale(1.1) rotate(5deg);
}

h1 {
  font-size: 2em;
  margin: 0.625em 0;
  color: #D98392;
  font-weight: 800;
  text-shadow: 0.1em 0.1em 0.2em rgba(217, 131, 146, 0.2);
  letter-spacing: 0.1em;
}

.about-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5em;
  border: 0.125em solid #D98392;
  border-radius: 1em;
  box-shadow: 0 0.5em 1em rgba(217, 131, 146, 0.2);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18em, 1fr));
  gap: 1.5em;
  padding: 0.5em;
}

.team-member {
  position: relative;
  background: white;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 1.2em;
  border-radius: 1em;
  transition: all 0.3s ease;
  border: 0.125em solid transparent;
  font-size: 1.2em;
}

.team-member::before {
  content: '';
  position: absolute;
  top: -0.125em;
  left: -0.125em;
  right: -0.125em;
  bottom: -0.125em;
  background: linear-gradient(45deg, #D98392, #FFF8BC);
  z-index: -1;
  border-radius: 1.1em;
  opacity: 0;
  transition: opacity 0.3s ease;
}



.team-member:hover {
  transform: translateY(-0.3em) scale(1.02);
  box-shadow: 0 0.5em 1em rgba(217, 131, 146, 0.3);
  border-color: #D98392;
}

.member-avatar {
  width: 3.5em;
  height: 3.5em;
  background: linear-gradient(135deg, #D98392, #e9a5b0);
  color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  font-weight: bold;
  margin-right: 1.2em;
  transition: all 0.3s ease;
  box-shadow: 0 0.2em 0.4em rgba(217, 131, 146, 0.3);
}

.member-info {
  display: flex;
  flex-direction: column;
}

.member-info h3 {
  margin: 0;
  font-size: 1.2em;
  color: #D98392;
  font-weight: 700;
}

.member-info a {
  color: #D98392;
  text-decoration: none;
  font-size: 0.9em;
  margin-top: 0.4em;
  transition: all 0.3s ease;
  position: relative;
}

.member-info a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0.15em;
  bottom: -0.2em;
  left: 0;
  background: #D98392;
  transition: width 0.3s ease;
}

.member-info a:hover::after {
  width: 100%;
}

.about-footer {
  margin-top: 1.5em;
  display: flex;
  justify-content: center;
}

.win-btn {
  min-width: 6em;
  padding: 0.5em 1.5em;
  background: linear-gradient(45deg, #D98392, #FFF8BC);
  color: #333;
  border: 0.125em solid #fff;
  border-right-color: #c77483;
  border-bottom-color: #c77483;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.5s ease;
  border-radius: 0.5em;
}

.win-btn:hover {
  background: linear-gradient(45deg, #FFF8BC, #D98392);
  transform: translateY(-0.1em);
}

.win-btn:active {
  border: 0.125em solid #c77483;
  border-right-color: #fff;
  border-bottom-color: #fff;
  transform: translateY(0.1em);
}
</style> 