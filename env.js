const apisMap = {
  development: {
    DESC: '开发',
    // API_BASE_URL: 'http://localhost:88' || 'http://www.example.org'
    API_BASE_URL: 'http://localhost:88',
  },
  production: {
    DESC: '生产',
    API_BASE_URL: '',
  },
}

export default apisMap[process.env.NODE_ENV]
