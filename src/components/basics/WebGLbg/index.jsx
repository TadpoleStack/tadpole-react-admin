import React, { Component } from 'react'
import { perlin } from '@src/assets/lib/perlin.js'
import * as THREE from 'three'
window.THREE = THREE

export default class WebGLbg extends Component {
   constructor(props) {
      super(props)
      this.init = this.init.bind(this)
   }
   componentDidMount() {
      this.init()
   }
   init() {
      perlin(window)
      var canvas = document.querySelector('#scene');
      var width = window.innerWidth;
      var height = window.innerHeight;

      var renderer = new THREE.WebGLRenderer({
         canvas: canvas,
         antialias: true
      });
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
      renderer.setSize(width, height);
      renderer.setClearColor(0xA9E7DA);

      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000);
      camera.position.set(120, 0, 300);

      var light1 = new THREE.HemisphereLight(0xffffff, 0x0C056D, 0.6);
      scene.add(light1);

      var light2 = new THREE.DirectionalLight(0x590D82, 0.5);
      light2.position.set(200, 300, 400);
      scene.add(light2);
      var light3 = light2.clone();
      light3.position.set(-200, 300, 400);
      scene.add(light3);

      var geometry = new THREE.IcosahedronGeometry(120, 4);
      for (var i = 0; i < geometry.vertices.length; i++) {
         var vector = geometry.vertices[i];
         vector._o = vector.clone();
      }
      var material = new THREE.MeshPhongMaterial({
         emissive: 0x23f660,
         emissiveIntensity: 0.4,
         shininess: 0
      });
      var shape = new THREE.Mesh(geometry, material);
      scene.add(shape);

      var updateVertices = (a) => {
         for (var i = 0; i < geometry.vertices.length; i++) {
            var vector = geometry.vertices[i];
            vector.copy(vector._o);
            var perlin = window.noise.simplex3(
               (vector.x * 0.006) + (a * 0.0002),
               (vector.y * 0.006) + (a * 0.0003),
               (vector.z * 0.006)
            );
            var ratio = ((perlin * 0.5 * (mouse.y + 0.1)) + 1.5);
            vector.multiplyScalar(ratio);
         }
         geometry.verticesNeedUpdate = true;
      }

      var render = (a) => {
         requestAnimationFrame(render);
         updateVertices(a);
         renderer.render(scene, camera);
      }

      var onResize = () => {
         canvas.style.width = '';
         canvas.style.height = '';
         width = window.innerWidth;
         height = window.innerHeight;
         camera.aspect = width / height;
         camera.updateProjectionMatrix();
         renderer.setSize(width, height);
      }

      var mouse = new THREE.Vector2(0.8, 0.5);

      requestAnimationFrame(render);
      var resizeTm;
      window.addEventListener("resize", () => {
         resizeTm = clearTimeout(resizeTm);
         resizeTm = setTimeout(onResize, 200);
      });
   }
   render() {
      return (
         <canvas style={{ position: 'fixed', zIndex: '1' }} id="scene"></canvas>
      )
   }
}