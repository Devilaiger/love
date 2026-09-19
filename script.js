const CONFIG = {
  name: "SHREYA",
  level: 19,
  secretMessage: "P.S. — In a world full of background characters, you're 100% the main character. Never let anyone dim your sparkle! ✨",
  passCode: "SHREYA19-VIP",
  passEmail: "Shreya@SeoulEntertainment.com",
  passPassword: "Shreya123",
  appDownloads: [
    {
      name: "Google Drive",
      url: "https://docs.google.com/uc?export=download&id=12OCrnj2XLCo9XkT60yxPLwVqSK1nVz5G",
      type: "drive"
    },
    {
      name: "MEGA Drive",
      url: "https://mega.nz/file/PigGVQrR#6eS-ebDcqhcxCVrEyILWgmHqXihSAfK8uc40pCcIaBI",
      type: "mega"
    },
    {
      name: "Telegram Channel",
      url: "https://t.me/Seoul_Entertainment_DKD/696",
      type: "telegram"
    }
  ]
};

const $ = (id) => document.getElementById(id);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var toastTimer = null;

// Ambient floating particles
if (!reducedMotion) {
  const ambient = $("ambient");
  for (let i = 0; i < 28; i++) {
    const el = document.createElement("span");
    el.className = "particle";
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDelay = `${-Math.random() * 13}s`;
    el.style.animationDuration = `${8 + Math.random() * 11}s`;
    ambient.appendChild(el);
  }
}

// Nav active state observer
const navLinks = [...document.querySelectorAll(".nav a")];
const screens = [...document.querySelectorAll(".screen")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  },
  { threshold: 0.35 }
);
screens.forEach((screen) => sectionObserver.observe(screen));

// Countdown Clock (Celebration Clock)
function updateClock() {
  if (!$("days")) return;
  const now = new Date();
  $("days").textContent = "19";
  $("hours").textContent = String(now.getHours()).padStart(2, "0");
  $("minutes").textContent = String(now.getMinutes()).padStart(2, "0");
  $("seconds").textContent = String(now.getSeconds()).padStart(2, "0");
}
updateClock();
setInterval(updateClock, 1000);

// Audio Engine (Web Audio API)
let audioCtx = null;
let soundOn = true;

function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}

function tone(freq, duration = 0.08, type = "square", volume = 0.03, delay = 0) {
  if (!soundOn) return;
  ensureAudio();
  const when = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, when);

  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(volume, when + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start(when);
  osc.stop(when + duration + 0.02);
}

function uiSfx() {
  tone(660, .04, "square", .018);
  tone(880, .05, "square", .015, .04);
}

function launchSfx() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
    tone(f, .1, "square", .026, i * .07)
  );
}

function shotSfx() {
  tone(165, .045, "square", .018);
  tone(720, .055, "sawtooth", .012, .02);
}

function hitSfx() {
  tone(110, .08, "square", .025);
  tone(250, .09, "square", .018, .05);
}

function winSfx() {
  [587.33, 659.25, 783.99, 1174.66].forEach((f, i) =>
    tone(f, .14, "square", .028, i * .08)
  );
}

function chimeSfx() {
  [784, 988, 1175, 1568].forEach((f, i) =>
    tone(f, .15, "triangle", .03, i * .06)
  );
}

// Global User Interaction Audio Priming for Brave/Chrome/Edge Autoplay Policies
let audioPrimed = false;
function primeBirthdayAudio() {
  if (audioPrimed) return;
  audioPrimed = true;
  ensureAudio();
  const audio = $("birthdayAudio");
  if (audio) {
    audio.volume = 0.85;
    audio.play().then(() => {
      if (!cakeCut) {
        audio.pause();
        audio.currentTime = 0;
      }
    }).catch(e => {
      console.log("[Audio Priming] Browser autoplay policy primed:", e);
    });
  }
}
document.addEventListener("click", primeBirthdayAudio, { once: true });
document.addEventListener("touchstart", primeBirthdayAudio, { once: true });

$("soundToggle").addEventListener("click", () => {
  soundOn = !soundOn;
  const audio = $("birthdayAudio") || birthdayAudioObj;

  if (soundOn) {
    ensureAudio();
    playBirthdaySong();
  } else {
    if (audio) {
      try { audio.pause(); } catch (e) {}
    }
    if (birthdayAudioObj) {
      try { birthdayAudioObj.pause(); } catch (e) {}
    }
  }

  const soundBtn = $("soundToggle");
  if (soundBtn) {
    soundBtn.textContent = soundOn ? "♪ ON" : "♪ OFF";
    soundBtn.setAttribute("aria-pressed", String(soundOn));
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".button") && e.target.id !== "soundToggle") uiSfx();
});

$("enterParty")?.addEventListener("click", () => {
  document.body.classList.add("party-mode");
  if (!soundOn) {
    soundOn = true;
    ensureAudio();
    $("soundToggle").textContent = "♪ ON";
    $("soundToggle").setAttribute("aria-pressed", "true");
  }
  launchSfx();
  confetti(22);
});

$("quickWish")?.addEventListener("click", () => {
  ensureAudio();
  if (!soundOn) {
    soundOn = true;
    ensureAudio();
    $("soundToggle").textContent = "♪ ON";
    $("soundToggle").setAttribute("aria-pressed", "true");
  }
  winSfx();
  confetti(24);
  toast("BIRTHDAY WISH SENT TO SHREYA ♥");
});

// =====================================================================
// 3D COLLECTIBLE FIGURINE STUDIO & INTERACTIVE TASKS ENGINE
// =====================================================================
(function initFigurineStudio() {
  const container = $("threeHologramContainer");
  if (!container || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0f0910, 0.035);

  const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1.45, 3.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // OrbitControls for true interactive 360° rotation, zoom, pan
  let controls = null;
  if (typeof THREE.OrbitControls !== "undefined") {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.minDistance = 1.2;
    controls.maxDistance = 5.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.04; // avoid clipping below floor
    controls.target.set(0, 1.05, 0);
  }

  // Dynamic Studio Lighting Presets
  const hemiLight = new THREE.HemisphereLight(0xffe8f2, 0x1f1020, 1.1);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
  keyLight.position.set(2.5, 4.5, 3.5);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xff6faa, 2.5, 20);
  fillLight.position.set(-2.5, 2.5, 2.5);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x67e8f9, 3.0, 20);
  rimLight.position.set(0, 2.8, -2.8);
  scene.add(rimLight);

  // Circular Cyber Pedestal
  const stageGroup = new THREE.Group();
  scene.add(stageGroup);

  const baseGeo = new THREE.CylinderGeometry(1.65, 1.75, 0.12, 48);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x190e18,
    metalness: 0.85,
    roughness: 0.25
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = -0.06;
  stageGroup.add(baseMesh);

  // Dual Neon Glowing Circular Rings
  const rimGeo = new THREE.TorusGeometry(1.68, 0.028, 16, 64);
  const rimMat = new THREE.MeshBasicMaterial({ color: 0xff6faa });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.rotation.x = Math.PI / 2;
  stageGroup.add(rimMesh);

  const outerRingGeo = new THREE.TorusGeometry(1.9, 0.015, 16, 64);
  const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9, wireframe: true });
  const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
  outerRing.rotation.x = Math.PI / 2;
  stageGroup.add(outerRing);

  // Floating Ambient Sparkles
  const sparkCount = 65;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPos = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount * 3; i += 3) {
    sparkPos[i] = (Math.random() - 0.5) * 5.0;
    sparkPos[i + 1] = 0.2 + Math.random() * 2.8;
    sparkPos[i + 2] = (Math.random() - 0.5) * 5.0;
  }
  sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
  const sparkMat = new THREE.PointsMaterial({
    size: 0.07,
    color: 0xffb8db,
    transparent: true,
    opacity: 0.85
  });
  const sparkles = new THREE.Points(sparkGeo, sparkMat);
  scene.add(sparkles);

  // 3D Humanoid Model & Animation State
  let modelObj = null;
  let mixer = null;
  let restHipsPos = null;
  const actions = {};
  let currentAction = null;
  let headMesh = null;
  let teethMesh = null;
  let isTalking = false;

  function fadeToAction(name, duration = 0.35) {
    const nextAction = actions[name];
    if (!nextAction || nextAction === currentAction) return;
    if (currentAction) currentAction.fadeOut(duration);
    nextAction.reset().fadeIn(duration).play();
    currentAction = nextAction;
  }

  function loadAnim(loader, url, name) {
    return new Promise((resolve) => {
      loader.load(url, (gltf) => {
        if (gltf.animations && gltf.animations.length > 0) {
          const clip = gltf.animations[0];
          clip.name = name;
          resolve(clip);
        } else {
          resolve(null);
        }
      }, undefined, () => resolve(null));
    });
  }

  // Load 3D Shreya Humanoid Model
  const gltfLoader = new THREE.GLTFLoader();
  gltfLoader.load('assets/models/avaturn.glb', async (gltf) => {
    modelObj = gltf.scene;

    // Material tuning for authentic Shreya likeness
    modelObj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const name = (child.name || '').toLowerCase();

        // 1. Head Mesh: natural warm Indian skin tone & soft finish
        if (name.includes('head')) {
          headMesh = child;
          if (child.material) {
            child.material.color = new THREE.Color(0xf2bc9f);
            child.material.roughness = 0.52;
            child.material.metalness = 0.04;
            child.material.needsUpdate = true;
          }
        }
        // 2. Teeth Mesh for speech & smile
        else if (name.includes('teeth')) {
          teethMesh = child;
        }
        // 3. Hair: Dark raven brunette matching Shreya's photo
        else if (name.includes('hair')) {
          if (child.material) {
            child.material.color = new THREE.Color(0x181318);
            child.material.roughness = 0.38;
            child.material.metalness = 0.12;
            child.material.needsUpdate = true;
          }
        }
        // 4. Eyes: Deep warm dark brown eyes
        else if (name.includes('eye') && !name.includes('lash') && !name.includes('ao')) {
          if (child.material) {
            child.material.color = new THREE.Color(0x2a160d);
            child.material.roughness = 0.12;
            child.material.needsUpdate = true;
          }
        }
        // 5. Outfit: Sleek dark jacket matching Shreya's black zip jacket
        else if (name.includes('look') || name.includes('body')) {
          if (child.material) {
            child.material.color = new THREE.Color(0x161316);
            child.material.roughness = 0.62;
            child.material.needsUpdate = true;
          }
        }
      }
    });

    // Attach Silver Oxidised Jhumkas to the Head bone
    const headBone = modelObj.getObjectByName('Head');
    if (headBone) {
      const silverMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.88,
        roughness: 0.28
      });
      function makeJhumka(isLeft) {
        const g = new THREE.Group();
        const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.006, 16), silverMat);
        stud.rotation.x = Math.PI / 2;
        g.add(stud);
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.02, 8), silverMat);
        stem.position.y = -0.012;
        g.add(stem);
        const bell = new THREE.Mesh(new THREE.ConeGeometry(0.017, 0.022, 16, 1, true), silverMat);
        bell.position.y = -0.028;
        bell.rotation.x = Math.PI;
        g.add(bell);
        const bead = new THREE.Mesh(new THREE.SphereGeometry(0.005, 10, 10), silverMat);
        bead.position.y = -0.038;
        g.add(bead);
        g.position.set(isLeft ? 0.082 : -0.082, 0.02, 0.015);
        return g;
      }
      headBone.add(makeJhumka(true));
      headBone.add(makeJhumka(false));
    }

    // Center on pedestal
    const bbox = new THREE.Box3().setFromObject(modelObj);
    const center = bbox.getCenter(new THREE.Vector3());
    modelObj.position.x = -center.x;
    modelObj.position.y = -bbox.min.y;
    modelObj.position.z = -center.z;
    stageGroup.add(modelObj);

    const hipsBone = modelObj.getObjectByName('Hips');
    restHipsPos = hipsBone ? hipsBone.position.clone() : new THREE.Vector3(0, 1.01, 0.02);

    const validNodes = new Set();
    modelObj.traverse((child) => {
      if (child.name) validNodes.add(child.name);
    });

    mixer = new THREE.AnimationMixer(modelObj);

    function sanitizeAndStripRootMotion(clip) {
      if (!clip || !clip.tracks) return clip;
      clip.tracks = clip.tracks.filter((track) => {
        const delim = track.name.lastIndexOf('.');
        const nodeName = delim !== -1 ? track.name.slice(0, delim) : '';
        const prop = delim !== -1 ? track.name.slice(delim + 1) : '';

        // NEVER allow animation tracks to target root containers
        if (!nodeName || nodeName === modelObj.name || nodeName === 'Scene' || nodeName === 'Armature' || nodeName === 'RootNode') {
          return false;
        }
        // ONLY keep tracks for nodes that actually exist in modelObj
        // (Prevents Three.js PropertyBinding fallback to modelObj which corrupts model rotation/position!)
        if (!validNodes.has(nodeName)) {
          return false;
        }
        // Drop position tracks on any bone other than Hips
        if (prop === 'position' && nodeName !== 'Hips') {
          return false;
        }
        return true;
      });

      // For Hips.position, lock horizontal X and forward/backward Z drift
      clip.tracks.forEach((track) => {
        if (track.name === 'Hips.position') {
          const values = track.values;
          if (values && values.length >= 3) {
            for (let i = 0; i < values.length; i += 3) {
              values[i] = restHipsPos.x;     // Lock horizontal X
              values[i + 2] = restHipsPos.z; // Lock forward/backward Z!
            }
          }
        }
      });
      return clip;
    }

    // Load clean animations (Idle, Walk, Dance) + Talk + Gestures
    const [cleanAnimGltf, talkingClip, gestureClip] = await Promise.all([
      new Promise((res) => gltfLoader.load('assets/models/clean_anims.glb', res)),
      loadAnim(gltfLoader, 'assets/models/anim_talking.glb', 'talking'),
      loadAnim(gltfLoader, 'assets/models/anim_gestures.glb', 'gestures')
    ]);

    if (cleanAnimGltf && cleanAnimGltf.animations) {
      cleanAnimGltf.animations.forEach((clip) => {
        sanitizeAndStripRootMotion(clip);
        actions[clip.name.toLowerCase()] = mixer.clipAction(clip);
      });
    }
    if (talkingClip) {
      sanitizeAndStripRootMotion(talkingClip);
      actions['talking'] = mixer.clipAction(talkingClip);
    }
    if (gestureClip) {
      sanitizeAndStripRootMotion(gestureClip);
      actions['gestures'] = mixer.clipAction(gestureClip);
    }

    // Default to natural upright straight IDLE stance
    if (actions['idle']) {
      actions['idle'].play();
      currentAction = actions['idle'];
      setFigurineTask('wave');
    }
  });

  const figurineTasks = {
    wave: {
      name: "TALKING & GREETING",
      status: "● TASK: TALK & GREET (LIP-SYNC ACTIVE)",
      speech: '"Level 19 unlocked! Welcome to my 3D Figurine Showcase ✨"',
      badge: "👋 TASK: GREETING ACTIVE",
      anim: "talking",
      talk: true,
      camPos: { x: 0, y: 1.38, z: 2.15 },
      targetY: 1.20
    },
    cake: {
      name: "19TH BIRTHDAY CAKE",
      status: "● TASK: CELEBRATING 19TH BIRTHDAY",
      speech: '"Happy 19th Birthday to me! Candle lit, cake sliced, let the party begin 🎂✨"',
      badge: "🎂 TASK: BIRTHDAY CELEBRATION",
      anim: "dance_silly",
      talk: false,
      camPos: { x: 0, y: 1.38, z: 2.15 },
      targetY: 1.20
    },
    katana: {
      name: "CELESTIAL CATWALK",
      status: "● TASK: CATWALK RUNWAY GAIT",
      speech: '"Strutting into Level 19 with 100% celestial anime energy and style ⚡✨"',
      badge: "🚶‍♀️ TASK: CATWALK ACTIVE",
      anim: "walk",
      talk: false,
      camPos: { x: 0, y: 1.38, z: 2.15 },
      targetY: 1.20
    },
    portrait: {
      name: "SCULPT DETAIL ZOOM",
      status: "● TASK: CLOSE-UP SCULPT DETAIL",
      speech: '"Inspecting figurine details... 100% genuine Shreya smile & silver jhumkas detected! 💕"',
      badge: "🔍 TASK: SCULPT INSPECTION",
      anim: "idle",
      talk: false,
      camPos: { x: 0, y: 1.45, z: 1.55 },
      targetY: 1.35
    }
  };

  let currentPoseKey = "wave";

  function setFigurineTask(taskKey) {
    currentPoseKey = taskKey;
    const task = figurineTasks[taskKey];
    if (!task) return;

    isTalking = !!task.talk;
    if (task.anim) fadeToAction(task.anim);

    // Update HUD & Speech Bubble
    if ($("figurineStatus")) $("figurineStatus").textContent = task.status;
    const speechEl = $("figurineSpeech");
    if (speechEl) {
      speechEl.style.opacity = "0";
      speechEl.style.transform = "translateY(6px)";
      setTimeout(() => {
        speechEl.textContent = task.speech;
        speechEl.style.opacity = "1";
        speechEl.style.transform = "translateY(0)";
      }, 150);
    }

    // Update Action Button States
    document.querySelectorAll(".figurine-actions-grid .task-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-task") === taskKey);
    });

    // Update Dossier Thumbnails
    document.querySelectorAll(".thumb-card").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-pose") === taskKey);
    });

    // Camera Framing
    if (task.camPos) {
      camera.position.set(task.camPos.x, task.camPos.y, task.camPos.z);
    }
    if (controls) {
      controls.target.set(0, task.targetY, 0);
      controls.update();
    }

    // Task Specific SFX & FX
    if (taskKey === "cake") {
      confetti(45);
      winSfx();
      toast("🎂 19TH BIRTHDAY CAKE CELEBRATION FOR SHREYA!");
    } else if (taskKey === "katana") {
      tone(180, 0.06, "sawtooth", 0.03);
      tone(880, 0.12, "sine", 0.025, 0.05);
      rimMat.color.setHex(0x67e8f9);
      toast("🚶‍♀️ SHREYA CATWALK ACTIVE!");
    } else if (taskKey === "wave") {
      uiSfx();
      rimMat.color.setHex(0xff6faa);
      toast("🗣️ SHREYA TALKS & GREETS!");
    } else if (taskKey === "portrait") {
      uiSfx();
      toast("🔍 CLOSE-UP SCULPT VIEW ACTIVE!");
    }
  }

  // Helper to set morph target weights on Head_Mesh and Teeth_Mesh
  function setMorphWeight(targetName, value) {
    if (headMesh && headMesh.morphTargetDictionary && headMesh.morphTargetInfluences) {
      const idx = headMesh.morphTargetDictionary[targetName];
      if (idx !== undefined) headMesh.morphTargetInfluences[idx] = value;
    }
    if (teethMesh && teethMesh.morphTargetDictionary && teethMesh.morphTargetInfluences) {
      const idx = teethMesh.morphTargetDictionary[targetName];
      if (idx !== undefined) teethMesh.morphTargetInfluences[idx] = value;
    }
  }

  // Bind Buttons
  $("taskWave")?.addEventListener("click", () => setFigurineTask("wave"));
  $("taskCake")?.addEventListener("click", () => setFigurineTask("cake"));
  $("taskKatana")?.addEventListener("click", () => setFigurineTask("katana"));
  $("taskZoom")?.addEventListener("click", () => setFigurineTask("portrait"));

  // Bind Dossier Thumbnail Cards
  document.querySelectorAll(".thumb-card").forEach((card) => {
    card.addEventListener("click", () => {
      const poseKey = card.getAttribute("data-pose");
      if (poseKey) setFigurineTask(poseKey);
    });
  });

  // Turntable Auto-Rotate Toggle
  let autoRotateState = true;
  $("taskRotate")?.addEventListener("click", () => {
    autoRotateState = !autoRotateState;
    if (controls) controls.autoRotate = autoRotateState;
    $("taskRotate").textContent = autoRotateState ? "⟳ 360° TURNTABLE: ON" : "⟳ 360° TURNTABLE: OFF";
    $("taskRotate").classList.toggle("active", autoRotateState);
    uiSfx();
    toast(autoRotateState ? "⟳ TURNTABLE AUTO-ROTATE ON" : "⏸ TURNTABLE PAUSED");
  });

  // Lighting Mode Toggle
  const lightModes = [
    { name: "CYBER", rimColor: 0x67e8f9, keyIntensity: 1.5 },
    { name: "WARM ROSE", rimColor: 0xff6faa, keyIntensity: 1.8 },
    { name: "GOLD PARTY", rimColor: 0xffd166, keyIntensity: 2.0 }
  ];
  let lightIdx = 0;
  $("taskLight")?.addEventListener("click", () => {
    lightIdx = (lightIdx + 1) % lightModes.length;
    const mode = lightModes[lightIdx];
    rimLight.color.setHex(mode.rimColor);
    rimMat.color.setHex(mode.rimColor);
    keyLight.intensity = mode.keyIntensity;
    $("taskLight").textContent = `💡 LIGHT: ${mode.name}`;
    uiSfx();
    toast(`💡 LIGHTING: ${mode.name} ACTIVE`);
  });

  // Reset Camera View
  $("btnReset3D")?.addEventListener("click", () => {
    setFigurineTask("wave");
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.4;
      $("taskRotate").textContent = "⟳ 360° TURNTABLE: ON";
      $("taskRotate").classList.add("active");
    }
    uiSfx();
    toast("↺ CAMERA VIEW RESET TO FRONT");
  });

  // Main Render Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    if (mixer) mixer.update(delta);

    // Pin modelObj root rotation & Hips position so character NEVER drifts or tilts on Z/X axis
    if (modelObj) {
      modelObj.rotation.set(0, 0, 0);
      modelObj.quaternion.set(0, 0, 0, 1);
      const hips = modelObj.getObjectByName('Hips');
      if (hips && restHipsPos) {
        hips.position.x = restHipsPos.x;
        hips.position.z = restHipsPos.z;
      }
    }

    if (controls) controls.update();
    outerRing.rotation.z += 0.007;
    sparkles.rotation.y += 0.0018;

    // Real-time dynamic lip-sync when talking
    if (isTalking) {
      const speechWave = Math.max(0, Math.sin(time * 11) * 0.45 + Math.sin(time * 19) * 0.3 + Math.sin(time * 6) * 0.25);
      const vowelA = Math.max(0, Math.sin(time * 8.5) * 0.5);
      const vowelO = Math.max(0, Math.cos(time * 6.5) * 0.4);

      setMorphWeight('jawOpen', speechWave * 0.5);
      setMorphWeight('mouthOpen', speechWave * 0.4);
      setMorphWeight('viseme_aa', vowelA * 0.45);
      setMorphWeight('viseme_O', vowelO * 0.35);
      setMorphWeight('mouthSmile', 0.3 + Math.sin(time * 3) * 0.15);
    } else {
      // Gentle natural resting smile
      setMorphWeight('jawOpen', 0);
      setMorphWeight('mouthOpen', 0);
      setMorphWeight('viseme_aa', 0);
      setMorphWeight('viseme_O', 0);
      setMorphWeight('mouthSmile', 0.25);
    }

    // Natural eye blinking
    const blinkCycle = time % 3.6;
    let blink = 0;
    if (blinkCycle < 0.16) {
      blink = Math.sin((blinkCycle / 0.16) * Math.PI);
    }
    setMorphWeight('eyeBlinkLeft', blink);
    setMorphWeight('eyeBlinkRight', blink);

    renderer.render(scene, camera);
  }
  animate();
  // Resize Handler
  window.addEventListener("resize", () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();

// ==========================================
// VIBE CHECK & CO-OP QUIZ (SAVED TEXT ANSWERS)
// ==========================================
(function initVibeCheck() {
  const answered = new Set();

  function getApiBase() {
    const host = window.location.hostname || "localhost";
    const port = window.location.port;
    // When running locally on a different port than Express (e.g. python -m http.server 8080)
    if ((host === "localhost" || host === "127.0.0.1") && port !== "8000" && port !== "") {
      return `http://${host}:8000`;
    }
    // On production (Render, cloud hosting) or when served directly by Express:
    return "";
  }

  // Save an individual answer
  function saveAnswer(qid) {
    const inputEl = $(`vibeInput${qid}`);
    const feedbackBox = $(`vibeFeedback${qid}`);
    if (!inputEl) return;

    const text = inputEl.value.trim();
    if (!text) {
      toast("PLEASE TYPE AN ANSWER FIRST! ✍");
      return;
    }

    const cardHead = inputEl.closest('.vibe-card')?.querySelector('h4')?.textContent || `Q${qid}`;

    // Track answered question in current session
    answered.add(String(qid));

    // Show feedback comment briefly
    if (feedbackBox) {
      feedbackBox.textContent = `★ Saved answer: "${text}" ✨`;
      feedbackBox.classList.add("visible");
      if (feedbackBox._timer) clearTimeout(feedbackBox._timer);
      feedbackBox._timer = setTimeout(() => {
        feedbackBox.classList.remove("visible");
      }, 3500);
    }

    chimeSfx();

    // Sync to MongoDB database layer 'love' via backend API
    const apiBase = getApiBase();
    fetch(`${apiBase}/api/save-answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        qid: String(qid),
        question: cardHead,
        answer: text,
        user: 'Shreya'
      })
    }).then(r => r.json()).then(data => {
      if (data.success) {
        console.log(`[DB Layer "love"] Answer for Q${qid} stored:`, data);
        toast(`Q${qid} ANSWER SAVED! ✦`);
      } else {
        console.warn('[DB Save Notice]', data.error);
        toast(`Q${qid} ANSWER SAVED! ✦`);
      }
    }).catch(err => {
      console.log('[DB Sync Notice] Saved locally, fallback to relative:', err);
      if (apiBase !== "") {
        fetch('/api/save-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            qid: String(qid),
            question: cardHead,
            answer: text,
            user: 'Shreya'
          })
        }).catch(() => {});
      }
    });

    // Update Progress Meter
    const count = answered.size;
    $("vibeMeterText").textContent = `${count} / 6 COMPLETED`;
    $("vibeProgressFill").style.width = `${(count / 6) * 100}%`;

    // Trigger side glitter burst & reward banner when Q6 (last question) or all 6 answered
    if (String(qid) === "6" || count === 6) {
      sideGlitterBurst();
      winSfx();
      confetti(40);
      $("vibeRewardBanner").classList.add("active");
      toast("100% VIBE MATCH UNLOCKED! SIDE GLITTER BURST! ★");
    }
  }

  // On page load or refresh:
  // 1. All inputs are cleared and NEVER auto-filled with past answers
  // 2. All feedback popups are strictly hidden
  // 3. Inputs start fresh with their original placeholders
  function loadSavedAnswers() {
    for (let i = 1; i <= 6; i++) {
      const inputEl = $(`vibeInput${i}`);
      const feedbackBox = $(`vibeFeedback${i}`);

      if (inputEl) {
        inputEl.value = ""; // Never auto-fill answers - keep fresh & blank
      }
      if (feedbackBox) {
        feedbackBox.textContent = "";
        feedbackBox.classList.remove("visible");
      }
      try {
        localStorage.removeItem(`shreya_ans_${i}`);
      } catch (e) {}
    }

    // Reset progress meter to 0 / 6 for fresh clean start
    answered.clear();
    $("vibeMeterText").textContent = `0 / 6 COMPLETED`;
    $("vibeProgressFill").style.width = `0%`;
    $("vibeRewardBanner").classList.remove("active");
  }

  loadSavedAnswers();

  // Attach event listeners for Save buttons and Enter keypresses
  document.querySelectorAll(".vibe-save-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const qid = btn.getAttribute("data-qid");
      if (qid) saveAnswer(qid);
    });
  });

  document.querySelectorAll(".vibe-input").forEach((input) => {
    const qid = input.getAttribute("data-qid");
    // Clear feedback box immediately if user edits or changes input
    input.addEventListener("input", () => {
      const feedbackBox = $(`vibeFeedback${qid}`);
      if (feedbackBox) {
        if (feedbackBox._timer) clearTimeout(feedbackBox._timer);
        feedbackBox.classList.remove("visible");
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (qid) saveAnswer(qid);
      }
    });
  });
})();

// ==========================================
// 1-MONTH VIP CINEMA PASS (THE GIFT)
// ==========================================
(function initVipPass() {
  const ticket = $("cinemaTicket");
  const claimBtn = $("btnClaimPass");
  const copyGroup = $("copyActionsGroup");
  const quickDlGroup = $("ticketQuickDownload");
  const copyEmailBtn = $("btnCopyEmail");
  const copyPassBtn = $("btnCopyPass");
  const btnCopyCredEmail = $("btnCopyCredEmail");
  const btnCopyCredPass = $("btnCopyCredPass");
  const unlockedCard = $("giftUnlockedCard");
  const statusText = $("ticketStatusText");

  let claimed = false;

  claimBtn.addEventListener("click", () => {
    if (claimed) return;
    claimed = true;

    ticket.classList.add("claimed");
    statusText.textContent = "VIP ACTIVE // 30 DAYS";
    statusText.style.color = "#00f0ff";

    claimBtn.textContent = "CLAIMED ★";
    claimBtn.disabled = true;
    if (copyGroup) copyGroup.style.display = "grid";
    if (quickDlGroup) quickDlGroup.style.display = "block";

    unlockedCard.classList.add("show");

    ensureAudio();
    winSfx();
    confetti(45);
    toast("1-MONTH VIP PASS ACTIVATED FOR SHREYA! 🍿");

    setTimeout(() => {
      unlockedCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 250);
  });

  function copyToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        uiSfx();
        toast(`${label} COPIED: ${text} 📋`);
      }).catch(() => {
        toast(`${label}: ${text}`);
      });
    } else {
      toast(`${label}: ${text}`);
    }
  }

  copyEmailBtn?.addEventListener("click", () => copyToClipboard(CONFIG.passEmail, "LOGIN ID"));
  copyPassBtn?.addEventListener("click", () => copyToClipboard(CONFIG.passPassword, "PASSWORD"));
  btnCopyCredEmail?.addEventListener("click", () => copyToClipboard(CONFIG.passEmail, "LOGIN ID"));
  btnCopyCredPass?.addEventListener("click", () => copyToClipboard(CONFIG.passPassword, "PASSWORD"));
})();

// ==========================================
// CASUAL SPACE DEFENDER MINI-GAME (REVAMPED & FIXED)
// ==========================================
(function initArcadeGame() {
  const canvas = $("spaceCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const shell = $("arcadeShell");
  const overlay = $("gameOverlay");
  const overlayTitle = $("overlayTitle");
  const overlaySubtitle = $("overlaySubtitle");
  const startBtn = $("gameStartBtn");
  const resetBtn = $("gameResetBtn");
  const livesEl = $("spaceLives");
  const powerupEl = $("spacePowerupTag");
  const scoreEl = $("spaceScore");
  const timeEl = $("spaceTime");
  const comboEl = $("spaceCombo");
  const bestEl = $("spaceBest");

  const touchLeft = $("touchLeftBtn");
  const touchRight = $("touchRightBtn");
  const touchFire = $("touchFireBtn");

  let gameRunning = false;
  let score = 0;
  let lives = 3;
  const maxLives = 4;
  let combo = 1;
  let comboTimer = 0;
  let timeLeft = 35;
  let gameTimer = null;
  let bestScore = Number(localStorage.getItem("shreya_arcade_best") || 0);
  if (bestEl) bestEl.textContent = String(bestScore).padStart(6, "0");

  let shipX = 450;
  let targetShipX = 450;
  const shipY = 485;
  let shipTilt = 0;

  let tripleLaserTimer = 0;
  let invulnerableTimer = 0;
  let damageFlashTimer = 0;
  let shakeTimeout = null;

  let bullets = [];
  let invaders = [];
  let powerups = [];
  let particles = [];
  let floatingTexts = [];
  let stars = [];

  const keys = {};
  let isPointerDown = false;
  let isPointerFiring = false;
  let touchLeftHeld = false;
  let touchRightHeld = false;
  let touchFireHeld = false;
  let autoFireCooldown = 0;
  let frameCount = 0;

  // Starfield initialization
  for (let i = 0; i < 75; i++) {
    stars.push({
      x: Math.random() * 900,
      y: Math.random() * 560,
      size: Math.random() < 0.2 ? 3 : Math.random() < 0.5 ? 2 : 1,
      speed: 0.6 + Math.random() * 1.8,
      color: Math.random() < 0.35 ? "#ff6faa" : Math.random() < 0.65 ? "#67e8f9" : "#ffd1eb"
    });
  }

  // Audio helpers for arcade game
  function playArcadeLaser(triple) {
    if (!soundOn) return;
    ensureAudio();
    if (triple) {
      tone(940, 0.045, "square", 0.024);
      tone(1260, 0.05, "sawtooth", 0.016, 0.02);
    } else {
      tone(740, 0.04, "square", 0.02);
      tone(220, 0.035, "square", 0.012, 0.015);
    }
  }

  function playArcadeExplosion(isBig) {
    if (!soundOn) return;
    ensureAudio();
    tone(isBig ? 95 : 130, isBig ? 0.14 : 0.08, "sawtooth", 0.035);
    tone(isBig ? 55 : 75, isBig ? 0.2 : 0.12, "square", 0.028, 0.03);
  }

  function playArcadePowerup() {
    if (!soundOn) return;
    ensureAudio();
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => {
      tone(f, 0.09, "triangle", 0.03, i * 0.04);
    });
  }

  function playArcadeHeart() {
    if (!soundOn) return;
    ensureAudio();
    [659.25, 880, 1174.66, 1567.98].forEach((f, i) => {
      tone(f, 0.12, "sine", 0.035, i * 0.045);
    });
  }

  function playArcadeHurt() {
    if (!soundOn) return;
    ensureAudio();
    tone(140, 0.16, "sawtooth", 0.045);
    tone(85, 0.22, "square", 0.035, 0.05);
  }

  function triggerScreenShake() {
    if (!shell) return;
    shell.classList.remove("screen-shake");
    void shell.offsetWidth;
    shell.classList.add("screen-shake");
    clearTimeout(shakeTimeout);
    shakeTimeout = setTimeout(() => {
      shell.classList.remove("screen-shake");
    }, 280);
  }

  function updateHUD() {
    if (scoreEl) scoreEl.textContent = String(score).padStart(6, "0");
    if (timeEl) timeEl.textContent = String(timeLeft).padStart(2, "0");
    if (comboEl) comboEl.textContent = `x${combo}`;
    if (livesEl) {
      livesEl.textContent = "♥ ".repeat(Math.max(0, lives)).trim() || "DEAD";
    }
    if (powerupEl) {
      if (tripleLaserTimer > 0) {
        powerupEl.textContent = `★ TRIPLE LASER (${Math.ceil(tripleLaserTimer)}s)`;
        powerupEl.classList.add("active");
      } else {
        powerupEl.textContent = "BLASTER: NORMAL";
        powerupEl.classList.remove("active");
      }
    }
  }

  function addFloatingText(text, x, y, color = "#ffd75e") {
    floatingTexts.push({
      text,
      x,
      y,
      color,
      vy: -1.2,
      alpha: 1.0,
      life: 45
    });
  }

  function spawnExplosion(x, y, color, count = 16) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 1.2 + Math.random() * 3.8;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        size: Math.random() < 0.3 ? 4 : 2,
        color: color || (Math.random() < 0.5 ? "#ff6faa" : "#67e8f9"),
        alpha: 1.0,
        life: 30 + Math.random() * 20
      });
    }
  }

  function spawnInvader() {
    const roll = Math.random();
    let type = "slime";
    let hp = 1;
    let w = 34;
    let h = 24;
    let color = "#ff6faa";
    let speed = 1.3 + Math.random() * 1.3;

    if (roll < 0.48) {
      type = "slime";
      hp = 1;
      w = 34;
      h = 24;
      color = "#ff6faa";
      speed = 1.2 + Math.random() * 1.4;
    } else if (roll < 0.88) {
      type = "saucer";
      hp = 1;
      w = 38;
      h = 24;
      color = "#67e8f9";
      speed = 1.3 + Math.random() * 1.2;
    } else {
      type = "dreadnought";
      hp = 3;
      w = 46;
      h = 32;
      color = "#ffd75e";
      speed = 0.85 + Math.random() * 0.6;
    }

    invaders.push({
      type,
      x: 45 + Math.random() * 810,
      y: -35,
      w,
      h,
      hp,
      maxHp: hp,
      speed,
      color,
      seed: Math.random() * 100,
      hitFlash: 0
    });
  }

  function spawnPowerup(x, y, forceType = null) {
    const type = forceType || (Math.random() < 0.45 ? "heart" : "star");
    powerups.push({
      type,
      x: Math.max(40, Math.min(860, x)),
      y,
      w: 24,
      h: 24,
      vy: 1.2 + Math.random() * 0.5,
      seed: Math.random() * 50
    });
  }

  function shoot() {
    if (!gameRunning) return;
    const isTriple = tripleLaserTimer > 0;
    playArcadeLaser(isTriple);

    if (isTriple) {
      bullets.push({ x: shipX - 2, y: shipY - 12, vx: 0, vy: -10.5, w: 4, h: 16, color: "#ffd75e" });
      bullets.push({ x: shipX - 16, y: shipY - 8, vx: -2.8, vy: -10, w: 4, h: 14, color: "#ff6faa" });
      bullets.push({ x: shipX + 12, y: shipY - 8, vx: 2.8, vy: -10, w: 4, h: 14, color: "#67e8f9" });
    } else {
      bullets.push({ x: shipX - 12, y: shipY - 8, vx: 0, vy: -10, w: 4, h: 14, color: "#ff6faa" });
      bullets.push({ x: shipX + 8, y: shipY - 8, vx: 0, vy: -10, w: 4, h: 14, color: "#ff6faa" });
    }
  }

  function resetGame() {
    gameRunning = false;
    clearInterval(gameTimer);
    bullets = [];
    invaders = [];
    powerups = [];
    particles = [];
    floatingTexts = [];
    score = 0;
    combo = 1;
    comboTimer = 0;
    lives = 3;
    timeLeft = 35;
    tripleLaserTimer = 0;
    invulnerableTimer = 0;
    damageFlashTimer = 0;
    shipX = 450;
    targetShipX = 450;
    shipTilt = 0;
    autoFireCooldown = 0;
    updateHUD();
    if (overlay) overlay.classList.remove("hidden");
  }

  function startGame() {
    resetGame();
    if (overlay) overlay.classList.add("hidden");
    gameRunning = true;

    if (!soundOn) {
      soundOn = true;
      const soundBtn = $("soundToggle");
      if (soundBtn) {
        soundBtn.textContent = "♪ ON";
        soundBtn.setAttribute("aria-pressed", "true");
      }
    }
    ensureAudio();
    launchSfx();

    gameTimer = setInterval(() => {
      if (!gameRunning) return;
      timeLeft--;
      if (tripleLaserTimer > 0) {
        tripleLaserTimer -= 1;
        if (tripleLaserTimer < 0) tripleLaserTimer = 0;
      }
      updateHUD();
      if (timeLeft <= 0) {
        endGame(true);
      }
    }, 1000);

    requestAnimationFrame(loop);
  }

  function endGame(isSurvive = true) {
    gameRunning = false;
    clearInterval(gameTimer);

    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem("shreya_arcade_best", bestScore);
      if (bestEl) bestEl.textContent = String(bestScore).padStart(6, "0");
    }

    if (overlay) {
      overlay.classList.remove("hidden");
      if (overlayTitle) {
        overlayTitle.textContent = isSurvive ? "MISSION ACCOMPLISHED!" : "SYSTEM OVERLOAD!";
      }
      if (overlaySubtitle) {
        overlaySubtitle.textContent = isSurvive
          ? `Superb defense, Shreya! You scored ${score} pts with true arcade mastery! ⭐`
          : `Great effort, Captain Shreya! Scored ${score} pts. Tap below to launch again! 🚀`;
      }
      if (startBtn) startBtn.textContent = "PLAY AGAIN ↻";
    }

    if (isSurvive) {
      winSfx();
      confetti(30);
    } else {
      playArcadeHurt();
    }
  }

  // Pixel drawing helpers
  function drawPixelHeart(c, cx, cy, s = 1, col = "#ff6faa") {
    c.save();
    c.fillStyle = col;
    const pixels = [
      [-2, -2], [-1, -2], [1, -2], [2, -2],
      [-3, -1], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1],
      [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0],
      [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1],
      [-1, 2], [0, 2], [1, 2],
      [0, 3]
    ];
    pixels.forEach(([px, py]) => {
      c.fillRect(cx + px * 3 * s, cy + py * 3 * s, 3 * s, 3 * s);
    });
    c.restore();
  }

  function drawPixelStar(c, cx, cy, s = 1, col = "#ffd75e") {
    c.save();
    c.fillStyle = col;
    const pixels = [
      [0, -3],
      [0, -2],
      [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1],
      [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0],
      [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1],
      [0, 2],
      [0, 3]
    ];
    pixels.forEach(([px, py]) => {
      c.fillRect(cx + px * 3 * s, cy + py * 3 * s, 3 * s, 3 * s);
    });
    c.restore();
  }

  function drawSlimeInvader(c, x, y, color, frame) {
    c.fillStyle = color;
    c.fillRect(x + 6, y + 4, 22, 14);
    c.fillRect(x + 2, y + 8, 30, 8);
    // Antennae
    c.fillRect(x + 6, y, 4, 4);
    c.fillRect(x + 24, y, 4, 4);
    // Eyes
    c.fillStyle = "#120516";
    c.fillRect(x + 8, y + 8, 5, 5);
    c.fillRect(x + 21, y + 8, 5, 5);
    c.fillStyle = "#fff";
    c.fillRect(x + 9, y + 9, 2, 2);
    c.fillRect(x + 22, y + 9, 2, 2);
    // Cheeks
    c.fillStyle = "rgba(255, 255, 255, 0.4)";
    c.fillRect(x + 4, y + 14, 4, 2);
    c.fillRect(x + 26, y + 14, 4, 2);
    // Legs
    c.fillStyle = color;
    if (frame === 0) {
      c.fillRect(x + 4, y + 18, 4, 4);
      c.fillRect(x + 15, y + 18, 4, 4);
      c.fillRect(x + 26, y + 18, 4, 4);
    } else {
      c.fillRect(x + 8, y + 18, 4, 4);
      c.fillRect(x + 22, y + 18, 4, 4);
    }
  }

  function drawSaucerInvader(c, x, y, color, frame) {
    // Glass dome
    c.fillStyle = "rgba(103, 232, 249, 0.9)";
    c.fillRect(x + 12, y + 2, 14, 8);
    c.fillStyle = "#ffd75e";
    c.fillRect(x + 16, y + 4, 6, 5);
    // Saucer body
    c.fillStyle = color;
    c.fillRect(x + 4, y + 10, 30, 8);
    c.fillRect(x + 2, y + 12, 34, 4);
    // Blinking lights
    c.fillStyle = frame === 0 ? "#ffd75e" : "#ff6faa";
    c.fillRect(x + 6, y + 13, 3, 2);
    c.fillRect(x + 17, y + 13, 4, 2);
    c.fillRect(x + 29, y + 13, 3, 2);
    // Bottom thruster beam
    c.fillStyle = "rgba(103, 232, 249, 0.45)";
    c.fillRect(x + 13, y + 18, 12, 3);
  }

  function drawDreadnoughtInvader(c, x, y, hp, maxHp, frame) {
    // Heavy golden hull
    c.fillStyle = "#ffd75e";
    c.fillRect(x + 8, y + 4, 30, 20);
    c.fillRect(x + 2, y + 10, 42, 10);
    c.fillRect(x + 17, y, 12, 6);
    // Pulsing core
    c.fillStyle = frame === 0 ? "#ff2a85" : "#67e8f9";
    c.fillRect(x + 19, y + 10, 8, 8);
    // Wing canons
    c.fillStyle = "#ffffff";
    c.fillRect(x + 4, y + 20, 4, 6);
    c.fillRect(x + 38, y + 20, 4, 6);
    // Health bar
    if (hp < maxHp) {
      c.fillStyle = "rgba(0,0,0,0.6)";
      c.fillRect(x + 3, y - 6, 40, 4);
      c.fillStyle = "#ff2a85";
      c.fillRect(x + 3, y - 6, 40 * (hp / maxHp), 4);
    }
  }

  function drawPlayerShip(c, x, y, tilt, invulnerable) {
    if (invulnerable && Math.floor(frameCount / 4) % 2 === 0) return;

    // Thruster flame animation
    const flameH = 8 + (Math.sin(frameCount * 0.9) * 5 + 5);
    c.fillStyle = "#67e8f9";
    c.fillRect(x - 17, y + 20, 6, flameH);
    c.fillRect(x + 11, y + 20, 6, flameH);
    c.fillStyle = "#ffffff";
    c.fillRect(x - 15, y + 20, 2, flameH * 0.6);
    c.fillRect(x + 13, y + 20, 2, flameH * 0.6);

    // Wings tilt adjustment
    const lTilt = tilt < 0 ? 2 : (tilt > 0 ? -2 : 0);
    const rTilt = tilt > 0 ? 2 : (tilt < 0 ? -2 : 0);

    // Outer blaster pods
    c.fillStyle = "#67e8f9";
    c.fillRect(x - 22, y + 10 + lTilt, 8, 14);
    c.fillRect(x + 14, y + 10 + rTilt, 8, 14);

    // Main magenta chassis
    c.fillStyle = "#ff6faa";
    c.fillRect(x - 16, y + 4, 32, 18);
    c.fillRect(x - 10, y - 4, 20, 10);
    c.fillRect(x - 4, y - 10, 8, 8);

    // Cyber accent edges
    c.fillStyle = "#ff2a85";
    c.fillRect(x - 24, y + 14 + lTilt, 4, 6);
    c.fillRect(x + 20, y + 14 + rTilt, 4, 6);

    // Cockpit canopy
    c.fillStyle = "#ffffff";
    c.fillRect(x - 5, y - 4, 10, 8);
    c.fillStyle = "#67e8f9";
    c.fillRect(x - 3, y - 2, 6, 5);

    // Birthday heart insignia
    drawPixelHeart(c, x, y + 11, 0.75, "#ffffff");
  }

  // Pointer drag & touch tracking
  function setShipPointerPos(clientX) {
    const r = canvas.getBoundingClientRect();
    const scaleX = 900 / r.width;
    const relX = (clientX - r.left) * scaleX;
    targetShipX = Math.max(30, Math.min(870, relX));
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (!gameRunning) return;
    isPointerDown = true;
    isPointerFiring = true;
    setShipPointerPos(e.clientX);
    shipX = targetShipX;
    shoot();
  });

  window.addEventListener("pointermove", (e) => {
    if (isPointerDown && gameRunning) {
      setShipPointerPos(e.clientX);
    }
  });

  window.addEventListener("pointerup", () => {
    isPointerDown = false;
    isPointerFiring = false;
  });

  window.addEventListener("pointercancel", () => {
    isPointerDown = false;
    isPointerFiring = false;
  });

  // Touch control bar buttons
  if (touchLeft) {
    touchLeft.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      touchLeftHeld = true;
    });
    window.addEventListener("pointerup", () => { touchLeftHeld = false; });
  }

  if (touchRight) {
    touchRight.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      touchRightHeld = true;
    });
    window.addEventListener("pointerup", () => { touchRightHeld = false; });
  }

  if (touchFire) {
    touchFire.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      touchFireHeld = true;
      shoot();
    });
    window.addEventListener("pointerup", () => { touchFireHeld = false; });
  }

  // Keyboard controls
  window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
    if ((e.key === " " || e.key === "ArrowUp") && gameRunning) {
      e.preventDefault();
      shoot();
    }
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
  });

  if (startBtn) startBtn.addEventListener("click", startGame);
  if (resetBtn) resetBtn.addEventListener("click", () => {
    resetGame();
    uiSfx();
  });

  // Main game loop
  function loop() {
    if (!gameRunning) return;
    frameCount++;

    // Decrease timers
    if (invulnerableTimer > 0) invulnerableTimer--;
    if (comboTimer > 0) {
      comboTimer--;
      if (comboTimer <= 0 && combo > 1) {
        combo = 1;
        updateHUD();
      }
    }

    // Ship steering: Keyboard & Touch buttons
    let moveDir = 0;
    if (keys["arrowleft"] || keys["a"] || touchLeftHeld) moveDir -= 1;
    if (keys["arrowright"] || keys["d"] || touchRightHeld) moveDir += 1;

    if (moveDir !== 0) {
      shipX += moveDir * 7.5;
      targetShipX = shipX;
      shipTilt = moveDir;
    } else if (isPointerDown) {
      // Smooth interpolation towards pointer
      const diff = targetShipX - shipX;
      shipX += diff * 0.35;
      shipTilt = Math.abs(diff) > 2 ? Math.sign(diff) : 0;
    } else {
      shipTilt = 0;
    }
    shipX = Math.max(30, Math.min(870, shipX));

    // Continuous auto-fire
    const isTriggeringFire = keys[" "] || keys["arrowup"] || isPointerFiring || touchFireHeld;
    if (isTriggeringFire) {
      autoFireCooldown--;
      if (autoFireCooldown <= 0) {
        shoot();
        autoFireCooldown = tripleLaserTimer > 0 ? 8 : 10;
      }
    } else {
      autoFireCooldown = 0;
    }

    // Spawning invaders & powerups
    if (Math.random() < 0.042) spawnInvader();
    if (Math.random() < 0.007) spawnPowerup(100 + Math.random() * 700, -20);

    // Clear canvas
    ctx.fillStyle = "#0c020e";
    ctx.fillRect(0, 0, 900, 560);

    // Draw scrolling Starfield
    stars.forEach((s) => {
      s.y += s.speed;
      if (s.y > 560) {
        s.y = 0;
        s.x = Math.random() * 900;
      }
      ctx.fillStyle = s.color;
      ctx.fillRect(s.x, s.y, s.size, s.size);
    });

    // Update & Draw Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx || 0;
      b.y += b.vy || -10;

      ctx.fillStyle = b.color || "#ff6faa";
      ctx.fillRect(b.x, b.y, b.w, b.h);

      if (b.y < -20 || b.x < -20 || b.x > 920) {
        bullets.splice(i, 1);
      }
    }

    // Update & Draw Power-ups
    for (let i = powerups.length - 1; i >= 0; i--) {
      const p = powerups[i];
      p.y += p.vy;
      const wobbleX = p.x + Math.sin(p.seed + frameCount * 0.06) * 35;

      if (p.type === "heart") {
        ctx.fillStyle = "rgba(255, 42, 133, 0.25)";
        ctx.beginPath();
        ctx.arc(wobbleX, p.y + 2, 16, 0, Math.PI * 2);
        ctx.fill();
        drawPixelHeart(ctx, wobbleX, p.y, 1.2, "#ff2a85");
      } else {
        ctx.fillStyle = "rgba(255, 215, 0, 0.25)";
        ctx.beginPath();
        ctx.arc(wobbleX, p.y + 2, 16, 0, Math.PI * 2);
        ctx.fill();
        drawPixelStar(ctx, wobbleX, p.y, 1.2, "#ffd75e");
      }

      // Catch power-up with ship
      if (
        wobbleX > shipX - 26 &&
        wobbleX < shipX + 26 &&
        p.y > shipY - 14 &&
        p.y < shipY + 28
      ) {
        if (p.type === "heart") {
          lives = Math.min(maxLives, lives + 1);
          score += 300;
          playArcadeHeart();
          addFloatingText("+1 LIFE! ♥", shipX, shipY - 20, "#ff6faa");
          spawnExplosion(shipX, shipY, "#ff6faa", 14);
        } else {
          tripleLaserTimer = 8.0;
          score += 250;
          playArcadePowerup();
          addFloatingText("★ TRIPLE LASER! ★", shipX, shipY - 20, "#ffd75e");
          spawnExplosion(shipX, shipY, "#ffd75e", 18);
        }
        updateHUD();
        powerups.splice(i, 1);
        continue;
      }

      if (p.y > 570) {
        powerups.splice(i, 1);
      }
    }

    // Update & Draw Invaders
    const frame = Math.floor(frameCount / 14) % 2;
    for (let i = invaders.length - 1; i >= 0; i--) {
      const inv = invaders[i];
      inv.y += inv.speed;

      if (inv.type === "saucer") {
        inv.x += Math.sin(inv.seed + frameCount * 0.05) * 1.8;
      }

      // Draw Invader based on type
      if (inv.type === "slime") {
        drawSlimeInvader(ctx, inv.x, inv.y, inv.color, frame);
      } else if (inv.type === "saucer") {
        drawSaucerInvader(ctx, inv.x, inv.y, inv.color, frame);
      } else {
        drawDreadnoughtInvader(ctx, inv.x, inv.y, inv.hp, inv.maxHp, frame);
      }

      // Collision: Bullets with Invaders
      for (let j = bullets.length - 1; j >= 0; j--) {
        const b = bullets[j];
        if (
          b.x < inv.x + inv.w &&
          b.x + b.w > inv.x &&
          b.y < inv.y + inv.h &&
          b.y + b.h > inv.y
        ) {
          bullets.splice(j, 1);
          inv.hp--;

          if (inv.hp <= 0) {
            const isBig = inv.type === "dreadnought";
            const pts = (isBig ? 500 : 150) * combo;
            score += pts;
            combo = Math.min(5, combo + 1);
            comboTimer = 180; // 3 seconds to keep combo alive
            updateHUD();

            playArcadeExplosion(isBig);
            spawnExplosion(inv.x + inv.w / 2, inv.y + inv.h / 2, inv.color, isBig ? 24 : 14);
            addFloatingText(`+${pts}`, inv.x + inv.w / 2, inv.y, combo > 2 ? "#ffd75e" : "#67e8f9");

            // Guaranteed powerup drop from dreadnought, or rare drop from others
            if (isBig) {
              spawnPowerup(inv.x + inv.w / 2, inv.y, Math.random() < 0.5 ? "star" : "heart");
            } else if (Math.random() < 0.08) {
              spawnPowerup(inv.x + inv.w / 2, inv.y);
            }

            invaders.splice(i, 1);
            break;
          } else {
            // Invader took damage but still alive
            hitSfx();
            spawnExplosion(b.x, b.y, "#ffffff", 4);
          }
        }
      }

      // Collision: Invader with Player Ship
      if (
        inv.x < shipX + 22 &&
        inv.x + inv.w > shipX - 22 &&
        inv.y < shipY + 24 &&
        inv.y + inv.h > shipY - 10
      ) {
        if (invulnerableTimer <= 0) {
          lives--;
          invulnerableTimer = 80;
          damageFlashTimer = 14;
          triggerScreenShake();
          playArcadeHurt();
          combo = 1;
          updateHUD();
          spawnExplosion(shipX, shipY, "#ff2a85", 22);

          if (lives <= 0) {
            endGame(false);
            return;
          }
        }
        spawnExplosion(inv.x + inv.w / 2, inv.y + inv.h / 2, inv.color, 12);
        invaders.splice(i, 1);
        continue;
      }

      // Escaped invaders
      if (inv.y > 560) {
        invaders.splice(i, 1);
        if (combo > 1) {
          combo = 1;
          updateHUD();
        }
      }
    }

    // Update & Draw Particle Explosions
    for (let i = particles.length - 1; i >= 0; i--) {
      const pt = particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.04;
      pt.life--;
      pt.alpha = Math.max(0, pt.life / 40);

      ctx.save();
      ctx.globalAlpha = pt.alpha;
      ctx.fillStyle = pt.color;
      ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
      ctx.restore();

      if (pt.life <= 0) particles.splice(i, 1);
    }

    // Update & Draw Floating Scores
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.y += ft.vy;
      ft.life--;
      ft.alpha = Math.max(0, ft.life / 45);

      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.fillStyle = ft.color;
      ctx.font = '10px "Press Start 2P"';
      ctx.textAlign = "center";
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();

      if (ft.life <= 0) floatingTexts.splice(i, 1);
    }

    // Draw Player Ship
    drawPlayerShip(ctx, shipX, shipY, shipTilt, invulnerableTimer > 0);

    // Red Damage Flash Overlay
    if (damageFlashTimer > 0) {
      ctx.fillStyle = `rgba(255, 30, 80, ${damageFlashTimer / 32})`;
      ctx.fillRect(0, 0, 900, 560);
      damageFlashTimer--;
    }

    requestAnimationFrame(loop);
  }

  updateHUD();
})();

// ==========================================
// CAKE REVEAL + KNIFE CUTTING
// ==========================================
const cakeStage = $("cakeStage");
let cakeCut = false;

const cakeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      cakeStage.classList.add("arrived");
      $("cakeState").textContent = "CAKE MODULE // KNIFE ARMED";
    });
  },
  { threshold: 0.5 }
);
cakeObserver.observe(cakeStage);

cakeStage.addEventListener("mouseenter", () => {
  if (!cakeCut) document.body.classList.add("knife-active");
});
cakeStage.addEventListener("mouseleave", () => {
  document.body.classList.remove("knife-active");
});
window.addEventListener("mousemove", (e) => {
  const cursor = $("knifeCursor");
  if (cursor) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});

let triggerCakeCanvasCut = null;

// =====================================================================
// HIGH-FIDELITY INTERACTIVE BIRTHDAY CAKE & SLICING ENGINE (CANVAS 2D/3D)
// =====================================================================
(function initHighFidelityCakeEngine() {
  const canvas = $("cakeCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // HiDPI Resolution Setup
  const dpr = window.devicePixelRatio || 1;
  const LOGICAL_W = 700;
  const LOGICAL_H = 520;
  canvas.width = LOGICAL_W * dpr;
  canvas.height = LOGICAL_H * dpr;

  // Animation State Variables
  let animTime = 0;
  let isSlicing = false;
  let sliceProgress = 0; // 0 to 1 (wedge sliding out)
  let slashProgress = 0; // 0 to 1 (knife slash motion)
  let flameScale = 1.0;
  const smokePuffs = [];
  const crumbs = [];

  const mouse = { x: 350, y: 260, targetX: 350, targetY: 260, hovering: false };

  // Track Mouse inside Canvas
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = LOGICAL_W / rect.width;
    const scaleY = LOGICAL_H / rect.height;
    mouse.targetX = (e.clientX - rect.left) * scaleX;
    mouse.targetY = (e.clientY - rect.top) * scaleY;
    mouse.hovering = true;
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.hovering = false;
  });

  // Render Engine Loop
  let lastTimestamp = 0;
  function renderScene(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
    lastTimestamp = timestamp;
    animTime += dt;

    // Smooth Mouse Interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.18;
    mouse.y += (mouse.targetY - mouse.y) * 0.18;

    // Slicing Animation Progress
    if (isSlicing) {
      if (slashProgress < 1.0) {
        slashProgress += dt * 3.5; // Fast knife cut motion
      } else if (sliceProgress < 1.0) {
        sliceProgress += dt * 1.8; // Slice slides out smoothly
        flameScale = Math.max(0, 1.0 - sliceProgress * 2.5);
      }
    }

    // Reset Canvas Matrix & Clear
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

    // 1. Draw Pedestal Platter & Shadow
    drawPedestal(ctx);

    // 2. Draw Main Cake Body (Tiers, Frosting Drips, Berries, Topper)
    drawMainCake(ctx, animTime, sliceProgress);

    // 3. Draw Exposed Inner Cut & Sliding Wedge Slice (When Sliced)
    if (sliceProgress > 0) {
      drawSliceAssembly(ctx, sliceProgress);
      drawSmokePuffs(ctx, dt);
      drawCrumbs(ctx, dt);
    }

    // 4. Draw Animated Candles & Flames
    drawCandles(ctx, animTime, flameScale);

    // 5. Draw Knife Slash Arc or Dynamic Knife Cursor
    if (isSlicing && slashProgress < 1.0) {
      drawKnifeSlash(ctx, slashProgress);
    } else if (mouse.hovering && !cakeCut) {
      drawKnifeCursor(ctx, mouse.x, mouse.y);
    }

    ctx.restore();
    requestAnimationFrame(renderScene);
  }
  requestAnimationFrame(renderScene);

  // Helper Drawing Functions

  // A. Pedestal Platter
  function drawPedestal(c) {
    c.save();
    // Drop Shadow
    c.beginPath();
    c.ellipse(350, 435, 230, 48, 0, 0, Math.PI * 2);
    c.fillStyle = "rgba(0, 0, 0, 0.45)";
    c.fill();

    // Dish Rim
    const platterGrad = c.createLinearGradient(120, 390, 580, 435);
    platterGrad.addColorStop(0, "#ffffff");
    platterGrad.addColorStop(0.5, "#e2e8f0");
    platterGrad.addColorStop(1, "#cbd5e1");

    c.beginPath();
    c.ellipse(350, 420, 220, 42, 0, 0, Math.PI * 2);
    c.fillStyle = platterGrad;
    c.shadowColor = "rgba(255, 42, 133, 0.4)";
    c.shadowBlur = 15;
    c.fill();
    c.lineWidth = 4;
    c.strokeStyle = "#ff388b";
    c.stroke();
    c.restore();
  }

  // B. Main Cake Body
  function drawMainCake(c, time, offsetP) {
    c.save();
    const cx = 350;
    const cy = 290;

    // Bottom Tier (310px width, 100px height)
    const bW = 310, bH = 100, bY = cy + 30;
    const bGrad = c.createLinearGradient(cx - bW/2, bY, cx + bW/2, bY + bH);
    bGrad.addColorStop(0, "#ff5ea4");
    bGrad.addColorStop(0.5, "#ff2a85");
    bGrad.addColorStop(1, "#c41865");

    // Bottom Tier Body
    c.beginPath();
    c.ellipse(cx, bY + bH, bW/2, 38, 0, 0, Math.PI);
    c.lineTo(cx - bW/2, bY);
    c.ellipse(cx, bY, bW/2, 38, 0, Math.PI, 0);
    c.closePath();
    c.fillStyle = bGrad;
    c.fill();
    c.lineWidth = 4;
    c.strokeStyle = "#000";
    c.stroke();

    // Top Tier (230px width, 85px height)
    const tW = 230, tH = 85, tY = cy - 45;
    const tGrad = c.createLinearGradient(cx - tW/2, tY, cx + tW/2, tY + tH);
    tGrad.addColorStop(0, "#ff85c0");
    tGrad.addColorStop(0.5, "#ff4fa0");
    tGrad.addColorStop(1, "#d6246c");

    // Top Tier Body
    c.beginPath();
    c.ellipse(cx, tY + tH, tW/2, 28, 0, 0, Math.PI);
    c.lineTo(cx - tW/2, tY);
    c.ellipse(cx, tY, tW/2, 28, 0, Math.PI, 0);
    c.closePath();
    c.fillStyle = tGrad;
    c.fill();
    c.lineWidth = 4;
    c.strokeStyle = "#000";
    c.stroke();

    // White Vanilla Cream Top Face
    c.beginPath();
    c.ellipse(cx, tY, tW/2 - 2, 26, 0, 0, Math.PI * 2);
    c.fillStyle = "#ffecf6";
    c.fill();
    c.stroke();

    // White Vanilla Drips on Top Tier
    c.beginPath();
    c.moveTo(cx - tW/2 + 6, tY + 4);
    c.bezierCurveTo(cx - tW/3, tY + 38, cx - tW/4, tY + 12, cx - tW/6, tY + 42);
    c.bezierCurveTo(cx, tY + 14, cx + tW/6, tY + 48, cx + tW/3, tY + 18);
    c.bezierCurveTo(cx + tW/2.3, tY + 32, cx + tW/2 - 6, tY + 8, cx + tW/2 - 2, tY + 4);
    c.fillStyle = "#ffecf6";
    c.fill();
    c.stroke();

    // Fresh Berries on Top Face
    drawBerry(c, cx - 60, tY - 6, "🍓");
    drawBerry(c, cx + 60, tY - 8, "🫐");
    drawBerry(c, cx - 15, tY + 10, "🍓");

    // Floating Golden 3D "19" Topper
    const topperY = tY - 65 + Math.sin(time * 2.2) * 4;
    c.save();
    c.font = 'bold 36px "Press Start 2P"';
    c.textAlign = "center";
    c.textBaseline = "middle";

    // Aura Glow
    c.shadowColor = "#ffd700";
    c.shadowBlur = 18;
    c.fillStyle = "#ffd700";
    c.fillText("19", cx, topperY);
    c.lineWidth = 4;
    c.strokeStyle = "#000";
    c.strokeText("19", cx, topperY);
    c.restore();

    c.restore();
  }

  // Berry Helper
  function drawBerry(c, x, y, emoji) {
    c.save();
    c.font = "24px sans-serif";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.shadowColor = "#000";
    c.shadowBlur = 6;
    c.fillText(emoji, x, y);
    c.restore();
  }

  // C. Candles & Flames
  function drawCandles(c, time, flameP) {
    c.save();
    const cx = 350;
    const tY = 245;

    const candlePositions = [
      { x: cx - 75, y: tY - 5 },
      { x: cx, y: tY - 18 },
      { x: cx + 75, y: tY - 5 }
    ];

    candlePositions.forEach((pos, idx) => {
      // Candle Body
      c.beginPath();
      c.rect(pos.x - 7, pos.y - 40, 14, 42);
      c.fillStyle = idx === 1 ? "#ffffff" : "#ff66b3";
      c.fill();
      c.lineWidth = 3;
      c.strokeStyle = "#000";
      c.stroke();

      // Flame (If not extinguished)
      if (flameP > 0.05) {
        const fY = pos.y - 54;
        const scale = flameP * (0.9 + Math.sin(time * 12 + idx) * 0.12);

        c.save();
        c.translate(pos.x, fY);
        c.scale(scale, scale);

        // Warm Point Glow
        c.beginPath();
        c.arc(0, 0, 18, 0, Math.PI * 2);
        c.fillStyle = "rgba(255, 215, 0, 0.4)";
        c.fill();

        // Flame Outer
        c.beginPath();
        c.ellipse(0, 0, 8, 14, 0, 0, Math.PI * 2);
        c.fillStyle = "#ffaa00";
        c.fill();

        // Flame Core
        c.beginPath();
        c.ellipse(0, 2, 4, 8, 0, 0, Math.PI * 2);
        c.fillStyle = "#ffffff";
        c.fill();

        c.restore();
      }
    });
    c.restore();
  }

  // D. Exposed Inner Cut & Sliding Wedge Slice Assembly
  function drawSliceAssembly(c, p) {
    c.save();
    const cx = 350;
    const cy = 290;
    const tY = cy - 45;

    // V-Cut Gap on Main Cake (Exposed inner cake layers)
    c.save();
    c.beginPath();
    c.moveTo(cx, tY);
    c.lineTo(cx + 80, tY + 30);
    c.lineTo(cx + 80, tY + 130);
    c.lineTo(cx, tY + 110);
    c.closePath();
    c.fillStyle = "#b81555";
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = "#000";
    c.stroke();

    // Exposed Inner Cream Line
    c.beginPath();
    c.moveTo(cx, tY + 50);
    c.lineTo(cx + 80, tY + 70);
    c.lineWidth = 8;
    c.strokeStyle = "#fff0f7";
    c.stroke();
    c.restore();

    // Sliding Triangular Slice on Plate (slides x + 115, y + 45)
    const sX = cx + p * 115;
    const sY = tY + p * 45;

    c.save();
    c.translate(sX, sY);

    // Dessert Plate
    c.beginPath();
    c.ellipse(0, 95, 75, 24, 0, 0, Math.PI * 2);
    c.fillStyle = "#ffffff";
    c.shadowColor = "rgba(0, 0, 0, 0.5)";
    c.shadowBlur = 12;
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = "#ff388b";
    c.stroke();

    // Wedge Cake Side Sponge (Inner cut layers)
    c.beginPath();
    c.moveTo(-35, -20);
    c.lineTo(35, 0);
    c.lineTo(35, 70);
    c.lineTo(-35, 50);
    c.closePath();
    c.fillStyle = "#ff388b";
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = "#000";
    c.stroke();

    // White Cream Layer in Slice
    c.beginPath();
    c.moveTo(-35, 15);
    c.lineTo(35, 35);
    c.lineWidth = 8;
    c.strokeStyle = "#ffecf6";
    c.stroke();

    // Slice Top Frosting
    c.beginPath();
    c.ellipse(0, -20, 36, 12, 0, 0, Math.PI * 2);
    c.fillStyle = "#ffecf6";
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = "#000";
    c.stroke();

    // Strawberry on Slice
    c.font = "20px sans-serif";
    c.textAlign = "center";
    c.fillText("🍓", 0, -25);

    c.restore();
    c.restore();
  }

  // E. Rising Smoke Puffs
  function drawSmokePuffs(c, dt) {
    if (Math.random() < 0.25 && smokePuffs.length < 12) {
      smokePuffs.push({
        x: 350 + (Math.random() - 0.5) * 140,
        y: 200,
        size: 14 + Math.random() * 12,
        opacity: 0.8,
        vy: 35 + Math.random() * 25
      });
    }

    c.save();
    smokePuffs.forEach((sp, idx) => {
      sp.y -= sp.vy * dt;
      sp.size += dt * 10;
      sp.opacity -= dt * 0.45;

      if (sp.opacity > 0) {
        c.font = `${sp.size}px sans-serif`;
        c.globalAlpha = Math.max(0, sp.opacity);
        c.fillText("☁️", sp.x, sp.y);
      } else {
        smokePuffs.splice(idx, 1);
      }
    });
    c.restore();
  }

  // F. Crumb Particles
  function drawCrumbs(c, dt) {
    if (crumbs.length < 16) {
      for (let i = 0; i < 16; i++) {
        crumbs.push({
          x: 350,
          y: 290,
          vx: (Math.random() - 0.4) * 180,
          vy: (Math.random() - 0.7) * 140,
          size: 3 + Math.random() * 5,
          color: i % 2 === 0 ? "#ff66b3" : "#ffd1eb"
        });
      }
    }

    c.save();
    crumbs.forEach((cr) => {
      cr.x += cr.vx * dt;
      cr.y += cr.vy * dt;
      cr.vy += 220 * dt; // Gravity

      if (cr.y < 430) {
        c.beginPath();
        c.arc(cr.x, cr.y, cr.size, 0, Math.PI * 2);
        c.fillStyle = cr.color;
        c.fill();
      }
    });
    c.restore();
  }

  // G. Dynamic Knife Cursor (Silver Metallic Chef Knife)
  function drawKnifeCursor(c, mx, my) {
    c.save();
    c.translate(mx, my);
    c.rotate(-Math.PI / 6);

    // Blade Metal
    const bGrad = c.createLinearGradient(0, -10, 80, 10);
    bGrad.addColorStop(0, "#ffffff");
    bGrad.addColorStop(0.5, "#cbd5e1");
    bGrad.addColorStop(1, "#64748b");

    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(75, -6);
    c.lineTo(65, 12);
    c.lineTo(0, 10);
    c.closePath();
    c.fillStyle = bGrad;
    c.shadowColor = "rgba(0,0,0,0.5)";
    c.shadowBlur = 8;
    c.fill();
    c.lineWidth = 2;
    c.strokeStyle = "#000";
    c.stroke();

    // Handle
    c.beginPath();
    c.rect(-30, -2, 30, 12);
    c.fillStyle = "#451a03";
    c.fill();
    c.stroke();

    c.restore();
  }

  // H. Slicing Slash Arc
  function drawKnifeSlash(c, p) {
    c.save();
    const sX = 420 - p * 140;
    const sY = 180 + p * 200;

    c.beginPath();
    c.moveTo(420, 180);
    c.lineTo(sX, sY);
    c.lineWidth = 6;
    c.strokeStyle = "#ffd700";
    c.shadowColor = "#ffd700";
    c.shadowBlur = 20;
    c.stroke();

    c.restore();
  }

  // Trigger Slicing
  triggerCakeCanvasCut = function() {
    if (isSlicing) return;
    isSlicing = true;
    slashProgress = 0;
    sliceProgress = 0;
  };

  canvas.addEventListener("click", () => {
    if (cakeCut) return;
    triggerCakeCanvasCut();
    cutCake();
  });
})();

function cutCake() {
  if (cakeCut) return;
  cakeCut = true;
  document.body.classList.remove("knife-active");
  cakeStage.classList.add("cut");

  if (typeof triggerCakeCanvasCut === "function") {
    triggerCakeCanvasCut();
  }

  // Update Objectives Checklist Safely
  const sC = $("statusCandles");
  if (sC) { sC.textContent = "DONE ✓"; sC.style.color = "var(--lime)"; }
  const sS = $("statusSlice");
  if (sS) { sS.textContent = "DONE ✓"; sS.style.color = "var(--lime)"; }
  const sSong = $("statusSong");
  if (sSong) { sSong.textContent = "PLAYING ♪"; sSong.style.color = "var(--gold)"; }

  const cs = $("cakeState");
  if (cs) cs.textContent = "CAKE MODULE // CUT COMPLETE ♥";
  const cm = $("cakeMessage");
  if (cm) cm.textContent = "SLICE COMPLETE! Happy Birthday Song & Side Glitter Burst unlocked for Shreya! ✨";
  const ch = $("cakeHint");
  if (ch) ch.textContent = "CAKE CUT // SONG PLAYING ♪";

  const cr = $("cakeReward");
  if (cr) cr.classList.add("unlocked");

  // Scatter realistic crumbs onto pedestal
  spawnCakeCrumbs();

  // Side Glitter Burst from both left & right edges
  sideGlitterBurst();

  // Play Happy Birthday Song (Ishq De Fanniyar MP3)
  playBirthdaySong();

  confetti(60);
  toast("HAPPY 19TH BIRTHDAY SHREYA ♪");
}

cakeStage.addEventListener("click", cutCake);
cakeStage.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    cutCake();
  }
});

$("wishBtn")?.addEventListener("click", () => {
  if (!soundOn) {
    soundOn = true;
    ensureAudio();
    const btn = $("soundToggle");
    if (btn) {
      btn.textContent = "♪ ON";
      btn.setAttribute("aria-pressed", "true");
    }
  }
  winSfx();
  confetti(25);
  const cm = $("cakeMessage");
  if (cm) cm.textContent = "WISH SENT TO SHREYA! MAY THIS YEAR BRING EVERYTHING YOU WANT.";
  toast("WISH SENT TO SHREYA ♥");
});

// MP3 Audio Player + Synthesized Retro Fallback Logic
let birthdayAudioObj = null;

function playBirthdaySong() {
  soundOn = true;
  ensureAudio();

  const btn = $("soundToggle");
  if (btn) {
    btn.textContent = "♪ ON";
    btn.setAttribute("aria-pressed", "true");
  }

  let audio = $("birthdayAudio") || birthdayAudioObj;
  if (!audio) {
    audio = new Audio("assets/happy_birthday.mp3");
    audio.id = "birthdayAudio";
    document.body.appendChild(audio);
  }

  birthdayAudioObj = audio;

  try {
    audio.volume = 0.85; // Mid to High volume (85%)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("[Audio Engine] Successfully playing happy_birthday.mp3 at 85% volume");
      }).catch(err => {
        console.warn("[Audio Engine] HTML5 Audio play error, playing synthesized fallback:", err);
        playHappyBirthday();
      });
    }
  } catch (e) {
    console.error("[Audio Engine] Playback exception:", e);
    playHappyBirthday();
  }
}

// Synthesized Retro Happy Birthday melody (Web Audio API)
function playHappyBirthday() {
  const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23;
  const G4 = 392.00, A4 = 440.00, B4 = 493.88;
  const C5 = 523.25, D5 = 587.33;

  const melody = [
    [G4,.28],[G4,.28],[A4,.5],[G4,.5],[C5,.5],[B4,.9],
    [G4,.28],[G4,.28],[A4,.5],[G4,.5],[D5,.5],[C5,.9],
    [G4,.28],[G4,.28],[G4,.45],[E4,.45],[C5,.45],[B4,.45],[A4,.9],
    [F4,.28],[F4,.28],[E4,.5],[C5,.5],[D5,.5],[C5,1.0]
  ];

  let t = 0;
  melody.forEach(([note, duration]) => {
    tone(note, duration * .84, "square", .035, t);
    tone(note / 2, duration * .45, "triangle", .01, t);
    t += duration;
  });
}

// ==========================================
// SECRET MESSAGE & FINAL ACTIONS
// ==========================================
$("secretBtn").addEventListener("click", () => {
  $("secretMessage").textContent = CONFIG.secretMessage;
  $("secretBox").classList.add("unlocked");
  $("secretBtn").textContent = "UNLOCKED ♥";
  $("secretBtn").disabled = true;
  winSfx();
  confetti(25);
  toast("SECRET NOTE UNLOCKED ✨");
});

$("finalWish").addEventListener("click", () => {
  if (!soundOn) {
    soundOn = true;
    ensureAudio();
    $("soundToggle").textContent = "♪ ON";
    $("soundToggle").setAttribute("aria-pressed", "true");
  }
  winSfx();
  confetti(30);
  toast("ANOTHER WISH SENT FOR SHREYA ✦");
});

// Toast Utility
var toastTimer = null;
function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2500);
}

// Confetti Utility
function confetti(amount = 20) {
  const colors = ["#ff6faa", "#ffd0df", "#ffffff", "#b8ff86", "#fcd34d", "#67e8f9"];
  const container = $("confetti");
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = `${6 + Math.random() * 8}px`;
    piece.style.animationDelay = `${Math.random() * .25}s`;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 2200);
  }
}

// Side Glitter Burst Utility (Triggers on Last Question)
function sideGlitterBurst() {
  const colors = ["#ff2a85", "#ffd700", "#00f0ff", "#ffffff", "#c084fc", "#9eff6e"];
  const count = 38;

  // Left side burst
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "side-glitter-piece side-glitter-left";
    p.style.top = `${12 + Math.random() * 75}vh`;
    p.style.color = colors[i % colors.length];
    p.style.background = colors[i % colors.length];
    p.style.setProperty("--tx", `${200 + Math.random() * 400}px`);
    p.style.setProperty("--ty", `${(Math.random() - 0.5) * 350}px`);
    p.style.animationDelay = `${Math.random() * 0.35}s`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2400);
  }

  // Right side burst
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "side-glitter-piece side-glitter-right";
    p.style.top = `${12 + Math.random() * 75}vh`;
    p.style.color = colors[i % colors.length];
    p.style.background = colors[i % colors.length];
    p.style.setProperty("--tx", `${200 + Math.random() * 400}px`);
    p.style.setProperty("--ty", `${(Math.random() - 0.5) * 350}px`);
    p.style.animationDelay = `${Math.random() * 0.35}s`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2400);
  }
}

// =====================================================================
// MAKE A WISH & BLOW CANDLES RITUAL
// =====================================================================
(function initWishRitual() {
  const makeWishBtn = $("makeWishBtn");
  const wishCard = $("wishCard");
  const wishInput = $("wishInput");
  const saveWishBtn = $("saveWishBtn");
  const wishStatus = $("wishStatus");
  const blowCandlesBtn = $("blowCandlesBtn");
  const wishModal = $("wishModal");
  const closeWishModalBtn = $("closeWishModalBtn");

  if (!makeWishBtn || !saveWishBtn || !blowCandlesBtn) return;

  // 1. Click "Make a Wish" -> Opens Wish Input Card
  makeWishBtn.addEventListener("click", () => {
    makeWishBtn.style.display = "none";
    wishCard.style.display = "block";
    if (wishInput) wishInput.focus();
    uiSfx();
  });

  // 2. Click "Save Wish" -> Saves silently to MongoDB Atlas 'love' collection
  saveWishBtn.addEventListener("click", async () => {
    const wishText = wishInput ? wishInput.value.trim() : "";
    if (!wishText) {
      if (wishStatus) {
        wishStatus.textContent = "Please write a wish first ✨";
        wishStatus.style.color = "var(--pink)";
      }
      return;
    }

    if (wishStatus) {
      wishStatus.textContent = "SAVING WISH SILENTLY... ⏳";
      wishStatus.style.color = "var(--gold)";
    }

    // Silently send wish to MongoDB Atlas
    try {
      fetch("/api/save-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qid: "birthday_wish",
          question: "Shreya 19th Birthday Wish",
          answer: wishText,
          user: "Shreya"
        })
      }).catch(err => console.log("Silent MongoDB sync notice:", err));
    } catch (e) {}

    // Show saved confirmation & reveal Blow Candles button
    setTimeout(() => {
      wishCard.style.display = "none";
      blowCandlesBtn.style.display = "inline-flex";
      winSfx();
      confetti(20);
      toast("WISH SAVED SILENTLY TO MONGO DB ♥");
    }, 400);
  });

  // 3. Click "Blow Candles" -> Extinguishes candles, triggers MP3 song, & pops up blessing message
  blowCandlesBtn.addEventListener("click", () => {
    // Cut cake (extinguishes candles, opens slice, updates status)
    cutCake();

    // Trigger Happy Birthday Song MP3 explicitly on user click gesture
    playBirthdaySong();

    // Trigger sfx & confetti
    launchSfx();
    sideGlitterBurst();
    confetti(50);

    // Show Popup Modal with requested blessing text
    if (wishModal) wishModal.style.display = "flex";
  });

  // 4. Click "Close Wish Modal" -> Closes popup
  if (closeWishModalBtn) {
    closeWishModalBtn.addEventListener("click", () => {
      if (wishModal) wishModal.style.display = "none";
      uiSfx();
    });
  }
})();
