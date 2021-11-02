const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;
// const columns = 1;

const dropPositions = [];
const dropRates = [];
const dropCount = [];
const chars = [];
let refreshDarkCount = 0
const refreshDarkEvery = 4

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function resetDropRate(i) {
    resetDropRateMain(i, 1, 5);
}

function resetDropRateMain(i, min, max) {
    dropRates[i] = Math.floor(getRandomArbitrary(min, max));
}

for( let i = 0; i < columns; i++ ) {
    dropPositions[i] = canvas.height / fontSize + 1;
    // dropPositions[i] = 1;
    dropCount[i] = 0;
    resetDropRate(i);
}

const draw = () => {

    if (refreshDarkCount > refreshDarkEvery) {
        refreshDarkCount = 0
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    refreshDarkCount++;

    context.font = fontSize + 'px consolas';
    context.textAlign = "center"

    for(let i = 0; i < dropPositions.length; i++)
    {
        if (dropCount[i] < dropRates[i]) {
            dropCount[i]++;
            continue;
        }
        dropCount[i] = 0;
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

        if( chars[i] ) {
            context.fillStyle = '#0F0';
            context.fillText(chars[i], (i+0.5)*fontSize, (dropPositions[i]-1)*fontSize);
        }
        chars[i] = text

        context.fillStyle = 'rgba(0, 0, 0, 1.0)';
        context.fillRect((i)*fontSize, dropPositions[i]*fontSize, fontSize, fontSize);

        context.fillStyle = '#FFF';
        context.fillText(text, (i+0.5)*fontSize, dropPositions[i]*fontSize);

        // if(dropPositions[i]*fontSize > canvas.height){
        if(dropPositions[i]*fontSize > canvas.height && Math.random() > 0.975){
            dropPositions[i] = 0;
            resetDropRate(i);
        }
        dropPositions[i]++;
    }
};

setInterval(draw, 20);
