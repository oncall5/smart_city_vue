<script>
export default {
  methods: {
    setLocalStorage(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value))
    },
    getLocalStorage(key) {
      const value = window.localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
      return null
    },
  },
}
</script>
