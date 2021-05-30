objects = [];

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: detecting objects';
}

function preload() {
    img = loadImage('nature.jpg');
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (status != false) {
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = "Status: object detected";

            fill('red');
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        
    }
}

function modelLoaded() {
    console.log('boring');

    status = true;
    object_detector.detect(img, gotResult);
}

function gotResult(err, results) {
    objects = results;
    if (err) return console.log(err);
    if (!err) return console.log(results);
}