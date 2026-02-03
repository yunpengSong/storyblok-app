// utils/styleParser.js

/**
 * 将 CSS 字符串转换为 React 样式对象
 * @param {string|object} styleInput - CSS 字符串或样式对象
 * @returns {object} React 样式对象
 */
export const parseStyle = (styleInput) => {
  // 如果为空或 undefined，返回空对象
  if (!styleInput) return {};
  
  // 如果已经是对象，直接返回
  if (typeof styleInput === 'object' && !Array.isArray(styleInput)) {
    return styleInput;
  }
  
  // 如果是字符串，进行解析
  if (typeof styleInput === 'string') {
    // 尝试解析 JSON 字符串
    if (styleInput.trim().startsWith('{')) {
      try {
        return JSON.parse(styleInput);
      } catch (error) {
        console.warn('Failed to parse style as JSON:', error);
        // 如果 JSON 解析失败，继续解析为 CSS 字符串
      }
    }
    
    // 解析 CSS 字符串格式: "margin-right: 10px; color: red;"
    const styleObj = {};
    const stylePairs = styleInput.split(';').filter(pair => pair.trim());
    
    stylePairs.forEach(pair => {
      const [key, value] = pair.split(':').map(str => str.trim());
      if (key && value) {
        // 转换 CSS 属性名：margin-right -> marginRight
        const reactKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        styleObj[reactKey] = value;
      }
    });
    
    return styleObj;
  }
  
  // 其他情况返回空对象
  return {};
};

/**
 * 安全的样式合并函数
 * @param {...(object|string)} styles - 多个样式对象或字符串
 * @returns {object} 合并后的样式对象
 */
export const mergeStyles = (...styles) => {
  return styles.reduce((acc, style) => {
    const parsed = parseStyle(style);
    return { ...acc, ...parsed };
  }, {});
};

/**
 * 创建带缓存的样式解析函数（性能优化）
 */
export const createCachedStyleParser = () => {
  const cache = new Map();
  
  return (styleInput) => {
    const cacheKey = typeof styleInput === 'string' 
      ? styleInput 
      : JSON.stringify(styleInput);
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    
    const result = parseStyle(styleInput);
    cache.set(cacheKey, result);
    return result;
  };
};