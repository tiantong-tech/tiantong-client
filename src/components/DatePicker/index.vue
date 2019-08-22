<template>
  <component
    :value="value"
    :is="wrapperComponent"
  />
</template>

<script>
import Td from './td'
import Input from './input'
import Flatpickr from 'flatpickr'
import zh from 'flatpickr/dist/l10n/zh.js'
import { getFormatDate } from '@/utils/common'

export default {
  props: {
    value: {},
    readonly: Boolean,
    nullable: Boolean,
    default: {},
    wrapper: {
      type: String,
      default: 'input'
    },
    format: {
      type: String,
      default: 'datetime'
    },
    locale: {
      type: String,
      default: 'zh'
    },
    config: {
      default: () => ({})
    },
  },
  data () {
    return {
      datepicker: null,
      selectedDates: null
    }
  },
  computed: {
    wrapperComponent () {
      switch (this.wrapper) {
        case 'input': return Input
        case 'td': return Td
      }
    }
  },
  mounted () {
    if (!this.datepicker) {
      this.config.onValueUpdate = this.dateUpdated
      if (this.locale === 'zh') {
        this.config.locale = zh.zh
      }
      this.config.clickOpens = !this.readonly
      this.datepicker = new Flatpickr(this.$el, this.config)
      let value = this.value
      if (this.default) {
        value = (this.default === 'now' ? getFormatDate() : this.default)
        this.$emit('change', value)
      }

      this.datepicker.setDate(value)
    }
    this.$watch('config', this.redraw)
    this.$watch('value', (value) => this.datepicker.setDate(value))
  },
  beforeDestroy () {
    if (this.datepicker) {
      this.datepicker.destroy()
      this.datepicker = null
    }
  },
  methods: {
    redraw (newConfig) {
      this.datepicker.config = Object.assign(this.datepicker.config, newConfig)
      this.datepicker.redraw()
      this.datepicker.jumpToDate()
    },
    dateUpdated (selectedDates, value) {
      if (this.format === 'datetime') {
        value += ' 00:00:00'
      }
      if (this.value === value && this.nullable) {
        value = null
      }
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="stylus">
$calendar_background = #ffffff
$calendar_border_color = #d3d6db

$months_color = #111
$months_background = transparent

$weekdays_background = transparent

$day_text_color = #222324
$day_hover_background_color = #d3d6db

$today_color = #ed6c63
$selected_day_background = #1fc8db

@import '~flatpickr/dist/flatpickr.min.css'
@import '~flatpickr/dist/themes/material_blue.css'

.flatpickr-calendar
  margin-top: 0.375rem

.flatpickr-calendar.hasWeeks
  width: auto !important
</style>
