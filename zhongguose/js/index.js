import { colors } from "../assets/colors.js";

const wait = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

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
