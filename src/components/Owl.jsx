import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useGame from "../stores/usePlayer";
import { Sign } from "./Sign";
import usePlayer from "../stores/usePlayer";
import { AttentionSign } from "./AttentionSign";

export function Owl({ animation, ...props }) {
  const group = useRef();
  const model = useGLTF("/models/Owl.glb");
  const modelAnimations = useAnimations(model.animations, group);
  const playerRef = useGame((state) => state.player);
  const [interactable, setInteractable] = useState(false);
  const isInteracting = usePlayer((state) => state.interacting);
  const setAbleToInteract = usePlayer((state) => state.setAbleToInteract);
  let isActive = true;

  useEffect(() => {
    console.log("Owl interactable state:", interactable);
  }, [interactable]);

  //Set material to the player
  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model.scene]);
  // Play animation based on parameter that the component got
  useEffect(() => {
    const action = modelAnimations.actions[animation];
    if (!action) return;
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [animation, modelAnimations.actions]);

  const distanceToPlayer = useRef(0);

  useFrame((state, delta) => {
    if (!playerRef?.current) return;

    const owlPosition = new THREE.Vector3();
    const playerPosition = new THREE.Vector3();
    group.current.getWorldPosition(owlPosition);
    playerRef.current.getWorldPosition(playerPosition);

    distanceToPlayer.current = owlPosition.distanceTo(playerPosition);

    if (distanceToPlayer.current < 1) {
      setInteractable(true);
      setAbleToInteract(true);
    } else {
      setInteractable(false);
      setAbleToInteract(false);
    }
  });

  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <RigidBody type="kinematicPosition" colliders="hull">
          <primitive scale={0.1} object={model.scene} />
        </RigidBody>
      </group>
      {interactable && !isInteracting && (
        <Sign
          position={[
            props.position[0] - 0.05,
            props.position[1] + 1,
            props.position[2] + 0.3,
          ]}
          animation="Idle"
          rotation={[0, Math.PI * 1.45, 0]}
          scale={2}
        />
      )}
      {isActive && !interactable && !isInteracting && (
        <AttentionSign
          position={[
            props.position[0] - 0.05,
            props.position[1] + 1,
            props.position[2] + 0.3,
          ]}
          animation="Idle"
          rotation={[0, Math.PI * 1.45, 0]}
          scale={0.8}
        />
      )}
    </>
  );
}

useGLTF.preload("/models/Owl.glb");
