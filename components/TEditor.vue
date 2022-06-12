<template>
  <client-only>
    <div class="tinymce-editor">
      <editor
        v-if="!reloading"
        v-model="myValue"
        :init="init"
        :disabled="disabled"
        @onClick="onClick"
      ></editor>
    </div>
  </client-only>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import imageApi from '@/api/imageApi'
import env from '@/env'
let tinymce
if (process.client) {
  tinymce = require('tinymce/tinymce')
  require('tinymce/themes/silver/theme')
  require('tinymce/plugins/image')
  require('tinymce/plugins/link')
  require('tinymce/plugins/media')
  require('tinymce/plugins/table')
  require('tinymce/plugins/lists')
  require('tinymce/plugins/contextmenu')
  require('tinymce/plugins/wordcount')
  require('tinymce/plugins/colorpicker')
  require('tinymce/plugins/textcolor')
  require('tinymce/plugins/fullscreen')
  require('tinymce/icons/default')
}

export default {
  name: 'VEditor',
  components: {
    Editor,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
    triggerChange: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default:
        // 'lists image link media table textcolor wordcount contextmenu fullscreen',
        'lists image link media table wordcount fullscreen',
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists link unlink image table | removeformat | fullscreen',
      branding: false,
    },
    width: {
      type: Number | String,
      default: 'auto',
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      // BASE_URL: '',
      img_upload_url: `${env.dev.BASE_URL}/scenic/upload/image`,
      //初始化配置
      init: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/lightgray',
        width: this.width,
        height: this.height,
        object_resizing: false,
        selector: 'tinymce-editor',
        content_css: '/tinymce/skins/lightgray/content.min.css',
        content_style: `
          .mce-content-body {
            width: ${this.width};
            overflow-x: hidden;
          }
          .mce-content-body table {
            width: auto !important;
          }
        `,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        toolbar_drawer: false,
        statusbar: false, // 隐藏底部状态栏
        //预防xss攻击，同时不希望用户直接粘贴进来一些富文本,在你的 init 里面，添加以下属性
        paste_preprocess: (pl, o) => {
          o.content = $stripTags(o.content, 'sup,sub')
        },
        // 自定义上传图片组件
        images_upload_url: this.img_upload_url,
        images_upload_handler: (blobInfo, success, failure) => {
          let formData = new FormData()
          formData.append('file', blobInfo.blob())
          formData.append('filename', blobInfo.filename)
          imageApi.addImage(formData).then((resp) => {
            // console.log('图片上传成功回调==>',resp)
            success(resp.data.url)
          })
        },
      },
      myValue: this.value,
      reloading: false,
    }
  },
  mounted() {
    // this.BASE_URL = env.dev.BASE_URL
  },
  computed: {
    // BASE_URL() {
    //   return env.dev.BASE_URL
    // },
  },
  methods: {
    reload() {
      this.reloading = true
      this.$nextTick(() => (this.reloading = false))
    },

    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    },
  },
  watch: {
    value(newValue) {
      this.myValue = newValue == null ? '' : newValue
    },
    myValue(newValue) {
      if (this.triggerChange) {
        this.$emit('change', newValue)
      } else {
        this.$emit('input', newValue)
      }
    },
  },
}
</script>
