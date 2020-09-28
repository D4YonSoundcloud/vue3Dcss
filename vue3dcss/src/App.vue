<template>
  <div id="app">
<!--    <Cube :width="randomNumber" :height="randomNumber" :perspective="randomPerspective" :showCamera="true"></Cube>-->
<!--    <CameraContainer :height="hundredCubesContainerHeightWidth" :width="hundredCubesContainerHeightWidth">-->
<!--      <div v-for="(cube, index) in hundredCubes" :key="hundredCubes">-->
<!--        <Cube :width="50" :height="50" :perspective="3000"></Cube>-->
<!--      </div>-->
<!--    </CameraContainer>-->
    <div class="camera-controls">
      <button @click="addCubeLayer">Add Layer ({{cubeOfCubesStartArray.length}})</button>
      <button @click="addCube">Add Cubes ({{cubeLayer}})</button>
      <button @click="deleteCubeLayer">Remove Layer</button>
      <button @click="deleteCube">Remove Cubes</button>
      <input type="range" style="width: 250px" min="500" max="6000" step="10" v-model="randomPerspective">
      <input type="number" style="width: 35px" v-model="randomPerspective"/>
      <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)" class="icon icon-tabler icon-tabler-zoom-in" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="10" cy="10" r="7" />
        <line x1="7" y1="10" x2="13" y2="10" />
        <line x1="10" y1="7" x2="10" y2="13" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
      <input type="range" style="width: 250px" min="-360" max="360" step="1" v-model="cameraArray[0]">
      <input type="number" style="width: 35px" v-model="cameraArray[0]"/>
      <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)" class="icon icon-tabler icon-tabler-arrows-vertical" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <polyline points="8 7 12 3 16 7" />
        <polyline points="8 17 12 21 16 17" />
        <line x1="12" y1="3" x2="12" y2="21" />
      </svg>
      <input type="range" style="width: 250px" min="-360" max="360" step="1" v-model="cameraArray[1]">
      <input type="number" style="width: 35px" v-model="cameraArray[1]"/>
      <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)" class="icon icon-tabler icon-tabler-arrows-horizontal" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <polyline points="7 8 3 12 7 16" />
        <polyline points="17 8 21 12 17 16" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
      <input type="range" style="width: 250px" min="0" max="360" step="1" v-model="cameraArray[2]">
      <input type="number" style="width: 35px" v-model="cameraArray[2]"/>
      <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)"  class="icon icon-tabler icon-tabler-refresh" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
      </svg>
      <input type="range" style="width: 250px" min="0" max="2" step="1" v-model="transitionTime">
      <input type="number" style="width: 35px" v-model="transitionTime"/>
      <span v-text="'s'"></span>
      <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)" class="icon icon-tabler icon-tabler-clock" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
      </svg>
      <input type="range" style="width: 250px" min="1" max="50" step="1" v-model="zTranslate">
      <input type="number" style="width: 35px" v-model="zTranslate"/>
      <input type="range" style="width: 250px" min="0" max="2" step="0.25" v-model="xTranslate">
      <input type="number" style="width: 35px" v-model="xTranslate"/>
      <input type="range" style="width: 250px" min="0" max="2" step="0.25" v-model="yTranslate">
      <input type="number" style="width: 35px" v-model="yTranslate"/>
      <input type="range" style="width: 250px" min="0" max="100" step="1" v-model="hundredCubesWidth">
      <input type="number" style="width: 35px" v-model="hundredCubesWidth"/>
      <input type="range" style="width: 250px" min="0" max="100" step="1" v-model="opacity">
      <input type="number" style="width: 35px" v-model="opacity"/>
      <input type="color" style="width: 250px" v-model="gradientColor1">
      <input type="range" style="width: 250px" min="0" max="100" step="1" v-model="gradientColor1Percentage">
      <input type="number" style="width: 35px" v-model="gradientColor1Percentage"/>
      <input type="color" style="width: 250px" v-model="gradientColor2">
      <input type="range" style="width: 250px" min="0" max="100" step="1" v-model="gradientColor2Percentage">
      <input type="number" style="width: 35px" v-model="gradientColor2Percentage"/>
      <input type="range" style="width: 250px" min="0" max="360" step="1" v-model="gradientColorAngle">
      <input type="number" style="width: 35px" v-model="gradientColorAngle"/>
      <input type="color" style="width: 250px" v-model="borderColor">
      <input type="range" style="width: 250px" min="0" max="360" step="1" v-model="computedCubeCameraX">
      <input type="number" style="width: 35px" v-model="computedCubeCameraX"/>
      <input type="range" style="width: 250px" min="0" max="360" step="1" v-model="cubeAnimationArray[1]">
      <input type="number" style="width: 35px" v-model="cubeAnimationArray[1]"/>
      <input type="range" style="width: 250px" min="0" max="360" step="1" v-model="cubeAnimationArray[2]">
      <input type="number" style="width: 35px" v-model="cubeAnimationArray[2]"/>
      <br>

    </div>
    <div id="cube-test-wrapper" class="cube-test-wrapper">
<!--    <div class="hundred-cube-test" v-bind:style="{height: hundredCubesContainerHeightWidth + 'px', width: hundredCubesContainerHeightWidth + 'px', perspective: randomPerspective + 'px',-->
<!--                                                  transformStyle: 'preserve-3d',-->
<!--                                                  transition: transitionTime + 's ease'}" >-->
<!--      <div v-for="(cube, index) in hundredCubes" :key="index" v-bind:style="{transform: `rotateX(${cameraArray[0]}deg) rotateY(${cameraArray[1]}deg) rotateZ(${cameraArray[2]}deg)`,transition: transitionTime + 's ease'}">-->
<!--        <Cube :width="hundredCubesHeight" :height="hundredCubesWidth"  :zIndex="index"-->
<!--              :perspective="3000" :borderColor="'rgb(66,11,117)'" :cubeColor="'purple'"-->
<!--              :cameraArray="cubeAnimationArray" :transitionTime="transitionTime"></Cube>-->
<!--      </div>-->
<!--    </div>-->
      <div class="hundred-cube-container" v-bind:style="{height: hundredCubesContainerHeightWidth*1.5 + 'px', width: hundredCubesContainerHeightWidth*1.5 + 'px',transformStyle: 'preserve-3d', transition: transitionTime + 's ease'}" >
        <div v-for="(number, index) in cubeOfCubesStartArray" :key="index" v-bind:style="{transform: `rotateX(${cameraArray[0]}deg) rotateY(${cameraArray[1]}deg) rotateZ(${cameraArray[2]}deg)`, transformStyle: 'preserve-3d',transition: transitionTime + 's ease'}">
          <div class="hundred-cube-test" v-bind:style="{height: hundredCubesContainerHeightWidth + 'px', width: hundredCubesContainerHeightWidth + 'px',transform: `translateZ(-${(hundredCubesWidth*index+1)*zTranslate/2}px)`, transition: transitionTime + 's ease', position: 'absolute'}" >
            <div v-for="(cube,index) in cubeOfCubes"  v-bind:style="{}" :key="index">
                <Cube :width="hundredCubesWidth" :height="hundredCubesWidth"  :zIndex="index" class="cube"
                      :borderColor="borderColor" :cubeColor="'purple'" :gradient="`linear-gradient(${computedGradientPercentage-(index)*5}deg, ${gradientColor1} ${gradientColor1Percentage}%, ${gradientColor2} ${gradientColor2Percentage}%, ${gradientColor1} ${gradientColor1Percentage}%, ${gradientColor2} ${gradientColor2Percentage}%)`"
                      :cameraArray="cubeAnimationArray"  :xStagger="(hundredCubesWidth*index/2)*xTranslate" :opacity="opacity" :yStagger="(hundredCubesWidth*index/2)*yTranslate" :transitionTime="transitionTime"></Cube>
            </div>
          </div>
        </div>
        <div class="cube-info-container">
          <h2 @click="moveTitlePageOver()" id="title-text">vue3Dcss</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {gsap} from "gsap";
  import Cube from "./components/Cube";
  import CameraContainer from "./components/CameraContainer";
  import VueMixinTween from 'vue-mixin-tween'
  import Vue from 'vue'

export default {
  name: 'App',
  components:{
    Cube,
    CameraContainer
  },
  data(){
    return{
      randomNumber: Math.floor(Math.random() * Math.floor(500)),
      randomPerspective: Math.random() * (6000 - 600) + 600,
      hundredCubes: [],
      hundredCubesHeight: 75,
      hundredCubesWidth: 75,
      textCubeWidth: 10,
      cubeAnimationArray: [0,0,0],
      transitionTime: 1,
      cameraArray: [0,0,45],
      cubeCameraX: 0,
      cubeCameraY: 0,
      cubeCameraZ: 0,
      cubeOfCubes:[],
      cubeOfCubesStartArray: [1],
      zTranslate: 9,
      yTranslate: 0,
      xTranslate: 0,
      opacity: 0,
      cubeLayer: 3,
      cubeLayerCount: 0,
      hundredCubesContainerHeightWidth: 0,
      gradientColor1: '#000000',
      gradientColor2: '#FFFFFF',
      gradientColor1Percentage: 0,
      gradientColor2Percentage: 10,
      gradientColorAngle: 45,
      borderColor: 'rgba(0,0,0,1)',
      tweenedGradient: 45,
      tweenedCubeCameraX: 0,
      tweenedCubeCameraY: 0,
      tweenedCubeCameraZ: 0,
      textArray: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  1,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,0,0,
                  1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,0,
                  1,0,0,0,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,
                  1,0,0,0,1,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,
                  0,0,0,0,0,1,1,0,0,1,1,1,0,1,0,1,0,0,0,0,
                  0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,
                  0,0,0,0,0,1,0,1,0,1,1,1,0,0,1,0,0,0,0,0,
                  0,0,0,0,0,1,1,0,0,1,0,1,0,0,1,0,0,0,0,0]
    }
  },
  methods:{
    backToTitle(){
      let tl = gsap.timeline
      tl.to('#second-page-wrapper', {duration: 1, opacity: 0, x: -500})
      tl.fromTo('#cube-test-wrapper', {opacity: 0, x:500},{duration: 1, opacity: 1, x: 0}, "<0.5")
    },
    moveTitlePageOver(){
      let tl = gsap.timeline
      tl.to('#cube-test-wrapper', {duration: 1, opacity: 0, x: -500})
      tl.fromTo('#second-page-wrapper', {opacity: 0, x:500},{duration: 1, opacity: 1, x: 0}, "<0.5")
    },
    addCube(){
      this.cubeLayer = this.cubeLayer + 1;
    },
    addCubeLayer(){
      this.cubeOfCubesStartArray.push(this.cubeOfCubesStartArray[this.cubeLayerCount] + 1);
    },
    deleteCube(){
      if(this.cubeLayer === 1) return;
      this.cubeLayer = this.cubeLayer - 1;
    },
    deleteCubeLayer(){
      if(this.cubeLayer === 1) return;
      this.cubeOfCubesStartArray.pop();
    }
  },
  watch:{
    cubeLayer(){
      this.cubeOfCubes = [];
      this.hundredCubesContainerHeightWidth = this.hundredCubesWidth*this.cubeLayer;
      console.log(this.hundredCubesContainerHeightWidth)
      for(let i = 0; i < (this.cubeLayer*this.cubeLayer); i++){
        this.cubeOfCubes.push(i);
        console.log(this.cubeOfCubes);
      }
    },
    gradientColorAngle(newVal){
      gsap.to(this.$data, { duration: this.transitionTime, tweenedGradient: newVal });
    },
    cubeCameraX(newVal){
      gsap.to(this.$data, { duration: this.transitionTime, tweenedCubeCameraX: newVal });
    },
    // cubeCameraY(newVal){
    //   gsap.to(this.$data, { duration: this.transitionTime, tweenedCubeCameraY: newVal });
    // },
    // cubeCameraZ(newVal){
    //   gsap.to(this.$data, { duration: this.transitionTime, tweenedCubeCameraZ: newVal });
    // }
  },
  computed:{
    // hundredCubesContainerHeightWidth(){
    //   return (this.hundredCubesWidth*this.cubeLayer);
    // },
    computedGradientPercentage(){
      return this.tweenedGradient.toFixed();
    },
    computedCubeCameraX(){
      return this.tweenedCubeCameraX.toFixed();
    },
    computedCubeCameraY(){
      return this.tweenedCubeCameraY.toFixed();
    },
    computedCubeCameraZ(){
      return this.tweenedCubeCameraZ.toFixed();
    },
  },
  created(){
    for(let i = 0; i < (this.cubeLayer*this.cubeLayer); i++){
      this.cubeOfCubes.push(i);
      console.log(this.cubeOfCubes);
    }
    this.hundredCubesContainerHeightWidth = this.hundredCubesWidth*this.cubeLayer
  },
  mounted(){
    // let myFunc = () => {
    //   console.log('happening')
    //   let x = 360;
    //   let y = 360;
    //   this.cubeAnimationArray = [x,y,0]
    //   setTimeout(()=>{
    //     this.cubeAnimationArray = [0,0,0];
    //     setTimeout(()=>{
    //       myFunc();
    //     }, ((this.transitionTime*1000)/2))
    //   }, ((this.transitionTime*1000))/2)
    // }
    // this.$nextTick(() => myFunc())
    setInterval(()=>{
      this.gradientColorAngle = this.gradientColorAngle + 1
    },this.transitionTime*5)
    setInterval(()=>{
      Vue.set(this.cubeAnimationArray, 0, this.cubeAnimationArray[0] + 45)
      Vue.set(this.cubeAnimationArray, 1, this.cubeAnimationArray[1] - 45)
      // Vue.set(this.cubeAnimationArray, 2, this.cubeAnimationArray[2] + 180)
      console.log(this.cubeAnimationArray);
    }, this.transitionTime*5000)
    setTimeout(()=>{
      this.opacity = 85;
    },((this.transitionTime*5000))/2 )
    setTimeout(()=>{
      this.yTranslate = 0.25;
    },((this.transitionTime*5000)/2))
    this.$nextTick(()=>{ gsap.fromTo('#title-text', { y: 50, opacity: 0},{duration: 1, y: 0, opacity: 1, delay: this.transitionTime+1})})
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.hundred-cube-test{
  display: flex;
  flex-flow: row wrap;
  perspective: 3000px;
  justify-content: center;
  align-items: center;
  transform-origin: top;
}
  .hundred-cube-container{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }
.cube-test-wrapper{

}
.cube-info-container{
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 25%;
  height: 100%;
  transform: translateY(25%);
}

.cube:hover{
  opacity: 10%;
  transform: scale(1.15);
}

  .camera-controls{
    position: absolute;
    top: 0;
    left: 2%;
    display: flex;
    flex-flow: row wrap;
    width: 20vw;
    height: 20vh;
  }
  button{
    width: 7.5vw;
    height: 3.5vh;
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

  h2{
    opacity: 0;
    cursor: pointer;
    transition: 1s ease;
  }
  h2#title-text:hover{
    opacity: 50% !important;
    transform: scale(1.025) !important;
  }

  input[type='range']::-webkit-slider-runnable-track {
    height: 25px;
    -webkit-appearance: none;
    color: #022732;
    margin-top: -1px;
  }

  input[type='range']::-webkit-slider-thumb {
    margin-top: 3px;
    width: 30px;
    -webkit-appearance: none;
    height: 18px;
    border-radius: 15%;
    background: linear-gradient(135deg, #002132 50%, #04293e 50%);
  }
</style>
