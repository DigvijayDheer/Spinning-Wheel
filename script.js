new Vue({
  // Mount the Vue instance to the element with the id "app"
  el: "#app",
  data() {
    return {
      // An array of prize values
      prizes: [
        10, 20000, 50, 5000, 100, 250, 100000, 500, 1000, 2500, 10000, 50000,
      ],

      // A flag to control the button activity
      activeBtn: false,

      // The initial degree of rotation for the wheel
      deg: 0,
    };
  },
  methods: {
    spin() {
      // Play the spin sound
      spinSound.play();

      // Disable the spin button
      this.activeBtn = true;

      // Enable the spin button after 5.1 seconds
      setTimeout(() => (this.activeBtn = false), 5100);

      // Randomly determine the number of spins
      let spins = Math.floor(Math.random() * 7) + 9;
      console.log("spins: " + spins);

      // Randomly determine the initial wheel angle
      let wheelAngle = Math.floor(Math.random() * 12) * 30;
      // console.log("wheelAngle: " + wheelAngle);

      // Randomly determine the sector angle
      let sectorAngle = Math.floor(Math.random() * 14) + 1;

      // Randomly assign a positive or negative value to the sector angle
      sectorAngle *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      // console.log("sectorAngle: " + sectorAngle);

      // Calculate the final degree of rotation for the wheel
      this.deg += 360 * spins + wheelAngle + sectorAngle;

      // Apply the rotation to the wheel
      document.querySelector(
        ".inner"
      ).style.transform = `rotate(${this.deg}deg)`;

      // Adjust the degree of rotation by the sector angle after 0.1 seconds
      setTimeout(() => (this.deg -= sectorAngle), 100);

      // Calculate the index of the prize based on the final degree of rotation
      let index = Math.floor((this.deg - sectorAngle) / 30) % 12;
      // console.log("prize index:" + index);
      // console.log("you will win: " + this.prizes[index]);

      // Get the prize value based on the index
      const prize = this.prizes[index];

      // Play the applause sound after 4.6 seconds
      setTimeout(function () {
        applauseSound.play();
      }, 4600);

      // Show a success message with the prize value after 6 seconds
      setTimeout(function () {
        Swal.fire({
          title: `Good job! You won ${prize} points!`,
          width: 600,
          padding: "3em",
          color: "#716add",
          backdrop: `
            rgba(0,0,123,0.4)
          `,
        });
      }, 6000);
    },
  },
});
