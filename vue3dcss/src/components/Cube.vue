<template>
    <div v-bind:style="cuberContainer" class="cube-wrapper">
      <div class="camera-controls" v-if="showCamera">
        <input type="range" style="width: 150px" min="500" max="6000" step="10" v-model="perspective">-->
        <input type="number" style="width: 25px" v-model="perspective"/>
        <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)" class="icon icon-tabler icon-tabler-zoom-in" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <circle cx="10" cy="10" r="7" />
          <line x1="7" y1="10" x2="13" y2="10" />
          <line x1="10" y1="7" x2="10" y2="13" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
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
        <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(4px)" class="icon icon-tabler icon-tabler-clock" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 15" />
        </svg>
        <br>
      </div>
      <div class="cube" v-bind:style="cube" >
        <div class="front-face" v-bind:style="frontFace"></div>
        <div class="back-face" v-bind:style="backFace"> </div>
        <div class="left-face" v-bind:style="leftFace"></div>
        <div class="right-face" v-bind:style="rightFace"></div>
        <div class="bottom-face" v-bind:style="bottomFace"></div>
        <div class="top-face" v-bind:style="topFace"></div>
      </div>
    </div>
</template>
<script>
    export default {
        name: "Cube",
        data(){
          return{

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
             return [-30,-60,0]
            }
          },
          showCamera:{
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
              transform: `rotateX(${this.cameraArray[0]}deg) rotateY(${this.cameraArray[1]}deg) rotateZ(${this.cameraArray[2]}deg)`,
              transition: this.transitionTime*5 + 's linear',
            }
          },
          cuberContainer(){
            return{
              width: this.width + 'px',
              height: this.height + 'px',
              position: 'relative',
              perspective: this.perspective + 'px',
              transition: this.transitionTime*5 + 's ease',
              zIndex: this.zIndex,
              transform: `translateZ(${this.zStagger}px) translateY(${this.yStagger}px) translateX(${this.xStagger}px)`

            }
          },
          frontFace(){
            return{
              width: this.width + 'px',
              height: this.height + 'px',
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
          }
        },
        mounted(){
          console.log('ive been created!', this.zIndex);
        }
    }
</script>
<style scoped>
  *{
    margin: 0;
  }


  .camera-controls{
    position: absolute;
    top: -200px;
    left: -200px;
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
</style>
