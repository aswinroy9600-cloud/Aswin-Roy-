import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 1, 6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasDiv.current.appendChild(renderer.domElement);

    let robot: THREE.Group;
    let headBone: THREE.Object3D;
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const createCuteRobot = () => {
      const robotGroup = new THREE.Group();

      const bodyGeo = new THREE.CapsuleGeometry(0.6, 1.2, 4, 8);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x7f40ff,
        metalness: 0.3,
        roughness: 0.4,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      robotGroup.add(body);

      const headGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0xc2a4ff,
        metalness: 0.3,
        roughness: 0.4,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.2;
      head.castShadow = true;
      robotGroup.add(head);

      const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const eyeMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5,
      });

      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.2, 1.3, 0.35);
      robotGroup.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(0.2, 1.3, 0.35);
      robotGroup.add(rightEye);

      const antennaGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
      const antennaMat = new THREE.MeshStandardMaterial({ color: 0xffd700 });
      const antenna = new THREE.Mesh(antennaGeo, antennaMat);
      antenna.position.y = 1.8;
      robotGroup.add(antenna);

      const bulbGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const bulbMat = new THREE.MeshStandardMaterial({
        color: 0xff6b6b,
        emissive: 0xff6b6b,
        emissiveIntensity: 0.8,
      });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.y = 2.1;
      robotGroup.add(bulb);

      const armGeo = new THREE.CapsuleGeometry(0.15, 0.8, 4, 8);
      const armMat = new THREE.MeshStandardMaterial({
        color: 0x9b6bff,
        metalness: 0.4,
        roughness: 0.3,
      });

      const leftArm = new THREE.Mesh(armGeo, armMat);
      leftArm.position.set(-0.75, 0.2, 0);
      leftArm.rotation.z = Math.PI / 6;
      leftArm.castShadow = true;
      robotGroup.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, armMat);
      rightArm.position.set(0.75, 0.2, 0);
      rightArm.rotation.z = -Math.PI / 6;
      rightArm.castShadow = true;
      robotGroup.add(rightArm);

      robotGroup.position.y = -1;
      return { group: robotGroup, head };
    };

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xc2a4ff, 1, 50);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    const progress = setProgress((value) => setLoading(value));

    const { group: robotGroup, head } = createCuteRobot();
    robot = robotGroup;
    headBone = head;
    scene.add(robot);

    progress.loaded().then(() => {
      setTimeout(() => {
        robot.position.y = -1;
      }, 2500);
    });

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove);

    const handleResize = () => {
      if (!canvasDiv.current) return;
      const rect = canvasDiv.current.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let idleAnimation = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      idleAnimation += delta;

      if (robot) {
        robot.rotation.y += delta * 0.2;
        robot.position.y = -1 + Math.sin(idleAnimation * 2) * 0.1;
      }

      if (headBone && window.scrollY < 200) {
        const maxRotation = 0.3;
        targetRotation.x = THREE.MathUtils.clamp(mouse.y * maxRotation, -0.3, 0.4);
        targetRotation.y = mouse.x * maxRotation;

        headBone.rotation.x = THREE.MathUtils.lerp(
          headBone.rotation.x,
          targetRotation.x,
          0.1
        );
        headBone.rotation.y = THREE.MathUtils.lerp(
          headBone.rotation.y,
          targetRotation.y,
          0.1
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (canvasDiv.current && canvasDiv.current.contains(renderer.domElement)) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
      </div>
    </div>
  );
};

export default Scene;
