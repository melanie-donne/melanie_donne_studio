class Noise {

  constructor(container = document.body, options) {

    if (document.getElementById('canvas-noise')) return;

    this.canvas =
    this.ctx =
    this.canvasData =
    this.ctxData =
    this.imageData = null;
    this.container = container;
    this.settings = Object.assign({
      size: 120,
      interval: 3,
      alpha: 15 },
    options);
    this.loop = this.loop.bind(this);
    this.size = this.size.bind(this);
    this.frame = 0;
    this.animation = null;

    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas-noise';
    this.ctx = this.canvas.getContext('2d');

    this.size();

    window.addEventListener('resize', this.size);

    this.container.appendChild(this.canvas);

    // Create canvas imageData
    this.canvasData = document.createElement('canvas');
    this.ctxData = this.canvasData.getContext('2d');
    this.canvasData.width = this.settings.size;
    this.canvasData.height = this.settings.size;
    this.imageData = this.ctxData.createImageData(this.settings.size, this.settings.size);

    this.loop();

  }
  size() {
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }

  pixel() {
    const pixelLength = this.imageData.data.length;

    for (let i = 0; i < pixelLength; i += 4) {
      const color = Math.floor(Math.random() * 255);
      this.imageData.data[i] = color;
      this.imageData.data[i + 1] = color;
      this.imageData.data[i + 2] = color;
      this.imageData.data[i + 3] = this.settings.alpha;
    }
    this.ctxData.putImageData(this.imageData, 0, 0);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.ctx.createPattern(this.canvasData, 'repeat');
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  loop() {
    this.frame += 1;
    if (this.frame % this.settings.interval === 0) {
      this.pixel();
      this.draw();
    }

    this.animation = window.requestAnimationFrame(this.loop);
  }

  destroy() {
    window.removeEventListener('resize', this.size);
    window.cancelAnimationFrame(this.animation);
    this.canvas.remove();
    for (let i in this) {
      delete this[i];
    }
  }}



var noise = new Noise();