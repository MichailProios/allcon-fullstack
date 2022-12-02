import projects from "~/utils/projects";

export const loader = () => {
  const projectLinks = Array.from(projects.values()).map(
    (value: any, index: any) => {
      return `<url>
                <loc>https://allconcontracting.com${value.path}</loc>
            </url>`;
    }
  );

  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://allconcontracting.com</loc>              
            </url>
             <url>
                <loc>https://allconcontracting.com/about</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/projects</loc>
            </url>
             <url>
                <loc>https://allconcontracting.com/testimonies</loc>
            </url>
             <url>
                <loc>https://allconcontracting.com/contacts</loc>
            </url>
            ${projectLinks.join("")}          
        </urlset>
        `;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
