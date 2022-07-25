import Mathematics from 'ckeditor5-math/src/math';
import AutoformatMathematics from 'ckeditor5-math/src/autoformatmath';

export default {
  plugins: [Mathematics],
  toolbar: ['math'],
  config: {
    math: {
      engine: 'mathjax', // or katex or function. E.g. (equation, element, display) => { ... }
      lazyLoad: undefined, // async () => { ... }, called once before rendering first equation if engine doesn't exist. After resolving promise, plugin renders equations.
      outputType: 'span', // script or span
      forceOutputType: true, // forces output to use outputType
      enablePreview: true, // Enable preview view
      previewClassName: [], // Class names to add to previews
      popupClassName: [] // Class names to add to math popup balloon
    }
  }
}
