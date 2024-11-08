document.addEventListener('DOMContentLoaded', () => {
    let singleTapTimeout;

    interact('.tap-target')
      .on('tap', function () {
        clearTimeout(singleTapTimeout);

        singleTapTimeout = setTimeout(() => {
            document.querySelector('span').innerText = 'Some User Interaction';
            document.querySelector('#popup').style.display = 'flex';
        }, 200);  
      })
      .on('doubletap', function (event) {
        // Clear single tap timeout if this is a double tap
        clearTimeout(singleTapTimeout);
        
        event.currentTarget.classList.toggle('liked');
      })
      .on('hold', function () {
        document.querySelector('span').innerText = 'Delete this picture?';
        document.querySelector('#popup').style.display = 'flex';
      });

    interact('#popup')
      .on('tap', function () {
        document.querySelector('#popup').style.display = 'none';
      });
});