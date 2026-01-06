const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const grav = 0.005
const friction = 0.99

class Particle {
    constructor(x, y, rad, velocity, color) {
        this.x = x;
        this.y = y;
        this.rad = rad
        this.color = color;
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.rad,0,Math.PI*2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    update() {
        this.draw()

        this.velocity.y += grav
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005
    }
}

let particles = []

function animate() {
    requestAnimationFrame(animate)

    ctx.fillStyle = "rgba(14, 14, 14, 0.08)"
    ctx.fillRect(0,0,canvas.width, canvas.height)

    for(let i = 0; i < particles.length; i++) {
        if(particles[i].alpha > 0) particles[i].update()
        else particles.splice(i,1)
    }
}

animate()



canvas.addEventListener("click", (e) => {
    console.log(e.clientX)
    console.log(e.clientY)

    let particleLen = 400;

    let angleLen = (Math.PI * 2) / particleLen

    for(let i = 0; i < particleLen; i++) {
        particles.push(new Particle(e.clientX, e.clientY, 5, {
            x: Math.cos(angleLen * i) * Math.random() * 8 , 
            y: Math.sin(angleLen * i)  * Math.random() * 8
        }, `hsl(${Math.random()*360}, 50%, 50%)`))
    }

    console.log(particles)
})

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}