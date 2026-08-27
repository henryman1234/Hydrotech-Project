export function generateInpFileSimulation(nodes, pipes) {

  const lines = [];

  lines.push("[TITLE]");
  lines.push(`Simulation hydraulique - Réseau ${new Date().toLocaleDateString("fr-FR")}`);
  lines.push("");

  /**
   * ==========================================
   * PATTERNS
   * ==========================================
   */

  const patternsMap = new Map();

  nodes.forEach((node) => {

      if (node.pattern?.patternName) {

          patternsMap.set(
              node.pattern.patternName,
              node.pattern.multipliers
          );

      }

  });

  lines.push("[PATTERNS]");
  lines.push(";ID          Multipliers");

  for (const [name, multipliers] of patternsMap) {

      lines.push(
          `${name.padEnd(12)} ${multipliers.join(" ")}`
      );

  }

  lines.push("");

  /**
   * ==========================================
   * JUNCTIONS
   * ==========================================
   */

  lines.push("[JUNCTIONS]");
  lines.push(";ID          Elevation   Demand   Pattern");

  nodes.forEach((node) => {

      if (node.type === "Reservoir") return;

      const id =
          (node.code || node._id)
              .toString()
              .replace(/\s+/g, "_");

      const elevation = Number(node.elevation ?? 0).toFixed(2);

      const demand = Number(node.baseDemand ?? 0).toFixed(2);

      const pattern =
          node.pattern?.patternName ?? "";

      lines.push(
          `${id.padEnd(12)} ${elevation.padEnd(11)} ${demand.padEnd(10)} ${pattern}`
      );

  });

  lines.push("");

  /**
   * ==========================================
   * RESERVOIRS
   * ==========================================
   */

  lines.push("[RESERVOIRS]");
  lines.push(";ID          Head");

  nodes.forEach((node) => {

      if (node.type !== "Reservoir") return;

      const id =
          (node.code || node._id)
              .toString()
              .replace(/\s+/g, "_");

      const head =
          Number(node.elevation ?? 0).toFixed(2);

      lines.push(
          `${id.padEnd(12)} ${head}`
      );

  });

  lines.push("");

  /**
   * ==========================================
   * PIPES
   * ==========================================
   */

  lines.push("[PIPES]");
  lines.push(";ID          Node1       Node2       Length     Diameter   Roughness");

  pipes.forEach((pipe) => {

      const id =
          (pipe.code || pipe._id)
              .toString()
              .replace(/\s+/g, "_");

      const startNode =
          (pipe.startNode?.code || pipe.startNode)
              .toString()
              .replace(/\s+/g, "_");

      const endNode =
          (pipe.endNode?.code || pipe.endNode)
              .toString()
              .replace(/\s+/g, "_");

      /**
       * Les trois valeurs pouvant être modifiées
       * dans le mode scénario.
       */

      const length = Number(pipe.length ?? 100);

      const diameter = Number(pipe.diameter ?? 100);

      /**
       * Si l'utilisateur modifie la rugosité,
       * on la prend.
       *
       * Sinon on utilise la valeur du matériau.
       */

      const roughness =
          pipe.roughness ??
          getRoughness(pipe.material);

      lines.push(
          `${id.padEnd(12)} ${startNode.padEnd(11)} ${endNode.padEnd(11)} ${String(length).padEnd(10)} ${String(diameter).padEnd(10)} ${String(roughness)}`
      );

  });

  lines.push("");

  /**
   * ==========================================
   * TIMES
   * ==========================================
   */

  lines.push("[TIMES]");
  lines.push("DURATION              24:00");
  lines.push("HYDRAULIC TIMESTEP    1:00");
  lines.push("QUALITY TIMESTEP      0:05");
  lines.push("PATTERN TIMESTEP      6:00");
  lines.push("");

  /**
   * ==========================================
   * OPTIONS
   * ==========================================
   */

  lines.push("[OPTIONS]");
  lines.push("UNITS        LPS");
  lines.push("HEADLOSS     D-W");
  lines.push("");

  /**
   * ==========================================
   * REPORT
   * ==========================================
   */

  lines.push("[REPORT]");
  lines.push("STATUS    YES");
  lines.push("SUMMARY   YES");
  lines.push("NODES     ALL");
  lines.push("LINKS     ALL");
  lines.push("");

  lines.push("[END]");

  return lines.join("\n");

}

/**
* Valeur par défaut utilisée uniquement
* lorsqu'aucune rugosité n'est fournie.
*/
function getRoughness(material) {

  switch (material?.toUpperCase()) {

      case "PVC":
      case "PEHD":
          return 0.0015;

      case "FONTE DUCTILE":
      case "FONTE GRISE":
          return 0.26;

      default:
          return 0.1;

  }

}