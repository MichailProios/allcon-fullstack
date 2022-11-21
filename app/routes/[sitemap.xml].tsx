export const loader = () => {
  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://allconcontracting.com</loc>              
            </url>
             <url>
                <loc>https://allconcontracting.com/about</loc>
            </url>
            <url>
                <loc>https://eucrona.com/projects</loc>
            </url>
             <url>
                <loc>https://eucrona.com/testimonies</loc>
            </url>
             <url>
                <loc>https://eucrona.com/contacts</loc>
            </url>          
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
