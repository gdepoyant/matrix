const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const specials = ':;./|\\+-*'
const alphabet = katakana + latin.repeat(2) + nums.repeat(4) + specials.repeat(2);
// const alphabet = 'GD'

const squeeze = 1.75;
const fontSize = 32 ;
const _font = 'bold ' + fontSize + 'px consolas'

const columns = Math.floor(canvas.width/fontSize*squeeze);
// const columns = 1;

const dropPositions = [];
const dropRates = [];
const dropCount = [];
const chars = [];
const refreshDarkEvery = 2;
const refreshDarkRatio = 0.25;
const drawInterval = 40;


function _rgba(r,g,b,t) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + t + ')';
}
const _green = _rgba(0, 255, 0, 1.0);
const _black = _rgba(0, 0, 0, 1.0);
const _white = _rgba(255, 255, 255, 1.0);
const _filter = _rgba(0, 0, 0, refreshDarkRatio);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function resetDropRate(i) {
    resetDropRateMain(i, 0, 4);
}

function resetDropRateMain(i, min, max) {
    dropRates[i] = Math.floor(getRandomArbitrary(min, max));
}

function getRandomChar() {
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

for( let i = 0; i < columns; i++ ) {
    dropPositions[i] = canvas.height / fontSize + 1;
    // dropPositions[i] = 1;
    dropCount[i] = 0;
    resetDropRate(i);
}

let refreshDarkCount = 0;

const draw = () => {

    if (refreshDarkCount > refreshDarkEvery) {
        refreshDarkCount = 0
        context.fillStyle = _filter;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    refreshDarkCount++;

    context.font = _font;
    context.textAlign = "center"

    for(let i = 0; i < dropPositions.length; i++)
    {
        if (dropCount[i] < dropRates[i]) {
            dropCount[i]++;
            continue;
        }
        dropCount[i] = 0;
        const _char = getRandomChar();

        if( chars[i] && dropPositions[i]>1 ) {
            context.fillStyle = _green;
            context.fillText(chars[i], (i+0.5)*fontSize/squeeze, (dropPositions[i]-1)*fontSize, fontSize/squeeze);
        }
        chars[i] = _char

        const _x = (i)*fontSize/squeeze
        const _y = (dropPositions[i]-0.85)*fontSize
        const _w = fontSize/squeeze
        const _h = fontSize

        context.fillStyle = _black;
        context.fillRect(_x, _y, _w, _h);

        context.fillStyle = _white;
        context.fillText(chars[i], (i+0.5)*fontSize/squeeze, dropPositions[i]*fontSize, fontSize/squeeze);

        //if(dropPositions[i]*fontSize > canvas.height){
        if(dropPositions[i]*fontSize > canvas.height && Math.random() > 0.975){
            dropPositions[i] = 0;
            resetDropRate(i);
        }
        dropPositions[i]++;
    }
};

setInterval(draw, drawInterval);
