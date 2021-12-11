async function getlangs() {
    let res = await fetch(`https://libretranslate.de/languages`);
    let data = await res.json();
    appenddata(data);
  }
  getlangs();
  
  function appenddata(d) {
    let maindiv = document.getElementById(`Langs`);
    d.forEach((el) => {
      let opt = document.createElement(`option`);
      opt.value = el.code;
      opt.textContent = el.name;
      maindiv.append(opt);
    });
  }
  
  function getValue() {
    let val = document.getElementById(`Langs`).value;
    localStorage.setItem(`lang`, JSON.stringify(val));
    return val;
  }
  
  async function detectLang() {
    const res = await fetch("https://libretranslate.de/detect", {
      method: "POST",
      body: JSON.stringify({
        q: "hola",
        source: "en",
        target: "es",
      }),
      headers: { "Content-Type": "application/json" },
    });
  
    console.log(await res.json());
  }

  
  function getInput() {
    let log = document.getElementById("Box");
    return log.value;
  }
  let userinput = getInput();
  
  async function translate() {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: getInput(),
        source: "en",
        target: getValue(),
      }),
      headers: { "Content-Type": "application/json" },
    });
  
    let data = await res.json();
    let { translatedText } = data;
    appendres(translatedText);
  }
  
  function translateText() {
    let log = document.getElementById("Box");
    translate();
  }
  
  function appendres(data) {
    let trgt = document.getElementById(`Box2`);
    trgt.value = data;
  }

  var recognizing;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
reset();
recognition.onend = reset();

recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      Box.value += event.results[i][0].transcript;
    }
  }
};

function reset() {
  recognizing = false;
  button.innerHTML = "Use Speech To Text";
}

function handleTrigger() {
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
    button.innerHTML = "Click To Stop";
  }
}
function textToAudio() {
    let msg = document.getElementById("Box2").value;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = JSON.parse(localStorage.getItem(`lang`));
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
  
    window.speechSynthesis.speak(speech);
  }