<template>
  <div class="cube-wrapper" v-bind:style="cuberContainer">
    <div class="camera-controls" v-if="showControls">
      <input type="range" style="width: 150px" min="500" max="6000" step="10" v-model="perspective">
      <input type="number" style="width: 25px" v-model="perspective"/>
      <input type="range" style="width: 150px" min="0" max="360" step="1" v-model="cameraArray[0]">
      <input type="number" style="width: 25px" v-model="cameraArray[0]"/>
      <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)" class="icon icon-tabler icon-tabler-arrows-vertical" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <polyline points="8 7 12 3 16 7" />
        <polyline points="8 17 12 21 16 17" />
        <line x1="12" y1="3" x2="12" y2="21" />
      </svg>
      <input type="range" style="width: 150px" min="0" max="360" step="1" v-model="cameraArray[1]">
      <input type="number" style="width: 25px" v-model="cameraArray[1]"/>
      <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)" class="icon icon-tabler icon-tabler-arrows-horizontal" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <polyline points="7 8 3 12 7 16" />
        <polyline points="17 8 21 12 17 16" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
      <input type="range" style="width: 150px" min="0" max="360" step="1" v-model="cameraArray[2]">
      <input type="number" style="width: 25px" v-model="cameraArray[2]"/>
      <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)"  class="icon icon-tabler icon-tabler-refresh" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
      </svg>
      <input type="range" style="width: 150px" min="0" max="2" step="1" v-model="transitionTime">
      <input type="number" style="width: 25px" v-model="transitionTime"/>
      <span v-text="'s'"></span>
      <input type="range" style="width: 250px" :min="-1000" :max="1000" step="1" @click="manualTranslate = true;" v-model="translateX">
      <input type="number" style="width: 60px" v-model="translateX"/>
      <input type="range" style="width: 250px" :min="-500" :max="500" step="1" @click="manualTranslate = true;" v-model="translateY">
      <input type="number" style="width: 50px" v-model="translateY"/>
      <input type="range" style="width: 250px" :min="-1000" :max="1000" step="1" @click="manualTranslate = true;" v-model="translateZ">
      <input type="number" style="width: 60px" v-model="translateZ"/>
      <br>
    </div>
<!--    <div class="cube" v-bind:style="cube" >-->
<!--      <div class="front-face" v-bind:style="frontFace"></div>-->
<!--      <div class="back-face" v-bind:style="backFace"> </div>-->
<!--      <div class="left-face" v-bind:style="leftFace"></div>-->
<!--      <div class="right-face" v-bind:style="rightFace"></div>-->
<!--      <div class="bottom-face" v-bind:style="bottomFace"></div>-->
<!--      <div class="top-face" v-bind:style="topFace"></div>-->
<!--    </div>-->
    <div class="test-cube" v-bind:style="cube" id="test-cube" >
      <div class="face-one" id="face-one" v-bind:style="faceOne">1</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ShadedCube",
    data(){
      return{
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        showMarkers: false,
        manualTranslate: false,
      }
    },
    props:{
      width:{
        type: Number,
        default: 200,
      },
      height:{
        type: Number,
        default: 200,
      },
      perspective:{
        type: Number,
        default: 3000,
      },
      borderColor:{
        type: String,
        default: 'black'
      },
      cubeColor:{
        type: String,
        default: 'rgb(235,235,235)'
      },
      cameraArray:{
        type: Array,
        default(){
          return [0,0,0]
        }
      },
      showControls:{
        type: Boolean,
        default: false
      },
      transitionTime:{
        type: Number,
        default: 1,
      },
      spinCube:{
        type: Boolean,
        default: false,
      },
      zIndex:{
        type: Number,
        default: 1,
      },
      zStagger:{
        type: Number,
        default: 0,
      },
      xStagger:{
        type: Number,
        default: 0,
      },
      yStagger:{
        type: Number,
        default: 0,
      },
      opacity:{
        type: Number,
        default: 100,
      },
      gradient:{
        type: String,
      },
    },
    watch:{
      translateX(){
        let startMatrix = getComputedStyle(document.getElementById('test-cube'), null).transform;
        setTimeout(() => {
          let endMatrix = getComputedStyle(document.getElementById('test-cube'), null).transform;
          let matrixToSend = this.arrayToMatrix(this.parseMatrix(endMatrix), 4)
          this.getTransformData(document.getElementById('test-cube'), matrixToSend)
          console.log(this.parseMatrix(endMatrix))
        }, this.transitionTime * 1000)
        console.log(this.parseMatrix(startMatrix))
        console.log(this.arrayToMatrix(this.parseMatrix(startMatrix), 3))
        console.log(startMatrix)
      },
      translateY(){
        let startMatrix = getComputedStyle(document.getElementById('test-cube'), null).transform;
        setTimeout(() => {
          let endMatrix = getComputedStyle(document.getElementById('test-cube'), null).transform;
          let matrixToSend = this.arrayToMatrix(this.parseMatrix(endMatrix), 4)
          console.log(this.arrayToMatrix(this.parseMatrix(endMatrix), 4))
          this.getTransformData(document.getElementById('test-cube'), matrixToSend)
        }, this.transitionTime * 1000)
        console.log(this.parseMatrix(startMatrix))
        console.log(this.arrayToMatrix(this.parseMatrix(startMatrix), 4))
        console.log(startMatrix)
      },
      translateZ(){
        let startMatrix = getComputedStyle(document.getElementById('test-cube'), null).transform;
        setTimeout(() => {
          let endMatrix = getComputedStyle(document.getElementById('test-cube'), null).transform;
          let matrixToSend = this.arrayToMatrix(this.parseMatrix(endMatrix), 4)
          console.log(this.arrayToMatrix(this.parseMatrix(endMatrix), 4))
          this.getTransformData(document.getElementById('test-cube'), matrixToSend)
        }, this.transitionTime * 1000)
        console.log(this.parseMatrix(startMatrix))
        console.log(this.arrayToMatrix(this.parseMatrix(startMatrix), 4))
        console.log(startMatrix)
      },
      cameraArray(){
        let startMatrix = getComputedStyle(document.getElementById('test-cube'), null).transform;
        setTimeout(() => {
          let endMatrix = getComputedStyle(document.getElementById('test-cube'), null).transform;
          let matrixToSend = this.arrayToMatrix(this.parseMatrix(endMatrix), 4)
          console.log(this.arrayToMatrix(this.parseMatrix(endMatrix), 4))
          this.getTransformData(document.getElementById('test-cube'), matrixToSend)
        }, this.transitionTime * 1000)
        console.log(this.parseMatrix(startMatrix))
        console.log(this.arrayToMatrix(this.parseMatrix(startMatrix), 4))
        console.log(startMatrix)
      }
    },
    methods:{
      getTransformData(element, matrix){
        let rotateY = Math.asin(-matrix[0][2]);
        let rotateX;
        let rotateZ;

        if (Math.cos(rotateY) !== 0){
          rotateX = Math.atan2(matrix[1][2], matrix[2][2])
          rotateZ = Math.atan2(matrix[0][1], matrix[0][0])
        } else {
          rotateX = Math.atan2(-matrix[2][0], matrix[1][1]);
          rotateZ = 0;
        }
        console.log({
          rotate: { x: rotateX, y: rotateY, z: rotateZ},
          translate: { x: matrix[3][0], y: matrix[3][1], z: matrix[3][2]}
        })
        return {
          rotate: { x: rotateX, y: rotateY, z: rotateZ},
          translate: { x: matrix[3][0], y: matrix[3][1], z: matrix[3][2]}
        }
      },
      getVertexData(element){
        console.log(element.offsetWidth, element.offsetHeight)
        let w = Math.round(element.offsetWidth/2) //width of the element
        let h = Math.round(element.offsetHeight/2) //height of the element
        let vertexData = {
          a:{x: -w, y: -h, z:0}, //find location of top left corner of face
          b:{x: w, y: -h, z: 0}, //find location of top right corner of face
          c:{x: w, y: h, z: 0}, //find location of bottom right corner of face
          d:{x: -w, y: h, z: 0}, //find location of bottom left corner of face
        }
        console.log(vertexData)
        return vertexData
      },
      parseMatrix(matrix) {
        return matrix.match(/(?:\-|\.|\b)(\d|\.|e\-)+/g).map(function(v) {return +v;});
      },
      arrayToMatrix(list, elementsPerSubArray) {
          let matrix = [], i, k;
          for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
              k++;
              matrix[k] = [];
            }
          matrix[k].push(list[i]);
          }
          return matrix;
      }
    },
    computed:{
      cube(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'absolute',
          backgroundColor: 'transparent',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${this.cameraArray[0]}deg) rotateY(${this.cameraArray[1]}deg) rotateZ(${this.cameraArray[2]}deg)` + `translateZ(${this.translateZ}px) translateY(${this.translateY}px) translateX(${this.translateX}px)`,
          transition: this.transitionTime + 's linear',
        }
      },
      cuberContainer(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'relative',
          perspective: this.perspective + 'px',
          transition: this.transitionTime + 's ease',
          zIndex: this.zIndex,
          transform: `translateZ(${this.zStagger}px) translateY(${this.yStagger}px) translateX(${this.xStagger}px)`
        }
      },
      frontFace(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          margin: `-${this.height/2} -${this.width}`,
          position: 'absolute',
          backgroundColor: this.cubeColor,
          border: '1px solid ' + this.borderColor,
          transform: 'rotateX(90deg)' + `translateZ(${Math.ceil(this.width/2) + 1}px)`,
          transition: this.transitionTime + 's ease',
          opacity: this.opacity + '%',
          background: this.gradient
        }
      },
      backFace(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'absolute',
          backgroundColor: this.cubeColor,
          border: '1px solid ' + this.borderColor,
          transform: 'rotateX(90deg)' + `translateZ(-${Math.ceil(this.width/2) + 1}px)`,
          transition: this.transitionTime + 's ease',
          opacity: this.opacity + '%',
          background: this.gradient
        }
      },
      leftFace(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'absolute',
          backgroundColor: this.cubeColor,
          border: '1px solid ' + this.borderColor,
          transform: 'rotateY(90deg)' + `translateZ(-${Math.ceil(this.width/2) + 1}px)`,
          transition: this.transitionTime + 's ease',
          opacity: this.opacity + '%',
          background: this.gradient
        }
      },
      rightFace(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'absolute',
          backgroundColor: this.cubeColor,
          border: '1px solid ' + this.borderColor,
          transform: 'rotateY(90deg)' + `translateZ(${Math.ceil(this.width/2) + 1}px)`,
          transition: this.transitionTime + 's ease',
          opacity: this.opacity + '%',
          background: this.gradient
        }
      },
      topFace(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'absolute',
          backgroundColor: this.cubeColor,
          border: '1px solid ' + this.borderColor,
          transform: `translateZ(${Math.ceil(this.width/2) + 1}px)`,
          transition: this.transitionTime + 's ease',
          opacity: this.opacity + '%',
          background: this.gradient
        }
      },
      bottomFace(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'absolute',
          backgroundColor: this.cubeColor,
          border: '1px solid ' + this.borderColor,
          transform: `translateZ(-${Math.ceil(this.width/2) + 1}px)`,
          transition: this.transitionTime + 's ease',
          opacity: this.opacity + '%',
          background: this.gradient
        }
      },
      faceOne(){
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          margin: `-${this.height/2}px -${this.width/2}px`,
          border: 'none',
          position: 'absolute',
          backgroundColor: this.cubeColor,
          transition: this.transitionTime + 's ease',
          opacity: this.opacity + '%',
          background: this.gradient
        }
      },
    },
    mounted(){
      console.log(document.getElementById('face-one'))
      let scene = document.getElementById('test-cube')
      let vertexData = this.getVertexData(document.getElementById('face-one'));
      let faceOne = document.getElementById('face-one');
      let markerA = document.createElement('div');
      markerA.setAttribute("style","position: absolute; transform: translate3d(" + vertexData.a.x + "px, " + vertexData.a.y + "px, " + vertexData.a.z + "px); background-color: red; height: 10px; width: 10px;")
      // markerA.style.transform = "translate3d(" + vertexData.a.x + "px, " + vertexData.a.y + "px, " + vertexData.a.z + "px);";
      console.log(markerA);
      let markerB = document.createElement('div');
      markerB.setAttribute("style","position: absolute; transform: translate3d(" + vertexData.b.x + "px, " + vertexData.b.y + "px, " + vertexData.b.z + "px); background-color: red; height: 10px; width: 10px;");
      let markerC = document.createElement('div');
      markerC.setAttribute("style","position: absolute; transform: translate3d(" + vertexData.c.x + "px, " + vertexData.c.y + "px, " + vertexData.c.z + "px); background-color: red; height: 10px; width: 10px;")
      let markerD = document.createElement('div');
      markerD.setAttribute("style","position: absolute; transform: translate3d(" + vertexData.d.x + "px, " + vertexData.d.y + "px, " + vertexData.d.z + "px); background-color: red; height: 10px; width: 10px;")
      scene.appendChild(markerA);
      scene.appendChild(markerB);
      scene.appendChild(markerC);
      scene.appendChild(markerD);
      this.showMarkers = true;
      console.log('ive been created!', this.zIndex, vertexData, scene);
    }
  }
</script>
<style scoped>
  *{
    margin: 0;
  }
  .camera-controls{
    position: absolute;
    bottom: 200px;
    left: 400px;
    display: flex;
    flex-flow: row wrap;
    width: 15vw;
    height: 15vh;
  }
  input[type='range'] {
    overflow: hidden;
    width: 80px;
    cursor: pointer;
    -webkit-appearance: none;
    background: linear-gradient(135deg, #ffffff 50%, #f8f8f8 50%);
    border-radius: 2%;
    border: 1px solid #efefef;
    transform: translateY(8px);
  }
  input[type='range']:active{
    outline: none;
  }
  input[type='range']:focus{
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    height: 25px;
    -webkit-appearance: none;
    color: #ff0000;
    margin-top: -1px;
  }
  input[type='range']::-webkit-slider-thumb {
    margin-top: 3px;
    width: 30px;
    -webkit-appearance: none;
    height: 18px;
    border-radius: 15%;
    background: linear-gradient(135deg, #fd2323 50%, #f53838 50%);
  }
  .marker{
    border-radius: 50%;
    background-color: red;
  }
</style>
