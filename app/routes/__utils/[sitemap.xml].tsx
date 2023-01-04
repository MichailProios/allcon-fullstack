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
                <loc>https://allconcontracting.com/company</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/company/management</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/blog</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/projects</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/resources</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/resources/references</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/resources/brochures</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/contacts</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/contacts/locations</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/login</loc>
            </url>
            <url>
                <loc>https://allconcontracting.com/register</loc>
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
