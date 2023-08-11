import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Props {
  id: number;
  pointCloudData: number[];
}

const Canvas = ({ id, pointCloudData }: Props) => {
  useEffect(() => {
    const width = 500;
    const height = 320;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector(
        "#three-js-canvas" + id
      ) as HTMLCanvasElement,
    });
    const controls = new OrbitControls(camera, renderer.domElement);
    console.log("remove warning by loging", controls);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = 5;

    const sun = new THREE.DirectionalLight(0xccddff, 1);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);

    scene.add(sun);
    scene.add(ambientLight);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(pointCloudData, 3)
    );
    const material = new THREE.PointsMaterial({ color: 0x888888 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    renderLoop();
    function renderLoop() {
      requestAnimationFrame(renderLoop);
      renderer.render(scene, camera);
    }
  }, []);

  return (
    <div className="threejs-container">
      {!pointCloudData && <p className="canvas-warning">No cloud data found</p>}
      <canvas id={"three-js-canvas" + id} />
    </div>
  );
};

export default Canvas;
