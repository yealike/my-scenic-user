<template>
  <div>
    <a-row class="scenic-card-id" type="flex">
      <a-col class="map-comment" :flex="4">
        <a-skeleton v-if="!scenic.url" active />
        <div>
          <div v-if="scenic.url">
            <img :src="scenic.url" alt="" />
          </div>
          <div class="scenic-title">{{ scenic.name }}</div>
          <div v-html="des.description"></div>
          <div v-if="information">
            {{ information.season }}
          </div>
          <div v-if="information" v-html="information.traffic"></div>
        </div>
        <div class="s-price">
          <div v-for="item in priceList" :key="item.id" class="scenic-price">
            <div class="title">{{ item.price }}</div>
            <div class="price">{{ item.description }}</div>
          </div>
        </div>
        <div class="comments">评论{{ commentList.length }}最热最新</div>
        <div class="avatar">
          <img :src="user.avatar" />
        </div>
        <a-input-search
          id="reply"
          class="input"
          :placeholder="reply.name"
          enter-button="发送"
          size="large"
          v-model="replyComment"
          @search="onComment"
        />
        <!-- <a-skeleton v-if="commentIsEmpty" active /> -->
        <div class="comment-bg">
          <a-comment
            v-for="commentItem in commentList"
            :key="commentItem.id"
            class="comment-item"
          >
            <span slot="actions">
              <span key="comment-nested-reply-to" @click="replyTo(commentItem)">
                <a href="#reply">回复</a>
              </span>
              <!-- <span class="mar-left" @click="showChildComment(commentItem)">
              展开</span
            > -->
            </span>
            <a slot="author">{{ commentItem.username }}</a>
            <a-avatar
              @click="gotoPersonInfo(commentItem.userId)"
              slot="avatar"
              :src="commentItem.avatar"
            />
            <p slot="content">
              {{ commentItem.content }}
            </p>
            <a-comment
              v-for="child in commentItem.children"
              :key="child.id"
              class="comment-item"
            >
              <a slot="author">{{ child.username }}</a>
              <a-avatar
                slot="avatar"
                @click="gotoPersonInfo(child.userId)"
                :src="child.avatar"
              />
              <p slot="content">
                {{ child.content }}
              </p>
            </a-comment>
          </a-comment>
        </div>
      </a-col>
      <a-col :flex="2">
        <div class="scenic-info">
          <client-only>
            <el-amap class="amap" vid="amapDemo" :zoom="zoom" :center="center">
            </el-amap>
          </client-only>
        </div>
        <div class="scenic-info-card">
          <div
            v-for="scenicItem in scenicList"
            :key="scenicItem.id"
            class="card-message"
          >
            <scenicCard
              :name="scenicItem.name"
              :star="scenicItem.star"
              :url="scenicItem.url"
              @click.native="gotoDetail(scenicItem.id)"
              class="card"
            />
            <div class="message">
              <div class="title">{{ scenicItem.name }}</div>
              <div>{{ scenicItem.position }}</div>
              <div>{{ scenicItem.cityName }}</div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import scenicApi from '@/api/scenic'
import scenicCard from '@/components/card/scenicCard.vue'
import userApi from '@/api/user'
export default {
  name: 'scenic-id',
  components: {
    scenicCard,
  },
  data() {
    return {
      user: {},
      zoom: 15,
      center: [125.441458, 43.883363],
      id: this.$route.params.id,
      comment: '',
      priceList: [],
      commentList: [],
      scenicList: [],
      scenic: {},
      reply: {
        name: '回复内容',
      },
      toPerson: {},
      replyComment: '',
      information: {},
      des: {},
    }
  },
  created() {},
  async mounted() {
    await this.fetchInfo()
    this.getPrice()
    await this.getScenicList()
    this.getUser()
    this.getComments()
    await this.fetchInformation()
    this.getDescription()
  },
  methods: {
    getUser() {
      const user = window.localStorage.getItem('user')
      this.user = JSON.parse(user) || {}
    },
    //获取景点信息
    async fetchInfo() {
      const id = this.$route.params.id
      const { data: res } = await scenicApi.getScenicInfoById(id)
      this.scenic = res.scenic
      console.log(this.scenic)
      this.latitude = res.scenic.latitude
      this.longitude = res.scenic.longitude
      if (id) {
        this.addHistory()
      }
    },
    // 获取评论列表
    async getComments() {
      const id = this.$route.params.id
      const { data: res } = await scenicApi.fetchAllComment(
        1,
        10,
        '景点',
        this.id
      )
      this.commentList = res.records
      console.log('%%', res)
    },
    //景点列表
    async getScenicList() {
      const { data: res } = await scenicApi.getScenicList(1, 5)
      console.log(132, res)
      this.scenicList = res.records
    },
    //获取价格列表
    async getPrice() {
      const id = this.$route.params.id
      const { data: res } = await scenicApi.getPriceList(id)
      this.priceList = res.priceList.slice(0, 3)
    },
    //回复
    replyTo(item) {
      this.toPerson = item
      this.reply.name = '@' + item.username
    },
    //获取旅游信息
    async fetchInformation() {
      const id = this.$route.params.id
      const { data: res } = await scenicApi.fetchInformation(id)
      this.information = res.information
      console.log('info77', res)
    },
    //
    async getDescription() {
      const { data: res } = await scenicApi.getDescription(this.scenic.id)
      console.log('des', res)
      this.des = res.description
    },
    async onComment() {
      // const user = window.localStorage.getItem('user')
      //   ? JSON.parse(window.localStorage.getItem('user'))
      //   : {}
      // console.log('uuu', user)
      if (!window.localStorage.getItem('user')) {
        return this.$router.push('/signpage')
      }
      const reply = {
        content: this.replyComment,
        tag: '景点',
        tagId: this.scenic.id,
        tagTitle: this.scenic.name,
        userId: JSON.parse(window.localStorage.getItem('user')).id,
      }
      if (!this.toPerson.id) {
        //一级
        reply.level = 1
        reply.parentUserId = reply.userId
      } else {
        // 二级
        reply.level = 2
        reply.parentUserId = this.toPerson.id
      }
      await scenicApi.addComment(reply)
      this.getComments()
    },
    gotoPersonInfo(id) {
      this.$router.push(`/person/${id}`)
    },
    //跳转详情
    gotoDetail(id) {
      this.$router.push(`/scenic/${id}`)
    },
    //添加浏览历史
    addHistory() {
      const history = {
        link: window.location.href,
        tag: '景点',
        tagId: this.scenic.id,
        title: this.scenic.name,
        userId: this.user.id,
      }
      userApi.addHistory(history)
    },
  },
  computed: {
    commentIsEmpty() {
      return this.commentList.length <= 0
    },
  },
}
</script>

<style scoped>
.scenic-card-id {
  max-width: 1500px;
  margin: auto;
  height: 500px;
  /* background-color: #ccc; */
}
.map-item {
  height: 500px;
  width: 100%;
  /* background-color: #777; */
  margin-right: 50px;
}
.map-item .auto {
  height: auto;
}
.map-comment {
  max-width: 900px;
  margin-right: 50px;
  /* background-color: #eee; */
}
.s-price {
  display: flex;
  justify-content: space-between;
}
.scenic-info {
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #789;
}
.comments {
  font-size: 18px;
}
.avatar {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #456;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.input {
  width: 500px;
}
.comment-item {
  max-width: 900px;
  padding-bottom: 0;
}
.comment-item p {
  height: 80px;
}
.scenic-info-card {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: 500px;
  max-width: 500px;
  /* background-color: #444; */
}
.card {
  height: 200px;
  margin-top: 10px;
}
.card-message {
  display: flex;
}
.message {
  margin-top: 10px;
  font-size: 20px;
  margin-left: 20px;
}
.title {
  font-weight: 800;
  margin-bottom: 10px;
  font-size: 20px;
}
.mar-left {
  margin-left: 20px;
}
.scenic-price {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 80px;
  margin: 5px 0;
  /* background: url('@/assets/images/img (1).png'); */
  /* background-color: skyblue; */
  background-image: linear-gradient(#0396ff, #abdcff);
  background-size: cover;
  border-radius: 10px;
  color: #000;
}
.comment-bg {
  background-color: #eee;
  color: #000;
  border-radius: 20px;
}
.scenic-title {
  font-size: 20px;
  margin: 20px 0;
  font-weight: 800;
}
</style>
