<template>
  <tr class="news-item">
    <td
      class="is-checkbox is-vcentered"
      @click="$emit('select', news.id)"
    >
      <Checkbox :value="news.$selected"></Checkbox>
    </td>
    <td
      class="news-pointer"
      @click="$router.push(`/news/${news.id}`)"
    >
      <h1 class="is-size-5 has-text-weight-bold">
        {{title}}
      </h1>
      <div v-text="article"></div>
      <div
        class="is-flex"
        style="margin: 0.75rem 0 0.5rem"
      >
        <a
          v-if="news.is_visible"
          @click.stop="handleClickVisible"
          class="tag is-info is-unselectable"
        >
          展示中
        </a>
        <a
          v-else
          @click.stop="handleClickVisible"
          class="tag is-warning"
        >
          已隐藏
        </a>
        <TimeWrapper
          class="tag"
          :value="news.created_at"
          style="margin-left: 0.5rem; margin-right: 0.5rem"
        >
        </TimeWrapper>
      </div>
    </td>
  </tr>
</template>

<script>
import axios from '@/providers/axios'
import TimeWrapper from '@/components/wrappers/Time'

export default {
  name: 'NewsItem',
  components: {
    TimeWrapper
  },
  props: {
    news: {}
  },
  data: () => ({
    isHovered: false
  }),
  computed: {
    title () {
      const text = this.news.title.slice(0, 30)

      return text.length < 30 ? text : text + '......'
    },
    article () {
      const text = new DOMParser()
        .parseFromString(this.news.article, 'text/html')
        .body.innerText.slice(0, 100)

      return text.length < 100 ? text : text + '......'
    }
  },
  methods: {
    handleClickVisible () {
      const title = this.news.is_visible
        ? '关闭展示'
        : '开启展示'

      const content = this.news.is_visible
        ? '确认关闭后新闻将不在前台中进行展示'
        : '确认开启后该新闻将在前台进行展示'
      const params = {
        id: this.news.id,
        data: {
          is_visible: !this.news.is_visible
        }
      }

      this.$confirm({
        title,
        content,
        handler: () => axios.post('/news/update', params)
          .then(() => {
            this.$notify({ text: '信息已更新' })
            this.news.is_visible = !this.news.is_visible
          })
      })
    }
  }
}
</script>
