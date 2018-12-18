function setDate() {
      const now = new Date();
      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      const secondHand = document.querySelector('.second-hand');
      secondHand.setAttribute("style", `transform: rotate(${secondsDegrees}deg)`);

      const minutes = now.getMinutes();
      const minutesDegrees = ((minutes / 60) *360) +90;
      const minuteHand = document.querySelector('.min-hand');
      minuteHand.setAttribute("style", `transform: rotate(${minutesDegrees}deg)`);

      let hours = now.getHours();
      if (hours >= 12) {
        hours -= 12;
      };
      const hourHand = document.querySelector('.hour-hand');
      const hoursDegrees = ((hours*30) +90);
      hourHand.setAttribute("style", `transform: rotate(${hoursDegrees}deg)`);

      console.log(`${hours}:${minutes}:${seconds}`);
    }

setInterval(setDate, 1000);