// 初期化
let SelectTime = document.getElementsByName("time")
const StartButton = document.getElementById("startButton")
let timer = document.getElementById("timer")
let sec = 0
let selectedTime = 0
let didPlank = 0
let didPlankTarget = document.querySelectorAll(".didPlank")

let today = new Date()
if (localStorage.getItem("date") === null || today.getDate() !== parseInt(localStorage.getItem("date"))) {
  // その日のプランク秒がない場合の処理
  localStorage.setItem("date",today.getDate())
  localStorage.setItem("PlankCount", 0)
} else {
  // その日のプランク秒がある場合の処理
  didPlank = parseInt(localStorage.getItem("PlankCount"))
  didPlankTarget.forEach(element => {
    element.innerHTML = didPlank
  });
}

StartButton.addEventListener("click",()=>{
  // ボタンの時間を取得
  for (let i = 0; i < SelectTime.length; i++) {
    if (SelectTime.item(i).checked) {
      selectedTime = SelectTime.item(i).value
    }
  }

  // タイマー回路
  sec = parseInt(selectedTime)
  timer.innerHTML = sec
  let minusTime = () => {
    if (sec === 0) {
      clearInterval(doLoopTimer)
      endTimer()
    }
    timer.innerHTML = sec
    sec -= 1
  }
  let doLoopTimer = setInterval(minusTime, 1000)

  let endTimer = () => {
    console.log("done")
    didPlank += parseInt(selectedTime)
    didPlankTarget.forEach(element => {
      element.innerHTML = didPlank
    });
    localStorage.setItem("PlankCount",didPlank)
    
    // シェアURL設定
    let uri = `https://twitter.com/share?url=https://ririo08.github.io/Do-Plank/&text=本日のプランクチャレンジ：${didPlank}秒&hashtags=プランクチャレンジ`
    let url = encodeURI(uri)
    document.getElementById("link").href = url
    console.log(url)
  }
})
