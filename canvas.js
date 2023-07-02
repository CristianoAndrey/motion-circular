var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


var cor = [
    '#00bdff',
    '#4d39ce',
    '#088eff', 

]
var mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}

addEventListener('mousemove', event =>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});


function randomRange(min,max){
    return Math.floor(Math.random() * (max-min +1) + min);

}

function Particula(x, y,radius){
    this.x = x;
    this.y = y;
    this.radius= radius;
    this.color = cor[Math.floor(Math.random()* cor.length)];
    this.radians = Math.random()*Math.PI *2;
    this.velocity=0.05;
    this.distanciaAoCentro = randomRange(50,120)
    this.lastMouse = {x:x, y:y};
    this.update = particulas => {
        const pontoanterior = {
            x:this.x,
            y:this.y
        };
        this.radians+=this.velocity;
        this.lastMouse.x += (mouse.x -this.lastMouse.x)*0.05;
        this.lastMouse.y += (mouse.y -this.lastMouse.y)*0.05;

        this.x= this.lastMouse.x + Math.cos(this.radians)*this.distanciaAoCentro;
        this.y= this.lastMouse.y + Math.sin(this.radians)*this.distanciaAoCentro;
        this.draw(pontoanterior);
    };
    this.draw = pontoanterior => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth= this.radius;
        c.moveTo(pontoanterior.x,pontoanterior.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        c.closePath();
    }
};


let particulas
function init(){
    particulas=[];
    for(let i =0; i < 50; i++){
        const radius= (Math.random() *2) +1;
        particulas.push(new Particula(canvas.width / 2, canvas.height/2 ,radius));
    }

};


function animate(){
    requestAnimationFrame(animate);
    c.fillStyle= 'rgba(255,255,255, 0.05)';
    c.fillRect(0,0, innerWidth, innerHeight);
    particulas.forEach(Particula =>{
        Particula.update();
    });
    
};
init();
animate();





