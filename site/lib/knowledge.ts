// Generated from recon/faq.md, recon/team.json, recon/case-studies.json and verified facts (HANDOFF.md section 5).
// Everything the chat assistant knows. FACTS and PRICES go into every request; the route picks the FAQs that match the
// question. Regenerate rather than hand-edit if the sources change.

export const FACTS = "- Bates Landscaping, Southeastern Pennsylvania. Tagline: \"The best Landscape company to work WITH and FOR\".\n- Founded by Justin Bates: learned the trade from his father in 2002, started the company in 2009 in his mother's garage, incorporated 2011, West Chester office 2017, drainage team 2018, Phoenixville location 2022.\n- Awards: NALP (National Association of Landscape Professionals) Awards of Excellence recipient, 2024 and 2025.\n- Head office 705 St Marys St, Phoenixville, PA 19460; also in West Chester. Phone (484) 443-8772. Email info@bateslandscaping.net. Opening hours are not published.\n- Service area: Chester, Delaware and Montgomery Counties (snow and ice also near the Philadelphia Airport). Towns include West Chester, Phoenixville, Malvern, Paoli, Wayne, Bryn Mawr, Media, Downingtown, Kennett Square, Chester Springs, King of Prussia.\n- Clients: homeowners, property managers, HOAs, apartment communities, engineers, senior living, offices, churches and cemeteries.\n- Services: landscape installation and design; maintenance (for homes: Estate Maintenance; lawn care, mowing, aeration, fertilization, pruning, mulching, seasonal clean-ups); hardscaping (patios, walkways, retaining walls, steps, outdoor living, water features); drainage and stormwater (grading, French drains, catch basins, rain gardens, berms, piping); bamboo removal and containment barriers; snow and ice management.\n- Bamboo: bamboo spreads through underground roots (rhizomes). We either remove every rhizome and dispose of them so it doesn't come back, or dig in a thick bamboo barrier to contain a section you want to keep for privacy.\n- WE DO NOT OFFER: snow plowing or salting for individual homeowners (snow and ice is only for commercial properties and HOAs); concrete work; firewood; mulch delivery or sales; tree work on trees taller than about 15 feet (we prune small trees like a Dogwood; for bigger trees we recommend another professional).\n- Getting started: book a consultation (a short intake call), share 3-5 photos of the property, we assess it and send a proposal you approve by e-signature. Most projects are scheduled 3-4 weeks after approval. Payment: check, cash, all major credit cards, and financing.\n- Careers: we're hiring; on-site training, creative pay packages, team atmosphere, benefits; applications in English and Spanish.\n- Existing clients can follow their project in the \"Track My Project\" client portal.\n- Team (by role): Justin (Partner + General Manager est 2009); Dylan (Partner + VP of Operations est 2013); Megan (Area Manager est 2015); Molly (Production Manager est 2024); Cailee (Office Manager); Melissa (Business Developer est 2014); Khyss (Human Resources Administrator est 2024); Enrique (Supervisor est 2011); Angel (Shop Supervisor est 2018); Juliana (Sales Assistant est 2025).";

export const PRICES = "- Bamboo removal, homeowners, Chester County: $11,000-$13,000\n- Bamboo removal, homeowners, Delaware County: $20,000-$25,000\n- Bamboo removal, homeowners, Delaware County (larger job): $29,000-$32,000\n- Bamboo removal, commercial community, Delaware County: $9,000-$11,000\n- Grading and drainage, Chester County: $15,000-$20,000\n- Stormwater drainage with berms and piping, Delaware County: $16,000-$24,000\n- Drainage issue with water in the home, Chester County: $45,000-$50,000+\n- Custom pondless water feature, Chester County: $12,000-$15,000\n- Custom pondless water feature, Chester County (larger job): $20,000-$24,000\n- Native planting with added water feature, homeowners, Montgomery County: $8,000-$13,000\n- Entry walkway with porch overlay, homeowners, Chester County: $28,000-$33,000\n- Irregular natural flagstone re-installation, commercial event venue, Delaware County: $22,000-$28,000\n- No published price for: maintenance contracts, snow and ice, pond dredging, tree work, patios in general.";

export const FAQ_ITEMS: { q: string; a: string; s: string }[] = [
 {
  "q": "How far out are you scheduled?",
  "a": "It depends on the service, but most projects are scheduled within 3-4 weeks after approval.",
  "s": "general"
 },
 {
  "q": "Can you cut my grass?",
  "a": "Yes, we can, but it comes in combination with our other maintenance services included in our package.",
  "s": "general"
 },
 {
  "q": "What payment options are available?",
  "a": "We accept check, cash, all major credit cards, and we offer financing!",
  "s": "general"
 },
 {
  "q": "How does your pricing work?",
  "a": "Pricing is based off the duration of your project and the amount of material we would use to complete it. Visit our contact us page and we will help get you an estimate!",
  "s": "general"
 },
 {
  "q": "Can you plow my driveway?",
  "a": "If you are in an HOA or are a commercial-type client, yes. However, we do not service individual homeowners for snow plowing.",
  "s": "general"
 },
 {
  "q": "Do you service my area?",
  "a": "If you live in Delaware, Chester, or Montgomery Counties - yes, most likely. Fill out our submission form and our office will reach out.",
  "s": "general"
 },
 {
  "q": "What services do you offer?",
  "a": "Too many to list here! - check out Our Services page",
  "s": "general"
 },
 {
  "q": "Do you do concrete work?",
  "a": "No, we do not work with concrete. We can, however, help with any flagstone or paver applications you might have!",
  "s": "general"
 },
 {
  "q": "How do I approve my proposal?",
  "a": "We’re so happy you want to move forward! When you open your proposal, simply e-sign and it will be sent directly to our office staff.",
  "s": "general"
 },
 {
  "q": "Can you deliver or sell mulch?",
  "a": "No, we do not deliver, but we could help prepare and install the mulch for you!",
  "s": "general"
 },
 {
  "q": "Do you have firewood?",
  "a": "No, we do not have firewood for sale - *stay warm though!*",
  "s": "general"
 },
 {
  "q": "Do you do tree work?",
  "a": "We can help with small tree pruning / think below 15 foot, like a Dogwood tree. Anything larger than that, we could recommend another professional that could help!",
  "s": "general"
 },
 {
  "q": "What lawn care services does Bates Landscaping offer?",
  "a": "We offer a comprehensive range of lawn care services, including mowing, edging, trimming, fertilization, weed control, aeration, and overseeding. We tailor our services to meet the specific needs of your lawn, ensuring optimal health and appearance.",
  "s": "general"
 },
 {
  "q": "How often should I mow my lawn?",
  "a": "The frequency of mowing your lawn depends on factors such as grass type, weather conditions, and growth rate. As a general guideline, we recommend mowing your lawn once a week during the growing season to maintain an ideal height and appearance.",
  "s": "general"
 },
 {
  "q": "How do I know if my lawn needs fertilization?",
  "a": "Signs that your lawn may need fertilization include slow growth, pale green or yellowish color, and sparse or thinning grass. Our experts can assess your lawn’s nutrient needs and recommend a fertilization schedule tailored to promote healthy growth and vibrant color.",
  "s": "general"
 },
 {
  "q": "What is overseeding, and when is the best time to do it?",
  "a": "Overseeding involves spreading grass seed over existing turf to fill in bare patches, improve density, and enhance overall lawn health. The best time to overseed depends on your grass type and climate. Early fall is an ideal time as soil temperatures are still warm and there is typically more moisture available.",
  "s": "general"
 },
 {
  "q": "What is hardscaping, and what does it entail?",
  "a": "Hardscaping refers to the non-living elements incorporated into landscaping design to create structure, organization, and visual interest in outdoor spaces. This includes features such as patios, walkways, retaining walls, outdoor fireplaces, outdoor kitchens, and water features.",
  "s": "general"
 },
 {
  "q": "What types of hardscaping services does Bates Landscaping offer?",
  "a": "We offer a wide range of hardscaping services personalized to your specific needs and preferences. Our services include the design, installation, and maintenance of various hardscape features to complement your landscape and enhance your outdoor living experience.",
  "s": "general"
 },
 {
  "q": "Do you offer custom hardscaping designs?",
  "a": "Yes, at Bates Landscaping, we specialize in creating custom hardscaping designs suitable for your unique style and functional requirements. Whether you are looking for a cozy outdoor fireplace, a spacious patio for entertaining, or a tranquil water feature, we can bring your vision to life with creativity and craftsmanship.",
  "s": "general"
 },
 {
  "q": "Can you incorporate hardscaping features into existing landscapes?",
  "a": "Absolutely! Our hardscaping expertise helps us to seamlessly integrate hardscape features into existing landscapes to enhance their beauty and functionality. Whether you are renovating an outdated paver patio or adding a modern walkway to your garden, we will ensure a cohesive and harmonious design that complements your surroundings for your hardscaping projects.",
  "s": "general"
 },
 {
  "q": "Do you provide maintenance services for hardscaping features?",
  "a": "Yes, we offer comprehensive maintenance services to keep your hardscaping features looking their best year-round. From regular cleaning and sealing to repairs and adjustments, we ensure your hardscape investment remains in top condition for years to come.",
  "s": "general"
 },
 {
  "q": "What is stormwater management, and why is it important?",
  "a": "Stormwater management involves strategies and techniques to control the quantity and quality of stormwater runoff, preventing erosion, flooding, and pollution of waterways. Effective stormwater management is essential for preserving water resources, protecting property, and maintaining ecological balance.",
  "s": "general"
 },
 {
  "q": "What stormwater management services does Bates Landscaping provide?",
  "a": "Bates Landscaping provides a range of stormwater management services. Our services include the design, installation, and maintenance of stormwater management systems such as rain gardens, bioswales, permeable pavement, retention ponds, and erosion control measures.",
  "s": "general"
 },
 {
  "q": "What are some common stormwater management techniques used by Bates Landscaping?",
  "a": "Some common stormwater management techniques we employ include rain gardens, which capture and filter runoff through vegetation and soil; bioswales, which are vegetated channels designed to slow and absorb runoff; and permeable pavement, which allows water to infiltrate the ground instead of running off. We also use techniques such as French drains, grading, sump pumps, basins, catch basins, and drains.",
  "s": "general"
 },
 {
  "q": "How does Bates Landscaping assess my property's stormwater management needs?",
  "a": "Our stormwater management experts will conduct a thorough assessment of your property to identify existing drainage issues, assess soil conditions, evaluate runoff patterns, and determine the most effective solutions for managing stormwater on your site.",
  "s": "general"
 },
 {
  "q": "What snow removal services does Bates Landscaping offer?",
  "a": "Bates Landscaping provides comprehensive snow removal services for commercial properties. Our services include snow plowing, shoveling, de-icing, and sidewalk clearing to keep your driveways, parking lots, walkways, and entryways safe and accessible during winter weather events.",
  "s": "general"
 },
 {
  "q": "How does Bates Landscaping prioritize snow removal for clients?",
  "a": "We prioritize snow removal based on factors such as the size of the property, the severity of the snowfall or snow accumulation, and any specific client requests or requirements. Our goal is to ensure timely and efficient snow removal to minimize disruptions and ensure safety for our clients and their visitors.",
  "s": "general"
 },
 {
  "q": "Do you offer snow removal contracts or on-demand services?",
  "a": "Yes, Bates Landscaping offers both snow removal contracts and on-demand services to accommodate our clients’ needs. Our contracts provide peace of mind with scheduled snow removal visits, while our on-demand services allow clients to request snow removal as needed during winter weather events.",
  "s": "general"
 },
 {
  "q": "Are you available 24/7 for emergency snow removal?",
  "a": "Our snow removal services are available 24/7 to address snow and ice emergencies promptly. We monitor weather conditions closely and are prepared to mobilize our snow removal team whenever needed to ensure safety and accessibility for our clients.",
  "s": "general"
 },
 {
  "q": "How can I schedule an appointment with Bates Landscaping?",
  "a": "Getting started with a hardscaping project is easy! Contact our friendly team via phone or email to schedule a consultation with our specialists. We will discuss your ideas, assess your property, and develop a customized plan that brings your vision to life. Let Bates Landscaping transform your outdoor space into a haven you will enjoy for years.",
  "s": "general"
 },
 {
  "q": "Why choose Bates Landscaping Services?",
  "a": "Our team at Bates Landscaping is committed to providing reliable, efficient solutions and professional services to our clients. With our expertise, professionalism, and dedication to excellence, you can trust us with your property needs effectively and responsibly.",
  "s": "general"
 },
 {
  "q": "What is residential hardscaping, and how can it benefit my home?",
  "a": "Residential hardscaping involves designing and installing non-living features in outdoor living spaces, such as patios, walkways, fire pits, and outdoor kitchens. These hardscape features and additions go beyond aesthetics, enhancing property functionality and value by creating additional outdoor living space for relaxation, entertainment, and dining. Well-designed hardscaping also improves curb appeal, potentially increasing a home’s attractiveness to future buyers.",
  "s": "residential"
 },
 {
  "q": "What types of hardscaping features can Bates Landscaping install for residential properties?",
  "a": "Bates Landscaping offers a comprehensive range of hardscaping features tailored to meet the diverse needs and preferences of homeowners. Our services encompass the installation of various elements such as a paver patio, walkways, driveways, retaining walls, outdoor fireplaces, outdoor kitchens, water features, pergolas, and decorative accents like sculptures and arbors.",
  "s": "residential"
 },
 {
  "q": "How can I determine which hardscaping features are best suited for my property?",
  "a": "Deciding on the right hardscaping features for your property can seem daunting, but our experienced team at Bates Landscaping can guide you through the process. We begin by conducting a thorough assessment of your property, taking into account factors such as its size, layout, existing landscaping, and your lifestyle and preferences. Based on this evaluation, we will work closely with you to develop a customized hardscaping plan that enhances the beauty of your outdoor space and meets your functional needs and budget requirements.",
  "s": "residential"
 },
 {
  "q": "How long does a typical residential hardscaping project take, and what factors can affect the timeline?",
  "a": "The duration of a residential hardscaping project can depend on several factors, such as the size and complexity of the project, the availability of materials, weather conditions, and any unforeseen challenges that may arise during construction. Generally, smaller projects like installing a patio or walkway may take a few days to complete, while larger projects such as building an outdoor kitchen or extensive retaining walls may take several weeks or even months. During the initial consultation, we will provide you with a realistic estimate of the project timeline based on your specific requirements and circumstances.",
  "s": "residential"
 },
 {
  "q": "Can I incorporate lighting into my residential hardscaping design, and what are the benefits of outdoor lighting?",
  "a": "Our team can help you select and install lighting fixtures that complement your hardscaping design and meet your specific lighting needs and preferences. We offer a variety of lighting options to enhance the beauty, safety, and functionality of your residential hardscaping features. Outdoor lighting can create a warm and inviting ambiance, extend the use of your outdoor spaces into the evening hours, and improve safety by illuminating pathways, steps, and other potential hazards.",
  "s": "residential"
 },
 {
  "q": "Can hardscaping features be integrated with existing landscaping elements, and how can I ensure a cohesive design for my outdoor space?",
  "a": "Yes, our team specializes in creating cohesive outdoor environments by integrating hardscaping features with existing landscaping elements. Whether you have mature trees, shrubs, flower beds, or other landscaping features on your property, our design team will work closely with you to incorporate hardscaping elements that enhance the aesthetic of your outdoor space. We consider factors such as color, texture, scale, and proportion to ensure that the hardscaping features blend with the existing landscape and create a visually appealing design. By integrating hardscaping and landscaping elements thoughtfully, we can create a seamless outdoor environment that reflects your personal style and highlights the beauty and functionality of your property.",
  "s": "residential"
 },
 {
  "q": "Do you offer maintenance services for residential hardscaping features, and how can I keep my hardscaping looking its best year-round?",
  "a": "Yes, Bates Landscaping provides comprehensive maintenance services. We ensure that your residential hardscaping features remain in optimal condition and continue to enhance the beauty and functionality of your outdoor living space. Regular maintenance is essential for preserving the integrity and longevity of hardscaping installations and can include tasks such as cleaning, sealing, weed control, and repairs. We will work with you to develop a customized maintenance plan tailored to the specific needs of your hardscaping features and your schedule. By investing in regular maintenance, you can protect your investment and enjoy your outdoor living space to the fullest year-round.",
  "s": "residential"
 },
 {
  "q": "Can I see examples of past residential hardscaping projects completed by Bates Landscaping, and how can I get inspired for my own project?",
  "a": "Bates Landscaping is proud to showcase our portfolio of past residential hardscaping projects to demonstrate our expertise, creativity, and attention to detail. Viewing examples of our work can help you visualize the possibilities for your own outdoor space and inspire ideas for your project. We encourage you to explore our portfolio online or request a consultation to see examples of how we have transformed outdoor spaces for homeowners like you.",
  "s": "residential"
 },
 {
  "q": "How do I get started with a residential hardscaping project with Bates Landscaping, and what can I expect during the initial consultation?",
  "a": "Getting started with a residential hardscaping project with Bates Landscaping is easy. Contact us to schedule a consultation, and one of our experienced hardscaping professionals will meet with you to discuss your ideas, assess your property, and provide recommendations for your needs and budget. During the consultation, we take the time to listen to your vision, answer any questions you may have, and outline the steps involved in bringing your next hardscaping project to life. Our goal is to make the process as seamless and enjoyable as possible for you, from concept to completion.",
  "s": "residential"
 },
 {
  "q": "What commercial services does Bates Landscaping offer?",
  "a": "Bates Landscaping offers a comprehensive range of commercial services, including lawn care, stormwater management, and snow removal. We cater our services to meet the specific needs of businesses, property managers, and commercial establishments in West Chester and the Philadelphia region.",
  "s": "commercial"
 },
 {
  "q": "What does your lawn care service include?",
  "a": "Our lawn care service covers everything you need to maintain a healthy and vibrant landscape. This includes regular mowing, trimming, edging, fertilization, weed control, aeration, and overseeding. We also offer specialty services, such as irrigation system installation and maintenance to ensure optimal lawn health.",
  "s": "commercial"
 },
 {
  "q": "How does Bates Landscaping handle stormwater management for commercial properties?",
  "a": "Stormwater management is crucial for preventing flooding, erosion, and water pollution on commercial properties. At Bates Landscaping, we employ a variety of techniques such as rain gardens, bioswales, permeable pavement, and detention basins to effectively manage stormwater runoff. Our team assesses each property’s unique needs and designs custom solutions to mitigate stormwater issues.",
  "s": "commercial"
 },
 {
  "q": "What snow removal services do you offer for commercial clients?",
  "a": "We design our snow removal services to keep commercial properties safe and accessible during winter weather conditions. We offer snow plowing, shoveling, salting, and de-icing services for parking lots, walkways, driveways, and entryways. Our prompt response and reliable service ensure minimal disruption to your business operations during snow events.",
  "s": "commercial"
 },
 {
  "q": "Are your commercial services available year-round?",
  "a": "Yes, Bates Landscaping provides year-round commercial services to businesses and commercial properties in West Chester and the Philadelphia region. Whether it is lawn care in the spring and summer, stormwater management in the fall, or snow removal in the winter, we are here to meet your landscaping needs throughout the year.",
  "s": "commercial"
 },
 {
  "q": "How do I request a quote for commercial services?",
  "a": "Requesting a quote for our commercial services is easy. Simply contact us through our website or give us a call, and one of our knowledgeable representatives will assist you. We will schedule a consultation to discuss your specific needs, assess your property, and provide you with a quote that meets your requirements.",
  "s": "commercial"
 },
 {
  "q": "Is Bates Landscaping licensed and insured?",
  "a": "Yes, Bates Landscaping has the proper licensing and insurance to provide commercial landscaping services in West Chester and the Philadelphia region. Our team consists of professionals who have a commitment to delivering high-quality workmanship and exceptional customer service while adhering to industry standards and safety regulations.",
  "s": "commercial"
 },
 {
  "q": "Can Bates Landscaping customize services to fit my commercial property's unique needs?",
  "a": "Absolutely! At Bates Landscaping, we understand that every commercial property is unique, with its own set of challenges and requirements. That is why we offer customizable service plans to meet the specific needs of your property. Whether you need a comprehensive maintenance package or speciality services, we will work with you to create a solution that fits your budget and exceeds your expectations.",
  "s": "commercial"
 },
 {
  "q": "Does Bates Landscaping offer eco-friendly landscaping options for commercial properties?",
  "a": "Yes, the Bates Landscaping team commits itself to environmentally friendly practices and offers a range of eco-friendly landscaping options for commercial properties. From native plantings and sustainable landscape designs to organic lawn care solutions, we strive to minimize environmental impact while enhancing the beauty and functionality of your property.",
  "s": "commercial"
 },
 {
  "q": "How does Bates Landscaping prioritize safety during snow removal operations?",
  "a": "Safety is our top priority during our snow removal Philadelphia operations. Our team undergoes rigorous training and adheres to strict safety protocols to ensure safe and efficient snow removal. We use state-of-the-art equipment and techniques to minimize risks and protect both our team members and your property during winter weather events.",
  "s": "commercial"
 },
 {
  "q": "Can Bates Landscaping assist with landscape design and installation for commercial properties?",
  "a": "Absolutely! Bates Landscaping offers professional landscape design and installation services for commercial properties. Whether you are looking to create a stunning outdoor space for your business or enhance the curb appeal of your commercial property, our team can bring your vision to life with custom landscape designs and expert installation.",
  "s": "commercial"
 },
 {
  "q": "What measures does Bates Landscaping take to ensure efficient stormwater management?",
  "a": "Efficient stormwater management is essential for protecting commercial properties from water damage and erosion. At Bates Landscaping, we employ a combination of best management practices, including proper grading, drainage systems, erosion control measures, and vegetation management, to effectively manage stormwater runoff and minimize environmental impact.",
  "s": "commercial"
 },
 {
  "q": "Does Bates Landscaping provide ongoing maintenance services for commercial landscapes?",
  "a": "Yes, Bates Landscaping offers ongoing maintenance services to keep your commercial landscape looking its best year-round. Our maintenance plans can include regular mowing, pruning, mulching, fertilization, weed control, irrigation maintenance, and seasonal clean-ups to ensure your property remains healthy and vibrant.",
  "s": "commercial"
 },
 {
  "q": "How quickly can Bates Landscaping respond to snow removal requests for commercial properties?",
  "a": "At Bates Landscaping, we understand the importance of prompt snow removal for commercial properties. We maintain a fleet of snow removal equipment and a team of professionals ready to respond quickly to snow events. Our goal is to clear snow and ice from your property as efficiently as possible to minimize disruptions to your business operations.",
  "s": "commercial"
 },
 {
  "q": "What sets Bates Landscaping apart from other commercial landscaping companies in the West Chester and Philadelphia region?",
  "a": "Bates Landscaping stands out from the competition with our commitment to quality, professionalism, and customer satisfaction. With years of experience, team with regular training, and a passion for excellence, we deliver exceptional results on every project. We prioritize communication, attention to detail, and custom service to ensure that we meet your commercial landscaping needs with the highest level of care and expertise.",
  "s": "commercial"
 }
];
