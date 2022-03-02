<template>
  <div class="tabControl">
    <div v-for="(item, i) in title" :key="i" class="tabControlitem">
      <span
        :class="{ activespan: controlIndex === i }"
        @click="chengindex(i)"
        >{{ item }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "tabControl",
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      controlIndex: 0,
    };
  },

  methods: {
    chengindex(i) {
      this.controlIndex = i;
      this.$emit("tabClick", i);
    },
  },
};
</script>

<style>
.tabControl {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  background-color: #fff;
  z-index: 11;
}

.tabControlitem {
  flex: 1;
  text-align: center;
  height: 6vh;
  line-height: 6vh;
}

.activespan {
  padding: 3px;
  border-bottom: 3px solid pink;
}
</style>
