// Compone el Markdown del CV a partir de src/data, que es la misma fuente que
// alimenta el sitio. Así el CV y el portafolio no pueden divergir.

/** @param {import("../src/data/types.ts").CvData} data */
export function toMarkdown(data) {
  const { profile, experience, projects, skills, languages, education } = data;

  const contact = [
    profile.phone,
    profile.email,
    link(profile.linkedin),
    link(profile.github),
    link(profile.site),
  ].join(" · ");

  const out = [`# ${profile.fullName}`, "", contact, ""];

  out.push("## Experiencia", "");
  for (const company of experience) {
    out.push(
      `### ${company.legalName ?? company.name} <span>${company.location}</span>`,
      "",
    );
    for (const role of company.roles) {
      out.push(
        `#### ${role.title} <span>${role.startDate} – ${role.endDate}</span>`,
        "",
      );
      for (const task of role.tasks) out.push(`- ${task}`);
      out.push(`- **Tecnologías:** ${role.stack.join(", ")}.`, "");
    }
  }

  out.push("## Proyectos", "");
  for (const project of projects.filter((p) => p.inCv)) {
    const heading = project.tagline
      ? `${project.name} — ${project.tagline}`
      : project.name;
    const url = project.link ? ` <span>${link(project.link)}</span>` : "";
    out.push(`### ${heading}${url}`, "");
    out.push(`- ${project.description}`);
    out.push(`- **Tecnologías:** ${project.technologies.join(", ")}.`, "");
  }

  out.push("## Habilidades", "");
  for (const group of skills) {
    out.push(`- **${group.label}:** ${group.items.join(", ")}.`);
  }
  out.push("");

  // En una sola línea: ocupa menos y se escanea igual de rápido.
  out.push("## Idiomas", "");
  out.push(
    languages.map((l) => `**${l.name}:** ${l.level}`).join(" · ") + ".",
    "",
  );

  out.push("## Educación", "");
  for (const item of education) {
    out.push(`### ${item.institution} <span>${item.date}</span>`, "");
    out.push(item.degree, "");
  }

  return out.join("\n");
}

/** Muestra la URL sin protocolo ni www, pero mantiene el enlace. */
function link(url) {
  const label = url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
  return `[${label}](${url})`;
}
