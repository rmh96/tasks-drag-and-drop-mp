//draggable tasks
const dragElements = document.querySelectorAll("#draggable");
//droppable containers like current sprint & backlog
const containers = document.querySelectorAll("#container");

for (let dragEle of dragElements) {
  //dragstart event listen when user move the element
  dragEle.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("drag-id", e.target.id);
    //below class dragging adds a cool style while dragging
    dragEle.classList.add("dragging");
  });
  //dragend event listen when user let go of the element
  dragEle.addEventListener("dragend", (e) => {
    //removing the dragging class when user let go of element
    dragEle.classList.remove("dragging");
  });
}

containers.forEach((container) => {
  //dragover events in container helps to see if drag element is coming inside it
  container.addEventListener("dragover", (e) => {
    //this dragover triggers continuously, so try to have it in throttling logic
    e.preventDefault();
    //we are simply taking the drag element using dragging class
    const dragEle = document.querySelector(".dragging");
    //this give us after element when we move so we can append before it
    const afterElement = getDragAboveElement(container, e.clientY);
    if (afterElement === null) {
      //finally appending in target container at last
      container.appendChild(dragEle);
    } else {
      //insert before after element
      container.insertBefore(dragEle, afterElement);
    }
  });
});

const getDragAboveElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll("#draggable:not(.dragging"),
  ];
  return draggableElements.reduce(
    (closest, currChild) => {
      const box = currChild.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: currChild };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};
