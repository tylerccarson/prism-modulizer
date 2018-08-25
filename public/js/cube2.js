let rotateX = 0,
  rotateY = 0, 
  rotateZ = 0,
  unappliedXRotation = 0, 
  unappliedYRotation = 0,
  clientX, clientY,
  zoom = 0.75

const block = document.getElementById('block');

(function init() {
  document.addEventListener('mousedown', transformRotation);
  document.addEventListener('touchstart', transformRotation);

  //annoying in dev
  //document.addEventListener('mouseleave', stopTransform);
  
  document.addEventListener('mouseup', stopTransform);
  document.addEventListener('touchend', stopTransform);

  document.addEventListener('wheel', function (e) {
    //min zoom of 0.8, max of 5.0, scale of deltaY/100
    zoom += e.deltaY > 0 ? (zoom <= 10.0 ? e.deltaY / 100 : 0) : (zoom >= 0.5 ? e.deltaY / 10 : 0);

    console.log('deltaY: ', e.deltaY);
    console.log('zoom: ', zoom);

    function applyZoom(){
      block.style.transform = `scale(${zoom}) rotateX(${-rotateY*10}deg) rotateY(${-rotateX*10}deg) rotateZ(0deg)`;
    }
  });

})();

function consumeRotations() {
  rotateX += unappliedXRotation;
  rotateY += unappliedYRotation;
  unappliedXRotation = 0;
  unappliedYRotation = 0; 

  block.style.transform = `scale(${zoom}) rotateX(${rotateY*10}deg) rotateY(${-rotateX*10}deg) rotateZ(0deg)`;

  //here is where we also apply filters

}

function stopTransform(e) {
  document.removeEventListener('mousemove', dragListener);
  document.removeEventListener('touchmove', dragListener);

  //reset location
  resetCubeRotation();

  //discontinue effects
}

function resetCubeRotation() {
  rotateX = 0;
  rotateY = 0;
  block.style.transform = `scale(${zoom}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg)`;
}

function resetCubeZoom() {
  zoom = 0.75;
  block.style.transform = `scale(${zoom}) rotateX(${0}deg) rotateY(${0}deg) rotateZ(0deg)`;
}

function dragListener(e) {
  let newX = e.clientX;
  let newY = e.clientY ;
  let deltaX = clientX - newX;
  let deltaY = clientY - newY;
  
  unappliedXRotation += (unappliedXRotation < 180 || unappliedXRotation > -180) ? (deltaX / 50) : 0;
  unappliedYRotation += (unappliedYRotation < 180 || unappliedYRotation > -180) ? (deltaY / 50) : 0;
  
  clientX = newX;
  clientY = newY;
  
  consumeRotations();
}

function transformRotation(e) {
  clientX = e.clientX;
  clientY = e.clientY;
  
  document.addEventListener('mousemove', dragListener);
  document.addEventListener('touchmove', dragListener);
}
 