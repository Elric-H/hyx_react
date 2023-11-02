import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
// import './index.less';

// 定义常量
const RECT_WIDTH = 180;
const RECT_HEIGHT = 60;
const BOTTOM_BORDER_HEIGHT = 5;
const TEXT_OFFSET = 5;
const TEXT_SPACING = 20;

// 偏移量，以便树形图居中
const offsetX = 200;
const offsetY = 0;

const CanvasTree = ({ nodeData, onNodeClick, width, height }) => {
  const ref = useRef(null);

  // 文本溢出效果
  const drawEllipsisText = (context, t, x, y, maxWidth) => {
    const ellipsis = '...';
    let width1 = context.measureText(t).width;

    if (width1 <= maxWidth) {
      context.fillText(t, x, y);
      return;
    }

    while (width1 + context.measureText(ellipsis).width > maxWidth && t.length > 1) {
      // eslint-disable-next-line no-param-reassign
      t = t.slice(0, -1);
      width1 = context.measureText(t + ellipsis).width;
    }

    context.fillText(t + ellipsis, x, y);
  };

  // 定位鼠标节点
  const positionMouseNode = (event, canvas, root) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - offsetX + RECT_WIDTH / 2;
    const y = event.clientY - rect.top - offsetY + RECT_HEIGHT / 2;

    return root
      .descendants()
      .find(
        node => x > node.y && x < node.y + RECT_WIDTH && y > node.x && y < node.x + RECT_HEIGHT
      );
  };

  useEffect(
    () => {
      if (nodeData) {
        const canvas = ref.current;
        const context = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio || 1;

        // 根据像素比例调整 canvas 的物理大小
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;

        // 保持 canvas 的显示大小不变
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // 根据像素比例缩放绘制的内容
        context.scale(pixelRatio, pixelRatio);

        context.clearRect(0, 0, width, height);

        const root = d3.hierarchy(nodeData);
        // 动态设置树形图的 size
        const depth = root.height + 1; // 节点深度
        const totalNodes = root.descendants().length; // 总节点数
        console.log(depth, totalNodes);
        const dynamicWidth = (2.5 * width) / depth;
        const dynamicHeight = (height / totalNodes) * 2;
        console.log(dynamicHeight, dynamicWidth);
        const treeLayout = d3.tree().size([800, 800]);
        treeLayout(root);

        // 绘制贝塞尔曲线连接线
        root.links().forEach(link => {
          // 计算起点和终点的坐标
          const sourceX = link.source.y + 110 + RECT_WIDTH; // 从父节点的右边框开始
          const sourceY = link.source.x;
          const targetX = link.target.y + 110; // 连接到子节点的左边框
          const targetY = link.target.x;

          context.beginPath();
          context.moveTo(sourceX, sourceY);
          // 使用贝塞尔曲线连接两个节点
          context.bezierCurveTo(
            (sourceX + targetX) / 2,
            sourceY,
            (sourceX + targetX) / 2,
            targetY,
            targetX,
            targetY
          );
          context.strokeStyle = '#d1d5db';
          context.lineWidth = 2;
          context.stroke();
        });

        // 绘制节点
        root.descendants().forEach(node => {
          const x = node.y + offsetX - RECT_WIDTH / 2;
          const y = node.x + offsetY - RECT_HEIGHT / 2;

          // 绘制矩形
          context.fillStyle = 'white';
          context.strokeStyle = '#d1d5db';
          context.lineWidth = 1;
          context.fillRect(x, y, RECT_WIDTH, RECT_HEIGHT);
          context.strokeRect(x, y, RECT_WIDTH, RECT_HEIGHT);

          // 绘制下边框
          context.fillStyle = node.data.border || 'gray';
          context.fillRect(
            x,
            y + RECT_HEIGHT - BOTTOM_BORDER_HEIGHT,
            RECT_WIDTH,
            BOTTOM_BORDER_HEIGHT
          );

          // 绘制标题文本，并增大字体并加粗
          context.fillStyle = 'black';
          context.textAlign = 'start';
          context.textBaseline = 'middle';
          context.font = '15px sans-serif';
          context.font = `bold ${context.font}`; // 加粗字体
          drawEllipsisText(context, node.data.title || '', x + TEXT_OFFSET, y + TEXT_SPACING, 150);

          // 绘制副标题文本
          context.font = '12px sans-serif'; // 恢复原字体大小
          drawEllipsisText(
            context,
            node.data.value && node.data.unit ? `${node.data.value} ${node.data.unit}` : '',
            x + TEXT_OFFSET,
            y + 2 * TEXT_SPACING,
            150
          );
        });

        // 鼠标悬浮时改变指针样式
        canvas.onmousemove = event => {
          const hoveredNode = positionMouseNode(event, canvas, root);
          if (hoveredNode) {
            canvas.style.cursor = 'pointer'; // 改变鼠标样式
          } else {
            canvas.style.cursor = 'default';
          }
        };

        // 处理点击事件
        canvas.onclick = event => {
          const clickedNode = positionMouseNode(event, canvas, root);
          if (clickedNode) {
            onNodeClick(clickedNode.data);
          }
        };
      }
    },
    [nodeData, onNodeClick, width, height]
  );

  return <canvas ref={ref} width={width} height={height} />;
};

export default CanvasTree;
