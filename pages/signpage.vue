<template>
  <div class="signpages">
    <div class="signpages-item sign-component">
      <div class="transition">
        <Transition name="slide-fade">
          <component :is="show"></component>
        </Transition>
        <h5 @click="toggle" class="link">{{isLogin?'注册账号':'去登陆'}}</h5>
      </div>
      <a-divider>or</a-divider>
      <div class="icon">
        <a-space size="large">
          <a-icon class="icon" type="qq" />
          <a-icon class="icon" type="wechat" />
        </a-space>
      </div>
    </div>
    <div class="signpages-item sign-image"></div>
  </div>
</template>

<script>
import Loginform from '@/components/Loginform.vue'
import Registform from '@/components/Registform.vue'
export default {
  layout: 'sign',
  name: 'signPage',
  components: { Loginform, Registform },
  data() {
    return {
      isLogin: true,
    }
  },
  computed: {
    show() {
      return this.isLogin ? Loginform : Registform
    },
  },
  methods: {
    toggle() {
      this.isLogin = !this.isLogin
    },
  },
}
</script>

<style>
.signpages {
  margin: auto;
  margin-top: 50px;
  width: 800px;
  height: 600px;
  box-shadow: 15px 15px 15px #ccc;
  display: flex;
}

.signpages-item {
  flex: 1;
}
.sign-image {
  background: url('@/assets/images/login-bg.jpg') no-repeat;
  background-size: cover;
}
.sign-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(200, 200, 200, 0.5);
}
.sign-component .transition {
  height: 360px;
  text-align: center;
}

.sign-component .link {
  cursor: pointer;
}

.icon {
  font-size: 35px;
  cursor: pointer;
  color: rgb(218, 172, 227);
}

.slide-fade-enter-active {
  transition: all 0.5s ease 0.8s;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

@media screen and (max-width: 850px) {
  .sign-image {
    display: none;
  }
  .sign-component {
    width: 80vw;
    border: none;
  }
  .signpages {
    box-shadow: none;
  }
}
</style>