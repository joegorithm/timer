export default class Timer {
  
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__button--control"),
      reset: root.querySelector(".timer__button--reset")
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("Enter number of minutes:");

      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    document.title = minutes + ":" + seconds.toString().padStart(2, "0") + " ⏐ TimelyTimer";
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `START`;
      this.el.control.classList.add("timer__button--start");
      this.el.control.classList.remove("timer__button--stop");
    } else {
      this.el.control.innerHTML = `PAUSE`;
      this.el.control.classList.add("timer__button--stop");
      this.el.control.classList.remove("timer__button--start");
    }
  }

  start() {
    const note = new Audio('/ding.mp3');
    function playSound() {
      note.play();
    }

    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
        playSound();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
      <div class="timer__part timer__part--minutes highlight">00</div>
      <div class="timer__part timer__part--colon">:</div>
      <div class="timer__part timer__part--seconds highlight">00</div>
      <div>
        <button type="button" class="timer__button timer__button--control timer__button--start">START</button>
        <button class="timer__button timer__button--reset">RESET</button>
      </div>
    `;
  }
}