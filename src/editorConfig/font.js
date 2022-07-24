import Font from '@ckeditor/ckeditor5-font/src/font'

export default {
  plugins: [Font],
  toolbar: ['fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor'],
  config: {
    fontFamily: {
      options: [
        {
          model: '',
          title: '默认',
          upcastAlso: [],
          view: ''
        },
        'Times New Roman',
        '"宋体", SimSun, STSong',
        '"楷体", KaiTi, KaiTi_GB2312, STKaiti',
        '"仿宋", FangSong, FangSong_GB2312, STFangsong',
        '"黑体", SimHei, STHeiti'
      ],
      supportAllValues: true
    },
    fontSize: {
      options: [9,11,13,'default',17,19,21],
      supportAllValues: true
    },
    fontColor: {
      colors: ['#fff', '#ff0', '#f0f', '#0ff'],
      columns: 2,
      documentColors: 0
    },
    fontBackgroundColor: {
      colors: [
          {
              color: 'hsl(0, 75%, 60%)',
              label: 'Red'
          },
          {
              color: 'hsl(30, 75%, 60%)',
              label: 'Orange'
          },
          {
              color: 'hsl(60, 75%, 60%)',
              label: 'Yellow'
          },
          {
              color: 'hsl(90, 75%, 60%)',
              label: 'Light green'
          },
          {
              color: 'hsl(120, 75%, 60%)',
              label: 'Green'
          },
      ]
    },
  }
}
