import env from '~/env'
/**
 * 获取文件服务访问路径
 * @param avatar
 * @param subStr
 * @returns {*}
 */
 export function getFileAccessHttpUrl(avatar,subStr) {
  if(!subStr) subStr = 'http'
  try {
    if(avatar && avatar.startsWith(subStr)){
      return avatar;
    }else{
      if(avatar &&　avatar.length>0 && avatar.indexOf('[')==-1){
        return env.API_BASE_URL + "/" + avatar;
        // return ''
      }
    }
  }catch(err){
   return;
  }
}
// 提取 html 中的文本
export function sliceText (str) {
  return str.replace(/<.*?>/ig, '')
}