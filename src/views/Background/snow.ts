import util from "../../util/util";
interface SnowType {
  snowNumber?: number;
  snowShape?: number;
  fallSpeed?: number;
}
class snow {
  public snowNumber;
  public snowShape;
  public el;
  public fallSpeed;
  public snowCan;
  public snowCtx;
  public snowArr;
  constructor(element: HTMLElement, option: SnowType) {
    const snowOption = option || {};
    this.snowNumber = snowOption.snowNumber || 200; //雪花数量
    this.snowShape = snowOption.snowShape || 5; //雪花形状
    this.fallSpeed = snowOption.fallSpeed || 1; //下落速度
    this.el = element; //添加的元素
  }
  init() {
    //创建画布
    this.createSnowCanvas();
    //创建雪花形状
    this.createSnowShape();
    //画雪花
    this.drawSnow();
  }
  remove() {
    if (util.isDom(this.el) && this.snowCan) {
      this.el.removeChild(this.snowCan);
    } else if (this.snowCan) {
      document.body.removeChild(this.snowCan);
    }
  }
  createSnowCanvas() {
    this.snowCan = document.createElement("canvas"); //创建canvas标签
    this.snowCtx = this.snowCan.getContext("2d"); //获取画布
    this.snowCan.id = "snowCanvas"; //为canvas标签设置id
    this.snowCan.style.cssText += "position:absolute;z-index:1;left:0;top:0;"; //设置canvas标签css样式
    this.snowCan.width =
      util.isDom(this.el) && !this.el.length
        ? this.el.offsetWidth
        : document.documentElement.clientWidth; //设置canvas宽
    this.snowCan.height =
      util.isDom(this.el) && !this.el.length
        ? this.el.offsetHeight
        : document.documentElement.clientHeight; //设置canvas高
    window.addEventListener(
      "resize",
      () => {
        this.snowCan.width = document.documentElement.clientWidth;
        this.snowCan.height = document.documentElement.clientHeight;
      },
      false
    );
    //将canvas元素添加到页面中
    console.log(util.isDom(this.el))
    if (util.isDom(this.el)) {
      if (this.el.length) return;
      this.el.appendChild(this.snowCan);
    } else {
      document.body.appendChild(this.snowCan);
    }
  }
  createSnowShape() {
    let maxNumber = this.snowNumber,
      can = this.snowCan,
      snowArr = (this.snowArr = []); //用一个数组存储形状
    for (let i = 0; i < maxNumber; i++) {
      snowArr.push(
        new snowMove(can.width, can.height, this.snowShape, this)
      );
    }
  }
  drawSnow() {
    //画之前清除一下画布
    this.snowCtx.clearRect(0, 0, this.snowCan.width, this.snowCan.height);
    for (var j = 0; j < this.snowNumber; j++) {
        this.snowArr[j].render(this.snowCtx);
        this.snowArr[j].update(this.snowCan, this);
    }
    //重复画雪花
    requestAnimationFrame(() => this.drawSnow())
  }
}
class snowMove {
    public x;
    public y;
    public shape;
    public fallSpeed;
    public verY;
    public verX;
    public step;
    public stepNum;
    constructor(width,height,shape,context){
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);
        this.shape = Math.random() * shape;
        this.fallSpeed = Math.random() * 1+ context.fallSpeed;
        this.verY = context.fallSpeed;
        this.verX = 0;
        this.step = Math.random() * 30;
        this.stepNum = 0;
    }
    reset(can,context){
        this.x = Math.floor(Math.random() * can.width);//x坐标
        this.y = 0;//y坐标
        this.shape = Math.random() * context.snowShape + 2;//形状
        this.fallSpeed = Math.random() * 1 + context.fallSpeed;//坠落速度
        this.verY = this.fallSpeed;//y方向上的速度
        this.verX = 0;//x方向上的速度
    }
    update(can,context){
        //左右摆动，用余弦
        this.verX *= 0.95;
        if (this.verY <= this.fallSpeed) this.verY = this.fallSpeed;

        this.verX += Math.cos(this.step += .4) * this.stepNum;

        this.y += this.verY;
        this.x += this.verX;

        //飞出边界的处理
        if (this.x <= 0 || this.x > can.width || this.y <= 0 || this.y > can.height) {
            this.reset(can, context);
        }
    }
    render(ctx){
        //雪花颜色为渐变颜色参数createRadialGradient(
            // 参数	描述
            // 渐变的开始圆的 x 坐标
            // 渐变的开始圆的 y 坐标
            // 开始圆的半径
            // 渐变的结束圆的 x 坐标
            // 渐变的结束圆的 y 坐标
            // 结束圆的半径)
            var snowStyle = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.shape);
            snowStyle.addColorStop(0.8, 'rgba(255,255,255,1)');
            snowStyle.addColorStop(0.1, 'rgba(255,255,255,.4)');
    
            //画圆 arc
            // 参数	描述
            // x	圆的中心的 x 坐标。
            // y	圆的中心的 y 坐标。
            // r	圆的半径。
            // sAngle	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
            // eAngle	结束角，以弧度计。
            // counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
            ctx.save();
            ctx.fillStyle = snowStyle;
            //开始一条路径
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.shape, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
    }
}
export default snow;