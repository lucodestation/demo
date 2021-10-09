/**
 * 
 * @param container 单个容器元素（不能是节点数组），要求有定位，如 .container { position: relative; }
 * @param itemMinWidth 子元素最小宽度，根据这个值来计算容器可容纳多少列
 * 
 * 子元素要求类名是 item 且有绝对定位，如
 * .container > .item {
 *   position: absolute;
 *   transition-property: top, left;
 *   transition-duration: .3s;
 *   box-sizing: border-box;
 * }
 * transition-property 过渡属性中不能有 width ，否则子元素宽度改变时如果导致元素内容换行（会使元素高度发生变化），可能部分内容会被下边的子元素遮挡
 */
 const autoPositionOfFixedWidthSubItems = function (container, itemMinWidth) {
  const items = container.querySelectorAll(':scope > .item'); // 获取所有子元素
  let containerWidth = container.offsetWidth; // 容器宽度，17 是滚动条宽度
  // 列数：容器当前宽度最多能容纳几列固定宽度的子元素
  // 如：如果容器宽 1000px ，item 宽 300px ，则最多可容纳 3 列
  let columnCount = Math.floor(containerWidth / itemMinWidth);
  // 用于存储各列高度，用以确定下一个子元素的 top 值
  const columnTopArr = [];
  // 存储各列的 left 值
  const columnLeftArr = [];

  const run = () => {
    // 重新计算子元素宽度以平均分配剩余空间
    // 如：如果容器宽 1000px ，item 宽 300px ，则最多可容纳 3 列
    // 那这 3 列共占据 900px 的宽度，还剩 100px 的宽度
    // 重新计算以平均分配这剩余的 100px 的宽度
    // 也就是每列 333.333px
    let itemWidth = containerWidth / columnCount;

    // 如果只有一行
    // 如：如果容器宽 1000px ，item 宽 300px ，则最多可容纳 3 列
    // 但是子元素只有 2 个，那每列的宽不应该是 333.333px ，而应该是 500px
    if (items.length <= columnCount) {
      itemWidth = containerWidth / items.length;
    }

    [...items].map((item, index) => {
      item.style.width = itemWidth + 'px'; // 设置各元素的宽度

      if (index < columnCount) {
        // 处理第一行子元素
        // 如
        // 0 1 2
        // 3 4
        // 这里只设置 0 1 2
        item.style.top = 0; // 第一行子元素的 top 值全为 0
        // 设置子元素的 left 值
        // 如：如果容器宽 1000px ，item 宽 300px ，则最多可容纳 3 列，有 5 个子元素
        // 0 1 2
        // 3 4
        // 第 1 个 left 为 0 * 333.333 结果为 0px
        // 第 2 个 left 为 1 * 333.333 结果为 333.333px
        // 第 3 个 left 为 2 * 666.666 结果为 666.666px
        // 第一行的子元素位置从左到右是有序的
        const left = index * itemWidth + 'px';
        item.style.left = left;
        columnLeftArr[index] = left;
        // 存储每一列的列高
        // 如：第一列 80px 第二列 40px 第三列 60px
        columnTopArr[index] = item.offsetHeight;
      } else {
        // 处理剩余所有子元素

        // 设置 top 值
        // 如：第一行的 第一列 80px 第二列 40px 第三列 60px
        // 最小高度是 40px ，这个子元素就顶着 40px 的元素
        const minColumnHeight = Math.min(...columnTopArr); // 获取最小的列高
        item.style.top = minColumnHeight + 'px'; // 将元素的 top 定位在列高最小的那一列，也就是使元素尽量向上排列

        // 设置 left 值
        // 获取最小的列高的索引/所在列
        // 如：第一行的 第一列 80px 第二列 40px 第三列 60px
        // 那这里的 minColumnHeightIndex 就是 40px 的索引 1 ，这个子元素的 left 应该和第一行高度为 40px 的 left 值相同 
        const minColumnHeightIndex = columnTopArr.findIndex(value => value === minColumnHeight);
        // 根据索引设置 left 值
        // 元素同设置第一列，只不过这里的 index 是不一定的
        // 从第二行开始子元素的位置从左到右是无序的
        item.style.left = columnLeftArr[minColumnHeightIndex];

        // 当前子元素位置已确定，把当前子元素的高度加到 columnTopArr 中以确保下一个元素的 top 不会和当前子元素重叠
        columnTopArr[minColumnHeightIndex] += item.offsetHeight;
      }
    });

    // 设置容器的 height
    const minColumnHeight = Math.max(...columnTopArr) + 'px'; // 获取最大的列高
    container.style.height = minColumnHeight;
  };

  run();

  // 确定高度后如果容器宽度发生变化（一般是由于浏览器出现滚动条导致），使用变化后的宽度再重新进行设置
  // 只会在首次加载时有此问题
  // MacOS 中使用 Safari 没有此问题
  if (containerWidth > container.offsetWidth) {
    containerWidth = container.offsetWidth; // 重新获取容器宽度
    columnCount = Math.floor(containerWidth / itemMinWidth); // 重新计算列数
    columnTopArr.length = 0;
    columnLeftArr.length = 0;
    run();
  }

};

export default autoPositionOfFixedWidthSubItems;