import React, { useEffect } from "react";
import { useRef } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VOXLoader, VOXMesh } from "three/examples/jsm/loaders/VOXLoader";

function VoxLoader({ filePath }) {
  const voxAreaRef = useRef(null);

  useEffect(() => {
    if (!filePath) {
      if (voxAreaRef.current.childNodes.length > 0) {
        voxAreaRef.current.removeChild(voxAreaRef.current.childNodes[0]);
      }
      return;
    }
    let camera, controls, scene, renderer;

    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );
    camera.position.set(0.175, 0.175, 0.175);

    scene = new THREE.Scene();
    scene.add(camera);

    // light
    const hemiLight = new THREE.HemisphereLight(0xcccccc, 0x444444, 3);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(1.5, 3, 2.5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-1.5, -3, -2.5);
    scene.add(dirLight2);

    const loader = new VOXLoader();
    loader.load(filePath, function (chunks) {
      if (!chunks) {
        console.error("vox: no chunks");
        return null;
      }
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const mesh = new VOXMesh(chunk);
        mesh.scale.setScalar(0.0015);
        scene.add(mesh);
      }
    });

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(100, 100);
    renderer.setAnimationLoop(() => {
      const r = Date.now() * 0.0005;
      camera.position.set(
        700 * Math.cos(r),
        0,
        700 * Math.sin(r)
      );

      controls.update();
      renderer.render(scene, camera);
    });

    // controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0.09;
    controls.maxDistance = 0.095;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    if (voxAreaRef.current.childNodes.length === 0) {
      voxAreaRef.current.appendChild(renderer.domElement);
    } else {
      voxAreaRef.current.replaceChild(
        renderer.domElement,
        voxAreaRef.current.childNodes[0]
      );
    }
  }, [filePath, window.innerWidth]);

  return <div ref={voxAreaRef}></div>;
}

export default VoxLoader;
