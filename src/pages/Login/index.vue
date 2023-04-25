<template>
  <div class="body">
    <div class="HomePage">
      <img src="./img/珠科校徽.png" alt="珠科校徽" class="HomePage-logo">
      <div class="HomePageLogin-box">
        <div class="HomePageLogin-content">
          <!-- 切换登录类型 -->
          <div class="HomePageLogin-tabs">
            <input type="radio" id="mailLogin" name="login-tabs" checked="checked">
            <label for="mailLogin" class="HomePageLogin-tab " id="mailLogin-label">学/工号登录</label>
            <input type="radio" id="phoneLogin" name="login-tabs">
            <label for="phoneLogin" class="HomePageLogin-tab" id="phoneLogin-label">验证码登录</label>
          </div>
          <!-- 学/工号登录 -->
          <div class="mail" id="mail">
            <form>
              <div class="HomePageLogin-username">
                <!-- autocomplete为自动填充 -->
                <input type="text" name="username" class="username" placeholder="学/工号" autocomplete="off" v-model="uid">
              </div>
              <div class="HomePageLogin-password">
                <input type="password" name="password" class="password" placeholder="密码" v-model="password">
              </div>
              <a href="#">忘记密码?</a>
<!--              <a href="#" class="guest-login" @click="guestLogin"><font-awesome-icon :icon="['fas', 'door-open']" /> 游客登录</a>-->
              <button type="submit" class="login-button" @click.prevent="signInByUid(uid,password)">登录</button>
            </form>
          </div>
          <!-- 验证码登录 -->
          <div class="phone" id="phone">
            <form>
              <div class="HomePageLogin-username">
                <!-- autocomplete为自动填充 -->
                <input type="text" name="username" class="username" placeholder="手机号" autocomplete="off"
                       v-model="phone" >
              </div>
              <div class="HomePageLogin-password captcha">
                <input type="text" maxlength="6" name="password" class="password" placeholder="验证码" autocomplete="off"
                       v-model="captcha">
                <button class="captcha-button" @click.prevent="sendSignInCaptcha(phone)">获取验证码</button>
              </div>
<!--              <a href="#" class="guest-login" @click="guestLogin"><font-awesome-icon :icon="['fas', 'door-open']" /> 游客登录</a>-->
              <button type="submit" class="login-button" @click.prevent="signInByPhone(phone,captcha)">登录</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import user from "@/store/modules/user";
import {sendSignInCaptcha} from "@/api/user";

export default {
  name: "Login",
  data() {
    return {
      uid: '13191127',
      password: '13191127',
      signInType: '',
      phone: '',
      captcha: '',
    }
  },
  methods: {
    // uid + 密码登录
    signInByUid(uid, password) {
      this.$store.dispatch("user/signInByUid", {uid, password}).then((userInfo) => {
        this.$router.push({name: "home"})
      }).catch(err => {
        console.log(err)
      })
    },
    // 手机号 + 验证码登录
    signInByPhone(phone, captcha) {
      this.$store.dispatch("user/signInByPhone", {phone, captcha}).then(() => {
        this.$router.push({name: "home"})
      }).catch(err => {
        console.log(err)
      })
    },
    // 发送登录验证码
    sendSignInCaptcha(phone) {
      if (phone) {
        sendSignInCaptcha(phone).then((res) => {
          console.log(res)
        })
      } else {
        this.$message("请先输入手机号码！")
      }
    },
    // 游客登录
    guestLogin() {

    }
  },
  watch: {
    // 监听token是因为异步请求后台获取token速度慢，此时cookie中没有token，数据还没有返回就被路由守卫拒绝了
    '$store.state.user.token': {
      handler(newVal, oldVal) {
        this.$router.push({name: "home"})
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      $(function () {
        $("#phoneLogin").click(function () {
          $("#mail").hide();
          $("#phone").show();
          $("#phoneLogin-label").css("font-weight", "bolder");
          $("#mailLogin-label").css("font-weight", "normal");
          $(".username,.password").val("");
        });
        $("#mailLogin").click(function () {
          $("#phone").hide();
          $("#mail").show();
          $("#mailLogin-label").css("font-weight", "bolder");
          $("#phoneLogin-label").css("font-weight", "normal");
          $(".username,.password").val("");
        });
      });
    })
  }
}
</script>

<style scoped>
.body {
  font: 16px 'Microsoft YaHei UI';
  background: url("./img/backgroundImage.jpg") center;
  background-size: 640px 100%;
  min-width: 1500px;
  height: 95vh;
}

.HomePage-logo {
  height: 90px;
  width: 128px;
}

a {
  margin-top: 20px;
  display: inline-block;
  text-decoration: none;
  color: #8590a6;
  background-attachment: fixed;
}

.HomePage {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.HomePageLogin-box {
  margin-top: 20px;
  box-shadow: 2px 2px 5px 5px rgba(255, 255, 255, .8);
  height: 400px;
  width: 400px;
  border-radius: 5px;
}

.HomePageLogin-content {
  margin: 20px;
  padding: 0;
  /*border: 1px solid red;*/
}

.HomePageLogin-tabs {
  /*border: black 1px solid;*/
  margin: 0;
  padding: 20px;
  text-align: left;
  display: inline-block;
}

.HomePageLogin-tab {
  color: #444444;
  display: inline-block;
  text-decoration: none;
  margin-right: 24px;
  cursor: pointer;
}

input[type="radio"] {
  display: none;
}

.HomePageLogin-tab:hover {
  font-weight: bolder;
  /*font-size: larger;*/
}

#mailLogin:checked + #mailLogin-label:after {
  content: '';
  display: block;
  top: 5px;
  width: 100%;
  height: 3px;
  background-color: #aeaeb0;
  position: relative;
}

#phoneLogin:checked + #phoneLogin-label:after {
  content: '';
  display: block;
  top: 5px;
  width: 100%;
  height: 3px;
  background-color: #aeaeb0;
  position: relative;
}

/*.HomePageLogin-tab:after {*/
/*    content: '';*/
/*    display: block;*/
/*    top: 5px;*/
/*    width: 100%;*/
/*    height: 3px;*/
/*    background-color: #aeaeb0;*/
/*    !*border: 8px solid white;*!*/
/*    !*border-left: 8px solid #AFABAB;*!*/
/*    position: relative;*/
/*}*/
.HomePageLogin-username, .HomePageLogin-password {
  /*border: black 1px solid;*/
}

.username, .password {
  border: none;
  height: 48px;
  background-color: transparent;
  width: 100%;
  outline: none;
}

.captcha {
  position: relative;
}

.captcha-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
  padding: 0 8px;
  border-left: 1px black solid;
}

.captcha-button:hover {
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
}

.phone, .mail {
  text-align: center;
}

.phone {
  display: none;
}

.login-button {
  width: 100%;
  margin-top: 20px;
  height: 36px;
  cursor: pointer;
}

#mailLogin-label {
  font-weight: bolder;
}

.guest-login {
  display: block;
}
</style>