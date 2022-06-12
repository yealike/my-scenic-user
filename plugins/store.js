export default ({ app }) => {
  const store = app.store
  const lacalStore = window.localStorage.getItem('store')
  if (lacalStore) {
    //replace
  } else {
    window.localStorage.setItem('store', store)
  }

  function replace(store, localStore) {
    window.localStorage.setItem('store', { ...store, ...localStore })
  }

  function get() {
    const store = window.localStorage.getItem('store')
  }

  //页面隐藏时保存

  //页面加载时获取
}
