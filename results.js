"use strict";

var urlToCopy = document.getElementById("urlToCopy");
if (urlToCopy) {
  urlToCopy.innerHTML = location.href;
}

function shareLink() {
  var urlToCopy = document.getElementById("urlToCopy");
  var urlToCopyContainer = document.getElementById("urlToCopyContainer");

  try {
    if (document.body.createTextRange) {
      // for Internet Explorer
      var range = document.body.createTextRange();
      range.moveToElementText(urlToCopy);
      range.select();
      document.execCommand("Copy");
    } else if (window.getSelection) {
      // other browsers
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(urlToCopy);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
    }
    var button = document.getElementById("buttonLink");
    if (button) {
      button.className = "button buttonLinkGood";
      setTimeout(function() {
        var buttonTimeout = document.getElementById("buttonLink");
        if (buttonTimeout) button.className = "button buttonLink";
      }, 2000);
    }
  } catch (err) {}
}

function getQueryVariable(variable) {
  var query = window.atob(window.location.search.substring(1));
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      if (pair[1] == "NaN") {
        return 0;
      } else {
        return pair[1] / 100;
      }
    }
  }
  return 0;
}

function setAxisValue(name, value) {
  var axis = document.getElementById(name);
  if (!axis) return;

  var text = document.getElementById(name + "Text");
  if (!text) return;

  axis.style.width = (100 * value).toFixed(1) + "%";

  text.innerHTML = (100 * value).toFixed(0) + "%";
  if (text.offsetWidth > axis.offsetWidth - 5) text.style.display = "none";
  else text.style.display = "";
}

function setBonus(name, value, limit) {
  var axis = document.getElementById(name);
  if (!axis) return;

  if (value > limit) {
    axis.style.display = "flex";
    axis.style.opacity = value * value;
  } else {
    axis.style.display = "none";
  }
}

var axes = ["c", "b", "p", "m", "s", "j", "t"];

var bonus = {
  inc: 0.5,
  delete: 0.5,
  even: 0.5,
  imm: 0.5,
  merge: 0.5,
  separa: 0.5,
  meta: 0.5,
  exo: 0.5,
  mono: 0.5,
  poly: 0.5,
  ref: 0.5,
  react: 0.5,
  revo: 0.5,
  expan: 0.5
};

var characteristics = [];
var axesValues = {
  c: 0,
  b: 0,
  p: 0,
  m: 0,
  s: 0,
  j: 0,
  t: 0
};

var left = 0;
var right = 0;

for (var i = 0; i < axes.length; i++) {
  var negativeValue = getQueryVariable(axes[i] + "0");
  var positiveValue = getQueryVariable(axes[i] + "1");
  setAxisValue(axes[i] + "AxisNeg", negativeValue);
  setAxisValue(axes[i] + "AxisPos", positiveValue);
  setAxisValue(axes[i] + "AxisMid", 1 - negativeValue - positiveValue);

  left += negativeValue;
  right += positiveValue;

  if (negativeValue > positiveValue) {
    characteristics.push({ name: axes[i] + "0", value: negativeValue });
  } else {
    characteristics.push({ name: axes[i] + "1", value: positiveValue });
  }

  axesValues[axes[i]] = positiveValue - negativeValue;
}

var bonusEnabled = 0;

for (var b in bonus) {
  var value = getQueryVariable(b);

  setBonus(b + "Bonus", value, bonus[b]);

  if (value > bonus[b]) {
    bonusEnabled = 1;
    characteristics.push({ name: b, value: value });
  }
}

characteristics.sort(function(a, b) {
  return a.value < b.value;
});

var charSlogan = {
  b0: "...",
  b1: "...",
  c0: "...",
  c1: "...",
  j0: "...",
  j1: "...",
  s0: "...",
  t0: "...",
  t1: "..."
};

function getCharacteristic(name, vmin, vmax) {
  for (var k = 0; k < characteristics.length; k++) {
    if (characteristics[k].name != name) continue;

    if (characteristics[k].value >= vmin && characteristics[k].value <= vmax)
      return characteristics[k].value;
    else return -1.0;
  }

  return -1.0;
}

var generatedSlogan = "";
var sloganDiv = document.getElementById("slogan");
if (sloganDiv) {
  var selectedSlogan = [];

  for (var i = 0; i < characteristics.length; i++) {
    if (
      characteristics[i].value > 0 &&
      charSlogan.hasOwnProperty(characteristics[i].name)
    ) {
      selectedSlogan.push({
        text: charSlogan[characteristics[i].name],
        value: characteristics[i].value
      });
    }
  }

  selectedSlogan.sort(function(a, b) {
    return a.value < b.value;
  });

  var counter = 0;
  for (var i = 0; i < selectedSlogan.length; i++) {
    if (generatedSlogan != "") generatedSlogan += " · ";
    generatedSlogan += selectedSlogan[i].text;
    counter++;

    if (counter >= 3) break;
  }

  sloganDiv.innerHTML = generatedSlogan;
}

if (!bonusEnabled) {
  var bonusBox = document.getElementById("bonusBox");
  bonusBox.style.display = "none";
}

var images = {
  c0: "/images/..._мал.png",
  c1: "/images/..._мал.png",
  j0: "/images/..._мал.png",
  j1: "/images/..._мал.png",
  s0: "/images/..._мал.png",
  s1: "/images/..._мал.png",
  b0: "/images/..._мал.png",
  b1: "/images/..._мал.png",
  p0: "/images/..._мал.png",
  p1: "/images/..._мал.png",
  m0: "/images/..._мал.png",
  m1: "/images/..._мал.png",
  t0: "/images/..._мал.png",
  t1: "/images/..._мал.png",
  inc: "/images/1.png",
  delete: "/images/2.png",
  even: "/images/3.png",
  imm: "/images/4.png",
  merge: "/images/5.png",
  separa: "/images/6.png",
  meta: "/images/7.png",
  exo: "/images/8.png",
  mono: "/images/9.png",
  poly: "/images/10.png",
  ref: "/images/11.png",
  react: "/images/12.png",
  revo: "/images/13.png",
  expan: "/images/14.png",
};

var numImageLoaded = 0;

function onImageLoaded() {
  numImageLoaded++;

  if (numImageLoaded < images.length) {
    return;
  }

  var rPreview = document.getElementById("generatedResults");
  if (rPreview) {
    var ctx = rPreview.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, rPreview.width, rPreview.height);
    ctx.fillStyle = "#ebebeb";
    ctx.fill();

    var yPos = 20;
    
      //Logo
      ctx.beginPath();
      ctx.rect(0, 0, rPreview.width, 42);
      ctx.fillStyle = "#500076";
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 25px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("WikiScales", 10, 30);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 15px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("DigitalArtScales.github.io", rPreview.width - 10, 27);

      yPos += 48;
       
      //Slogan
      ctx.fillStyle = "#000000";
      ctx.font = "25px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(generatedSlogan, rPreview.width / 2.0, yPos + 30);
      yPos += 70;

      //Axes
      var axesDrawInfo = [
        {
          key: "c",
          color0: "#cc0000",
          color1: "#1fad8a",
          name0: "axis1",
          name1: "axis2"
        },
        {
          key: "j",
          color0: "#25afd9",
          color1: "#D23A22",
          name0: "...",
          name1: "..."
        },
        {
          key: "s",
          color0: "#DC2E51",
          color1: "#ccc914",
          name0: "...",
          name1: "..."
        },
        {
          key: "b",
          color0: "#34b634",
          color1: "#916021",
          name0: "...",
          name1: "..."
        },
        {
          key: "p",
          color0: "#7889cf",
          color1: "#7831eb",
          name0: "...",
          name1: "..."
        },
        {
          key: "m",
          color0: "#d69022",
          color1: "#3cbaad",
          name0: "...",
          name1: "..."
        },
        {
          key: "t",
          color0: "#912a34",
          color1: "#65962f",
          name0: "...",
          name1: "..."
        }
      ];

      var axeMargin = 100;
      var axeWidth = rPreview.width - axeMargin * 2;
      ctx.strokeStyle = "#888888";
      for (var i = 0; i < axesDrawInfo.length; i++) {
        var negativeValue = getQueryVariable(axesDrawInfo[i]["key"] + "0");
        var positiveValue = getQueryVariable(axesDrawInfo[i]["key"] + "1");
        var neutralValue = 1 - negativeValue - positiveValue;

        var negSize = axeWidth * negativeValue;
        var posSize = axeWidth * positiveValue;
        var ntrSize = axeWidth * neutralValue;

        ctx.beginPath();
        ctx.rect(0.5 + axeMargin + negSize, 0.5 + yPos, ntrSize, 30);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(0.5 + axeMargin, 0.5 + yPos, negSize, 30);
        ctx.fillStyle = axesDrawInfo[i]["color0"];
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(
          0.5 + rPreview.width - axeMargin - posSize,
          0.5 + yPos,
          posSize,
          30
        );
        ctx.fillStyle = axesDrawInfo[i]["color1"];
        ctx.fill();
        ctx.stroke();

        if (negSize > 40) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "20px sans-serif";
          ctx.textAlign = "right";
          ctx.fillText(
            Math.round(negativeValue * 100) + "%",
            axeMargin + negSize - 5,
            yPos + 23
          );
        }

        if (posSize > 40) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "20px sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(
            Math.round(positiveValue * 100) + "%",
            axeMargin + negSize + ntrSize + 5,
            yPos + 23
          );
        }

        if (ntrSize > 40) {
          ctx.fillStyle = "#888888";
          ctx.font = "20px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(
            Math.round(neutralValue * 100) + "%",
            axeMargin + negSize + ntrSize / 2,
            yPos + 23
          );
        }

        ctx.drawImage(
          images[axesDrawInfo[i]["key"] + "0"],
          axeMargin - 73,
          yPos - 27
        );
        ctx.drawImage(
          images[axesDrawInfo[i]["key"] + "1"],
          rPreview.width - axeMargin + 73 - 86,
          yPos - 27
        );

        ctx.fillStyle = "#000000";
        ctx.font = "16px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(axesDrawInfo[i]["name0"], axeMargin + 8, yPos - 6);

        ctx.textAlign = "right";
        ctx.fillText(
          axesDrawInfo[i]["name1"],
          rPreview.width - axeMargin - 8,
          yPos - 6
        );

        yPos += 100;
      }

      var xShift = 0;
      var numBonus = 0;
      for (var b in bonus) {
        value = getQueryVariable(b);
        if (value > bonus[b]) {
          numBonus++;
        }
      }

      for (var b in bonus) {
        value = getQueryVariable(b);
        if (value > bonus[b]) {
          ctx.drawImage(
            images[b],
            rPreview.width / 2 - ((numBonus - 1) * 100) / 2 + xShift - 43,
            yPos - 27
          );
          xShift += 100;
        }
      }
    }
  }

for (var b in images) {
  var src = images[b];
  images[b] = new Image();
  images[b].src = src;
  images[b].onload = onImageLoaded;
}

function download_image() {
  var canvas = document.getElementById("generatedResults");
  var link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = `DigitalArtScales_Results_${+new Date()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
