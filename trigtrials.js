
window.addEventListener('DOMContentLoaded', (event) => {



    let tutorial_canvas = document.getElementById("tutorial");


    let attackanims = 0
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    let playerblock = 0
    let playerthorns = 0
    let anyshift = 0
    let idholder = 0
    let playercolor = "white"
    let rewardselected = 0
    let generatedreward = 0
    let scuttleratio = .99995
    let healthrange = 60
    let statrange = 0

    let freeze = 1
    let baseenergy = 7
    let energydelay = 0
    let keysPressed = {};

    let textsize = 13
    let target = {}
    target.x = -100
    let health = 100
    let maxhealth = 100
    let energy = 25

    class X {
        constructor(x = 200, y = 200) {
            this.x = x
            this.y = y
            this.radius = (20 * 2.82)
            this.y1 = y - (this.radius / 2.82)
            this.linewidth = 10
            // this.width = 40
        }
        draw() {

            this.linewidth = this.radius / 5.64
            tutorial_canvas_context.strokeStyle = "red"
            tutorial_canvas_context.lineWidth = this.linewidth

            tutorial_canvas_context.beginPath();

            tutorial_canvas_context.moveTo(this.x - this.radius / 2, this.y1 + this.radius / 2);

            tutorial_canvas_context.lineTo(this.x + this.radius / 2, this.y1 - this.radius / 2);

            tutorial_canvas_context.stroke();
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fill()


            tutorial_canvas_context.beginPath();

            tutorial_canvas_context.moveTo(this.x + this.radius / 2, this.y1 + this.radius / 2);

            tutorial_canvas_context.lineTo(this.x - this.radius / 2, this.y1 - this.radius / 2);

            tutorial_canvas_context.stroke();
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fill()

            tutorial_canvas_context.lineWidth = 1

        }

    }

    class Scuttlefish {
        constructor(body) {

            body.y -= 20
            this.body = body
            this.radius = body.radius * 6
            this.x = body.x
            this.y = body.y + 20
            this.body.outline = 1
            this.edges = []
            this.runner = Math.random() * Math.PI * 2
            if (Math.random() < 0.5) {
                this.dir = 0
            } else {
                this.dir = 1
            }
            this.health = 16000
            this.hitstun = 0

            this.takingdamage = 0
        }
        draw() {
            this.move()
            for (let e = 0; e < this.edges.length; e++) {
                this.edges[e].x += (this.x - this.body.x)
            }
            this.body.x += (this.x - this.body.x)


            // if(Math.random() < 0.1){

            // this.scuttle()
            // }
            this.live()
        }
        move() {

            this.body.x += this.body.xmom
            this.body.y += this.body.ymom


            for (let e = 0; e < this.edges.length; e++) {
                this.edges[e].move()
                this.edges[e].x += this.body.xmom
                this.edges[e].y += this.body.ymom
                for (let e = 0; e < this.edges.length; e++) {

                    this.edges[e].radius *= scuttleratio

                    if (this.edges[e].radius < .9) {
                        // if(Math.abs(this.center.x-this.edges[e].x)>30 || Math.abs(this.center.y-this.edges[e].y) > 30){
                        this.edges.splice(e, 1)

                    }

                }

                // if(scuttleratio > .95){



                // }


                // for(let f = 0; f<fish.length; f++){


                // }

            }
            if (attackanims == 0) {
                this.scuttle()
            }

        }
        live() {
            this.body.draw()
            // this.eye()
            for (let e = 0; e < this.edges.length; e++) {
                this.edges[e].draw()
            }
        }


        scuttle() {
            if (this.dir == 1) {
                this.runner -= 0.03
            } else {
                this.runner += 0.03
            }
            let rotx = this.runner
            let roty = this.runner
            let cloroholder = getRandomLightColor()

            if (Math.random() < .8) {

                cloroholder = 'white'
            }
            if (this.takingdamage == 1) {

                cloroholder = 'red'

            }

            let deathrays = 6// Math.PI*5
            for (let g = 0; g < deathrays; g++) {
                let dot1 = new Circle(this.body.x, this.body.y, this.body.radius / 1, cloroholder, .51 * Math.cos(rotx), .51 * Math.sin(roty))
                dot1.outline = 1
                // dot1.move()
                this.edges.push(dot1)
                rotx -= 2 * Math.PI / deathrays
                roty -= 2 * Math.PI / deathrays
            }
        }
    }
    class Cleric {
        constructor(body) {

            body.y -= 20
            this.body = body
            body.color = "#00FF00"
            this.radius = body.radius * 6
            this.x = body.x
            this.y = body.y + 20
            this.body.outline = 1
            this.edges = []
            this.runner = (Math.PI / 2)
            if (Math.random() < 0.5) {
                this.dir = 0
            } else {
                this.dir = 1
            }
            this.health = 16000
            this.length = 40
            this.hitstun = 0

            this.takingdamage = 0
        }
        draw() {
            this.move()
            for (let e = 0; e < this.edges.length; e++) {
                this.edges[e].x += (this.x - this.body.x)
            }
            this.body.x += (this.x - this.body.x)


            // if(Math.random() < 0.1){

            // this.scuttle()
            // }
            this.live()
        }
        move() {

            this.body.x += this.body.xmom
            this.body.y += this.body.ymom


            for (let e = 0; e < this.edges.length; e++) {
                this.edges[e].move()
                this.edges[e].x += this.body.xmom
                this.edges[e].y += this.body.ymom
                for (let e = 0; e < this.edges.length; e++) {

                    this.edges[e].radius *= .975


                    if (Math.abs(this.edges[e].y - this.body.y) > this.length) {
                        // if(Math.abs(this.center.x-this.edges[e].x)>30 || Math.abs(this.center.y-this.edges[e].y) > 30){
                        this.edges.splice(e, 1)

                    }

                }

                // if(scuttleratio > .95){



                // }


                // for(let f = 0; f<fish.length; f++){


                // }

            }
            if (attackanims == 0) {
                this.scuttle()
            }

        }
        live() {
            this.body.draw()
            // this.eye()
            for (let e = 0; e < this.edges.length; e++) {
                this.edges[e].draw()
            }
        }


        scuttle() {
            // if(this.dir == 1){
            //     this.runner -= 0.1
            // }else{
            //     this.runner += 0.1
            // }
            let rotx = this.runner + (Math.random() / 100)
            let roty = this.runner + (Math.random() / 100)
            // let cloroholder = getRandomLightColor()

            // if(Math.random() < .8){

            //     cloroholder = 'white'
            // }
            // if(this.takingdamage == 1){

            //     cloroholder = 'red'

            // }

            let deathrays = 2// Math.PI*5
            for (let g = 0; g < deathrays; g++) {
                let dot1 = new Circle(this.body.x, this.body.y, this.body.radius / 1, this.body.color, 5.91 * Math.cos(rotx), 5.91 * Math.sin(roty))
                dot1.outline = 1
                // dot1.move()
                this.edges.push(dot1)
                rotx -= 2 * Math.PI / deathrays
                roty -= 2 * Math.PI / deathrays
            }
        }
    }



    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
    });

    document.addEventListener('keyup', (event) => {
        delete keysPressed[event.key];
    });

    let tip = {}


    let flex = tutorial_canvas.getBoundingClientRect();

    // Add the event listeners for mousedown, mousemove, and mouseup

    let xs
    let ys

    window.addEventListener('pointerdown', e => {
        flex = tutorial_canvas.getBoundingClientRect();
        xs = e.clientX - flex.left;
        ys = e.clientY - flex.top;
        tip.x = xs
        tip.y = ys

        if (squarecircle(drawbutton, tip)) {
            if (health > 0) {

                playerdeck.pull()
                playerdeck.shuffle()

            }
            tip.x = 0

        }
        if (squarecircle(skipbutton, tip)) {
            if (freeze == 0) {
                //     freeze = 0
                //     playerdeck.potential = []
                //     playerdeck.pull()
                //     playerdeck.shuffle()
                // tip.x = 0

                playerdeck.shuffle()
                playerdeck.potential = []
                rewardselected = 1
                freeze = 1
                generatedreward = 0
                health = maxhealth
                energy = baseenergy
                playerdeck.pull()
                tip.x = 0
                target = bolleys.fellows[0]

            }
        }
        for (let b = 0; b < bolleys.fellows.length; b++) {

            if (intersects(bolleys.fellows[b].body, tip)) {
                target = bolleys.fellows[b]
                tringle.x = target.body.x
                // if(target.body.width > 1){
                //     tringle.x += 20
                // }
            }

        }
        for (let b = 0; b < playerdeck.potential.length; b++) {

            // console.log(playerdeck)
            // console.log(tip)
            if (squarecircle(playerdeck.potential[b].frame, tip)) {
                if (playerdeck.potential[b].upgrade == 0) {
                    playerdeck.push(playerdeck.potential[b])
                    playerdeck.shuffle()
                    // console.log(playerdeck)
                    playerdeck.potential = []
                    rewardselected = 1
                    freeze = 1
                    generatedreward = 0
                    health = maxhealth
                    energy = baseenergy
                    playerdeck.pull()
                    tip.x = 0
                    target = bolleys.fellows[0]


                } else {
                    maxhealth += 20 + statrange
                    playerdeck.shuffle()
                    // console.log(playerdeck)
                    playerdeck.potential = []
                    rewardselected = 1
                    freeze = 1
                    generatedreward = 0
                    health = maxhealth
                    energy = baseenergy
                    playerdeck.pull()
                    tip.x = 0
                    target = bolleys.fellows[0]

                }
            }

        }
    });



    class Triangle {
        constructor(x, y, color, length = 40) {
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.radius = length
        }
        draw() {

            tutorial_canvas_context.beginPath();

            tutorial_canvas_context.moveTo(this.x, this.y + this.length / 2);

            tutorial_canvas_context.lineTo(this.x + this.length, this.y + this.length / 2);

            tutorial_canvas_context.lineTo(this.x, this.y - this.length * 1.41);

            tutorial_canvas_context.lineTo(this.x - this.length, this.y + this.length / 2);

            tutorial_canvas_context.lineTo(this.x, this.y + this.length / 2);

            tutorial_canvas_context.stroke();
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fill()


        }

    }
    class Pointer {
        constructor(x, y, color, length = 40) {
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.radius = length
        }
        draw() {

            tutorial_canvas_context.beginPath();

            tutorial_canvas_context.moveTo(this.x, this.y + this.length / 2);

            tutorial_canvas_context.lineTo(this.x + this.length, this.y + this.length / 2);

            tutorial_canvas_context.lineTo(this.x, this.y + this.length * 1.41);

            tutorial_canvas_context.lineTo(this.x - this.length, this.y + this.length / 2);

            tutorial_canvas_context.lineTo(this.x, this.y + this.length / 2);

            tutorial_canvas_context.stroke();
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fill()


        }

    }
    class Star {
        constructor(x, y, color, length = 40) {
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            //    this.width = length
            this.height = length
            this.radius = length
        }
        draw() {


            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = 0

            tutorial_canvas_context.beginPath();

            tutorial_canvas_context.moveTo(this.x, (this.y + this.length / 2) + (-this.length));

            tutorial_canvas_context.lineTo(this.x + this.length, (this.y - this.length / 2) + (-this.length));

            tutorial_canvas_context.lineTo(this.x, (this.y + this.length * 1.41) + (-this.length));

            tutorial_canvas_context.lineTo(this.x, (this.y - this.length / 2) + (-this.length));

            tutorial_canvas_context.lineTo(this.x, (this.y + this.length * 1.41) + (-this.length));

            tutorial_canvas_context.lineTo(this.x - this.length, (this.y - this.length / 2) + (-this.length));

            tutorial_canvas_context.lineTo(this.x, (this.y + this.length / 2) + (-this.length));

            tutorial_canvas_context.stroke();
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fill()


        }

    }




    //   tutorial_canvas_context.scale(.1, .1);  // this scales the canvas
    tutorial_canvas.style.background = "#000000"
    class Crew {
        constructor() {
            this.fellows = []
            this.summons = []
        }
        draw() {
            for (let f = 0; f < this.fellows.length; f++) {
                this.fellows[f].draw()
            }
        }
        push(beast) {
            this.fellows.push(beast)

            let xwid = tutorial_canvas.width / (this.fellows.length + 1)
            let xhold = xwid

            for (let f = 0; f < this.fellows.length; f++) {
                this.fellows[f].body.x = xhold
                xhold += xwid
                if (this.fellows[f].id == 4 || this.fellows[f].id == 7) {
                    this.fellows[f].body.body.radius *= .93
                    this.fellows[f].body.radius *= .93
                } else {
                    this.fellows[f].body.radius *= .93
                }
                this.fellows[f].body.height *= .93
                this.fellows[f].body.width *= .93
                this.fellows[f].body.length *= .93
            }
            anyshift = 1

            if (textsize > 3.4) {
                textsize *= .95
            }
        }
        unshifter(beast) {
            this.fellows.unshift(beast)

            let xwid = tutorial_canvas.width / (this.fellows.length + 1)
            let xhold = xwid

            for (let f = 0; f < this.fellows.length; f++) {
                this.fellows[f].body.x = xhold
                xhold += xwid
                if (this.fellows[f].id == 4 || this.fellows[f].id == 7) {
                    this.fellows[f].body.body.radius *= .93
                    this.fellows[f].body.radius *= .93
                } else {
                    this.fellows[f].body.radius *= .93
                }
                this.fellows[f].body.height *= .93
                this.fellows[f].body.width *= .93
                this.fellows[f].body.length *= .93
            }
            if (textsize > 3.4) {
                textsize *= .95
            }
            anyshift = 1
        }
        organize() {

            let xwid = tutorial_canvas.width / (this.fellows.length + 1)
            let xhold = xwid
            if (anyshift == 1) {

                for (let f = 0; f < this.fellows.length; f++) {
                    this.fellows[f].body.x = xhold
                    xhold += xwid
                    if (this.fellows[f].id == 4 || this.fellows[f].id == 7) {
                        this.fellows[f].body.body.radius *= 1.01
                        this.fellows[f].body.radius *= 1.01
                    }
                    this.fellows[f].body.radius *= 1.01
                    this.fellows[f].body.height *= 1.01
                    this.fellows[f].body.width *= 1.01
                    this.fellows[f].body.length *= 1.01
                }
                if (textsize < 16) {
                    textsize *= 1.035
                }

                anyshift = 0


            }
            if (this.fellows.length > 0) {

                if (target.health <= 0) {

                    target = this.fellows[0]

                }

            }

            // console.log(bolleys.totalhealth())
        }
        totalhealth() {
            let totalhealth = 0
            for (let f = 0; f < this.fellows.length; f++) {
                totalhealth += this.fellows[f].health
                //    this.fellows[f].body.radius*=.99
                //    this.fellows[f].body.height*=.99
                //    this.fellows[f].body.width*=.99
                //    this.fellows[f].body.length*=.99
            }
            return totalhealth
        }


    }

    class Enemy {
        constructor(id = 0) {
            healthrange += Math.ceil(Math.random() * 2)

            if (Math.random() < .04) {
                statrange += 1
            }

            this.healing = 0
            this.rage = 0
            this.block = 0
            this.thorns = 0

            this.poison = 0
            if (id == 0) {
                this.id = Math.floor(Math.random() * 8)
                // idholder++
            } else {
                this.id = -1
            }
            this.summon = 0
            let window = Math.floor(Math.random() * healthrange) + 15
            this.health = window
            this.maxhealth = window
            this.damage = Math.floor(Math.random() * 4) + 2
            if (this.id == 3) {
                this.summon = 1
                this.body = new Star(200, 200, "orange", 40)
                this.maxhealth -= 14
                this.health -= 14
                this.damage -= 2

            }
            if (this.id == 6) {
                // this.summon = 1
                this.body = new X()
                this.maxhealth += 51 + statrange
                this.health += 51 + statrange
                this.damage -= 2
                this.rage = 1 + Math.floor(Math.random() * statrange)
                this.poison = Math.floor(Math.random() * 4 + statrange) + 2

            }
            if (this.id == 7) {
                // this.summon = 1
                this.body = new Cleric(new Circle(200, 200, 9, "white"))
                this.damage -= 2
                this.maxhealth += 20
                this.health += 20
                this.healing = Math.floor(Math.random() * 8 + statrange) + 8

            }
            if (this.id == 1) {
                this.body = new Triangle(350, 200, "Yellow", 30)
                this.thorns = Math.min((Math.floor(Math.random() * 8 + statrange) + 3), 15)
            } else if (this.id == 2) {
                this.body = new Circlex(350, 200, 20, "blue")
                this.maxhealth += 25 + (statrange * 4)
                this.health += 25 + (statrange * 4)
            } else if (this.id == 0) {
                this.body = new Rectanglex(200, 180, 40, 40, "red")
                this.maxhealth += 12 + statrange
                this.health += 12 + statrange
                this.damage += 1 + statrange
            } else if (this.id == 4) {
                this.body = new Scuttlefish(new Circle(200, 200, 9, "white"))
                this.block = Math.min((Math.floor(Math.random() * 8 + statrange) + 3), 30)
            } else if (this.id == 5) {
                this.body = new Circlex(200, 200, 9, "white")
                this.damage += 3 + (statrange * 2)
            }
        }

        draw() {
            this.body.draw()

            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.font = `${textsize}px Arial`
            if (this.block > 0) {

                tutorial_canvas_context.fillStyle = "cyan";
                tutorial_canvas_context.fillText(`Blocks ${this.block}`, this.body.x - getTextWidth(`Blocks ${this.block}`) / 2, this.body.y + 106);

            }
            if (this.rage > 0) {

                tutorial_canvas_context.fillStyle = "red";
                tutorial_canvas_context.fillText(`Enrage ${this.rage}`, this.body.x - getTextWidth(`Enrage ${this.rage}`) / 2, this.body.y + 106);

            }
            if (this.healing > 0) {

                tutorial_canvas_context.fillStyle = "#0099FF";
                tutorial_canvas_context.fillText(`Heals ${this.healing}`, this.body.x - getTextWidth(`Heals ${this.healing}`) / 2, this.body.y + 106);

            }
            if (this.thorns > 0) {

                tutorial_canvas_context.fillStyle = "Yellow";
                tutorial_canvas_context.fillText(`Thorns ${this.thorns}`, this.body.x - getTextWidth(`Thorns ${this.thorns}`) / 2, this.body.y + 106);

            }
            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.fillText(`${this.health}/${this.maxhealth}`, this.body.x - getTextWidth(`${this.health}/${this.maxhealth}`) / 2, this.body.y + 46);
            tutorial_canvas_context.fillText(`Hits ${this.damage + this.rage}`, this.body.x - getTextWidth(`Hits ${this.damage + this.rage}`) / 2, this.body.y + 76);
            if (this.poison > 0) {

                tutorial_canvas_context.fillStyle = "green";
                if (this.block <= 0 && this.thorns <= 0 && this.rage <= 0 && this.healing == 0) {

                    tutorial_canvas_context.fillText(`Poison ${this.poison}`, this.body.x - getTextWidth(`Poison ${this.poison}`) / 2, this.body.y + 106);
                } else {

                    tutorial_canvas_context.fillText(`Poison ${this.poison}`, this.body.x - getTextWidth(`Poison ${this.poison}`) / 2, this.body.y + 136);
                }

            }

        }
        attack() {

            if (this.id == 4 || this.id == 7) {

                this.body.body.radius = Math.max(((this.health / this.maxhealth) * 9), 3)

                attackanims = 1
                jump(this.body.body)
                for (let t = 0; t < this.body.edges.length; t++) {
                    jump(this.body.edges[t])
                }

                setTimeout(function () {
                    attackanims = 0
                }, (300 * bolleys.fellows.length));

            }
            if (this.health > 0) {
                jump(this.body)
                if (this.healing > 0) {
                    let select = (Math.floor(Math.random() * bolleys.fellows.length))
                    if (bolleys.fellows[select].health == bolleys.fellows[select].maxhealth) {
                        select = (Math.floor(Math.random() * bolleys.fellows.length))
                    }
                    if (bolleys.fellows[select].health == bolleys.fellows[select].maxhealth) {
                        select = (Math.floor(Math.random() * bolleys.fellows.length))
                    }
                    if (bolleys.fellows[select].health == bolleys.fellows[select].maxhealth) {
                        select = (Math.floor(Math.random() * bolleys.fellows.length))
                    }
                    if (bolleys.fellows[select].health == bolleys.fellows[select].maxhealth) {
                        select = (Math.floor(Math.random() * bolleys.fellows.length))
                    }
                    if (bolleys.fellows[select].health == bolleys.fellows[select].maxhealth) {
                        select = (Math.floor(Math.random() * bolleys.fellows.length))
                    }
                    if (bolleys.fellows[select].health == bolleys.fellows[select].maxhealth) {
                        select = (Math.floor(Math.random() * bolleys.fellows.length))
                    }
                    if (bolleys.fellows[select].health == bolleys.fellows[select].maxhealth) {
                        select = (Math.floor(Math.random() * bolleys.fellows.length))
                    }
                    if (bolleys.fellows[select].health == bolleys.fellows[select].maxhealth) {
                        select = (Math.floor(Math.random() * bolleys.fellows.length))
                    }
                    bolleys.fellows[select].health += this.healing
                    if (bolleys.fellows[select].health > bolleys.fellows[select].maxhealth) {
                        bolleys.fellows[select].health = bolleys.fellows[select].maxhealth
                    }
                }

                if ((this.damage + this.rage) > 0) {
                    this.health -= playerthorns
                }
                this.health -= this.poison
                health -= Math.max(((this.damage + this.rage) - playerblock), 0)


                if (this.summon > 0) {
                    let goon = new Enemy(-1)
                    goon.body = new Triangle(350, 200, "green", 10)
                    goon.maxhealth = 5
                    goon.health = 5
                    goon.damage = 1
                    goon.id = -1
                    goon.block = 0
                    goon.thorns = 0
                    goon.poison = 0
                    goon.rage = 0
                    goon.healing = 0
                    let statrander = Math.floor(Math.random() * 10)
                    switch (statrander) {
                        case 0:
                            goon.maxhealth += statrange
                            goon.health += statrange
                            break;
                        case 1:
                            goon.throrns += Math.floor(Math.random() * statrange)
                            break;
                        case 2:
                            goon.rage += Math.floor(Math.random() * statrange)
                            break;
                        case 3:
                            goon.block += Math.floor(Math.random() * statrange)
                            break;
                        case 4:
                            goon.healing += Math.floor(Math.random() * statrange)
                            break;
                        case 5:
                            goon.damage += Math.floor(Math.random() * statrange)
                            break;

                    }
                    if (bolleys.fellows.length < 9) {
                        bolleys.summons.push(goon)
                    }
                    goon = new Enemy(-1)
                    goon.body = new Triangle(350, 200, "green", 10)
                    goon.maxhealth = 5
                    goon.health = 5
                    goon.damage = 1
                    goon.id = -1
                    goon.block = 0
                    goon.thorns = 0
                    goon.poison = 0
                    goon.rage = 0
                    goon.healing = 0
                    statrander = Math.floor(Math.random() * 10)
                    switch (statrander) {
                        case 0:
                            goon.maxhealth += statrange
                            goon.health += statrange
                            break;
                        case 1:
                            goon.throrns += Math.floor(Math.random() * statrange)
                            break;
                        case 2:
                            goon.rage += Math.floor(Math.random() * statrange)
                            break;
                        case 3:
                            goon.block += Math.floor(Math.random() * statrange)
                            break;
                        case 4:
                            goon.healing += Math.floor(Math.random() * statrange)
                            break;
                        case 5:
                            goon.damage += Math.floor(Math.random() * statrange)
                            break;

                    }
                    if (bolleys.fellows.length < 9) {
                        bolleys.summons.push(goon)
                    }
                }
                // console.log(this)
            }
            if (health <= 0) {
                health = 0
            }
            if (this.health <= 0) {
                if (this.rage == 0) {
                    this.poison = 0
                }
                this.health = 0
                anyshift = 1
            }
        }


    }

    class Card {
        constructor() {
            this.kill = 0
            this.thorns = 0
            this.block = 0
            this.frame = new Rectangle(100, 100, 150, 120, "red")
            this.id = Math.floor(Math.random() * 2)
            this.damage = Math.floor(Math.random() * 19) + 5
            this.energy = Math.floor(Math.random() * 4) + 1
            if (this.energy >= 4) {
                if (Math.random() > .5) {
                    this.energy -= 1
                }
            }
            this.text = `Damage: ${this.damage}`
            this.energytext = `Energy: ${this.energy}`
            this.healtext = `Heals: ${this.healing}`
            this.energygain = 0
            this.energylater = 0
            this.healing = 0
            this.poison = 0
            this.upgrade = 0
        }
        draw() {
            this.frame.draw()

            this.text = `Damage: ${this.damage}`
            if (this.kill > 0) {
                this.text = `Kill 1 target`
            }
            if (this.upgrade > 0) {
                this.text = `Max health`
            }
            this.energytext = `Energy: ${this.energy}`
            if (this.upgrade > 0) {
                this.energytext = `plus ${20 + statrange}`
            }
            this.healtext = `Heals: ${this.healing}`

            this.thornstext = `Thorns: ${this.thorns}`

            this.healtext = `Heals: ${this.healing}`
            this.energygaintext = `Energy gain: ${this.energygain}`
            this.energylatertext = `Energy gain later: ${this.energylater}`
            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.font = "18px Arial";
            tutorial_canvas_context.fillText(this.text, this.frame.x + 3, this.frame.y + 26);
            tutorial_canvas_context.fillText(this.energytext, this.frame.x + 3, this.frame.y + 52);

            if (this.healing > 0) {
                tutorial_canvas_context.fillText(this.healtext, this.frame.x + 3, this.frame.y + 78);
            }
            if (this.energygain > 0) {
                tutorial_canvas_context.fillText(`Gain ${this.energygain} Energy`, this.frame.x + 3, this.frame.y + 78);
            }
            if (this.energylater > 0) {
                tutorial_canvas_context.fillText(`Gain ${this.energylater} Energy`, this.frame.x + 3, this.frame.y + 78);
                tutorial_canvas_context.fillText("next turn", this.frame.x + 3, this.frame.y + 104);
            }
            if (this.poison > 0) {
                tutorial_canvas_context.fillText(`+${this.poison} poison`, this.frame.x + 3, this.frame.y + 78);
                // tutorial_canvas_context.fillText("next turn", this.frame.x+3, this.frame.y+104);
            }
            if (this.thorns > 0) {
                tutorial_canvas_context.fillText(`+${this.thorns} Thorns`, this.frame.x + 3, this.frame.y + 78);
                // tutorial_canvas_context.fillText("next turn", this.frame.x+3, this.frame.y+104);
            }
            if (this.block > 0) {
                tutorial_canvas_context.fillText(`+${this.block} Block`, this.frame.x + 3, this.frame.y + 78);
                // tutorial_canvas_context.fillText("next turn", this.frame.x+3, this.frame.y+104);
            }
            if (this.kill > 0) {
                tutorial_canvas_context.fillText(`Discard for `, this.frame.x + 3, this.frame.y + 78);
                tutorial_canvas_context.fillText(`rest of battle`, this.frame.x + 3, this.frame.y + 104);
                // tutorial_canvas_context.fillText("next turn", this.frame.x+3, this.frame.y+104);
            }
            if (this.upgrade > 0) {
                tutorial_canvas_context.fillText(`permanently `, this.frame.x + 3, this.frame.y + 78);
            }
        }
        play(target) {

            // console.log(bolleys)
            if (health > 0) {
                if (target.health > 0) {

                    if (this.energy <= energy) {

                        playerthorns += this.thorns
                        playerblock += this.block


                        if (target.rage > 0) {
                            target.rage += 1
                        }

                        target.poison += this.poison
                        health += this.healing

                        health -= target.thorns
                        energy += this.energygain
                        energydelay += this.energylater
                        playerdeck.discarder(this)
                        energy -= this.energy


                        if (this.kill > 0) {
                            target.health = 0
                        }
                        // if(this.id == 1){
                        target.health -= Math.max((this.damage - target.block), 0)
                        if (target.health <= 0) {
                            target.poison = 0
                            target.health = 0
                            bolleys.fellows.splice(bolleys.fellows.indexOf(target), 1)
                            anyshift = 1
                            bolleys.organize()
                        }
                        // }
                        if (health <= 0) {
                            health = 0
                        }
                    }


                }

            }
        }

    }
    class Deck {
        constructor() {
            this.roster = []
            this.displayed = []
            this.discard = []
            this.potential = []
            this.exhausted = []
        }
        draw() {
            for (let t = 0; t < this.displayed.length; t++) {
                this.displayed[t].draw()
            }
        }
        push(card) {
            this.roster.push(card)
        }
        pushlive(card) {
            this.displayed.push(card)
        }
        pull() {
            energy = baseenergy + energydelay
            energydelay = 0
            for (let y = 0; y < this.displayed.length; y++) {
                this.discard.push(this.displayed[y])
            }
            this.displayed = []
            let xcor = 50
            let ycor = tutorial_canvas.height - 160
            this.shuffle()
            let card = Math.floor(Math.random() * this.roster.length)
            this.displayed[0] = this.roster[card]
            this.displayed[0].frame.x = xcor
            this.displayed[0].frame.y = ycor
            xcor += 130
            this.roster.splice(card, 1)
            this.shuffle()
            card = Math.floor(Math.random() * this.roster.length)
            this.shuffle()
            this.displayed[1] = this.roster[card]
            this.displayed[1].frame.x = xcor
            this.displayed[1].frame.y = ycor
            xcor += 130
            this.roster.splice(card, 1)
            this.shuffle()
            card = Math.floor(Math.random() * this.roster.length)
            this.displayed[2] = this.roster[card]
            this.displayed[2].frame.x = xcor
            this.displayed[2].frame.y = ycor
            xcor += 130
            this.roster.splice(card, 1)
            this.shuffle()
            card = Math.floor(Math.random() * this.roster.length)
            this.displayed[3] = this.roster[card]
            this.displayed[3].frame.x = xcor
            this.displayed[3].frame.y = ycor
            xcor += 130
            this.roster.splice(card, 1)
            this.shuffle()
            card = Math.floor(Math.random() * this.roster.length)
            this.displayed[4] = this.roster[card]
            this.displayed[4].frame.x = xcor
            this.displayed[4].frame.y = ycor
            xcor += 130
            this.roster.splice(card, 1)
            let timer = 50
            for (let b = 0; b < bolleys.fellows.length; b++) {
                setTimeout(function () {
                    bolleys.fellows[b].attack()
                    if (target == bolleys.fellows[b]) {
                        jump(tringle)
                    }
                }, timer);
                timer += 220
            }
            setTimeout(function () {
                for (let b = 0; b < bolleys.fellows.length; b++) {
                    if (bolleys.fellows[b].health <= 0) {
                        bolleys.fellows.splice(b, 1)
                    }
                }
                for (let b = 0; b < bolleys.fellows.length; b++) {
                    if (bolleys.fellows[b].health <= 0) {
                        bolleys.fellows.splice(b, 1)
                    }
                    if (bolleys.fellows[b].health < 1) {
                        bolleys.fellows.splice(b, 1)
                    }
                }
                bolleys.organize()
                for (let q = 0; q < bolleys.summons.length; q++) {
                    if (q % 2 == 0) {
                        bolleys.push(bolleys.summons[q])
                    } else {
                        bolleys.unshifter(bolleys.summons[q])
                    }
                }
                anyshift = 1
                bolleys.organize()
                bolleys.summons = []
            }, (400 * bolleys.fellows.length));
        }
        organize() {
            let xcor = 50
            let ycor = tutorial_canvas.height - 160
            this.potential[0].frame.x = xcor
            this.potential[0].frame.y = ycor
            xcor += 130
            this.potential[1].frame.x = xcor
            this.potential[1].frame.y = ycor
            xcor += 130
            this.potential[2].frame.x = xcor
            this.potential[2].frame.y = ycor
            xcor += 130
            this.potential[3].frame.x = xcor
            this.potential[3].frame.y = ycor
            xcor += 130
            this.potential[4].frame.x = xcor
            this.potential[4].frame.y = ycor
            xcor += 130

        }
        discarder(card) {
            this.discard.push(card)
            this.displayed.splice(this.displayed.indexOf(card), 1)

        }
        shuffle() {
            if (this.roster.length <= 5) {

                for (let g = 0; g < this.discard.length; g++) {
                    if (this.discard[g].kill == 0) {
                        this.roster.push(this.discard[g])
                    } else {
                        this.exhausted.push(this.discard[g])
                    }
                }

                this.discard = []
            }
        }
        endshuffle() {

            for (let g = 0; g < this.discard.length; g++) {
                this.roster.push(this.discard[g])
            }

            for (let g = 0; g < this.exhausted.length; g++) {
                this.roster.push(this.exhausted[g])
            }

            this.exhausted = []
            this.discard = []

        }

    }



    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
            this.radius = width * 1.42
        }
        draw() {
            if (this.color == "black") {

                tutorial_canvas_context.strokeStyle = "white"
                tutorial_canvas_context.strokeRect(this.x, this.y, this.width, this.height)

            } else {

                tutorial_canvas_context.strokeStyle = this.color
            }
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move() {

            this.x += this.xmom
            this.y += this.ymom

        }
    }

    class Rectanglex {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y + height / 2
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
            this.radius = width * 1.42
        }
        draw() {
            if (this.color == "black") {

                tutorial_canvas_context.strokeStyle = "white"
                tutorial_canvas_context.strokeRect(this.x, this.y, this.width, this.height)

            } else {

                tutorial_canvas_context.strokeStyle = this.color
            }
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x - this.width / 2, this.y - this.height, this.width, this.height)
        }
        move() {

            this.x += this.xmom
            this.y += this.ymom

        }
    }

    // can be drawn, or moved with friction.  and richochet 
    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
        }
        draw() {
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke();
        }
        move() {

            this.xmom *= .9999
            this.ymom *= .9999   //friction

            this.x += this.xmom
            this.y += this.ymom

            if (this.x + this.radius > tutorial_canvas.width) {

                if (this.xmom > 0) {
                    this.xmom *= -1
                }

            }
            if (this.y + this.radius > tutorial_canvas.height) {
                if (this.ymom > 0) {
                    this.ymom *= -1
                }

            }
            if (this.x - this.radius < 0) {
                if (this.xmom < 0) {
                    this.xmom *= -1
                }

            }
            if (this.y - this.radius < 0) {

                if (this.ymom < 0) {
                    this.ymom *= -1
                }

            }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }
    class Circlex {
        constructor(x, y, radius, color, xmom = 0, ymom = 0) {
            this.x = x
            this.y = y
            this.radius = radius * 3
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
        }
        draw() {
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y - this.radius / 3, this.radius / 3, 0, (Math.PI * 2), true)
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke();
        }
        move() {

            this.xmom *= .9999
            this.ymom *= .9999   //friction

            this.x += this.xmom
            this.y += this.ymom

            if (this.x + this.radius > tutorial_canvas.width) {

                if (this.xmom > 0) {
                    this.xmom *= -1
                }

            }
            if (this.y + this.radius > tutorial_canvas.height) {
                if (this.ymom > 0) {
                    this.ymom *= -1
                }

            }
            if (this.x - this.radius < 0) {
                if (this.xmom < 0) {
                    this.xmom *= -1
                }

            }
            if (this.y - this.radius < 0) {

                if (this.ymom < 0) {
                    this.ymom *= -1
                }

            }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }

    // let x = 0
    // let y = 0
    let tringle = new Pointer(-100, 120, "white", 10)

    let bolleys = new Crew()
    let playerdeck = new Deck()

    let cardlet = new Card()


    for (let b = 0; b < 10; b++) {

        cardlet.energy = Math.floor(cardlet.damage / 6)
        cardlet.damage += 1

        if (Math.random() < .3) {
            if (cardlet.energy >= 1) {
                cardlet.energy -= 1
            }
        }
        // cardlet.thorns = 20
        // cardlet.block = 20
        // cardlet.kill = 1
        playerdeck.push(cardlet)
        cardlet = new Card()
    }
    // playerdeck.pushlive(cardlet)
    // playerdeck.discarder(cardlet)
    playerdeck.pull()

    let circ = new Circle(125, 200, 10, getRandomLightColor(), Math.random() - .5, Math.random() - .5)  // starts with ramndom velocities and color
    let drawbutton = new Rectangle(550, 430, 50, 100, "purple")
    let skipbutton = new Rectangle(550, 230, 50, 100, "purple")
    // rect.ymom = 1

    // example objects

    function generatecreeps() {
        playerthorns = 0
        playerblock = 0
        let bolley = new Enemy()
        // bolley.body = new Scuttlefish(new Circle(200, 200, 9, "white"))
        // bolley.id = 4


        // bolley.summon = 1
        // bolley.damage = 0
        bolleys.push(bolley)
        for (let b = 0; b < 7; b++) {

            if (Math.random() < .5) {
                bolley = new Enemy()

                bolleys.push(bolley)

                // healthrange+=Math.ceil(Math.random()*2)

                // if(Math.random() < .04){
                //     statrange+=1
                // }
            }
        }
        target = bolleys.fellows[0]
        textsize = 13

        anyshift = 1
        bolleys.organize()
    }
    generatecreeps()
    // interval, fill this with game logic 
    window.setInterval(function () {
        tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)  // refreshes the image

        if (bolleys.totalhealth() == 0) {
            if (rewardselected == 1) {

                bolleys = new Crew()
                generatecreeps()
                rewardselected = 0
            } else {
                if (generatedreward == 0) {

                    playerdeck.endshuffle()
                    playerdeck.pull()
                    playerdeck.endshuffle()
                    makereward()

                }
                freeze = 0

            }
        }
        if (freeze == 1) {

            drawbutton.draw()
            bolleys.draw()
            playerdeck.draw()

            for (let t = 0; t < playerdeck.displayed.length; t++) {
                if (squarecircle(playerdeck.displayed[t].frame, tip)) {
                    tip.x = 0
                    if (bolleys.fellows.includes(target)) {
                        playerdeck.displayed[t].play(target)
                    } else {
                        target = bolleys.fellows[0]
                    }
                    // playerdeck.discarder(playerdeck.displayed[t])
                }


            }

            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.font = "50px Arial";
            tutorial_canvas_context.fillText(`Health: ${health} Energy: ${energy}`, 20, 520);
            tutorial_canvas_context.font = "20px Arial";
            if (playerthorns < 10) {

                tutorial_canvas_context.fillText(`Thorns: ${playerthorns}     Block: ${playerblock}`, 20, 479);

            } else {

                tutorial_canvas_context.fillText(`Thorns: ${playerthorns}   Block: ${playerblock}`, 20, 479);
            }
            // tutorial_canvas_context.fillText(`Health: ${health} Energy: ${energy}`, 20, 479);

            tutorial_canvas_context.font = "40px Arial";
            tutorial_canvas_context.fillText(`Draw`, 553, 468);

            tringle.x = target.body.x
            // if(target.body.width > 1){
            //     tringle.x += target.body.width/2
            // }
            tringle.draw()



        } else {

            skipbutton.draw()
            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.font = "40px Arial";
            tutorial_canvas_context.fillText(`Skip`, 553, 268);

            showpickings()

            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.font = "50px Arial";
            tutorial_canvas_context.fillText(`Select a reward card!`, 20, 520);
        }
    }, 20) // length of refresh interval


    function makereward() {
        generatedreward = 1
        for (let f = 0; f < 5; f++) {

            let card1 = new Card()
            let holdrand = Math.random()
            if (holdrand < .05) {

                card1.kill = 1
                if (Math.random() > .6) {
                    card1.energy = 2
                } else {
                    card1.energy = 3
                }

                card1.frame.color = "black"
            } else if (holdrand < .15) {

                card1.thorns = Math.floor(Math.random() * 5) + 2
                card1.thorns += Math.floor(Math.random() * statrange)
                card1.energy -= 1
                if (Math.random() > .5) {
                    card1.thorns += 1
                } else {
                    card1.damage += 10
                }

                card1.frame.color = "gray"
            } else if (holdrand < .25) {

                card1.block = Math.floor(Math.random() * 0) + 1
                card1.block += Math.floor(Math.random() * statrange / 2)

                card1.energy -= 1
                if (Math.random() > .1) {
                    card1.block += 1
                } else {
                    card1.damage += 10
                }

                card1.frame.color = "gray"
            } else if (holdrand < .27) {

                card1.upgrade = 1

                card1.frame.color = "orange"
            } else if (holdrand < .35) {
                card1.energy = 0
                card1.damage += (9 + Math.floor(Math.random() * statrange))
                if (Math.random() > .5) {
                    card1.energygain = 2
                } else {
                    card1.energylater = 4
                }
                card1.frame.color = "blue"
            } else if (holdrand < .65) {

                card1.healing = Math.floor(Math.random() * 15) + 5
                card1.healing += Math.floor(Math.random() * statrange)


                card1.energy -= 1
                if (Math.random() > .5) {
                    card1.healing += 1
                } else {
                    card1.damage += 1
                }
                if (Math.random() > .5) {
                    card1.healing += 1
                } else {
                    card1.damage += 1
                }
                if (Math.random() > .5) {
                    card1.healing += 1
                } else {
                    card1.damage += 1
                }
                if (Math.random() > .5) {
                    card1.healing += 1
                } else {
                    card1.damage += 1
                }
                if (Math.random() > .5) {
                    card1.healing += 1
                } else {
                    card1.damage += 1
                }

                card1.frame.color = "green"
            } else if (holdrand < .8) {
                card1.poison = Math.floor(Math.random() * 5) + 6
                card1.poison += Math.floor(Math.random() * statrange * 2)
                card1.energy -= 1


                if (Math.random() > .5) {
                    card1.poison += 1
                } else {
                    card1.damage += 1
                }
                if (Math.random() > .5) {
                    card1.poison += 1
                } else {
                    card1.damage += 1
                }
                if (Math.random() > .5) {
                    card1.poison += 1
                } else {
                    card1.damage += 1
                }
                if (Math.random() > .5) {
                    card1.poison += 1
                } else {
                    card1.damage += 1
                }
                if (Math.random() > .5) {
                    card1.poison += 1
                } else {
                    card1.damage += 1
                }

                card1.frame.color = "purple"
            } else {


                card1.damage += 18 + (statrange * 2)
                card1.energy -= 1
                card1.frame.color = "crimson"


            }

            if (card1.energy > 0) {
                if (Math.random() > .75) {
                    card1.energy -= 1
                }
            }
            if (card1.energy > 2) {
                if (Math.random() > .5) {
                    card1.energy -= 1
                }
            }
            playerdeck.potential.push(card1)
        }

        anyshift = 1
        playerdeck.organize()
    }

    function showpickings() {
        for (let f = 0; f < 5; f++) {
            playerdeck.potential[f].draw()
        }
    }


    // run on any object with x/y attributes in the timer to give them wasd controls
    function players(racer) {
        if (keysPressed['w']) {
            racer.y -= .7
        }
        if (keysPressed['a']) {
            racer.x -= .7
        }
        if (keysPressed['s']) {
            racer.y += .7
        }
        if (keysPressed['d']) {
            racer.x += .7
        }
        if (keysPressed['f']) {
        }


        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }





    // can check if one circle contains the cneter of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
    function intersects(circle, left) {
        var areaX = left.x - circle.x;
        var areaY = left.y - circle.y;
        return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
    }

    // random color that will be visible on  blac backgroung
    function getRandomLightColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 15) + 1)];
        }
        return color;
    }


    // checks if a square contains the centerpoint of a circle
    function squarecircle(square, circle) {

        let squareendh = square.y + square.height
        let squareendw = square.x + square.width

        if (square.x <= circle.x) {
            if (square.y <= circle.y) {
                if (squareendw >= circle.x) {
                    if (squareendh >= circle.y) {
                        return true
                    }
                }
            }
        }
        return false
    }

    // checks if two squares are intersecting ( not touching, for touching cnange the evaluations from ">" to ">=" etc)
    function squaresquare(a, b) {

        a.left = a.x
        b.left = b.x
        a.right = a.x + a.width
        b.right = b.x + b.width
        a.top = a.y
        b.top = b.y
        a.bottom = a.y + a.height
        b.bottom = b.y + b.height



        if (a.left > b.right || a.top > b.bottom ||
            a.right < b.left || a.bottom < b.top) {
            return false
        }
        else {
            return true
        }
    }




    function jump(guy) {

        if (guy.y1 > -10000) {
            jumpX(guy)
        }

        setTimeout(function () {
            guy.y -= 7
            setTimeout(function () {
                guy.y -= 6.5
                setTimeout(function () {
                    guy.y -= 6
                    setTimeout(function () {
                        guy.y -= 5.5
                        setTimeout(function () {
                            guy.y -= 5
                            setTimeout(function () {
                                guy.y -= 4.5
                                setTimeout(function () {
                                    guy.y -= 4
                                    setTimeout(function () {
                                        guy.y -= 3.5
                                        setTimeout(function () {
                                            guy.y -= 3
                                            setTimeout(function () {
                                                guy.y -= 2.5
                                                setTimeout(function () {
                                                    guy.y -= 2
                                                    setTimeout(function () {
                                                        guy.y -= 1.5
                                                        setTimeout(function () {
                                                            guy.y -= 1
                                                            setTimeout(function () {
                                                                guy.y -= 0.5
                                                                setTimeout(function () {
                                                                    guy.y -= 0
                                                                    setTimeout(function () {
                                                                        guy.y += 0.5
                                                                        setTimeout(function () {
                                                                            guy.y += 1
                                                                            setTimeout(function () {
                                                                                guy.y += 1.5
                                                                                setTimeout(function () {
                                                                                    guy.y += 2
                                                                                    setTimeout(function () {
                                                                                        guy.y += 2.5
                                                                                        setTimeout(function () {
                                                                                            guy.y += 3
                                                                                            setTimeout(function () {
                                                                                                guy.y += 3.5
                                                                                                setTimeout(function () {
                                                                                                    guy.y += 4
                                                                                                    setTimeout(function () {
                                                                                                        guy.y += 4.5
                                                                                                        setTimeout(function () {
                                                                                                            guy.y += 5
                                                                                                            setTimeout(function () {
                                                                                                                guy.y += 5.5
                                                                                                                setTimeout(function () {
                                                                                                                    guy.y += 6
                                                                                                                    setTimeout(function () {
                                                                                                                        guy.y += 6.5
                                                                                                                        setTimeout(function () {
                                                                                                                            guy.y += 7
                                                                                                                            setTimeout(function () {
                                                                                                                                setTimeout(function () {
                                                                                                                                    setTimeout(function () {
                                                                                                                                        setTimeout(function () {
                                                                                                                                            setTimeout(function () {
                                                                                                                                                jumpvar = 0
                                                                                                                                            }, 1);
                                                                                                                                        }, 1);
                                                                                                                                    }, 1);
                                                                                                                                }, 1);
                                                                                                                            }, 1);
                                                                                                                        }, 18);
                                                                                                                    }, 18);
                                                                                                                }, 18);
                                                                                                            }, 18);
                                                                                                        }, 18);
                                                                                                    }, 18);
                                                                                                }, 18);
                                                                                            }, 18);
                                                                                        }, 18);
                                                                                    }, 18);
                                                                                }, 18);
                                                                            }, 18);
                                                                        }, 18);
                                                                    }, 18);
                                                                }, 18);
                                                            }, 18);
                                                        }, 18);
                                                    }, 18);
                                                }, 18);
                                            }, 18);
                                        }, 18);
                                    }, 18);
                                }, 18);
                            }, 18);
                        }, 18);
                    }, 18);
                }, 18);
            }, 18);
        }, 18);




    }
    function jumpX(guy) {

        setTimeout(function () {
            guy.y1 -= 7
            setTimeout(function () {
                guy.y1 -= 6.5
                setTimeout(function () {
                    guy.y1 -= 6
                    setTimeout(function () {
                        guy.y1 -= 5.5
                        setTimeout(function () {
                            guy.y1 -= 5
                            setTimeout(function () {
                                guy.y1 -= 4.5
                                setTimeout(function () {
                                    guy.y1 -= 4
                                    setTimeout(function () {
                                        guy.y1 -= 3.5
                                        setTimeout(function () {
                                            guy.y1 -= 3
                                            setTimeout(function () {
                                                guy.y1 -= 2.5
                                                setTimeout(function () {
                                                    guy.y1 -= 2
                                                    setTimeout(function () {
                                                        guy.y1 -= 1.5
                                                        setTimeout(function () {
                                                            guy.y1 -= 1
                                                            setTimeout(function () {
                                                                guy.y1 -= 0.5
                                                                setTimeout(function () {
                                                                    guy.y1 -= 0
                                                                    setTimeout(function () {
                                                                        guy.y1 += 0.5
                                                                        setTimeout(function () {
                                                                            guy.y1 += 1
                                                                            setTimeout(function () {
                                                                                guy.y1 += 1.5
                                                                                setTimeout(function () {
                                                                                    guy.y1 += 2
                                                                                    setTimeout(function () {
                                                                                        guy.y1 += 2.5
                                                                                        setTimeout(function () {
                                                                                            guy.y1 += 3
                                                                                            setTimeout(function () {
                                                                                                guy.y1 += 3.5
                                                                                                setTimeout(function () {
                                                                                                    guy.y1 += 4
                                                                                                    setTimeout(function () {
                                                                                                        guy.y1 += 4.5
                                                                                                        setTimeout(function () {
                                                                                                            guy.y1 += 5
                                                                                                            setTimeout(function () {
                                                                                                                guy.y1 += 5.5
                                                                                                                setTimeout(function () {
                                                                                                                    guy.y1 += 6
                                                                                                                    setTimeout(function () {
                                                                                                                        guy.y1 += 6.5
                                                                                                                        setTimeout(function () {
                                                                                                                            guy.y1 += 7
                                                                                                                            setTimeout(function () {
                                                                                                                                setTimeout(function () {
                                                                                                                                    setTimeout(function () {
                                                                                                                                        setTimeout(function () {
                                                                                                                                            setTimeout(function () {
                                                                                                                                                jumpvar = 0
                                                                                                                                            }, 1);
                                                                                                                                        }, 1);
                                                                                                                                    }, 1);
                                                                                                                                }, 1);
                                                                                                                            }, 1);
                                                                                                                        }, 18);
                                                                                                                    }, 18);
                                                                                                                }, 18);
                                                                                                            }, 18);
                                                                                                        }, 18);
                                                                                                    }, 18);
                                                                                                }, 18);
                                                                                            }, 18);
                                                                                        }, 18);
                                                                                    }, 18);
                                                                                }, 18);
                                                                            }, 18);
                                                                        }, 18);
                                                                    }, 18);
                                                                }, 18);
                                                            }, 18);
                                                        }, 18);
                                                    }, 18);
                                                }, 18);
                                            }, 18);
                                        }, 18);
                                    }, 18);
                                }, 18);
                            }, 18);
                        }, 18);
                    }, 18);
                }, 18);
            }, 18);
        }, 18);




    }

    function getTextWidth(text, font) {
        // re-use canvas object for better performance
        var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
    }


})