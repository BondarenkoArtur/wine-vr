AFRAME.registerComponent("imagetarget", {
  schema: {
    name: { type: "string" },
    rotated: { type: "bool" },
    metadata: { type: "string" }
  },
  init: function() {
    const { object3D, sceneEl } = this.el;

    const cabernet = document.querySelector("#cabernet");

    // Hide the image target until it is found
    object3D.visible = false;

    const tapTarget = document.createElement("a-box");
    // Image targets are 3:4 so the target is scaled to match
    tapTarget.setAttribute("scale", "1.8 1.8 1.8");
    tapTarget.setAttribute("position", "0.015 -1.1 0");
    tapTarget.setAttribute("material", "opacity: 0; transparent:true");
    this.el.appendChild(tapTarget);

    // showImage handles displaying and moving the virtual object to match the image
    const showImage = ({ detail }) => {
      focus.classList.add("hidden");
      animationHandler();
      // Updating position/rotation/scale using object3D is more performant than setAttribute
      object3D.position.copy(detail.position);
      object3D.quaternion.copy(detail.rotation);
      object3D.scale.set(detail.scale, detail.scale, detail.scale);
      object3D.visible = true;
      // Add tapTarget as a clickable object
      tapTarget.classList.add("cantap");
    };

    // hideImage handles hiding the virtual object when the image target is lost
    const hideImage = () => {
      object3D.visible = false;
      document.getElementById("cabernet").removeAttribute("animation-mixer");
      // Remove tapTarget from clickable objects
      tapTarget.classList.remove("cantap");
      focus.classList.remove("hidden");
    };

    // These events are routed and dispatched by xrextras-generate-image-targets
    this.el.addEventListener("xrimagefound", showImage);
    this.el.addEventListener("xrimageupdated", showImage);
    this.el.addEventListener("xrimagelost", hideImage);

    const oboardingHasShowed = () => {
      return !!localStorage.getItem("oboardingHasShowed");
    };

    const markOnboardingAsShowed = () => {
      localStorage.setItem("oboardingHasShowed", true);
    };

    const realityReadyHandler = () => {
      if (!oboardingHasShowed()) {
        wrapper.classList.remove("hidden");
      } else {
        focus.classList.remove("hidden");
      }
    };

    const onBtnClickHandler = e => {
      e.stopPropagation();
      wrapper.classList.add("hidden");
      focus.classList.remove("hidden");
      markOnboardingAsShowed();
    };

    const animationHandler = () => {
      if (this.el.id === "xrextras-imagetargets-One Hope Cabernet") {
        console.log(cabernet.getAttribute());
        cabernet.setAttribute("animation-mixer", {
          clip: "Take 001",
          loop: "once",
          // duration: "1",
          clampWhenFinished: true,
          timeScale: "3"
        });
      }
    };

    const wrapper = document.getElementById("onboarding-wrapper");
    const btn = document.getElementById("onboarding-btn");
    const focus = document.getElementById("focus");

    btn.addEventListener("click", onBtnClickHandler);

    // fires when camera is ready
    sceneEl.addEventListener("realityready", realityReadyHandler);
  }
});

// xrextras-generate-image-targets uses this primitive to automatically populate multiple image targets
AFRAME.registerPrimitive("image-target", {
  defaultComponents: {
    imagetarget: {}
  },

  mappings: {
    name: "imagetarget.name",
    rotated: "imagetarget.rotated",
    metadata: "imagetarget.metadata"
  }
});
