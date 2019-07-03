// Manages the position of the image target.
AFRAME.registerComponent("image-target", {
  init: function() {
    const { object3D, sceneEl } = this.el;
    object3D.visible = false;

    // Sets the position of the frame to match the image target.
    const showImage = ({ detail }) => {
      const { id } = detail.metadata;
      focus.classList.add("hidden");

      if (object3D.el.id === id) {
        object3D.position.copy(detail.position);
        object3D.quaternion.copy(detail.rotation);
        object3D.scale.set(detail.scale, detail.scale, detail.scale);
        object3D.visible = true;
      }
    };

    // Update the position of the frame when the image target is found or updated.
    sceneEl.addEventListener("xrimagefound", showImage);
    sceneEl.addEventListener("xrimageupdated", showImage);

    // Hide the image target when tracking is lost.
    sceneEl.addEventListener("xrimagelost", () => {
      object3D.visible = false;
    });

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

    const wrapper = document.getElementById("onboarding-wrapper");
    const btn = document.getElementById("onboarding-btn");
    const focus = document.getElementById("focus");

    btn.addEventListener("click", onBtnClickHandler);

    // fires when camera is ready
    sceneEl.addEventListener("realityready", realityReadyHandler);
  }
});
