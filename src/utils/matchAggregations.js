export function summarizeByMap(matches) {
  const byMap = {};
  for (const m of matches) {
    const key = m.map || "Unknown";
    byMap[key] ??= { games:0, wins:0, losses:0, ties:0, avgCoach:0, coachSum:0, errors:{throwRounds:0, macroFails:0, infoIssues:0} };
    const bucket = byMap[key];
    bucket.games++;
    if (m.result === "Win") bucket.wins++;
    else if (m.result === "Loss") bucket.losses++;
    else bucket.ties++;

    const rating = m?.coach?.rating ?? 0;
    bucket.coachSum += rating;

    const thr = m?.stats?.throwRounds ?? 0;
    bucket.errors.throwRounds += thr;

    const mf = (m?.tactics?.macroFails || []).length;
    bucket.errors.macroFails += mf;

    const ii = (m?.tactics?.infoIssues || []).length;
    bucket.errors.infoIssues += ii;
  }
  for (const k of Object.keys(byMap)) {
    const b = byMap[k];
    b.avgCoach = b.games ? (b.coachSum / b.games) : 0;
    b.winrate = b.games ? (b.wins / b.games) : 0;
  }
  return byMap;
}

export function summarizeByWeek(matches) {
  const byWeek = {};
  for (const m of matches) {
    const key = m.weekKey || "Unknown";
    byWeek[key] ??= { games:0, wins:0, losses:0, atkWon:0, defWon:0, firstKills:0, trades:0, clutches:0, throws:0 };
    const b = byWeek[key];
    b.games++;
    if (m.result === "Win") b.wins++; else if (m.result === "Loss") b.losses++;
    b.atkWon += m?.stats?.atkRoundsWon ?? 0;
    b.defWon += m?.stats?.defRoundsWon ?? 0;
    b.firstKills += m?.stats?.firstKillsFor ?? 0;
    b.trades += m?.stats?.effectiveTrades ?? 0;
    b.clutches += m?.stats?.clutchRoundsWon ?? 0;
    b.throws += m?.stats?.throwRounds ?? 0;
  }
  return byWeek;
}

export function commonErrors(matches) {
  const counts = { macro: {}, info: {} };
  for (const m of matches) {
    for (const e of (m?.tactics?.macroFails || [])) counts.macro[e] = (counts.macro[e]||0)+1;
    for (const e of (m?.tactics?.infoIssues || [])) counts.info[e] = (counts.info[e]||0)+1;
  }
  // Top 5
  const top = (obj) => Object.entries(obj).sort((a,b)=>b[1]-a[1]).slice(0,5);
  return { topMacro: top(counts.macro), topInfo: top(counts.info) };
}
