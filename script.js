document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const items = document.querySelectorAll('.draggable');
    const fixedNum = 60;
    interact('.draggable').draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            }),
        ],
        listeners: {
            move(event) {
                const target = event.target;
                const previousY = parseFloat(target.getAttribute('data-y')) || 0;
                const y = previousY + event.dy;
                target.style.transform = `translate(0px, ${y}px)`;
                target.setAttribute('data-y', y);
                const containerRect = container.getBoundingClientRect();
                items.forEach((item) => {
                    if (item !== target && isOverlapping(target, item)) {
                        const itemY = parseFloat(item.getAttribute('data-y')) || 0;
                        const madarchod = target.getBoundingClientRect();
                        const itemRect = item.getBoundingClientRect();
                        if(madarchod.top < itemRect.top) {
                            const newY = itemY - fixedNum;
                            /*if(itemRect.top - fixedNum < containerRect.top) {
                                item.style.transform = `translate(0px, ${containerRect.top - itemRect.height}px)`;
                                item.setAttribute('data-y', containerRect.top - itemRect.height);
                            } else {
                                item.style.transform = `translate(0px, ${newY}px)`;
                                item.setAttribute('data-y', newY);
                            }*/
                            item.style.transform = `translate(0px, ${newY}px)`;
                            item.setAttribute('data-y', newY);

                        }
                        else if(madarchod.bottom > itemRect.bottom) {
                            const newY = itemY + fixedNum;
                            /*if(itemRect.bottom + fixedNum < containerRect.bottom) {
                                item.style.transform = `translate(0px, ${containerRect.bottom - itemRect.height}px)`;
                                item.setAttribute('data-y', containerRect.bottom - itemRect.height);
                            } else {
                                item.style.transform = `translate(0px, ${newY}px)`;
                                item.setAttribute('data-y', newY);
                            }*/
                            item.style.transform = `translate(0px, ${newY}px)`;
                            item.setAttribute('data-y', newY);
                        }
                    }
                });
            },
        },
    });
    function isOverlapping(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        const isAbove = rect1.bottom <= rect2.top;
        const isBelow = rect1.top >= rect2.bottom;
        const isLeftOf = rect1.right <= rect2.left;
        const isRightOf = rect1.left >= rect2.right;
        return !(isAbove || isBelow || isLeftOf || isRightOf);
    }
});
