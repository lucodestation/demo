import { colors } from "../assets/colors.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

new Vue({
  el: "#app",
  data() {
    return {
      colors,
      show: false,
    };
  },
  mounted() {
    const hexClipboard = new ClipboardJS(".hex");
    const rgbClipboard = new ClipboardJS(".rgb");

    const clipboardSuccess = async (e) => {
      console.log(e.text);
      this.show = true;
      await wait(500);
      this.show = false;
    };

    hexClipboard.on("success", clipboardSuccess);
    rgbClipboard.on("success", clipboardSuccess);
  },
});
