export function generateInpFileTest(nodes, pipes) {
    const lines = [];
    
    lines.push("[TITLE]");
    lines.push("Simulation hydraulique - Reseau " + new Date().toLocaleDateString());
    lines.push("");
  
// 1. PATTERNS
  // Puisque les nœuds sont peuplés, on extrait les patterns uniques depuis les nœuds
  const uniquePatterns = [...new Map(nodes.filter(n => n.pattern).map(n => [n.pattern._id.toString(), n.pattern])).values()];

  lines.push("[PATTERNS]");
  lines.push(";ID      Multipliers");
  uniquePatterns.forEach(p => {
    lines.push(`${p.patternName.padEnd(8)} ${p.multipliers.join(' ')}`);
  });
  lines.push("");

  // 2. JUNCTIONS
  lines.push("[JUNCTIONS]");
  lines.push(";ID          Elevation   Demand      Pattern");
  for (const node of nodes.filter(n => n.type === "Junction")) {
    const id = node.name.replace(/\s+/g, '_');
    const pName = node.pattern ? node.pattern.patternName : ""; // On utilise le nom peuplé
    lines.push(` ${id.padEnd(10)} ${node.elevation.toFixed(2).padEnd(11)} ${node.baseDemand.toFixed(2).padEnd(11)} ${pName}`);
  }
  lines.push("");
  
    // 3. SECTION RESERVOIRS
    lines.push("[RESERVOIRS]");
    lines.push(";ID          Head");
    for (const node of nodes) {
      if (node.type === "Reservoir") {
        const id = (node.code || node._id || "R?").toString().replace(/\s+/g, '_');
        const head = (node.elevation || 0).toFixed(2);
        lines.push(` ${id.padEnd(10)} ${head.padEnd(11)} ;`);
      }
    }
    lines.push("");
  
    // 4. SECTION CONDUITES
    lines.push("[PIPES]");
    lines.push(";ID          Node1      Node2      Length    Diameter  Roughness");
    for (const pipe of pipes) {
      const id = (pipe.code || pipe._id || "P?").toString().replace(/\s+/g, '_');
      const n1 = (pipe.startNode?.code || pipe.startNode || "?").toString().replace(/\s+/g, '_');
      const n2 = (pipe.endNode?.code || pipe.endNode || "?").toString().replace(/\s+/g, '_');
      const len = (pipe.length || 100).toString();
      const dia = (pipe.diameter || 100).toString();
      const rough = getRoughness(pipe.material);
      lines.push(` ${id.padEnd(10)} ${n1.padEnd(10)} ${n2.padEnd(10)} ${len.padEnd(9)} ${dia.padEnd(9)} ${rough.toString().padEnd(10)} ;`);
    }
    lines.push("");
  
  
    // 5. TEMPS DE SIMULATION
    lines.push("[TIMES]");
    lines.push("Duration  24:00");
    lines.push("Hydraulic Timestep  1:00"); /**on fait la modulation pour chaque heure */
    lines.push("Quality Timestep  0:05"); /**Intervalle qualité */
    lines.push("Pattern Timestep  1:00"); /**le pas de modulation */
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
  
  
  
  