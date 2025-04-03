interface Props {
  type: any;
  items: any[]; // Allow items to be an array of any type
}

export const groupListItems = (blocks: any[]) => {
  const groupedBlocks: any[] = [];
  let currentBulletedList: Props | null = null;
  let currentNumberedList: Props | null = null;

  blocks.forEach((block) => {
    if (block.type === "bulleted_list_item") {
      if (!currentBulletedList) {
        currentBulletedList = { type: block.type, items: [] };
        groupedBlocks.push(currentBulletedList);
      }
      currentBulletedList && currentBulletedList.items.push(block);
    } else if (block.type === "numbered_list_item") {
      if (!currentNumberedList) {
        currentNumberedList = { type: block.type, items: [] };
        groupedBlocks.push(currentNumberedList);
      }
      currentNumberedList && currentNumberedList.items.push(block);
    } else {
      if (currentBulletedList) currentBulletedList = null;
      if (currentNumberedList) currentNumberedList = null;
      groupedBlocks.push(block);
    }
  });

  return groupedBlocks;
};
