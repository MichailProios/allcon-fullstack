export let projects = new Map();

// projects;
// .set("suny-farmingdale-lupton-hall", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4aee4395-0887-4070-980f-427a13fdb400",
//   path: "/projects/suny-farmingdale-lupton-hall",
//   media: [
//     {
//       video:
//         "https://customer-sn71r1ndnen7y1an.cloudflarestream.com/1dbfa8cbc7b88a99a3ca4e0775b3aa29/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-sn71r1ndnen7y1an.cloudflarestream.com%2F1dbfa8cbc7b88a99a3ca4e0775b3aa29%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D36s%26height%3D600&startTime=36s",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4aee4395-0887-4070-980f-427a13fdb400",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/fb31d82d-de7b-4b78-7696-c25a404e7400",
//       aspectRatio: 9 / 16,
//       order: 3,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/1475bdbd-5d54-464e-e167-ed882dbafe00",
//       aspectRatio: 16 / 9,
//       order: 4,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/d5dbe854-6c92-4437-3ea1-10309d307900",
//       aspectRatio: 16 / 9,
//       order: 5,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e31c4ddd-e85a-4308-3c95-751fc2679200",
//       aspectRatio: 16 / 9,
//       order: 6,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e09765a8-fcf2-4d7e-80b0-0d7736683d00",
//       aspectRatio: 16 / 9,
//       order: 7,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/5ed56c9f-3769-4491-df95-27c2d4f8b900",
//       aspectRatio: 16 / 9,
//       order: 8,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/5e9f56da-0023-42fa-7520-397aac25de00",
//       aspectRatio: 16 / 9,
//       order: 9,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/509cc521-880b-41e0-2a05-b81da893f800",
//       aspectRatio: 16 / 9,
//       order: 10,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3e869efd-9729-41d4-505c-22378c842300",
//       aspectRatio: 16 / 9,
//       order: 11,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/8cfe2996-dd43-4959-922a-3b2cf0f18100",
//       aspectRatio: 16 / 9,
//       order: 12,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/8d34b330-ea19-458e-bf90-2f6cf6bf5b00",
//       aspectRatio: 16 / 9,
//       order: 13,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/7b6136cc-91ee-4ce6-9b8e-6e985405ae00",
//       aspectRatio: 16 / 9,
//       order: 14,
//     },
//   ],
//   name: "SUNY Farmingdale Lupton Hall",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3656.175962884135!2d-73.43184257672124!3d40.75006397777022!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0xeb51b04102116aed!2sLupton%20Hall!5e1!3m2!1sen!2sus!4v1669330021063!5m2!1sen!2sus",
//   client: {
//     text: "State University Construction Fund",
//     tag: "SUNY",
//   },
//   status: { text: "The project was finished in 2022", completed: true },
//   cost: "$10,856,274.00",
//   designer: "Hoffmann Architects, Inc.",
//   description: `Allcon constructed a unique 90,000sf copper roof for Lupton Hall on the SUNY Farmingdale Campus. Our team proposed and helped develop a distinctive structural design during the initial removal and abatement stages of the project. The design included a high gauge metal framing system that bypassed the concrete deck and attached to the existing framing structure with blind bolts. The roof features a range of intricate craftsmanship, from the artfully fabricated dormers to the carefully sculpted gutter system designed to withstand wind speeds up to 126 mph. We ensured that the copper fabrication used a mix of machine fabrication for the panels to control costs, along with hand-crafted units for the fine intricate detail work. This project is a showcase of Allcon's capabilities and a signature piece of work for Farmingdale's dedication to excellence on campus.`,
// })
// .set("ogs-dot-elwood-ny-operation-facility", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/36387977-1c91-49f6-dfa8-4bc5c6b6c600",
//   path: "/projects/ogs-dot-elwood-ny-operation-facility",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ed4adb38-21bf-4b5b-b620-16125cf56700",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/0fd7e300-c2f9-4058-83d9-1b59e1a6d900",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2251a5c0-46c9-46ae-6445-9d0cf6eff900",
//       aspectRatio: 16 / 9,
//       order: 3,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/69f7dcdc-7243-4b72-98e2-e3509db0cb00",
//       aspectRatio: 16 / 9,
//       order: 4,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/79e88004-c5e4-44c6-9472-ebf5b6c5df00",
//       aspectRatio: 16 / 9,
//       order: 5,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2fa05c2a-09b1-48b6-b723-520cbaf69000",
//       aspectRatio: 16 / 9,
//       order: 6,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/592a2268-127d-43b7-71f5-3116d504d000",
//       aspectRatio: 16 / 9,
//       order: 7,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/aba7602f-34dc-4ffd-1cf8-51be7cce0c00",
//       aspectRatio: 16 / 9,
//       order: 8,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/36f280e4-143c-442e-bd4c-9ecbfc2ceb00",
//       aspectRatio: 16 / 9,
//       order: 9,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/9492136a-ba4e-47a3-a2b7-c5aac0640800",
//       aspectRatio: 16 / 9,
//       order: 10,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/36387977-1c91-49f6-dfa8-4bc5c6b6c600",
//       aspectRatio: 16 / 9,
//       order: 11,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/91075744-6d21-4f97-84ba-7c50e66ae000",
//       aspectRatio: 16 / 9,
//       order: 12,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/86382856-7487-464c-f1bc-03fe5e2e6000",
//       aspectRatio: 16 / 9,
//       order: 13,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ae21043e-097f-48a8-6acb-ea5d316b2d00",
//       aspectRatio: 16 / 9,
//       order: 14,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3676a5d7-595c-4f95-c0a7-1426c4b67f00",
//       aspectRatio: 16 / 9,
//       order: 15,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c0ce0238-47bb-4d18-f278-79a57d207b00",
//       aspectRatio: 16 / 9,
//       order: 16,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/f5291a6b-1730-4597-9e13-f2a5c1ce3800",
//       aspectRatio: 16 / 9,
//       order: 17,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3092d834-68c3-4760-17ab-2ff5d321ad00",
//       aspectRatio: 16 / 9,
//       order: 18,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/9a557653-a5f1-491d-367b-70de65121600",
//       aspectRatio: 16 / 9,
//       order: 19,
//     },
//   ],

//   name: "OGS DOT Elwood, NY Operation Facility ",
//   location: null,
//   client: {
//     text: "NYS Office of General Services",
//     tag: "OGS",
//   },

//   status: { text: "The project was finished in 2022", completed: true },
//   cost: "$7,000,000",
//   designer: "Kallen & Lemelson, LLP",
//   description: `Allcon Contracting was selected as the general contractor for the construction of a new DOT Operations Facility in Elwood, NY. The project included the restoration of an existing salt shed, the construction of a new heavy timber shed, and a new vehicle service and storage building, as well as the new operations office. Allcon performed more than 60% of the general contracting work on this project, including interior finishes, masonry, millwork, and metal panel installation. We worked closely with Laland Baptiste, who served as the CM on the project. Our collaborative approach ensured that the building was completed on time and within budget, while addressing any unforeseen field conditions and issues that arose. This was the second project collaboration between Allcon and Laland Baptiste, and our teamwork proved invaluable in delivering a successful project.`,
// })
// .set("sca-fiorello-laguardia-highschool", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/51598770-6c6c-49fa-c235-410159bb3700",
//   path: "/projects/sca-fiorello-laguardia-highschool",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/51598770-6c6c-49fa-c235-410159bb3700",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//   ],
//   name: "SCA Fiorello H. LaGuardia Highschool",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.8520104292147!2d-73.98837852352789!3d40.7741368338087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2585fcad1613f:0xcb0f24e1e025feaa!2s100%20Amsterdam%20Ave,%20New%20York,%20NY%2010023!5e1!3m2!1sen!2sus!4v1669673691833!5m2!1sen!2sus",
//   client: {
//     text: "School Construction Authority",
//     tag: "SCA",
//   },
//   status: { text: "The project is in progress", completed: false },
//   cost: null,
//   designer: null,
//   description:
//     "Allcon Contracting has been selected by the School Construction Authority as the general contractor for a project involving the upgrade of the Fiorello H. LaGuardia High School's theater shop. Our team is working closely with the school and the construction manager to ensure that the theater shop is modernized and meets the latest standards for performance spaces. This project is an important part of maintaining the school's infrastructure and ensuring that it remains a top-quality learning environment for students. We are committed to completing this project on time and within budget, and to providing the Fiorello H. LaGuardia High School with a state-of-the-art theater shop that will be a valuable resource for the school community.",
// })
// .set("sca-ps146-edward-collins", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/b83d58f9-1d62-403a-883d-171d68e3b500",
//   path: "/projects/sca-ps146-edward-collins",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/b83d58f9-1d62-403a-883d-171d68e3b500",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//   ],
//   name: "SCA PS 146 Edward Collins Elementary School",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0632337292773!2d-73.90829902352601!3d40.82480563070135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f44c8e955555:0xde76fafb865f275!2sP.S.%20146%20Edward%20Collins!5e1!3m2!1sen!2sus!4v1669674006853!5m2!1sen!2sus",
//   client: {
//     text: "School Construction Authority",
//     tag: "SCA",
//   },
//   status: { text: "The project is in progress", completed: false },
//   cost: null,
//   designer: null,
//   description:
//     "Allcon Contracting has been selected by the School Construction Authority as the general contractor for a project involving full program accessibility and low voltage electrical system work at the SCA PS 146 Edward Collins Elementary School. Our team is working closely with the school and the construction manager to ensure that all accessibility requirements are met and that the electrical system is upgraded to meet the latest standards. This project is an important step in making the school more accessible and inclusive for all students, and we are committed to completing it on time and within budget. We are proud to be working with the School Construction Authority on this important project, and to be providing the Edward Collins Elementary School with a modern and functional learning environment.",
// })

// .set("suny-old-westbury-campus-center", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/27fa0a33-6c79-4021-cab8-f987ff2c7900",
//   path: "/projects/suny-old-westbury-campus-center",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/27fa0a33-6c79-4021-cab8-f987ff2c7900",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//   ],
//   name: "SUNY Old Westbury Campus Center",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7306.979114346205!2d-73.5763718591698!3d40.79889749478871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c286b99dc9e0a5:0xa183cdb7c806a049!2sCampus%20Center,%20Wenwood%20Dr,%20Glen%20Head,%20NY%2011545!5e1!3m2!1sen!2sus!4v1670273585028!5m2!1sen!2sus",
//   client: {
//     text: "State University Construction Fund",
//     tag: "SUNY",
//   },
//   status: { text: "The project is in progress", completed: false },
//   // cost: "$10,856,274.00",
//   // designer: "Hoffmann Architects, Inc.",
//   description: `Allcon Contracting has been selected by the State University Construction Fund as the general contractor for a project involving campus center ADA upgrades at the SUNY Old Westbury Campus Center. Our team is working closely with the university and the construction manager to ensure that the campus center is fully accessible to all students, faculty, and staff. This involves a range of upgrades, including the installation of new ramps, elevators, and accessibility features throughout the building. We are committed to completing this project on time and within budget, and to providing the university with a fully accessible campus center that meets the needs of all members of the community. The upgraded SUNY Old Westbury Campus Center will be a state-of-the-art facility that provides accessibility and inclusivity for all.`,
// })

// .set("sca-psis218-rafael-hernandez", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/cf40a4b0-0c6b-4990-31ef-02d0ef82d000",
//   path: "/projects/sca-psis218-rafael-hernandez",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/cf40a4b0-0c6b-4990-31ef-02d0ef82d000",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//   ],
//   name: "SCA PS/IS 218 Rafael Hernandez Magnet School",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3651.4719044706962!2d-73.92125895243812!3d40.835542724149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x8da8781af2e34078!2sP.S./I.S.%20218%20Rafael%20Hernandez%20Dual%20Language%20Magnet%20School!5e1!3m2!1sen!2sus!4v1669762170248!5m2!1sen!2sus",
//   client: {
//     text: "School Construction Authority",
//     tag: "SCA",
//   },
//   status: { text: "The project is in progress", completed: false },
//   cost: null,
//   designer: null,
//   description:
//     "Allcon Contracting has been selected by the School Construction Authority as the general contractor for a project involving roof, exterior masonry, parapet, and flood elimination work at the SCA PS/IS 218 Rafael Hernandez Magnet School. Our team is working closely with the school and the construction manager to ensure that the roof, masonry, and parapets are in good condition and that the building is protected from future flooding. This project is an important part of maintaining the school's infrastructure and ensuring that it remains safe and functional for students and staff. We are committed to completing this project on time and within budget, and to providing the Rafael Hernandez Magnet School with a safe and secure building. The upgraded school will be a state-of-the-art facility that provides a safe and secure learning environment for students.",
// })

// .set("greatneck-terrace-roofs", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e7f76ad3-ea23-4fde-e911-178b09bb5400",
//   path: "/projects/greatneck-terrace-roofs",
//   media: [
//     {
//       video:
//         "https://customer-sn71r1ndnen7y1an.cloudflarestream.com/1813d1be91c9949d3fc00053953b0c22/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https://customer-sn71r1ndnen7y1an.cloudflarestream.com/1813d1be91c9949d3fc00053953b0c22/thumbnails/thumbnail.jpg%253Ftime=1m9s&height=600&startTime=1m8s",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e7f76ad3-ea23-4fde-e911-178b09bb5400",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },

//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/736315aa-97e9-43b3-8ab7-419739e23800",
//       aspectRatio: 16 / 9,
//       order: 3,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e8098e3f-c65b-413d-368b-22b50268b300",
//       aspectRatio: 16 / 9,
//       order: 4,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ed685c0b-cce2-4e23-713f-10f5829e9800",
//       aspectRatio: 16 / 9,
//       order: 5,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ab572a68-7d98-492f-aced-150ccde1d500",
//       aspectRatio: 16 / 9,
//       order: 6,
//     },
//   ],

//   name: "Greatneck Terrace Roofs",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },

//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: null,
//   designer: null,
//   description: null,
// })

// .set("hillside-support-facility", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4fcf5cb0-71bc-4846-bcf2-546c072a9b00",
//   path: "/projects/hillside-support-facility",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4fcf5cb0-71bc-4846-bcf2-546c072a9b00",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//   ],

//   name: "LIRR Hillside Support Facility Building",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.5732468037418!2d-73.78051308255615!3d40.70644529999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c261161959744f:0x9faba07c1564d147!2sHillside%20Support%20Facility!5e1!3m2!1sen!2sus!4v1670282230897!5m2!1sen!2sus",
//   client: { text: "Metropolitan Transportation Authority", tag: "MTA" },
//   status: { text: "The project is finshed", completed: true },

//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: "Between $2,000,000.00 and $2,800,000.00",
//   designer: null,
//   description: `Allcon Contracting was selected to perform a variety of tasks at the LIRR Hillside Support Facility Building for the Metropolitan Transportation Authority. Our team was responsible for sounding of the entire facade, masonry work, installation of interior partitions and finishes, rough and finished carpentry, installation of a sprinkler system, work on the fire alarm, HVAC, electrical, and plumbing systems. We worked closely with the MTA and the construction manager to ensure that our work was completed to the highest standards and met all of the agency's requirements. We were committed to completing our tasks on time and within budget, and we are proud of the final result. `,
// })

// .set("suny-farmingdale-laffin-hall", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/5c07d788-c233-4909-fad7-99ff2a8ddd00",
//   path: "/projects/suny-farmingdale-laffin-hall",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/5c07d788-c233-4909-fad7-99ff2a8ddd00",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/dc4da3ff-05a5-4a33-b2da-ca8cefc16b00",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//   ],
//   name: "SUNY Farmingdale Laffin Hall",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.137338021592!2d-73.4307236843586!3d40.75076644317949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e82af9c6412c1f:0x76f31f91061470f5!2sLaffin%20Hall,%20Farmingdale,%20NY%2011735!5e1!3m2!1sen!2sus!4v1670279672888!5m2!1sen!2sus",
//   client: {
//     text: "State University Construction Fund",
//     tag: "SUNY",
//   },
//   status: { text: "The project is finished", completed: true },
//   cost: "Under $1,000,000.00",
//   // designer: "Hoffmann Architects, Inc.",
//   description: `Allcon Contracting was selected to complete a variety of tasks on the renovation of Laffin Hall at SUNY Farmingdale for the State University Construction Fund. Our team was responsible for the sounding of the entire facade, concrete structural repair of columns and overhead, concrete crack repairs, crack injection, rust treatment of existing steel, and power washing. We worked closely with SUNY Farmingdale and the construction manager to ensure that our work met all of the university's requirements and was completed on time and within budget. We are proud of the final result, which has transformed Laffin Hall into a modern and functional building.`,
// })

// .set("rockville-centre-police", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/96f08191-f50b-4359-f535-6c84ab162000",
//   path: "/projects/rockville-centre-police",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/dbafdcfc-8e14-4674-d149-34eb4c2c8d00",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/b5e300f4-23ef-49e1-3fc6-8b8a5e197500",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/487f8240-09e0-4850-756a-2da7acbf4200",
//       aspectRatio: 16 / 9,
//       order: 3,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2f27bbb3-2e30-4590-d7c3-66149991d700",
//       aspectRatio: 16 / 9,
//       order: 4,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/98dd58bb-0d87-4df8-8de5-7e65c64d7c00",
//       aspectRatio: 16 / 9,
//       order: 5,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/61a83c0a-7f6e-4d49-2488-b94aa4168600",
//       aspectRatio: 16 / 9,
//       order: 6,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e3d2ab9b-2b03-4a1e-eadb-eba025a3b300",
//       aspectRatio: 16 / 9,
//       order: 7,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/96f08191-f50b-4359-f535-6c84ab162000",
//       aspectRatio: 16 / 9,
//       order: 8,
//     },
//   ],
//   name: "Rockville Centre Police Station",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3661.2161386469497!2d-73.638444!3d40.658313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c27b5b05cac5dd:0x65e61c20263ba48a!2s142%20Maple%20Ave,%20Rockville%20Centre,%20NY%2011570!5e1!3m2!1sen!2sus!4v1669330079249!5m2!1sen!2sus",
//   client: { text: "Incorporated Village of Rockville Centre", tag: "" },
//   status: { text: "The project was finished in 2022", completed: true },
//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: "$2,344,107.00",
//   designer: "H2M Architects",
//   description: `
//         Allcon was selected to construct a state-of-the-art police headquarters for the Village of Rockville Center. The new facility replaced the outdated and cramped old building. Allcon's work included demolition and asbestos abatement, as well as the construction of new CMU walls, stud-framed walls, and ACT ceilings. The team also built new secure holding cells and sally ports. Allcon's flooring experts installed a combination of carpet, LVT, and ceramic tiles throughout the facility. Custom millwork counters were also manufactured and installed by the Allcon team. New wood doors, windows, and roll-up gates were installed to improve the building's exterior and provide security. Exterior signage, aluminum metal panels, and a handicap lift were also added to provide needed public access.
//       `,
// })

// .set("ogs-creedmoor-psychiatric-center", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/6f2edb66-6990-4e99-3549-eba84349e700",
//   path: "/projects/ogs-creedmoor-psychiatric-center",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/6f2edb66-6990-4e99-3549-eba84349e700",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//   ],

//   name: "OGS Creedmoor Psychiatric Center",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7313.737956223405!2d-73.73595182882622!3d40.73745849987613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2623da5028dff:0x54d92114be009da!2sCreedmoor%20Psychiatric%20Center!5e1!3m2!1sen!2sus!4v1670272592275!5m2!1sen!2sus",
//   client: {
//     text: "NYS Office of General Services",
//     tag: "OGS",
//   },

//   status: { text: "The project is finished", completed: true },
//   description: `Allcon was selected by the NYS Office of General Services to perform lobby and security office renovations at the OGS Creedmoor Psychiatric Center. Our team was responsible for the demolition and removal of existing finishes and fixtures. Additionally, we installed a new security system. The project was completed on time and within budget, resulting in a modern lobby and security office for the facility.`,
// })

// .set("ogs-army-support-facility", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ee12e850-3ddf-45fe-de6e-05cb7994f400",
//   path: "/projects/ogs-army-support-facility",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ee12e850-3ddf-45fe-de6e-05cb7994f400",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//   ],

//   name: "OGS Army Support Facility, AASF1",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7307.969775134365!2d-73.1074864639801!3d40.78989700017646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e837cea1539a51:0x6055aea59b981439!2s201%20Schaefer%20Dr,%20Ronkonkoma,%20NY%2011779!5e1!3m2!1sen!2sus!4v1670273133233!5m2!1sen!2sus",
//   client: {
//     text: "NYS Office of General Services",
//     tag: "OGS",
//   },

//   status: { text: "The project is finished", completed: true },
//   description: `Allcon Contracting was selected to provide repairs to the administrative offices at the NYS Office of General Services Army Support Facility. Our team worked closely with OGS to complete the project on time and within budget. The end result was a modern and functional workspace for the facility's administrative staff.`,
// })

// .set("suny-farmingdale-nold-hall-entry", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/bf9657ee-a363-4ad8-e9cf-d4f04a39c500",
//   path: "/projects/suny-farmingdale-nold-hall-entry",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/bf9657ee-a363-4ad8-e9cf-d4f04a39c500",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/d1b34973-95e6-4b99-5e5b-8379fabbf800",
//       aspectRatio: 9 / 16,
//       order: 2,
//     },
//   ],
//   name: "SUNY Farmingdale Nold Hall Entry",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3656.2423819162545!2d-73.431517!3d40.748856!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x80fd83aee2558b2c!2sNold%20Athletic%20Complex!5e1!3m2!1sen!2sus!4v1669330154160!5m2!1sen!2sus",
//   client: {
//     text: "State University Construction Fund",
//     tag: "SUNY",
//   },
//   status: { text: "The project is finished", completed: true },

//   cost: "Under $2,000,000.00",
//   // designer: "Peter Gisolfi Associates",
//   description: `Allcon Contracting was selected to renovate the entryway of Nold Hall at SUNY Farmingdale. The project included installation of new landscaping, including lawns and grasses, as well as planting. The team also installed new storm drainage utilities and piping, as well as new MEPs (mechanical, electrical, and plumbing) systems. The project was completed on time and within budget, resulting in a modern and functional entryway for the building.`,
// })

// .set("500bridgewater", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/f80ae0ad-57a4-43aa-af52-16e1e4998d00",
//   path: "/projects/500bridgewater",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/892eba66-2c7f-4bcd-720e-a2eca582ba00",
//   aspectRatio: 9 / 16,
//   order: 1,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/f80ae0ad-57a4-43aa-af52-16e1e4998d00",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/eb5a093a-9c50-4991-f1a0-6d037f98aa00",
//   aspectRatio: 9 / 16,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/763903ab-172c-4ca0-dcf5-b9391c0ca900",
//   aspectRatio: 9 / 16,
//   order: 4,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/116af262-2bd5-4a8d-d55c-c3ad6cdae100",
//   aspectRatio: 9 / 16,
//   order: 5,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3b66d146-8477-4ba8-c134-dc2c6818d600",
//   aspectRatio: 9 / 16,
//   order: 6,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4a4f6475-73c2-4188-8d16-e9552c2e7e00",
//   aspectRatio: 16 / 9,
//   order: 7,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/0ab086b1-d59a-46b2-c037-0dae62543f00",
//   aspectRatio: 16 / 9,
//   order: 8,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c8711ede-95ac-46ec-e1b0-0da2b13a3900",
//   aspectRatio: 16 / 9,
//   order: 9,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/f3b70054-142f-48da-5494-4f464dde5500",
//   aspectRatio: 16 / 9,
//   order: 10,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/aa953b1b-a9f2-4568-09de-821bf7b40800",
//   aspectRatio: 16 / 9,
//   order: 11,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/087d8719-a6e9-4aba-8bce-839fa539b100",
//   aspectRatio: 16 / 9,
//   order: 12,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4c8ae9e5-fc39-42f2-f6cd-e6445a6c0000",
//   aspectRatio: 16 / 9,
//   order: 13,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/dc23515a-d964-439d-c55c-20bfddadf600",
//   aspectRatio: 9 / 16,
//   order: 14,
// },
// ],

//   name: "500 Brighton Houses Inc.", // – Alterations Associated to Superstorm SANDY
//   location:
//     "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3665.7652061803356!2d-73.96214!3d40.575355!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c244405e66eb9f:0x1353c628363dc2ab!2s500%20Brightwater%20Ct,%20Brooklyn,%20NY%2011235!5e1!3m2!1sen!2sus!4v1669330118025!5m2!1sen!2sus",

//   client: { text: "NYC Housing Preservation & Development", tag: "" },

//   status: { text: "The project was finished in 2019", completed: true },
//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: "$15M",
//   designer: "Purcell Architects P.C.",
//   description: `Allcon Contracting was selected to construct two 3,000 square foot infrastructure building additions on top of the existing parking structure/promenade at the Brighton Beach Brooklyn boardwalk, located just 300 feet from the ocean. This project was necessary due to severe damages incurred during Superstorm Sandy. Allcon's work included the construction of new facilities to house boilers, hot water heaters, electrical services, and a new generator system. The 18-story, 192-unit apartment building for seniors was fully occupied during construction, requiring extensive coordination between Allcon and the construction manager. The project also included the replacement of all windows and balcony doors, as well as the installation of over 15,000 square feet of built-up roofing and 35,000 square feet of unit pavers throughout the building. Through collaboration and efficient work, Allcon was able to complete the project ahead of schedule.`,
// })

// .set("suny-farmingdale-knapp-hall", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/fe69ee75-b0cd-44f0-3e4b-d947a4b01500",
//   path: "/projects/suny-farmingdale-knapp-hall",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/fe69ee75-b0cd-44f0-3e4b-d947a4b01500",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/0011583f-5504-4657-74a9-f53aeee70f00",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//   ],
//   name: "SUNY Farmingdale Knapp Hall",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.094317333799!2d-73.4306072843586!3d40.75154884313155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e82b26c91a47b9:0x602ee71fc234d348!2sKnapp%20Hall!5e1!3m2!1sen!2sus!4v1670280873146!5m2!1sen!2sus",
//   client: {
//     text: "State University Construction Fund",
//     tag: "SUNY",
//   },
//   status: { text: "The project is finished", completed: true },
//   cost: "Under $3,000,000.00",
//   // designer: "Hoffmann Architects, Inc.",
//   description: `Allcon Contracting was selected as the general contractor for the construction of the Knapp Hall at SUNY Farmingdale. Our scope of work included the demolition of the existing basement kitchen and exterior walls, as well as the installation of new concrete and masonry walls, structural steel, roofing, MEPs, and exterior improvements. Through careful coordination and collaboration with the construction manager and other project stakeholders, we were able to complete the project on time and to the satisfaction of the client.`,
// })
// .set("apartment724", {
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c71596c6-7bae-47c7-e4fa-868ba422a600",
//   path: "/projects/apartment724",
//   media: [
//     // {
//     //   image:
//     //     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3e896263-ffee-4f9f-9da7-d3c64ac66300",
//     //   aspectRatio: 16 / 9,
//     //   order: 1,
//     // },
//     // {
//     //   image:
//     //     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/db29887a-b564-4cee-3367-948e7d77d200",
//     //   aspectRatio: 16 / 9,
//     //   order: 2,
//     // },
//     // {
//     //   image:
//     //     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/cce353f0-53a9-4466-3d97-3694b7aa4a00",
//     //   aspectRatio: 9 / 16,
//     //   order: 3,
//     // },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c71596c6-7bae-47c7-e4fa-868ba422a600",
//       aspectRatio: 16 / 9,
//       order: 4,
//     },
//   ],
//   name: "Apartment 724",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },
//   category: { text: "Interior work", tag: "interior" },
//   cost: null,
//   designer: null,
//   description: null,
// })

// .set("suny-farmingdale-nold-hall-gymnasium", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2ebdeb7e-442b-4443-6cb3-98f6746f2200",
//   path: "/projects/suny-farmingdale-nold-hall-gymnasium",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2ebdeb7e-442b-4443-6cb3-98f6746f2200",
//   aspectRatio: 16 / 9,
//   order: 1,
// },

// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/1cf1069c-71b6-4130-5c4f-ab77b7a71f00",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/430c4a3b-0c36-447f-c81b-f18e83a40400",
//   aspectRatio: 16 / 9,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/722f8507-dcb4-4077-3073-f2444950f600",
//   aspectRatio: 16 / 9,
//   order: 4,
// },
//   ],
//   name: "SUNY Farmingdale Nold Hall Gymnasium",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3656.2423819162545!2d-73.431517!3d40.748856!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x80fd83aee2558b2c!2sNold%20Athletic%20Complex!5e1!3m2!1sen!2sus!4v1669330154160!5m2!1sen!2sus",
//   client: {
//     text: "State University Construction Fund",
//     tag: "SUNY",
//   },
//   status: { text: "The project was finished in 2017", completed: true },

//   cost: "$2,500,000.00",
//   designer: "Peter Gisolfi Associates",
//   description: `Allcon Contracting was selected by the State University Construction Fund to transform Nold Hall’s Gymnasium for the State University of New York College of Technology at Farmingdale. The project was completed within the occupied structure, carefully executed to minimize the impact on the school’s operations. Allcon demolished the existing sports floor, bleacher systems, sports equipment, and press box as well as removed unsuitable fill materials below the existing slab. Working with the design team, they installed a new recessed slab and state-of-the-art wood and urethane sports flooring system that accommodates a range of sports, including basketball, volleyball, and track. Allcon also provided modifications to the existing sprinkler system and electrical upgrade to support the revised gym layout and upgraded sports equipment. As part of the contract, Allcon installed native landscaping and a decorative concrete walkway and plaza, enhancing the overall aesthetic of Nold Hall’s Main Entry.`,
// })

// .set("saint-demetrios-church", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/47bb7306-c89f-40e1-459d-54ab29978900",
//   path: "/projects/saint-demetrios-church",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/06e3cb6e-13aa-4786-9854-3c5d055d2000",
//   aspectRatio: 16 / 9,
//   order: 1,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/1ac4a26e-a32b-4d87-0323-e56f7950e100",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/47bb7306-c89f-40e1-459d-54ab29978900",
//   aspectRatio: 16 / 9,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/519df48f-f50d-4503-9b4f-6cdc6a090100",
//   aspectRatio: 16 / 9,
//   order: 4,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/0b9c692a-a3e6-44af-fefa-13c1e0de5700",
//   aspectRatio: 16 / 9,
//   order: 5,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/650e23ec-41d6-4037-1fd2-cef5225f4d00",
//   aspectRatio: 16 / 9,
//   order: 6,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/417d5d44-497c-40f4-595e-0ecf19ddda00",
//   aspectRatio: 16 / 9,
//   order: 7,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/a4ba9dbd-91f2-4f5d-ea69-0447aac4a100",
//   aspectRatio: 16 / 9,
//   order: 8,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/89453d3a-7821-43a7-0386-dfea3e3be900",
//   aspectRatio: 16 / 9,
//   order: 9,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/9663836a-d95b-478b-551b-6ad723d1f000",
//   aspectRatio: 16 / 9,
//   order: 10,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3dd9877b-3d9f-46d6-b08f-466909e95000",
//   aspectRatio: 16 / 9,
//   order: 11,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/b28fb91c-28df-4244-a9d5-769aeeb72200",
//   aspectRatio: 16 / 9,
//   order: 12,
// },
//   {
//     image:
//       "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/cda96bd6-41af-4c6f-0a76-55d5d4af6800",
//     aspectRatio: 16 / 9,
//     order: 13,
//   },
// ],

//   name: "Saint Demetrios Greek Orthodox Church",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3661.1821115490325!2d-73.547051!3d40.658933!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0xbdb6be6f3ab5dfe5!2sSaint%20Demetrios%20Greek%20Orthodox%20Church!5e1!3m2!1sen!2sus!4v1669344856338!5m2!1sen!2sus",
//   client: { text: "South Nassau Hellenic Community Inc.", tag: "" },
//   status: { text: "The project was finished in 2016", completed: true },
//   category: { text: "Other miscellaneous projects", tag: "other" },

//   cost: "$2,500,000.00",
//   designer: null,
//   description: `Allcon Contracting was selected as the general contractor for the first phase of a multiphase project for Saint Demetrios Greek Orthodox Church. This phase involved the demolition and site clearing/preparation of existing adjacent houses and garages acquired by the church to expand its site and provide services to the South Nassau Hellenic Community. Allcon's team carefully demolished and cleared the site, ensuring minimal impact on the surrounding area and the church's ongoing operations.`,
// })

// .set("success-academy-schools", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/dbe0310f-785e-4ee6-d032-5ce2bd7c0f00",
//   path: "/projects/success-academy-schools",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/dbe0310f-785e-4ee6-d032-5ce2bd7c0f00",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/a42fe716-4b3f-4ac9-a03e-60a0ad158900",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/703bf395-ab27-4383-4dc6-4f784cb2ae00",
//       aspectRatio: 16 / 9,
//       order: 3,
//     },
//   ],
//   name: "Success Academy Schools",
//   location: null,
//   client: { text: "Success Academy Charter Schools", tag: "" },

//   status: { text: "The project was finished in 2019", completed: true },
//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: "$5,000,000+",
//   designer: null,
//   description: `
//         Allcon Contracting was selected by Success Academy Charter Schools as the General Contractor to complete full renovations of interior spaces at multiple facilities throughout the school system. The project required quick mobilization and constant coordination between Allcon, the owner, and the design team to meet the tight four-week completion schedule. Allcon's collaborative approach with suppliers allowed them to secure materials in advance and prepare deliveries prior to the summer period when work was required to be completed. Over a period of five years, Allcon delivered state-of-the-art classroom spaces, including upgrades to mechanical, electrical, and plumbing systems.
//       `,
// })

// .set("bareburger", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/59c97422-f001-446d-de7c-714fedb76900",
//   path: "/projects/bareburger",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/0f2702fd-3527-4712-7d6e-a3a24fe49100",
//   aspectRatio: 16 / 9,
//   order: 1,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/36953eba-f97c-418b-25f4-841824a8c400",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ff3ead4a-d904-4be2-3364-962338386800",
//   aspectRatio: 16 / 9,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/cd373878-90c9-47db-3548-1463b01cc100",
//   aspectRatio: 16 / 9,
//   order: 4,
// },
// {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/59c97422-f001-446d-de7c-714fedb76900",
//       aspectRatio: 16 / 9,
//       order: 5,
//     },
//   ],
//   name: "Bareburger 1681 East 87th Street",

//   location:
//     "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3654.6544491296677!2d-73.948987!3d40.777728!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x127b383ea2c8e1ce!2sBareburger!5e1!3m2!1sen!2sus!4v1669329957624!5m2!1sen!2sus",

//   client: { text: "Petrus Tzanidakis", tag: "" },
//   status: { text: "The project was finished in 2014", completed: true },
//   category: { text: "Other miscellaneous projects", tag: "other" },

//   cost: "$300,000+",
//   designer: "Theta Design",
//   description: `Allcon was selected as the General Contractor to complete a full renovation/interior fit-out for a Bareburger establishment. In order to complete the work on a tight schedule, Allcon implemented pedestrian protection along a busy NYC street and modified the existing structure by removing an existing stair and installing new wood joists and subfloor. The restaurant was fitted with a decorative tin ceiling and reclaimed wood planks, and fire-rated materials were installed to establish the required fire rating between the first-floor restaurant and residential apartments above. Allcon also provided all the necessary MEP systems, filtration, and fire protection for the fit-out and installed all furniture and equipment through close coordination with the owner. This project was the first of two Bareburger restaurant projects successfully completed by Allcon.`,
// })
//   .set("westbury-cultural-arts-center", {
//     sector: "public",
//     thumbnail:
//       "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/481abd74-d161-452e-cbb5-868f524bbe00",
//     path: "/projects/westbury-cultural-arts-center",
//     media: [
//       {
//         image:
//           "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/481abd74-d161-452e-cbb5-868f524bbe00",
//         aspectRatio: 16 / 9,
//         order: 1,
//       },
//     ],

//     name: "Westbury Cultural Arts Center",
//     location:
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.817085876782!2d-73.59070108435846!3d40.75659044282292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c287731864b50f:0x446b67faf1ce31dd!2sWestbury%20Arts!5e1!3m2!1sen!2sus!4v1670274279577!5m2!1sen!2sus",
//     client: null,
//     status: { text: "The project is finshed", completed: true },
//     category: { text: "Other miscellaneous projects", tag: "other" },
//     cost: "Under $1,500,000.00",
//     designer: null,
//     description: `Work Included: <br/>
//            &emsp; •	Selective Demolition-two levels
//           <br/>
//            &emsp; •	Cast-In-Place Concrete
//           <br/>
//            &emsp; •	Masonry
//           <br/>
//            &emsp; •	Metal framing
//           <br/>
//            &emsp; •	Structural Steel
//           <br/>
//            &emsp; •	Misc. Roofing repairs
//           <br/>
//            &emsp; •	Interior finished
//           <br/>
//            &emsp; •	Flooring
//           <br/>
//            &emsp; •	Painting
//           <br/>
//            &emsp; •	Millwork
//           <br/>
//            &emsp; •	New Elevator
//           <br/>
//            &emsp; •	MEPs

// `,
//   })
// .set("wilson-animal", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3e772772-db0b-4740-97cb-dc3f41edb100",
//   path: "/projects/wilson-animal",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4f82fa0c-14e0-4a36-833f-7d7870759700",
//   aspectRatio: 16 / 9,
//   order: 1,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3e772772-db0b-4740-97cb-dc3f41edb100",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/bdbb1904-5a60-4427-5d52-bab021305400",
//   aspectRatio: 16 / 9,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/615fd356-07ea-4c21-0b09-3046378c0d00",
//   aspectRatio: 16 / 9,
//   order: 4,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/f2690277-9335-4eaf-00d8-9a3b3336ed00",
//   aspectRatio: 16 / 9,
//   order: 5,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/db692866-a02d-4df5-a0ec-50f3d7c3ec00",
//   aspectRatio: 16 / 9,
//   order: 6,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/84486c38-26d4-4624-88ba-53b6f6adba00",
//   aspectRatio: 16 / 9,
//   order: 7,
// },
//     ],
//     name: "Williston Animal Hospital",
//     location: null,
//     client: null,
//     status: { text: "The project is finshed", completed: true },
//     category: { text: "Other miscellaneous projects", tag: "other" },
//     cost: null,
//     designer: null,
//     description: `Allcon Contracting was responsible for the complete interior renovation of the Williston Animal Hospital
//  building. Our scope of work included demolition, carpentry, tiles, flooring, rough carpentry, painting, electrical, plumbing, and HVAC. We worked closely with the client to ensure that the project was completed on time and within budget. The end result was a beautifully renovated space that exceeded the client's expectations.`,
//   })

// .set("255west", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4588a5c7-801b-496e-daa0-f36ae1ad4700",
//   path: "/projects/255west",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4588a5c7-801b-496e-daa0-f36ae1ad4700",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/9b7c339d-3bef-4f1f-d292-5f092f1de400",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4c1b61be-6c30-4371-14a3-f02cb7d95a00",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//   ],

//   name: "255 West 108th Street",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7306.567293640764!2d-73.97104621504347!3d40.80263854581619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f63b376163eb:0xb8930d85c5045e73!2s255%20W%20108th%20St,%20New%20York,%20NY%2010025!5e1!3m2!1sen!2sus!4v1669962633393!5m2!1sen!2sus",
//   client: null,
//   status: { text: "The project is finshed", completed: true },

//   category: { text: "Exterior work", tag: "exterior" },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting was selected as the General Contractor for the exterior renovation of the 255 West 108th Street building under the Local Law 11. The project was successfully completed, resulting in a refreshed and modern building exterior.`,
// })

// .set("20east", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/221d7b85-c626-4985-e5b4-1cfd9b2af000",
//   path: "/projects/20east",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/221d7b85-c626-4985-e5b4-1cfd9b2af000",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/446b6dfa-5500-4f02-27a5-2db7189c7000",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/007cc994-36e2-4f75-05f9-37b9a4c75300",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//   ],

//   name: "20 East 9th Street",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7314.333623352545!2d-73.9981533273526!3d40.732040119581896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599755f45f9b:0x71b84442d6d93d75!2s20%20E%209th%20St,%20New%20York,%20NY%2010003!5e1!3m2!1sen!2sus!4v1669962673919!5m2!1sen!2sus",
//   client: null,
//   status: { text: "The project is in progress", completed: false },

//   category: { text: "Exterior work", tag: "exterior" },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting has been selected as the general contractor for the exterior renovation of the 20 East 9th Street building, in compliance with Local Law 11. The project is underway and will result in a modern and refreshed exterior for the building.`,
// })

// .set("upper-east-veterinary", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/79b0595e-d481-454b-998e-a7025813e400",
//   path: "/projects/upper-east-veterinary",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/79b0595e-d481-454b-998e-a7025813e400",
//   aspectRatio: 16 / 9,
//   order: 1,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/306eaee1-8669-4526-81bc-07bc047f9200",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/8f25afbf-e62e-4594-dfec-9f60e65ab400",
//   aspectRatio: 16 / 9,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/bbc720f9-8451-4a5f-6520-85771386cf00",
//   aspectRatio: 16 / 9,
//   order: 4,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/f10de1c8-f36b-40e4-bb69-49e540ad6a00",
//   aspectRatio: 16 / 9,
//   order: 5,
// },
// ],

//   name: "Upper East Side Veterinary Hospital",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },

//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting was selected for a complete interior renovation project at the Upper East Side Veterinary Hospital. The scope of work included demolition of existing finishes, carpentry work for new framing and trim, installation of tile and flooring, rough carpentry for HVAC and electrical systems, painting of all surfaces, and installation of new plumbing and electrical fixtures. The team at Allcon worked efficiently and effectively to complete the project on time and within budget, resulting in a beautifully updated interior space.`,
// })

// .set("carle-place-auditorium", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/8a5deedd-df6b-4a1f-2151-27555ae26300",
//   path: "/projects/carle-place-auditorium",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/29b282c1-a730-4131-8575-2a7c76cb9a00",
//   aspectRatio: 16 / 9,
//   order: 1,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e6fd0ebf-aee4-4a96-c445-4281ceccae00",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/8a5deedd-df6b-4a1f-2151-27555ae26300",
//   aspectRatio: 16 / 9,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/edb9b3e9-a7b7-4e1a-7f53-ff0505cc5200",
//   aspectRatio: 16 / 9,
//   order: 4,
// },
//   {
//     image:
//       "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/81f518f1-6337-4781-fb3e-88f4f3400300",
//     aspectRatio: 16 / 9,
//     order: 5,
//   },
// ],

//   name: "Carle Place UFSD – Auditorium Renovations",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },

//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting was selected as the general contractor for the interior renovation of the existing auditorium at Carle Place UFSD. The scope of work included a complete demolition of the space, followed by new carpentry, concrete work, and installation of new wall and ceiling paneling and systems. The team also completed all necessary painting and finish work to complete the project. The end result was a fully renovated auditorium with modern features and finishes.`,
// })

// .set("carle-place-lobby", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/7d0357a0-47d7-4bea-895f-ba2e2765e600",
//   path: "/projects/carle-place-lobby",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/7d0357a0-47d7-4bea-895f-ba2e2765e600",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/1ad23bae-e3c6-413d-6900-23e5dc567c00",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/95476838-2101-458a-6fe8-99e82ba78000",
//       aspectRatio: 16 / 9,
//       order: 3,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/d43b1df3-38b2-40bb-6455-d032c9112000",
//       aspectRatio: 16 / 9,
//       order: 4,
//     },
//   ],
//   name: "Carle Place UFSD – Lobby Renovations",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },

//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: null,
//   designer: null,
//   description: null,
// })

// .set("carle-place-library", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/7add89a7-4a1c-494d-bc52-9a5cc0fda500",
//   path: "/projects/carle-place-library",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/7add89a7-4a1c-494d-bc52-9a5cc0fda500",
//   aspectRatio: 16 / 9,
//   order: 1,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3b0799af-bb68-4eea-07d5-f521e4cf8800",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c9a47ff2-0774-4103-ce95-f2dd22388e00",
//       aspectRatio: 16 / 9,
//       order: 3,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/13bd85fe-4166-4e89-26cb-762fb4522000",
//       aspectRatio: 16 / 9,
//       order: 4,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/0b128d5d-d7dc-45d7-7dd9-723dd4583900",
//       aspectRatio: 16 / 9,
//       order: 5,
//     },
//   ],
//   name: "Carle Place UFSD – Library Renovations",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },
//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: null,
//   designer: null,
//   description: null,
// })

// .set("newjersey-veterinary", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/34825b87-75d4-4762-6c4e-e00821b3e100",
//   path: "/projects/newjersey-veterinary",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/34825b87-75d4-4762-6c4e-e00821b3e100",
//   aspectRatio: 16 / 9,
//   order: 1,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e0d3a66f-7f64-43b0-3f5b-d784e9452d00",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/a68dafd8-e0e5-4fa5-9b1c-268301089e00",
//   aspectRatio: 16 / 9,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e95ecf6f-f68e-4f80-2bc3-575148841000",
//   aspectRatio: 16 / 9,
//   order: 4,
// },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/02c31487-adf9-4fe0-3349-6b1313289b00",
//       aspectRatio: 16 / 9,
//       order: 5,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/1aa2e7e5-3f55-4d34-42db-cdd143dce500",
//       aspectRatio: 16 / 9,
//       order: 6,
//     },
//   ],
//   name: "New Jersey Veterinary Hospital",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },

//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting was selected as the general contractor for the complete interior renovation of the New Jersey Veterinary Hospital. The scope of work included demolition of existing finishes, carpentry, installation of new tiles and flooring, rough carpentry, painting, electrical work, plumbing, and HVAC. Our team worked closely with the owner and design team to ensure the project was completed on time and within budget, resulting in a modern and refreshed interior space.`,
// })

// .set("hudson-animal-hospital", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/1b7601bc-7b65-4ffd-ee76-65ef91619200",
//   path: "/projects/hudson-animal-hospital",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/1b7601bc-7b65-4ffd-ee76-65ef91619200",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/bd84552d-a9c6-43f8-a78f-c2c6439cd000",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/b9719ffe-a53b-42e5-43f1-209efeb4d300",
//       aspectRatio: 16 / 9,
//       order: 3,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e973e7c7-1f13-45ec-d372-10e418120c00",
//       aspectRatio: 16 / 9,
//       order: 4,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/7a76c108-9ab9-4680-a7e0-3aa3799aa900",
//       aspectRatio: 16 / 9,
//       order: 5,
//     },
//   ],
//   name: "Hudson Animal Hospital",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },

//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting was selected as the general contractor for a complete interior renovation at the Hudson Animal Hospital. The scope of work included demolition of existing features and finishes, installation of new carpentry, tiles, and flooring, as well as rough carpentry, painting, electrical, plumbing, and HVAC work. The team at Allcon worked closely with the owner and design team to ensure the project was completed on time and within budget, resulting in a modern and refreshed interior space.`,
// })

// .set("866westchester", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ab42a9c2-764d-4612-57e0-52ab11909100",
//   path: "/projects/866westchester",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ab42a9c2-764d-4612-57e0-52ab11909100",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/930ffde8-dd5c-4e12-5971-534ac465f800",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2eb29145-396a-43f8-a519-2b852a2f2100",
//       aspectRatio: 16 / 9,
//       order: 3,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2c447eb6-f465-475a-d59f-f943da79c200",
//       aspectRatio: 16 / 9,
//       order: 4,
//     },
//   ],

//   name: "866 Westchester Ave.",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },

//   category: { text: "Other miscellaneous projects", tag: "other" },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting was chosen as the general contractor for the complete interior renovation of commercial office space at 866 Westchester Avenue. The project included a wide range of work, including demolition, carpentry, installation of new VCT floors and carpeting, millwork, painting, and upgrades to the building's electrical, plumbing, and HVAC systems. Throughout the course of the project, Allcon worked closely with the building's owner and design team to ensure that all work was completed to the highest standards and on schedule. The end result was a beautifully renovated office space that met the needs of the building's tenants and provided a modern and welcoming environment.`,
// })

// .set("55pierrepont", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/5ac5f9d0-6987-4c7a-bac9-1fe67e194500",
//   path: "/projects/55pierrepont",
//   media: [
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e2d4bd81-46ee-420e-5351-a179eebcd600",
//   aspectRatio: 16 / 9,
//   order: 1,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/5ac5f9d0-6987-4c7a-bac9-1fe67e194500",
//   aspectRatio: 16 / 9,
//   order: 2,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4dc321d0-f0db-4db2-ea58-5d047f1fac00",
//   aspectRatio: 16 / 9,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4cfaebb6-905b-44c5-895b-bc54c3954100",
//   aspectRatio: 16 / 9,
//   order: 4,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/154ed9ea-04c2-43b3-4fcb-d6b8dd6deb00",
//   aspectRatio: 16 / 9,
//   order: 5,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/bbbeec75-b846-4618-99ee-444f90c31f00",
//   aspectRatio: 16 / 9,
//   order: 6,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c3e125b9-e6e2-4e87-67c6-7a77b708ea00",
//   aspectRatio: 16 / 9,
//   order: 7,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c33b991a-791a-48c0-0e80-c8b7ec340a00",
//   aspectRatio: 16 / 9,
//   order: 8,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/49966a1e-95e5-4ff2-bca1-d82a3a339100",
//   aspectRatio: 16 / 9,
//   order: 9,
// },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/ea2d2264-e8ce-46ae-069b-b1a1df37d100",
//       aspectRatio: 16 / 9,
//       order: 10,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/1227456a-0114-4793-ca70-0a3be3134f00",
//       aspectRatio: 16 / 9,
//       order: 11,
//     },
//   ],

//   name: "55 Pierrepont Street",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting was selected to conduct a complete interior renovation of an existing nursing home at 55 Pierrepont Street containing 189 apartments. The scope of work included demolition of existing finishes and structures, installation of new carpentry and millwork, and installation of new terrazzo and VCT flooring. In addition, all apartments and hallways were renovated and the lobby was completely updated. The team also provided new plumbing and HVAC systems, as well as electrical upgrades throughout the building. The project was successfully completed, providing the nursing home with modern and refreshed interiors.`,
// })

// .set("164w-79th", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2d995093-f748-414b-bb83-49474ad3de00",
//   path: "/projects/164w-79th",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2d995093-f748-414b-bb83-49474ad3de00",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/3f30eafb-d4dc-45c5-d722-b89f7d236600",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/bfb18127-d8b6-4a25-0279-4b766b817e00",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
//   ],

//   name: "164 W79th Street",
//   location:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7308.8052745164305!2d-73.98046938376761!3d40.7823049265069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25888c85763b7:0x57f9b317bfaca0ba!2s164%20W%2079th%20St,%20New%20York,%20NY%2010024!5e1!3m2!1sen!2sus!4v1669962722742!5m2!1sen!2sus",
//   client: null,
//   status: { text: "The project is finshed", completed: true },
//   category: { text: "Exterior work", tag: "exterior" },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting was chosen as the general contractor for the exterior renovation of the 164 W79th Street building, which required compliance with Local Law 11. The project was completed successfully, and the building now boasts a modern and refreshed exterior.`,
// })

// .set("17w-10th-townhouse", {
//   sector: "public",
//   thumbnail:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/364d4c94-46cf-4c97-f844-01fbe3679200",
//   path: "/projects/17w-10th-townhouse",
//   media: [
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/364d4c94-46cf-4c97-f844-01fbe3679200",
//       aspectRatio: 16 / 9,
//       order: 1,
//     },
//     {
//       image:
//         "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/36a8ed20-1880-4ae0-76c1-6196f34aed00",
//       aspectRatio: 16 / 9,
//       order: 2,
//     },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/6df6d21b-c411-4562-a4b6-8971b6e78600",
//   aspectRatio: 16 / 9,
//   order: 3,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/83eaf1b8-d98d-4453-dce0-688906a2aa00",
//   aspectRatio: 16 / 9,
//   order: 4,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/61567da7-2e1e-4331-2503-c2e300cf6d00",
//   aspectRatio: 16 / 9,
//   order: 5,
// },
// {
//   image:
//     "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4da0f7f2-6e80-42b7-999b-5f23dd5bb900",
//   aspectRatio: 16 / 9,
//   order: 6,
// },
// ],

//   name: "17W 10th St Townhouse",
//   location: null,
//   client: null,
//   status: { text: "The project is finshed", completed: true },
//   category: { text: "Interior work", tag: "interior" },
//   cost: null,
//   designer: null,
//   description: `Allcon Contracting was selected to restore an existing townhouse at 17W 10th Street. The scope of work included the installation of new bathrooms and kitchens, custom millwork, new flooring, painting, HVAC, electrical and plumbing upgrades. The project was completed successfully, resulting in a beautifully renovated townhouse.`,
// });

export default projects;
