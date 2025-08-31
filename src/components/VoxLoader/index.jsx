import { useEffect, useRef } from "react";
import * as THREE from "three";
import { VOXLoader, VOXMesh } from "three/examples/jsm/loaders/VOXLoader";

function Scene({ filePath }) {
  const sceneAreaRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const meshesRef = useRef([]);

  useEffect(() => {
    if (!filePath) {
      if (sceneAreaRef.current && sceneAreaRef.current.childNodes.length > 0) {
        sceneAreaRef.current.removeChild(sceneAreaRef.current.childNodes[0]);
      }
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      1, // Initial aspect ratio (updated in resize handler)
      0.01,
      10
    );
    camera.position.set(0, 0.1, 0.3); // Fixed camera position

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xcccccc, 0x444444, 3);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(1.5, 3, 2.5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-1.5, -3, -2.5);
    scene.add(dirLight2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    sceneAreaRef.current.appendChild(renderer.domElement);

    // Load VOX file
    const loader = new VOXLoader();
    loader.load(
      filePath,
      (chunks) => {
        if (!chunks) {
          console.error("VOX: No chunks loaded");
          return;
        }
        meshesRef.current = [];
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          const mesh = new VOXMesh(chunk);
          mesh.geometry.computeBoundingBox();
          const boundingBox = mesh.geometry.boundingBox;
          const voxelSize = new THREE.Vector3();
          boundingBox.getSize(voxelSize);

          // Dynamic scaling: Fit model within camera view
          const maxDimension = Math.max(voxelSize.x, voxelSize.y, voxelSize.z);
          const targetSize = 0.8;
          const scale = maxDimension > 0 ? targetSize / maxDimension : 1;
          mesh.scale.setScalar(scale);

          // Center the mesh
          boundingBox.getCenter(mesh.position);
          mesh.position.multiplyScalar(-1);
          scene.add(mesh);
          meshesRef.current.push(mesh);
        }
      },
      undefined,
      (error) => {
        console.error("VOX: Load error", error);
      }
    );

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      const rotationSpeed = 0.5;

      // Rotate meshes
      meshesRef.current.forEach((mesh) => {
        mesh.rotation.y += rotationSpeed * deltaTime;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!sceneAreaRef.current) return;
      const width = sceneAreaRef.current.clientWidth;
      const height = sceneAreaRef.current.clientHeight;
      camera.aspect = width / height || 1;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.domElement.style.width = `${width}px`;
      renderer.domElement.style.height = `${height}px`;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (sceneAreaRef.current && sceneAreaRef.current.contains(renderer.domElement)) {
          sceneAreaRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, [filePath]);

  return <div ref={sceneAreaRef} style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
}

export default Scene;