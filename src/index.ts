
import { Drawing, EXPONENT_CSS_BODY_STYLES, EXPONENT_CSS_STYLES, Input, Panel } from "@repcomm/exponent-ts"
import { RotaryDisplay } from "./rotarydisplay";

EXPONENT_CSS_BODY_STYLES.mount(document.head);
EXPONENT_CSS_STYLES.mount(document.head);

async function main () {
  console.log("Hello World");

  const container = new Panel()
  .setId("container")
  .setStyleItem("flex-direction", "column")
  .setStyleItem("flex", "1")
  .mount(document.body);

  const rd = new RotaryDisplay();

  const inputFileUpload = new Input()
  .setId("fileupload")
  .setType("file")
  .on("change", (evt)=>{
    let files = inputFileUpload.element.files;
    if (files.length < 0) return;

    let fr = new FileReader();
    fr.onload = (evt)=>{
      rd.setRasterFromURL( evt.target.result as string );
    }
    fr.readAsDataURL(files[0]);
    
  })
  .mount(container);

  const canvas = new Drawing({
    alpha: false,
    desynchronized: true
  })
  .setStyleItem("flex", "20")
  .addRenderPass((ctx)=>{

    ctx.fillStyle = "#00000009";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let w = canvas.width;
    let hw = w/2;
    let h = canvas.height;
    let hh = h/2;
    let min = w > h ? h : w;
    let hmin = min / 2;

    rd.cx = hw;
    rd.cy = hh;
    rd.radius = hmin;
    rd.render(ctx);
    rd.render(ctx);
    rd.render(ctx);
    rd.render(ctx);
  })
  .setStyleItem("min-width", "0")
  .setStyleItem("min-height", "0")
  .setStyleItem("width", "100%")
  .setStyleItem("height", "100%")
  .setHandlesResize(true)
  .mount(container);

  canvas.autoClear = false;

  setInterval(()=>{
    canvas.setNeedsRedraw(true);
  }, 10);

}

main();
