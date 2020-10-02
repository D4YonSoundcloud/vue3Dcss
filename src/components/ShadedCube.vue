<template>
  <div :class="'cube-wrapper'" :id="'scene'+id" v-bind:style="cuberContainer">
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
    <div :class="'test-cube'" v-bind:style="rotateCubeAnimation ? cubeAnimation : cube" id="test-cube" >
      <div class="face" id="face-one" v-bind:style="faceOne">1</div>
      <div class="face" id="face-two" v-bind:style="faceTwo" >2</div>
      <div class="face" id="face-three" v-bind:style="faceThree">3</div>
      <div class="face" id="face-four" v-bind:style="faceFour">4</div>
      <div class="face" id="face-five" v-bind:style="faceFive">5</div>
      <div class="face" id="face-six" v-bind:style="faceSix">6</div>
    </div>
    <div class="light" :id="'light'+id" v-bind:style="light"></div>
  </div>
</template>
<script>
  let Vect3 = {
    create: function(x, y, z) {
      return {x: x || 0, y: y || 0, z: z || 0};
    },
    add: function(v1, v2) {
      return {x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z};
    },
    sub: function(v1, v2) {
      return {x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z};
    },
    mul: function(v1, v2) {
      return {x: v1.x * v2.x, y: v1.y * v2.y, z: v1.z * v2.z};
    },
    div: function(v1, v2) {
      return {x: v1.x / v2.x, y: v1.y / v2.y, z: v1.z / v2.z};
    },
    muls: function(v, s) {
      return {x: v.x * s, y: v.y * s, z: v.z * s};
    },
    divs: function(v, s) {
      return {x: v.x / s, y: v.y / s, z: v.z / s};
    },
    len: function(v) {
      return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    },
    dot: function(v1, v2) {
      return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
    },
    cross: function(v1, v2) {
      return {x: v1.y * v2.z - v1.z * v2.y, y: v1.z * v2.x - v1.x * v2.z, z: v1.x * v2.y - v1.y * v2.x};
    },
    normalize: function(v) {
      return Vect3.divs(v, Vect3.len(v));
    },
    ang: function(v1, v2) {
      return Math.acos(Vect3.dot(v1, v2) / (Vect3.len(v1) * Vect3.len(v2)));
    },
    copy: function(v) {
      return {x: v.x, y: v.y, z: v.z};
    },
    equal: function(v1,v2) {
      return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
    },
    rotate: function(v1, v2) {
      var x1 = v1.x,
        y1 = v1.y,
        z1 = v1.z,
        angleX = v2.x / 2,
        angleY = v2.y / 2,
        angleZ = v2.z / 2,

        cr = Math.cos(angleX),
        cp = Math.cos(angleY),
        cy = Math.cos(angleZ),
        sr = Math.sin(angleX),
        sp = Math.sin(angleY),
        sy = Math.sin(angleZ),

        w = cr * cp * cy + -sr * sp * sy,
        x = sr * cp * cy - -cr * sp * sy,
        y = cr * sp * cy + sr * cp * -sy,
        z = cr * cp * sy - -sr * sp * cy,

        m0 = 1 - 2 * ( y * y + z * z ),
        m1 = 2 * (x * y + z * w),
        m2 = 2 * (x * z - y * w),

        m4 = 2 * ( x * y - z * w ),
        m5 = 1 - 2 * ( x * x + z * z ),
        m6 = 2 * (z * y + x * w ),

        m8 = 2 * ( x * z + y * w ),
        m9 = 2 * ( y * z - x * w ),
        m10 = 1 - 2 * ( x * x + y * y );

      return {
        x: x1 * m0 + y1 * m4 + z1 * m8,
        y: x1 * m1 + y1 * m5 + z1 * m9,
        z: x1 * m2 + y1 * m6 + z1 * m10
      };
    }
  };
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = parseFloat('0.' + Math.random().toString().replace('0.', '') + new Date().getTime()) * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  window.performance =
    window.performance ||
    { now: function() { return +new Date(); } };

  export default {
    name: "ShadedCube",
    data(){
      return{
        translateZ: 0,
        showMarkers: false,
        manualTranslate: false,
        id: uuidv4(),

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
        default: '#013249'
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
      translateX:{
        type: Number,
        default: 0
      },
      translateY:{
        type: Number,
        default: 0
      },
      lightX:{
        type: Number,
        default: 100
      },
      lightY:{
        type: Number,
        default: 200
      },
      lightZ:{
        type: Number,
        default: 150
      },
      lightPower:{
        type:Number,
        default: 1
      },
      opacity:{
        type: Number,
        default: 100,
      },
      gradient:{
        type: String,
      },
      rotateCubeAnimation: {
        type: Boolean,
        default: false,
      }
    },
    watch:{
      lightX(){
        console.log(this.lightX);
      },
      lightY(){
        console.log(this.lightY);
      },
      lightZ(){
        console.log(this.lightZ);
      }
    },
    methods:{
      getTransformData(element){
        let computedStyle = getComputedStyle(element, null),
          val = computedStyle.transform,
          matrix = this.parseMatrix(val),
          rotateY = Math.asin(-matrix.m13),
          rotateX,
          rotateZ;

        rotateX = Math.atan2(matrix.m23, matrix.m33);
        rotateZ = Math.atan2(matrix.m12, matrix.m11);

        return {
          transformStyle: val,
          matrix: matrix,
          rotate: {
            x: rotateX,
            y: rotateY,
            z: rotateZ
          },
          translate: {
            x: matrix.m41,
            y: matrix.m42,
            z: matrix.m43
          }
        };
      },
      getVertexData(element){
        let w = Math.round(element.offsetWidth/2) //width of the element
        let h = Math.round(element.offsetHeight/2) //height of the element
        let vertexData = {
          a:{x: -w, y: -h, z:0}, //find location of top left corner of face
          b:{x: w, y: -h, z: 0}, //find location of top right corner of face
          c:{x: w, y: h, z: 0}, //find location of bottom right corner of face
          d:{x: -w, y: h, z: 0}, //find location of bottom left corner of face
        }
        let transformVertex;
        while (element.nodeType === 1) {
          transformVertex = this.getTransformData(element);
          vertexData.a = this.addVectors(this.rotateVector(vertexData.a, transformVertex.rotate), transformVertex.translate);
          vertexData.b = this.addVectors(this.rotateVector(vertexData.b, transformVertex.rotate), transformVertex.translate);
          vertexData.c = this.addVectors(this.rotateVector(vertexData.c, transformVertex.rotate), transformVertex.translate);
          vertexData.d = this.addVectors(this.rotateVector(vertexData.d, transformVertex.rotate), transformVertex.translate);
          element = element.parentNode;
        }
        return vertexData
      },
      parseMatrix(matrixString) {
        let c = matrixString.split(/\s*[(),]\s*/).slice(1,-1),
          matrix;

        if (c.length === 6) {
          // 'matrix()' (3x2)
          matrix = {
            m11: +c[0], m21: +c[2], m31: 0, m41: +c[4],
            m12: +c[1], m22: +c[3], m32: 0, m42: +c[5],
            m13: 0,     m23: 0,     m33: 1, m43: 0,
            m14: 0,     m24: 0,     m34: 0, m44: 1
          };
        } else if (c.length === 16) {
          // matrix3d() (4x4)
          matrix = {
            m11: +c[0], m21: +c[4], m31: +c[8], m41: +c[12],
            m12: +c[1], m22: +c[5], m32: +c[9], m42: +c[13],
            m13: +c[2], m23: +c[6], m33: +c[10], m43: +c[14],
            m14: +c[3], m24: +c[7], m34: +c[11], m44: +c[15]
          };

        } else {
          // handle 'none' or invalid values.
          matrix = {
            m11: 1, m21: 0, m31: 0, m41: 0,
            m12: 0, m22: 1, m32: 0, m42: 0,
            m13: 0, m23: 0, m33: 1, m43: 0,
            m14: 0, m24: 0, m34: 0, m44: 1
          };
        }
        return matrix;
      },
      //adds two vectors together
      addVectors (v1, v2) {
        return {
          x: v1.x + v2.x,
          y: v1.y + v2.y,
          z: v1.z + v2.z
        };
      },
      rotateVector(v1, v2){
        let x1 = v1.x,
        y1 = v1.y,
        z1 = v1.z,
        angleX = v2.x / 2,
        angleY = v2.y / 2,
        angleZ = v2.z / 2,

        cr = Math.cos(angleX),
        cp = Math.cos(angleY),
        cy = Math.cos(angleZ),
        sr = Math.sin(angleX),
        sp = Math.sin(angleY),
        sy = Math.sin(angleZ),

        w = cr * cp * cy + -sr * sp * -sy,
        x = sr * cp * cy - -cr * sp * -sy,
        y = cr * sp * cy + sr * cp * sy,
        z = cr * cp * sy - -sr * sp * -cy,

        m0 = 1 - 2 * ( y * y + z * z ),
        m1 = 2 * (x * y + z * w),
        m2 = 2 * (x * z - y * w),

        m4 = 2 * ( x * y - z * w ),
        m5 = 1 - 2 * ( x * x + z * z ),
        m6 = 2 * (z * y + x * w ),

        m8 = 2 * ( x * z + y * w ),
        m9 = 2 * ( y * z - x * w ),
        m10 = 1 - 2 * ( x * x + y * y );

      return {
        x: x1 * m0 + y1 * m4 + z1 * m8,
        y: x1 * m1 + y1 * m5 + z1 * m9,
        z: x1 * m2 + y1 * m6 + z1 * m10
      };
      },

      //left over function of debugging vertex points
      renderVertex (id, face, vertex) {
        var id = "_vertex_" + id,
          vertexElem = face[id],
          x = vertex.x.toFixed(2),
          y = vertex.y.toFixed(2),
          z = vertex.z.toFixed(2),
          s = 1 - vertex.z / 400; // scale to keep the text readable

        if (!vertexElem) {
          vertexElem = face[id] = document.createElement("div");
          vertexElem.className = "vertex";
          document.getElementById("scene").appendChild(vertexElem);
        }

        // show the vertex coordinates
        vertexElem.textContent = "x:" + x + " y:" + y + " z:" + z;

        // apply the translation to the vertex
        vertexElem.style.cssText =
          "-webkit-transform: translate3d(" + x + "px," + y + "px," + z + "px) scale(" + s + ");" +
          "-moz-transform: translate3d(" + x + "px," + y + "px," + z + "px) scale(" + s + ");" +
          "-ms-transform: translate3d(" + x + "px," + y + "px," + z + "px) scale(" + s + ");" +
          "transform: translate3d(" + x + "px," + y + "px," + z + "px) scale(" + s + ");" + "font-size: 10px";
      }
    },
    computed:{
      cube(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'absolute',
          top: 50 + '%',
          left: 50 + '%',
          backgroundColor: 'transparent',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${this.cameraArray[0]}deg) rotateY(${this.cameraArray[1]}deg) rotateZ(${this.cameraArray[2]}deg)` + `translateZ(${this.translateZ}px) translateY(${this.translateY}px) translateX(${this.translateX}px)`,
          transition: this.transitionTime + 's linear',
        }
      },
      cubeAnimation(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'absolute',
          top: 50 + '%',
          left: 50 + '%',
          backgroundColor: 'transparent',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${this.cameraArray[0]}deg) rotateY(${this.cameraArray[1]}deg) rotateZ(${this.cameraArray[2]}deg)` + `translateZ(${this.translateZ}px) translateY(${this.translateY}px) translateX(${this.translateX}px)`,
          animation: 'spin 20s linear infinite',
        }
      },
      cuberContainer(){
        return{
          position: 'absolute',
          top: 50 + '%',
          left: 50 + '%',
          perspective: this.perspective + 'px',
          transition: this.transitionTime + 's linear',
          opacity: this.opacity + '%',
          zIndex: this.zIndex,
          transformStyle: 'preserve-3d',
          transform: `translateZ(${this.zStagger}px) translateY(${this.yStagger}px) translateX(${this.xStagger}px)`
        }
      },
      faceOne(){
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundColor: this.cubeColor,
          margin: `-${this.height/2}px -${this.width/2}px`,
          border: 'none',
          position: 'absolute',
          transform: `translateZ(${this.width/2}px)`,
          transition: this.transitionTime + 's linear',
          opacity: this.opacity + '%',
        }
      },
      faceTwo(){
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundColor: this.cubeColor,
          margin: `-${this.height/2}px -${this.width/2}px`,
          border: 'none',
          position: 'absolute',
          transform: `translateZ(-${this.width/2}px) rotateY(180deg)`,
          transition: this.transitionTime + 's linear',
          opacity: this.opacity + '%',
        }
      },
      faceThree(){
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundColor: this.cubeColor,
          margin: `-${this.height/2}px -${this.width/2}px`,
          border: 'none',
          position: 'absolute',
          transform: `translateX(-${this.width/2}px) rotateY(-90deg)`,
          transition: this.transitionTime + 's linear',
          opacity: this.opacity + '%',
        }
      },
      faceFour(){
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundColor: this.cubeColor,
          margin: `-${this.height/2}px -${this.width/2}px`,
          border: 'none',
          position: 'absolute',
          transform: `translateX(${this.width/2}px) rotateY(90deg)`,
          transition: this.transitionTime + 's linear',
          opacity: this.opacity + '%',
        }
      },
      faceFive(){
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundColor: this.cubeColor,
          margin: `-${this.height/2}px -${this.width/2}px`,
          border: 'none',
          position: 'absolute',
          transform: `translateY(${this.width/2}px) rotateX(-90deg)`,
          transition: this.transitionTime + 's linear',
          opacity: this.opacity + '%',
        }
      },
      faceSix(){
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundColor: this.cubeColor,
          margin: `-${this.height/2}px -${this.width/2}px`,
          border: 'none',
          position: 'absolute',
          transform: `translateY(-${this.width/2}px) rotateX(90deg)`,
          transition: this.transitionTime + 's linear',
          opacity: this.opacity + '%',
        }
      },
      light(){
        return {
          position: 'absolute',
          top: 50 + '%',
          left: 50 + '%',
          transformStyle: 'preserve-3d',
          width: 16 + 'px',
          height:16 + 'px',
          margin:-8 + 'px',
          background:'#ff0',
          opacity: 90,
          transform: `translateZ(${this.width*2}px)`
        }
      }
    },
    mounted(){
      let scene = document.getElementById('scene'+this.id)
      console.log(scene);
      let vertexData = this.getVertexData(document.getElementById('face-one'));
      window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(f) {setTimeout(f, 1000/60);}
      // let transformProp = ["transform", "webkitTransform", "MozTransform", "msTransform"].filter(function (prop) {
      //   return prop in document.documentElement.style;
      // })[0];
      // let faces = [].slice.call(scene.querySelectorAll(".face")).map((face)=>{
      //   let vertices = this.getVertexData(face);
      //   return {
      //     vertices: vertices,
      //     normal: Vect3.normalize(Vect3.cross(Vect3.sub(vertices.b, vertices.a), Vect3.sub(vertices.c,vertices.a))),
      //     center: Vect3.divs(Vect3.sub(vertices.c, vertices.a), 2),
      //     elem: face
      //   }
      // })
      let faces = [].slice.call(document.querySelectorAll(".face"));

      let light = document.getElementById("light"+this.id);
      let nextFaceIndex = 0;
      let lightX = 100, lightY = 200;
      let angleX = 0, angleY = 0;
      let speedX = 0, speedY = 0;

      // const render = (startTime) => {
      //   let faceNormal, faceCenter, direction, amount;
      //   let sceneTransform = this.getTransformData(scene),
      //     lightTransform = this.getTransformData(light),
      //     lightPosition = Vect3.rotate(lightTransform.translate, Vect3.muls(sceneTransform.rotate, -1));
      //
      //   // while(++faceNum < faceCount && performance.now() - startTime <= 5){
      //   //   face = faces[nextFaceIndex];
      //   //   direction = Vect3.normalize(Vect3.sub(lightPosition, face.center));
      //   //   amount = 1 - Math.max(0, Vect3.dot(face.normal, direction)).toFixed(2);
      //   //   if (face.light !== amount) {
      //   //     face.light = amount
      //   //     face.elem.style.backgroundImage = "linear-gradient(rgba(0,0,0," + amount*this.lightPower + "),rgba(0,0,0," + amount*this.lightPower + "))";
      //   //     nextFaceIndex = (nextFaceIndex + 1) % faceCount;
      //   //   }
      //   // }
      //   faces.forEach(function (face) {
      //     // add the X-Wing translations to each face
      //     faceNormal = Vect3.rotate(face.normal, sceneTransform.rotate);
      //     faceCenter = Vect3.add(face.center, sceneTransform.translate);
      //     faceCenter = Vect3.rotate(faceCenter, sceneTransform.translate);
      //     direction = Vect3.normalize(Vect3.sub(lightTransform.translate, faceCenter));
      //     amount = 1 - Math.max(0, Vect3.dot(faceNormal, direction)).toFixed(2);
      //
      //     // only repaint if the light changed
      //     if (face.light != amount) {
      //       face.light = amount;
      //       face.elem.style.backgroundImage = "linear-gradient(rgba(0,0,0," + amount + "),rgba(0,0,0," + amount + "))";
      //     }
      //   });
      // }
      console.log(faces, light);
      const loop = () => {
        let lightPosition = this.getTransformData(light).translate;
        // Schedule the next render
        requestAnimationFrame(loop);
        // Light each face
        faces.forEach((face, i) => {
          let vertices = this.getVertexData(face);
          let faceCenter = Vect3.divs(Vect3.sub(vertices.c, vertices.a), 2);
          let faceNormal = Vect3.normalize(Vect3.cross(Vect3.sub(vertices.b, vertices.a), Vect3.sub(vertices.c, vertices.a)));
          let direction = Vect3.normalize(Vect3.sub(lightPosition, faceCenter));
          let amount = 1 - Math.max(0, Vect3.dot(faceNormal, direction)).toFixed(3);
          face.style.backgroundImage = "linear-gradient(rgba(0,0,0," + amount + "), rgba(0,0,0," + amount + "))";
        });
      }
      // start the loop
      loop();
      console.log(this.lightX,this.lightY,this.lightZ);
      console.log('ive been created!', this.zIndex, vertexData, scene);
    }
  }
</script>
<style scoped>
  *{
    margin: 0;
  }
  .cube-wrapper-animation{

  }
  .vertex {
    width: 9px;
    height: 9px;
    margin: -4px;
    background: rgba(255, 0, 0, .5);
    border-radius: 7px;
    color: #333;
    font: 10px / 1 "Courier New", monospace;
    text-indent: 14px;
    white-space: nowrap;
  }
  @keyframes spin {
    to {
      -webkit-transform: rotateX(360deg) rotateY(1080deg) rotateZ(720deg);
    }
  }
  .light{
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
    width:16px;
    height:16px;
    margin:-8px;
    background:#ff0;
    opacity: 90%;
  }
  .test-cube .face:nth-child(1) {
    background-color: #013249;
    width: 200px;
    height: 200px;
    margin: -100px;
  }
  .test-cube .face:nth-child(2) {
    /*-webkit-transform: translateZ(-200px) rotateY(180deg);*/
    /*-moz-transform: translateZ(-200px) rotateY(180deg);*/
    /*-ms-transform: translateZ(-200px) rotateY(180deg);*/
    /*transform: translateZ(-100px) rotateY(180deg);*/
    background-color: #00adff;
    width: 200px;
    height: 200px;
    margin: -100px;
  }
  .test-cube .face:nth-child(3) {
    /*-webkit-transform: translateX(-200px) rotateY(-90deg);*/
    /*-moz-transform: translateX(-200px) rotateY(-90deg);*/
    /*-ms-transform: translateX(-200px) rotateY(-90deg);*/
    /*transform: translateX(-100px) translateY(-100px) rotateY(-90deg);*/
    background-color: #00adff;
    width: 200px;
    height: 200px;
    margin: -100px;
  }
  .test-cube .face:nth-child(4) {
    /*transform: translateX(100px) translateY(-200px) rotateY(90deg);*/
    background-color: #00adff;
    width: 200px;
    height: 200px;
    margin: -100px;

  }
  .test-cube .face:nth-child(5) {
    /*-webkit-transform: translateY(200px) rotateX(-90deg);*/
    /*-moz-transform: translateY(200px) rotateX(-90deg);*/
    /*-ms-transform: translateY(200px) rotateX(-90deg);*/
    /*transform: translateY(-200px) rotateX(-90deg);*/
    background-color: #00adff;
    width: 200px;
    height: 200px;
    margin: -100px;
  }
  .test-cube .face:nth-child(6) {
    /*-webkit-transform: translateY(-200px) rotateX(90deg);*/
    /*-moz-transform: translateY(-200px) rotateX(90deg);*/
    /*-ms-transform: translateY(-200px) rotateX(90deg);*/
    /*transform: translateY(-500px) rotateX(90deg);*/
    background-color: #00adff;
    width: 200px;
    height: 200px;
    margin: -100px;
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
