import { useScreenSize } from '@/hooks/utils/useScreenSize';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = () => {
  const screenSize = useScreenSize();
  const { camera, mouse } = useThree();
  const mesh = useRef<THREE.Object3D>();
  const position = [0, screenSize === 'lg' ? 1.0 : 1.4, 0];
  const scale = screenSize === 'lg' ? [0.2, 0.2, 0.2] : [0.16, 0.16, 0.16];
  camera.position.y = -position[1];

  const gltf = useLoader(GLTFLoader, '/images/landingPage/discord.glb');
  useFrame(() => {
    if (mesh.current) {
      mesh.current.lookAt(
        mouse.x * 5 + camera.position.x,
        mouse.y * 5 + camera.position.y - position[1] * 1.5,
        camera.position.z
      );
    }
  });

  return (
    <primitive
      ref={mesh}
      object={gltf.scene}
      position={position}
      scale={scale}
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
