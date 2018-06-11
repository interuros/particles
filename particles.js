'use strict';


let particlesContainer = document.querySelector('.particles-js');
let canvas = document.querySelector('canvas');


console.log(particlesContainer.offsetWidth);

let sizeCanvas = () => {

    canvas.width = particlesContainer.offsetWidth;
    canvas.height = particlesContainer.offsetHeight;

}


sizeCanvas();



let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', () =>{
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () =>{
    sizeCanvas();
});


class Dot {

    constructor(x, y, vx, vy, radius){

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius


        this.correctPosition = () => {

            if(canvas.width - this.x < this.radius){
                this.x -= this.radius;
            } else if(canvas.width - (canvas.width - this.x) < this.radius){
                this.x += this.radius;
            }
            
            if(canvas.height - this.y < this.radius){
                this.y -= this.radius;
            } else if(canvas.height - (canvas.height - this.y) < this.radius){
                this.y += this.radius;
            }
        }


        this.drawDot = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = '#ffffff';
            c.fillStyle = '#ffffff';
            c.stroke();
            c.fill();
        } 

        this.animate = () => {

           if(mouse.x - this.x < 70 && mouse.x - this.x > -70 && mouse.y - this.y < 70 && mouse.y - this.y > -70){
                if(this.x < mouse.x)
                    this.x -= 5;
                else 
                    this.x += 5;


                if(this.y < mouse.y)
                    this.y -= 5;
                else 
                    this.y += 5;
            }

           

            if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
                this.vx *= -1;
            }
            if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
                this.vy *= -1;
            }
        
            this.x += this.vx;
            this.y += this.vy;
            
            


        }

    }

}


let dotArr = [];


let randomize = () => {

    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let vx = (Math.random() - 0.5) * 1;
    let vy = (Math.random() - 0.5) * 1;
    let radius = 1;

    let obj = {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        radius: radius
    }

    return obj;

};


let loopDots = () => {

    for(let i = 0; i < 50; i++ ){
        let attributes = randomize();

        let dot = new Dot(attributes.x, attributes.y, attributes.vx, attributes.vy, attributes.radius);

        dot.correctPosition();

        dotArr.push(dot);
    }

}

loopDots();


console.log(dotArr);



let particlesAnimate = () => {
    
    requestAnimationFrame(particlesAnimate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for(let dots of dotArr){
        dots.drawDot();
        dots.animate();

        for( let i = 0; i < dotArr.length; i ++){

            for(let j = 0; j < dotArr.length; j ++){

                if(j != i){
                let distance = Math.sqrt(Math.pow(dotArr[i].x - dotArr[j].x, 2) + Math.pow(dotArr[i].y - dotArr[j].y, 2));

                if(distance < 140){

                    c.beginPath();
                    c.moveTo(dotArr[i].x, dotArr[i].y);
                    c.lineTo(dotArr[j].x, dotArr[j].y);
                    c.lineWidth = 0.3 / distance;
                    c.strokeStyle = '#ffffff';
                    c.stroke();
                }
            }
            }
    
        }
    }
}



particlesAnimate();