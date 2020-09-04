import './style.scss';
import gsap from 'gsap';

const card = document.querySelector('.card');

// Make the DIV element draggable:

const elevateUp = () => {
  gsap.to(card, {
    boxShadow: ' 0px -6px 30px rgba(0, 0, 0, 0.178)',
    duration: 0.2,
    position: 'absolute',
  });
};

const elevateDown = () => {
  gsap.to(card, {
    boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.089)',
    duration: 0.2,
    position: 'relative',
  });
};

function dragElement(el) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;
  const element = el;

  function elementDrag(e) {
    const event = e || window.event;
    event.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;
    // set the element's new position:
    element.style.top = `${element.offsetTop - pos2}px`;
    element.style.left = `${element.offsetLeft - pos1}px`;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;

    elevateDown(card);

    pos1 = 0;
    pos2 = 0;
    pos3 = 0;
    pos4 = 0;
    element.style.top = `${element.offsetTop - pos2}px`;
    element.style.left = `${element.offsetLeft - pos1}px`;
  }

  function dragMouseDown(e) {
    const event = e || window.event;
    event.preventDefault();

    // set position apsolute
    elevateUp(card);

    // get the mouse cursor position at startup:
    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  if (document.getElementById(`${element.id}header`)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(`${element.id}header`).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    element.onmousedown = dragMouseDown;
  }
}

dragElement(card);
