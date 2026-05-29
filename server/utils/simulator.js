import { runSimulation } from "./hydraulicService.js";

const simulator = new runSimulation();

(async () => {
    await simulator.init();
    console.log("Simulateur démarré aves succès ✅")
})()


export {simulator}