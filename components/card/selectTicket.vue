<template>
  <div>
    <div class="select-card">
      <div class="selete-item">
        <h2>起始地</h2>
        <div>
          <a-select default-value="lucy" style="width: 120px" @change="handleChange">
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled" disabled>
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
          to
          <a-select default-value="lucy" style="width: 120px" @change="handleChange">
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled" disabled>
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="selete-item">
        <h2>出发日期</h2>
        <a-date-picker @change="onChange" />
      </div>
      <div class="selete-item">
        <h2>乘客类型</h2>
        <a-select default-value="lucy" style="width: 120px" @change="handleChange">
          <a-select-option value="jack">
            Jack
          </a-select-option>
          <a-select-option value="lucy">
            Lucy
          </a-select-option>
          <a-select-option value="disabled" disabled>
            Disabled
          </a-select-option>
          <a-select-option value="Yiminghe">
            yiminghe
          </a-select-option>
        </a-select>
      </div>
    </div>
    <a-button class="search-btn" type="primary" icon="search">
      Search
    </a-button>
  </div>
</template>

<script>
export default {
  methods: {
    onChange() {},
  },
}
</script>

<style scoped>
.select-card {
  position: relative;
  display: flex;
  height: 200px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.467);
  box-shadow: 5px 5px 5px rgb(237, 235, 235);
  justify-content: space-around;
  align-items: center;
}
.selete-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgb(235, 233, 233);
}
.search-btn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: 800;
  border-radius: 50px;
  /* background-color: orange; */
  border: none;
  box-shadow: 5px 5px 15px rgb(235, 233, 233);
}
/* .search-btn:hover {
  background-color: rgb(234, 157, 15);
} */
</style>