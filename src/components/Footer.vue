<template>
  <div class="footer">
    <div class="footer-box">
      <div class="footer-box-header">
        <div class="footer-box-header-content">
          <a href="#">首页</a>
          <a href="#">模块</a>
          <a href="#">关于</a>
          <a href="#">联系</a>
          <h4>博学而笃志，切问而近思</h4>
        </div>
      </div>
      <div class="footer-box-container">
        <p>站点声明:本站转歌作品版权归原作者及来源网站所有，原创内容作品版权归作者所有，任何内容转载、商业用途等均须联系原作者并注明来源。</p>
        <p>Copyright图 2022 jizhubbs <a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备2023007139号-1</a></p>
        <p>相关权举报投诉及建议等，请发E-mail: 695264288@qq.com</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: black;
  }
  .footer {
    min-width: 1500px;
  }
  .footer-box-header {
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #575757;
    border-bottom: 1px solid #b2b2b2;
    box-shadow: 0 1px 5px rgba(0,0,0,.3);
  }
  .footer-box-header-content {
    font-size: 8px;
    padding: 0 240px;
  }
  .footer-box-header a {
    color: gray;
    display: inline-block;
    padding: 0 10px;
  }
  .footer-box-header a:nth-child(1) {
    padding-left: 0;
  }
  .footer-box-header h4 {
    padding-left: 26px;
    display: inline-block;
    background: transparent url("/src/assets/img/吉珠校徽.jpg") no-repeat left center;
    background-size: 26px 20px;
    color: gray;
    float: right;
  }
  .footer-box-container {
    font-size: 10px;
    color: #5b5a5c;
    padding: 14px 240px;
  }
  .footer-box-container p:nth-child(1) {
    padding: 6px 0;
  }
  .footer-box-container p {
    line-height: 24px;
  }
</style>