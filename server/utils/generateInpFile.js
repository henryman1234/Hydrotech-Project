
// Extrait de generateInpFile.js
export function generateInpFile(nodes, pipes) {

  const lines = [];
  
  lines.push("[TITLE]");
  lines.push("Simulation hydraulique - Reseau " + new Date().toLocaleDateString());
  lines.push("");

  const patternsMap = new Map();
  nodes.forEach(node => {
    

    if (node.pattern && node.pattern.patternName) {
      patternsMap.set(node.pattern.patternName, node.pattern.multipliers);
    }
  });

  // ÉCRITURE DE LA SECTION PATTERNS
  lines.push("[PATTERNS]");
  lines.push(";ID          Multipliers");
  for (const [name, multipliers] of Array.from(patternsMap.entries() )) {
    lines.push(`${name.padEnd(12)} ${multipliers.join(' ')} `);
  }
  lines.push("");


  // 2. SECTION JONCTIONS
  lines.push("[JUNCTIONS]");
  lines.push(";ID          Elevation   Demand   Pattern");
  for (const node of nodes) {
    if (node.type !== "Reservoir") { // On exclut les réservoirs ici
      // const id = `J_${node._id.toString().slice(-4)}`;
      const id = (node.code || node._id || "J?").toString().replace(/\s+/g, '_');
      const elev = (node.elevation || 0).toFixed(2);
      const dem = (node.baseDemand || 0).toFixed(2);
      const pat = node.pattern ? node.pattern.patternName : "";
      lines.push(` ${id.padEnd(10)} ${elev.padEnd(11)} ${dem.padEnd(11)}  ${pat}`);
    }
  }
  lines.push("");
  

  // 3. SECTION RESERVOIRS
  lines.push("[RESERVOIRS]");
  lines.push(";ID          Head");
  for (const node of nodes) {
    if (node.type === "Reservoir") {
      const id = (node.code || node._id || "R?").toString().replace(/\s+/g, '_');
      const head = (node.elevation || 0).toFixed(2);
      lines.push(` ${id.padEnd(10)} ${head.padEnd(11)} `);
    }
  }
  lines.push("");

  // 4. SECTION CONDUITES
  lines.push("[PIPES]");
  lines.push(";ID          Node1      Node2      Length    Diameter  Roughness");
  for (const pipe of pipes) {
    const id = (pipe._id || pipe._code || "P?").toString().replace(/\s+/g, '_');
    const n1 = (pipe.startNode?.code || pipe.startNode || "?").toString().replace(/\s+/g, '_');
    const n2 = (pipe.endNode?.code || pipe.endNode || "?").toString().replace(/\s+/g, '_');
    const len = (pipe.length || 100).toString();
    const dia = (pipe.diameter || 100).toString();
    const rough = getRoughness(pipe.material);
    lines.push(` ${id.padEnd(10)} ${n1.padEnd(10)} ${n2.padEnd(10)} ${len.padEnd(9)} ${dia.padEnd(9)} ${rough.toString().padEnd(10)} `);
  }
  lines.push("");


  // 5. TEMPS DE SIMULATION
  lines.push("[TIMES]");
  lines.push("DURATION  24:00");
  lines.push("HYDRAULIC TIMESTEP  1:00"); /**on fait la modulation pour chaque heure */
  lines.push("QUALITY TIMESTEP  0:05"); /**Intervalle qualité */
  lines.push("PATTERN TIMESTEP  6:00"); /**le pas de modulation */
  lines.push("");

  
  // 6. CONFIGURATION ET OPTIONS
  lines.push("[OPTIONS]");
  lines.push("UNITS           LPS");
  lines.push("HEADLOSS        D-W"); // Darcy-Weisbach
  lines.push("");

  // 7. REPORTS
  lines.push("[REPORT]");
  lines.push("STATUS          YES");
  lines.push("SUMMARY         YES");
  lines.push("NODES           ALL");
  lines.push("LINKS           ALL");
  lines.push("");

  lines.push("[END]");

  return lines.join("\n");
}

function getRoughness(material) {
  switch (material?.toUpperCase()) {
    case "PVC": return 0.0015;
    case "PEHD": return 0.0015;
    case "FONTE DUCTILE": return 0.26;
    case "FONTE GRISE": return 0.26;
    default: return 0.1;
  }
}

