<template>
    <div id="terminalContain"></div>
</template>

<script>
import { Terminal } from "xterm";

export default {
  data() {
    return {
      name: "terminal"
    };
  },
  mounted: function() {
      console.log("mounted")
    let term = new Terminal();

    term.open(document.getElementById("terminalContain"));
    term.write("没有数据");
  }
};
</script>

<style scoped>
.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: 0.25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  display: flex;
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #35495e;
  font-weight: bold;
}
</style>
