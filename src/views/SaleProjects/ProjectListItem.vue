<template>
  <tr
    style="cursor: pointer"
    @click="handleRowClick(project.id)"
  >
    <td>{{project.id}}</td>
    <td>{{project.members.join(' | ')}}</td>
    <td>{{project.name || '无'}}</td>
    <td>{{project.company || '无'}}</td>
    <TimeWrapper
      tag="td" :value="project.signature_date"
    ></TimeWrapper>
    <TimeWrapper
      tag="td" :value="project.delivery_date"
    ></TimeWrapper>
    <TimeWrapper
      tag="td" :value="project.created_at"
    ></TimeWrapper>
    <td>
      {{project.progress}}
    </td>
  </tr>
</template>

<script>
import TimeWrapper from '@/components/wrappers/Time'

export default {
  name: 'ProjectItem',
  props: {
    project: Object
  },
  components: {
    TimeWrapper
  },
  methods: {
    handleRowClick (id) {
      this.$router.push(`/sale/projects/${id}`)
    }
  }
}
</script>
