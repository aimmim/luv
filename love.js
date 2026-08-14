// ============================================================
// FOR MY CAYANG ❤️
// GIANT 3D PARTICLE HEART
// ============================================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

scene.fog = new THREE.FogExp2(
    0x000000,
    0.006
);


// ============================================================
// CAMERA
// ============================================================

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

camera.position.set(
    0,
    8,
    45
);


// ============================================================
// RENDERER
// ============================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.8)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

document.body.appendChild(
    renderer.domElement
);


// ============================================================
// CLOCK
// ============================================================

const clock =
    new THREE.Clock();


// ============================================================
// UI
// ============================================================

const message =
    document.getElementById("message");

const mainText =
    document.getElementById("mainText");

const nameText =
    document.getElementById("nameText");

const startButton =
    document.getElementById("start");


// ============================================================
// STATE
// ============================================================

let state = "intro";

let stateTime = 0;

let messageShown = false;

let cycle = 0;

let started = false;


// ============================================================
// PARTICLE MATERIAL
// ============================================================

function particleMaterial(
    color,
    size,
    opacity
) {

    return new THREE.PointsMaterial({

        color: color,

        size: size,

        transparent: true,

        opacity: opacity,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending

    });

}


// ============================================================
// BACKGROUND UNIVERSE
// ============================================================

const backgroundPositions = [];

const BACKGROUND_COUNT = 6500;


for (
    let i = 0;
    i < BACKGROUND_COUNT;
    i++
) {

    backgroundPositions.push(

        THREE.MathUtils.randFloatSpread(150),

        THREE.MathUtils.randFloatSpread(100),

        THREE.MathUtils.randFloat(
            -160,
            20
        )

    );

}


const backgroundGeometry =
    new THREE.BufferGeometry();


backgroundGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        backgroundPositions,
        3
    )

);


const backgroundParticles =
    new THREE.Points(

        backgroundGeometry,

        particleMaterial(
            0xff8ccc,
            0.055,
            0.8
        )

    );


scene.add(
    backgroundParticles
);


// ============================================================
// PARTICLE FLOOR
// ============================================================

const floorPositions = [];

const FLOOR_COUNT = 15000;


for (
    let i = 0;
    i < FLOOR_COUNT;
    i++
) {

    const x =
        THREE.MathUtils.randFloatSpread(
            100
        );

    const z =
        THREE.MathUtils.randFloat(
            -5,
            -110
        );

    const y =
        THREE.MathUtils.randFloat(
            -0.18,
            0.18
        );

    floorPositions.push(
        x,
        y,
        z
    );

}


const floorGeometry =
    new THREE.BufferGeometry();


floorGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        floorPositions,
        3
    )

);


const floorParticles =
    new THREE.Points(

        floorGeometry,

        particleMaterial(
            0xff168d,
            0.075,
            0.75
        )

    );


floorParticles.position.y =
    -5;


scene.add(
    floorParticles
);


// ============================================================
// GIANT VORTEX
// ============================================================

const vortexPositions = [];

const VORTEX_COUNT = 9000;


for (
    let i = 0;
    i < VORTEX_COUNT;
    i++
) {

    const arm =
        i % 3;

    const t =
        Math.random()
        * Math.PI
        * 10;


    const radius =
        0.3
        +
        (t /
        (Math.PI * 10))
        * 15
        +
        Math.random()
        * 1.2;


    const angle =
        t +
        arm *
        (Math.PI * 2 / 3);


    const x =
        Math.cos(angle)
        * radius;


    const z =
        Math.sin(angle)
        * radius
        * 0.42
        - 16;


    const y =
        Math.random()
        * 0.3;


    vortexPositions.push(
        x,
        y,
        z
    );

}


const vortexGeometry =
    new THREE.BufferGeometry();


vortexGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        vortexPositions,
        3
    )

);


const vortex =
    new THREE.Points(

        vortexGeometry,

        particleMaterial(
            0xff43aa,
            0.105,
            0.95
        )

    );


vortex.position.y =
    -4.85;


scene.add(
    vortex
);


// ============================================================
// VORTEX CENTER
// ============================================================

const vortexRing =
    new THREE.Mesh(

        new THREE.RingGeometry(
            0.5,
            2.4,
            80
        ),

        new THREE.MeshBasicMaterial({

            color: 0xff48ad,

            transparent: true,

            opacity: 0.65,

            side: THREE.DoubleSide,

            blending:
                THREE.AdditiveBlending

        })

    );


vortexRing.rotation.x =
    -Math.PI / 2;


vortexRing.position.set(
    0,
    -4.7,
    -16
);


scene.add(
    vortexRing
);


// ============================================================
// GIANT HEART
// ============================================================

const HEART_COUNT = 18000;

const heartStart =
    new Float32Array(
        HEART_COUNT * 3
    );

const heartTarget =
    new Float32Array(
        HEART_COUNT * 3
    );


// ============================================================
// MATHEMATICAL HEART
// ============================================================

function heartFormula(t) {

    const x =
        16 *
        Math.pow(
            Math.sin(t),
            3
        );


    const y =

        13 *
        Math.cos(t)

        -

        5 *
        Math.cos(
            2 * t
        )

        -

        2 *
        Math.cos(
            3 * t
        )

        -

        Math.cos(
            4 * t
        );


    return {
        x,
        y
    };

}


// ============================================================
// CREATE HUGE VOLUMETRIC HEART
// ============================================================

for (
    let i = 0;
    i < HEART_COUNT;
    i++
) {

    const i3 =
        i * 3;


    // ----------------------------------------
    // RANDOM START POSITION
    // ----------------------------------------

    heartStart[i3] =
        THREE.MathUtils.randFloatSpread(
            60
        );


    heartStart[i3 + 1] =
        THREE.MathUtils.randFloatSpread(
            45
        );


    heartStart[i3 + 2] =
        THREE.MathUtils.randFloat(
            -35,
            15
        );


    // ----------------------------------------
    // HEART TARGET
    // ----------------------------------------

    const t =
        Math.random()
        * Math.PI
        * 2;


    const fill =
        Math.sqrt(
            Math.random()
        );


    const h =
        heartFormula(t);


    // IMPORTANT:
    // This makes the heart BIG.

    const scale =
        0.72 * fill;


    heartTarget[i3] =

        h.x
        * scale

        +

        THREE.MathUtils.randFloatSpread(
            0.35
        );


    heartTarget[i3 + 1] =

        h.y
        * scale

        +

        THREE.MathUtils.randFloatSpread(
            0.35
        );


    // IMPORTANT:
    // This gives REAL DEPTH.

    heartTarget[i3 + 2] =

        THREE.MathUtils.randFloatSpread(
            5
        )

        *

        (0.4 + fill);

}


// ============================================================
// HEART GEOMETRY
// ============================================================

const heartGeometry =
    new THREE.BufferGeometry();


heartGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(

        heartStart.slice(),

        3

    )

);


// ============================================================
// MAIN HEART PARTICLES
// ============================================================

const heartParticles =
    new THREE.Points(

        heartGeometry,

        particleMaterial(
            0xff299d,
            0.085,
            0.95
        )

    );


// ============================================================
// HEART GROUP
// ============================================================

const heartGroup =
    new THREE.Group();


heartGroup.position.set(
    0,
    9,
    -11
);


heartGroup.visible =
    false;


heartGroup.add(
    heartParticles
);


scene.add(
    heartGroup
);


// ============================================================
// HEART OUTER SPARKLES
// ============================================================

const sparklePositions = [];

const SPARKLE_COUNT = 5000;


for (
    let i = 0;
    i < SPARKLE_COUNT;
    i++
) {

    const t =
        Math.random()
        * Math.PI
        * 2;


    const h =
        heartFormula(t);


    const scale =
        0.75;


    sparklePositions.push(

        h.x * scale
        +
        THREE.MathUtils.randFloatSpread(
            0.6
        ),

        h.y * scale
        +
        THREE.MathUtils.randFloatSpread(
            0.6
        ),

        THREE.MathUtils.randFloatSpread(
            6
        )

    );

}


const sparkleGeometry =
    new THREE.BufferGeometry();


sparkleGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        sparklePositions,
        3
    )

);


const heartSparkles =
    new THREE.Points(

        sparkleGeometry,

        particleMaterial(
            0xff9ed5,
            0.12,
            0.9
        )

    );


heartGroup.add(
    heartSparkles
);


// ============================================================
// HEART GLOW
// ============================================================

const heartGlow =
    new THREE.Sprite(

        new THREE.SpriteMaterial({

            color: 0xff008c,

            transparent: true,

            opacity: 0.16,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        })

    );


heartGlow.scale.set(
    30,
    30,
    1
);


heartGroup.add(
    heartGlow
);


// ============================================================
// MORPH HEART
// ============================================================

function morphHeart(
    progress
) {

    const positions =
        heartGeometry
        .attributes
        .position
        .array;


    const eased =
        1 -
        Math.pow(
            1 - progress,
            3
        );


    for (
        let i = 0;
        i < HEART_COUNT * 3;
        i++
    ) {

        positions[i] =

            heartStart[i]

            +

            (
                heartTarget[i]
                -
                heartStart[i]
            )

            *

            eased;

    }


    heartGeometry
        .attributes
        .position
        .needsUpdate =
        true;

}


// ============================================================
// SHOW MESSAGE
// ============================================================

function showMessage() {

    if (
        messageShown
    ) {

        return;

    }


    messageShown =
        true;


    message.classList.add(
        "show"
    );

}


// ============================================================
// STATE
// ============================================================

function setState(
    next
) {

    state =
        next;

    stateTime =
        0;

    messageShown =
        false;

    message.classList.remove(
        "show"
    );


    if (
        next === "heart"
    ) {

        heartGroup.visible =
            true;

        mainText.textContent =
            "I LOVE YOU";

        nameText.textContent =
            "CAYANG ❤️";

    }


    if (
        next === "miss"
    ) {

        heartGroup.visible =
            true;

        mainText.textContent =
            "I MISS YOU";

        nameText.textContent =
            "CAYANG 🥺";

    }

}


// ============================================================
// RESET PARTICLES
// ============================================================

function resetHeart() {

    const positions =
        heartGeometry
        .attributes
        .position
        .array;


    for (
        let i = 0;
        i < HEART_COUNT * 3;
        i++
    ) {

        heartStart[i] =

            THREE.MathUtils.randFloatSpread(
                i % 3 === 2
                    ? 45
                    : 60
            );


        positions[i] =
            heartStart[i];

    }


    heartGeometry
        .attributes
        .position
        .needsUpdate =
        true;

}


// ============================================================
// EXPLOSION
// ============================================================

function explodeHeart() {

    const positions =
        heartGeometry
        .attributes
        .position
        .array;


    for (
        let i = 0;
        i < HEART_COUNT;
        i++
    ) {

        const i3 =
            i * 3;


        const x =
            positions[i3];


        const y =
            positions[i3 + 1];


        const z =
            positions[i3 + 2];


        const distance =
            Math.sqrt(
                x * x +
                y * y +
                z * z
            ) || 1;


        positions[i3] =

            x /
            distance *
            55;


        positions[i3 + 1] =

            y /
            distance *
            55;


        positions[i3 + 2] =

            z /
            distance *
            55;

    }


    heartGeometry
        .attributes
        .position
        .needsUpdate =
        true;

}


// ============================================================
// ANIMATION
// ============================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            clock.getDelta(),
            0.033
        );


    const elapsed =
        clock.getElapsedTime();


    stateTime +=
        delta;


    // ========================================================
    // INTRO
    // ========================================================

    if (
        state === "intro"
    ) {

        const progress =
            Math.min(
                stateTime / 6,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        // ------------------------------------
        // CAMERA ZOOM
        // ------------------------------------

        camera.position.z =

            45 -
            eased * 31;


        camera.position.y =

            6 +

            Math.sin(
                elapsed * 0.5
            )
            *
            0.5;


        camera.position.x =

            Math.sin(
                elapsed * 0.25
            )
            *
            2;


        camera.lookAt(
            0,
            1,
            -14
        );


        // ------------------------------------
        // PARTICLES MOVE
        // ------------------------------------

        backgroundParticles
            .rotation
            .y +=
            delta * 0.012;


        vortex.rotation.y +=
            delta * 0.8;


        vortexRing.rotation.z -=
            delta * 0.6;


        floorParticles
            .rotation
            .y =

            Math.sin(
                elapsed * 0.1
            )
            *
            0.03;


        // ------------------------------------
        // REVEAL HEART
        // ------------------------------------

        if (
            stateTime >= 6
        ) {

            setState(
                "heart"
            );

        }

    }


    // ========================================================
    // HEART
    // ========================================================

    if (
        state === "heart" ||
        state === "miss"
    ) {

        // ------------------------------------
        // FORM HEART
        // ------------------------------------

        const progress =
            Math.min(
                stateTime / 2.5,
                1
            );


        morphHeart(
            progress
        );


        // ------------------------------------
        // CINEMATIC CAMERA ORBIT
        // ------------------------------------

        const orbit =
            elapsed * 0.35;


        camera.position.x =

            Math.sin(
                orbit
            )
            *
            17;


        camera.position.z =

            Math.cos(
                orbit
            )
            *
            17;


        camera.position.y =

            9 +

            Math.sin(
                elapsed * 0.5
            )
            *
            2;


        camera.lookAt(
            heartGroup.position.x,
            heartGroup.position.y,
            heartGroup.position.z
        );


        // ------------------------------------
        // HEART ROTATES
        // ------------------------------------

        heartGroup.rotation.y +=
            delta *
            0.9;


        heartGroup.rotation.x =

            Math.sin(
                elapsed * 0.7
            )
            *
            0.18;


        // ------------------------------------
        // HEARTBEAT
        // ------------------------------------

        const heartbeat =

            1 +

            Math.max(
                0,
                Math.sin(
                    elapsed * 3.5
                )
            )
            *
            0.075;


        heartGroup.scale.setScalar(
            heartbeat
        );


        // ------------------------------------
        // SPARKLE ROTATION
        // ------------------------------------

        heartSparkles.rotation.y +=
            delta *
            0.45;


        // ------------------------------------
        // VORTEX
        // ------------------------------------

        vortex.rotation.y +=
            delta *
            1.1;


        vortexRing.rotation.z -=
            delta *
            0.8;


        // ------------------------------------
        // MESSAGE
        // ------------------------------------

        if (
            stateTime > 2.5 &&
            stateTime < 7
        ) {

            showMessage();

        }


        // ------------------------------------
        // EXPLODE
        // ------------------------------------

        if (
            stateTime > 7.5
        ) {

            message.classList.remove(
                "show"
            );


            explodeHeart();


            setState(
                "burst"
            );

        }

    }


    // ========================================================
    // BURST
    // ========================================================

    if (
        state === "burst"
    ) {

        camera.position.z =

            Math.max(
                8,
                17 -
                stateTime *
                4
            );


        camera.position.x =

            Math.sin(
                elapsed * 1.5
            )
            *
            5;


        camera.position.y =

            10 +
            Math.sin(
                elapsed
            )
            *
            3;


        camera.lookAt(
            0,
            7,
            -10
        );


        heartGroup.rotation.y +=
            delta *
            2.2;


        heartGroup.scale.setScalar(

            Math.max(
                0,
                1 -
                stateTime *
                0.6
            )

        );


        vortex.rotation.y +=
            delta *
            2;


        // ------------------------------------
        // NEXT
        // ------------------------------------

        if (
            stateTime > 2.5
        ) {

            cycle++;


            resetHeart();


            heartGroup.scale.setScalar(
                1
            );


            setState(

                cycle % 2 === 1

                    ? "miss"

                    : "heart"

            );

        }

    }


    // ========================================================
    // RENDER
    // ========================================================

    renderer.render(
        scene,
        camera
    );

}


// ============================================================
// START
// ============================================================

function startExperience() {

    if (started) {
        return;
    }

    started = true;

    startButton.classList.add(
        "hide"
    );

    setState(
        "intro"
    );

}


const openButton =
    document.getElementById("openButton");


openButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        event.stopPropagation();

        startExperience();

    }
);


// ============================================================
// RESIZE
// ============================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =

            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.setPixelRatio(

            Math.min(
                window.devicePixelRatio,
                1.8
            )

        );

    }
);


// ============================================================
// START
// ============================================================




animate();