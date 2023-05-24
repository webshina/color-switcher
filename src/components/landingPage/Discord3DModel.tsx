import { useScreenSize } from '@/hooks/utils/useScreenSize';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = () => {
  const screenSize = useScreenSize();
  const { camera, mouse } = useThree();
  const mesh = useRef<THREE.Object3D>();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.lookAt(
        mouse.x + camera.position.x,
        mouse.y + camera.position.y,
        camera.position.z
      );
    }
  });

  const gltf = useLoader(GLTFLoader, '/images/landingPage/discord.glb');
  useFrame(() => {
    if (mesh.current) {
      mesh.current.lookAt(
        mouse.x * 5 + camera.position.x,
        mouse.y * 5 + camera.position.y,
        camera.position.z
      );
    }
  });

  return (
    <primitive
      ref={mesh}
      object={gltf.scene}
      position={screenSize === 'lg' ? [3, -1, 0] : [1.7, -1.8, -1]}
      scale={[0.4, 0.4, 0.4]}
    />
  );
};

export const Discord3DModel = () => {
  return (
    <Canvas>
      <Model />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
    </Canvas>
  );
};
