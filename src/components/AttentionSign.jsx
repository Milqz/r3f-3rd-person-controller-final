import { useAnimations, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";

export function AttentionSign({ animation, ...props }) {
  const group = useRef();
  const model = useGLTF("/models/AttentionSign.glb");
  const modelAnimations = useAnimations(model.animations, group);

  useEffect(() => {
    const action = modelAnimations.actions[animation];
    if (!action) return;
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [animation, modelAnimations.actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive scale={0.1} object={model.scene} />
    </group>
  );
}

useGLTF.preload("/models/AttentionSign.glb");
