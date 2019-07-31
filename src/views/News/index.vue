<template>
  <div class="container" style="width: 1000px">
    <div style="height: 2rem"></div>
    <div
      class="is-flex"
      v-if="isNoneSelected"
    >
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="params.search"
            @keypress.enter="search"
            type="text" class="input"
            placeholder="标题 / 内容"
          >
        </div>
        <div class="control">
          <a
            class="button is-info"
            :class="isLoading && 'is-loading'"
            @click="search"
          >
            <span class="icon">
              <i class="iconfont icon-search"></i>
            </span>
          </a>
        </div>
      </div>
      <div class="is-flex-auto"></div>
      <router-link
        class="button is-info"
        to="/news/create"
      >发布新闻</router-link>
    </div>
    <div
      v-else
      class="is-flex"
      style="height: 48px"
    >
      <div class="field">
        <div class="control">
          <a
            class="button is-light"
            style="width: 68px"
            @click="handleDelete"
          >
            <span>删除</span>
          </a>
        </div>
      </div>
    </div>
    <table class="table is-fullwidth">
      <thead>
        <th>
          <Checkbox
            :value="selectedStatus"
            @click="handleSelectAll"
          ></Checkbox>
        </th>
        <th class="is-centered">文章信息</th>
      </thead>
      <tbody>
        <NewsItem
          v-for="item in items"
          :key="item.id"
          :news="item"
          @select="handleSelect"
        >
        </NewsItem>
      </tbody>
    </table>
    <Pagination
      v-bind="meta"
      @change="changePage"
    ></Pagination>
    <div style="height: 1rem"></div>
  </div>
</template>

<script>
import NewsItem from './Item'
import dataSource from '@/mixins/dataSource'
import Pagination from '@/components/Pagination'
import axios from '@/providers/axios'

export default {
  name: 'News',
  mixins: [ dataSource ],
  components: {
    NewsItem,
    Pagination
  },
  methods: {
    handleDelete () {
      const ids = this.selectedIds

      this.$confirm({
        title: '删除新闻',
        content: '选中的新闻将被删除',
        handler: () => axios.post('news/delete', { ids })
          .then(() => {
            this.search()
            this.$notify({ text: '信息已删除' })
          })
      })
    }
  },
  created () {
    this.initialize({
      url: '/news/search'
    })
  }
}
</script>
