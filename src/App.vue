<template>
  <div id="app">
    <div class="camera-controls">
      <button @click="addCubeLayer">Add Layer ({{cubeOfCubesStartArray.length}})</button>
      <button @click="addCube">Add Cubes ({{cubeLayer}})</button>
      <button @click="deleteCubeLayer">Remove Layer</button>
      <button @click="deleteCube">Remove Cubes</button>
      <input type="range" style="width: 250px" min="500" max="6000" step="10" v-model="randomPerspective">
      <input type="number" style="width: 60px" v-model="randomPerspective"/>
      <input type="range" style="width: 250px" min="0" max="2" step="1" v-model="transitionTime">
      <input type="number" style="width: 60px" v-model="transitionTime"/>
      <span v-text="'s'"></span>
      <input type="range" style="width: 250px" min="0" max="2" step="0.25" v-model="zTranslate">
      <input type="number" style="width: 60px" v-model="zTranslate"/>
      <input type="range" style="width: 250px" min="0" max="2" step="0.25" v-model="xTranslate">
      <input type="number" style="width: 60px" v-model="xTranslate"/>
      <input type="range" style="width: 250px" min="0" max="2" step="0.25" v-model="yTranslate">
      <input type="number" style="width: 60px" v-model="yTranslate"/>
      <input type="range" style="width: 250px" min="0" max="100" step="1" v-model="hundredCubesWidth">
      <input type="number" style="width: 60px" v-model="hundredCubesWidth"/>
      <input type="range" style="width: 250px" min="0" max="100" step="1" v-model="opacity">
      <input type="number" style="width: 60px" v-model="opacity"/>
      <input type="color" style="width: 250px" v-model="gradientColor1">
      <input type="range" style="width: 250px" min="0" max="100" step="1" v-model="gradientColor1Percentage">
      <input type="number" style="width: 60px" v-model="gradientColor1Percentage"/>
      <input type="color" style="width: 250px" v-model="gradientColor2">
      <input type="range" style="width: 250px" min="0" max="100" step="1" v-model="gradientColor2Percentage">
      <input type="number" style="width: 60px" v-model="gradientColor2Percentage"/>
      <input type="range" style="width: 250px" min="0" max="360" step="1" v-model="gradientColorAngle">
      <input type="number" style="width: 60px" v-model="gradientColorAngle"/>
      <input type="range" style="width: 250px" min="0" max="10" step="1" v-model="gradientVariable">
      <input type="number" style="width: 60px" v-model="gradientVariable"/>
      <input type="color" style="width: 250px" v-model="borderColor">
      <input type="range" style="width: 250px" min="0" max="360" step="1" v-model="computedCubeCameraX">
      <input type="number" style="width: 60px" v-model="computedCubeCameraX"/>
      <input type="range" style="width: 250px" min="0" max="360" step="1" v-model="cubeAnimationArray[1]">
      <input type="number" style="width: 60px" v-model="cubeAnimationArray[1]"/>
      <input type="range" style="width: 250px" min="0" max="360" step="1" v-model="cubeAnimationArray[2]">
      <input type="number" style="width: 60px" v-model="cubeAnimationArray[2]"/>
      <input type="range" style="width: 250px" min="0" max="10" step="0.25" v-model="rectangleSize">
      <input type="number" style="width: 60px" v-model="rectangleSize"/>
      <input type="range" style="width: 250px" min="-1000" max="1000" step="1" v-model="lightX">
      <input type="number" style="width: 60px" v-model="computedLightX"/>
      <input type="range" style="width: 250px" min="-1000" max="1000" step="1" v-model="lightY">
      <input type="number" style="width: 60px" v-model="computedLightY"/>
      <input type="range" style="width: 250px" min="-1000" max="1000" step="1" v-model="lightZ">
      <input type="number" style="width: 60px" v-model="computedLightZ"/>
      <input type="range" style="width: 250px" min="0" max="3" step="0.05" v-model="lightPower">
      <input type="number" style="width: 60px" v-model="lightPower"/>
      <br>

    </div>
    <div id="cube-test-wrapper" class="cube-test-wrapper">
<!--      <MultiCube :width="50" :height="50" :showControls="true" :opacity="opacity" :zStagger="zTranslate*50" :xStagger="xTranslate*50" :yStagger="yTranslate*50"  :cameraArray="cubeAnimationArray" :transitionTime="transitionTime" :numberOfCubes="9"-->
<!--                 :borderColor="borderColor" :gradient="`linear-gradient(${computedGradientPercentage*gradientVariable}deg, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%)`"-->
<!--      ></MultiCube>-->
      <div class="cube-info-container">
        <h2 @click="moveTitlePageOver()" id="title-text">vue3Dcss</h2>
      </div>
<!--      <Rectangle :transitionTime="transitionTime" :gradient="`linear-gradient(${computedGradientPercentage*gradientVariable}deg, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%)`"-->
<!--                 :opacity="opacity" :borderColor="borderColor" :size="rectangleSize" :cameraArray="cubeAnimationArray">-->
<!--      </Rectangle>-->
<!--      <Rectangle :transitionTime="transitionTime"-->
<!--        :gradient="`linear-gradient(${computedGradientPercentage*gradientVariable}deg, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%)`"-->
<!--        :showControls="true" :cameraArray="cubeAnimationArray" :cubeColor="'white'" :opacity="opacity" rectangleType="rail" :borderColor="borderColor" :size="rectangleSize">-->
<!--      </Rectangle>-->
<!--      <div class="rectangle-cube-test" v-bind:style="{display:'flex', flexFlow: 'column', height: (50+50)+(0.25*1000) + 'px', width: 50 + 'px'}">-->
<!--&lt;!&ndash;        <Cube :gradient="`linear-gradient(${computedGradientPercentage*gradientVariable}deg, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%)`"&ndash;&gt;-->
<!--&lt;!&ndash;          :transitionTime="transitionTime" :width="50" :height="50" :opacity="opacity" :cameraArray="cubeAnimationArray">&ndash;&gt;-->
<!--&lt;!&ndash;        </Cube>&ndash;&gt;-->
<!--        <Rectangle-->
<!--          :gradient="`linear-gradient(${computedGradientPercentage*gradientVariable}deg, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%)`"-->
<!--          :transitionTime="transitionTime" :cubeColor="gradientColor2" v-bind:style="{transformOrigin: '8% 77%', transform: 'rotate(90deg)'}" :rectangleType="'rail'" :size="0.25" :cameraArray="cubeAnimationArray" :borderColor="borderColor" :opacity="opacity"></Rectangle>-->
<!--&lt;!&ndash;        <Cube&ndash;&gt;-->
<!--&lt;!&ndash;          :gradient="`linear-gradient(${computedGradientPercentage*gradientVariable}deg, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%, ${gradientColor1} ${computedGradientPercentageOne}%, ${gradientColor2} ${computedGradientPercentageTwo}%)`"&ndash;&gt;-->
<!--&lt;!&ndash;          :transitionTime="transitionTime"  v-bind:style="{transform: `translateY(${(0.25*1000) - 25}px)`}" :width="50" :height="50" :opacity="opacity" :cameraArray="cubeAnimationArray">&ndash;&gt;-->
<!--&lt;!&ndash;        </Cube>&ndash;&gt;-->
<!--      </div>-->
      <ShadedCube :cameraArray="cubeAnimationArray" :borderColor="borderColor" :height="hundredCubesWidth" :width="hundredCubesWidth" :lightX="parseFloat(computedLightX)" :lightY="parseFloat(computedLightY)" :lightZ="parseFloat(computedLightZ)"
                  :opacity="opacity" :showControls="true" :cubeColor="gradientColor1" :lightPower="parseFloat(lightPower)" :transitionTime="transitionTime" :translateX="-400" :translateY="50"></ShadedCube>
      <ShadedCube :cameraArray="[cubeAnimationArray[0]*-1,cubeAnimationArray[1]*-1,cubeAnimationArray[2]*-1]" :borderColor="borderColor" :translateY="50" :height="hundredCubesWidth"
                  :width="hundredCubesWidth" :translateX="400" :lightX="parseFloat(computedLightX)*-1" :lightY="parseFloat(computedLightY)*-1" :lightZ="parseFloat(computedLightZ)*-1"
                  :opacity="opacity" :showControls="true" :cubeColor="gradientColor1" :lightPower="parseFloat(lightPower)" :transitionTime="transitionTime"></ShadedCube>
    </div>
  </div>
</template>

<script>
  import {gsap} from "gsap";
  import Cube from "./components/Cube";
  import CameraContainer from "./components/CameraContainer";
  import VueMixinTween from 'vue-mixin-tween'
  import Vue from 'vue'
  import MultiCube from "./components/MultiCube";
  import Rectangle from "./components/Rectangle";
  import ShadedCube from "./components/ShadedCube";
  export default {
    name: 'App',
    components:{
      Cube,
      CameraContainer,
      MultiCube,
      Rectangle,
      ShadedCube,
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
        transitionTime: 5,
        cameraArray: [0,0,45],
        cubeCameraX: 0,
        cubeCameraY: 0,
        cubeCameraZ: 0,
        cubeOfCubes:[],
        cubeOfCubesStartArray: [1],
        zTranslate: 0.5,
        yTranslate: 0.5,
        xTranslate: 1.25,
        opacity: 0,
        cubeLayer: 3,
        cubeLayerCount: 0,
        gradientVariable: 3,
        hundredCubesContainerHeightWidth: 0,
        gradientColor1: '#44515e',
        gradientColor2: '#FFFFFF',
        gradientColor1Percentage: 0,
        gradientColor2Percentage: 10,
        gradientColorAngle: 45,
        borderColor: 'rgba(0,0,0,1)',
        lightX: -100,
        lightY: -200,
        lightZ: 200,
        tweenedGradient: 45,
        tweenedGradientOne: 0,
        tweenedGradientTwo: 10,
        tweenedCubeCameraX: 0,
        tweenedCubeCameraY: 0,
        tweenedCubeCameraZ: 0,
        rectangleSize: 0,
        tweenedLightX: -100,
        tweenedLightY: -200,
        tweenedLightZ: 200,
        lightPower: 1,
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
      lightX(newVal){
        gsap.to(this.$data, { duration: this.transitionTime, tweenedLightX: newVal, ease: Linear.easeNone });
      },
      lightY(newVal){
        gsap.to(this.$data, { duration: this.transitionTime, tweenedLightY: newVal, ease: Linear.easeNone  });
      },
      lightZ(newVal){
        gsap.to(this.$data, { duration: this.transitionTime, tweenedLightZ: newVal, ease: Linear.easeNone  });
      },
      gradientColor1Percentage(newVal){
        gsap.to(this.$data, { duration: this.transitionTime, tweenedGradientOne: newVal });
      },
      gradientColor2Percentage(newVal){
        gsap.to(this.$data, { duration: this.transitionTime, tweenedGradientTwo: newVal });
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
      computedGradientPercentageOne(){
        return this.tweenedGradientOne.toFixed();
      },
      computedGradientPercentageTwo(){
        return this.tweenedGradientTwo.toFixed();
      },
      computedLightX(){
        return this.tweenedLightX.toFixed();
      },
      computedLightY(){
        return this.tweenedLightY.toFixed();
      },
      computedLightZ(){
        return this.tweenedLightZ.toFixed();
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
      // setInterval(()=>{
      //   this.gradientColorAngle = this.gradientColorAngle + 1;
      // },this.transitionTime)
      setInterval(()=>{
        Vue.set(this.cubeAnimationArray, 0, this.cubeAnimationArray[0] - 45)
        Vue.set(this.cubeAnimationArray, 1, this.cubeAnimationArray[1] - 90)
        if(this.lightX > this.hundredCubesWidth*2) {
          this.lightX = this.lightX*-1;
        }
        if(this.lightY > this.hundredCubesWidth*2) {
          this.lightY = this.lightY*-1
        }
        this.lightX = this.lightX + 100;
        this.lightY = this.lightY + 100;
        // Vue.set(this.cubeAnimationArray, 2, this.cubeAnimationArray[2] + 90)
        // Vue.set(this.cubeAnimationArray, 2, this.cubeAnimationArray[2] + 180)
        console.log(this.cubeAnimationArray);
      }, this.transitionTime*1000)
      setTimeout(()=>{
        this.rectangleSize = 0.25;
        this.opacity = 99;
      },((this.transitionTime*1000)))
      setTimeout(()=>{
        this.yTranslate = 0.25;
      },((this.transitionTime*1000)/2))
      this.$nextTick(()=>{ gsap.fromTo('#title-text', { y: 0, x: 50, opacity: 0},{duration: 1, y: -25, opacity: 1, delay: this.transitionTime})})
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
    overflow:hidden;
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
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }
  .cube-info-container{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    width: 25%;
    height: 100%;
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
    transform: scale(1.025) translateX(50)!important;
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
