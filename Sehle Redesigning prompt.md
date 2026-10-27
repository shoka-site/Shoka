# Sehle Website Redesign — Complete Frontend Implementation Brief for Cursor

## 1. Role and objective

Act as a senior frontend engineer, UI/UX designer, design systems architect, and accessibility specialist.

Redesign the existing Sehle website, a software development and digital solutions agency serving startups and businesses primarily in Iraq and more broadly across the Middle East.

This is an **existing-codebase redesign, not a greenfield rebuild**.

Create a distinctive, polished, bilingual website that positions Sehle as a reliable technology partner capable of transforming business ideas and operational problems into useful digital products.

The website must communicate technical capability, business understanding, regional relevance, and approachability. Its primary purpose is to generate qualified project inquiries, establish credibility, showcase genuine work, and help prospective clients understand which services fit their needs.

The finished experience must feel like a credible technology consultancy rather than a generic software agency template.

## 2. Mandatory workflow: inspect before editing

Before making changes:

1. Inspect the repository structure, package.json, framework versions, scripts, routing, existing page components, shared layouts, styling system, fonts, image assets, and environment configuration.
2. Identify the existing Next.js routing architecture: App Router, Pages Router, or another established structure.
3. Locate the current Sehle logo, favicon, brand guidelines, color definitions, typography, and other brand assets.
4. Inspect the existing homepage, service pages, navigation, language handling, contact links, and footer.
5. Identify existing integrations, APIs, authentication, forms, analytics, content sources, and business logic that must be preserved.
6. Inventory available portfolio projects and associated screenshots, images, descriptions, and supporting information.
7. Identify existing Arabic and English translations, including the current language-switching implementation.
8. Provide a concise summary of the existing architecture, reusable components, design inconsistencies, and proposed changes before substantial implementation.

Do not replace the project architecture or introduce a new framework merely to achieve the redesign.

Preserve all working functionality unless a specific change is necessary and justified.

## 3. Brand identity and art direction

### Core positioning

Sehle is a business technology partner that provides custom software, digital product development, AI solutions, automation, analytics, infrastructure, and technical consulting.

The primary audience is startup founders and early-stage businesses. The website must also accommodate established SMEs and larger organizations seeking technology modernization.

Brand attributes:

- Professional and dependable.
- Technically capable.
- Business-oriented.
- Approachable and collaborative.
- Innovative without exaggerated claims.
- Familiar with the practical needs of businesses in Iraq and the Middle East.

### Visual direction: enterprise technology partner

Use a refined enterprise design language featuring:

- Clear typography and confident editorial hierarchy.
- Structured, asymmetric compositions where appropriate.
- Generous but controlled whitespace.
- Strong alignment and consistent spacing.
- Restrained borders, surfaces, and shadows.
- Authentic software interfaces and project imagery.
- Subtle visual details that communicate engineering precision.
- Clear content grouping and intuitive navigation.

Avoid excessive decoration. Every visual element should support comprehension, credibility, or conversion.

### Existing brand preservation

The existing website and repository are the authoritative sources for Sehle's brand identity.

Extract and reuse the existing logo, logo variants, favicon, approved brand colors, fonts, and applicable brand guidelines.

Do not invent a new logo, replace the established identity, or impose an unrelated color palette.

If the current color system needs improvement, preserve its recognizable identity while improving contrast, consistency, and accessibility.

Document the discovered design tokens before implementing the new system.

## 4. Design system

### Color tokens

Extract the actual brand colors from the repository and website. Define reusable semantic tokens for:

- Primary brand color.
- Secondary brand color.
- Accent and interactive elements.
- Main page background.
- Alternate section background.
- Card and elevated surfaces.
- Primary and secondary text.
- Muted text.
- Borders and dividers.
- Focus indicators.
- Success, warning, and error states.

Use the brand accent selectively for primary calls to action, active navigation, links, and important visual details.

Maintain readable contrast in both Arabic and English.

Do not assume dark mode, introduce gradients everywhere, or add glassmorphism unless the existing identity and a clear design purpose support those choices.

### Typography

Inspect existing typography first.

Preserve established brand fonts where appropriate. If Arabic typography requires improvement, choose a legible Arabic typeface that pairs harmoniously with the existing Latin font.

Create a consistent typographic scale for:

- Hero headings.
- Page titles.
- Section headings.
- Card titles.
- Body text.
- Supporting descriptions.
- Navigation.
- Buttons and form labels.
- Metadata and captions.

Use controlled line lengths, comfortable line heights, deliberate font weights, and responsive sizing.

Avoid excessively large headings, cramped Arabic text, awkward line breaks, and unnecessary uppercase styling.

### Layout and spacing

Establish reusable layout tokens and a responsive spacing scale.

Use a consistent content container, balanced page margins, and a deliberate grid. Let section layouts vary according to their purpose rather than repeating the same card grid throughout the website.

Prioritize a clean desktop experience while ensuring mobile layouts are intentionally composed rather than merely compressed.

## 5. Bilingual architecture: Arabic and English

Arabic and English are first-class experiences, not secondary translations.

### Requirements

- Provide a clear Arabic/English language switcher.
- Preserve the current page when switching languages whenever an equivalent translation exists.
- Set the appropriate document language and text direction.
- Use RTL layout for Arabic and LTR layout for English.
- Localize navigation, headings, body content, forms, validation messages, buttons, metadata, and footer content.
- Translate page titles and SEO metadata.
- Ensure the selected language is reflected consistently throughout navigation and page content.
- Use appropriate Arabic font rendering and spacing.
- Support mixed Arabic and Latin content, including technical terms, URLs, email addresses, numbers, and code-related text.
- Use logical CSS properties such as inline-start, inline-end, margin-inline, and padding-inline where appropriate.
- Handle icons, directional arrows, breadcrumbs, navigation, and directional animations correctly for each locale.
- Do not blindly mirror logos, brand marks, media, or components whose orientation should remain unchanged.

Inspect the existing localization architecture before implementing language handling. Extend the existing solution if suitable; otherwise, implement the simplest maintainable approach consistent with the repository.

Do not add a heavy localization dependency without a clear need.

Create equivalent, high-quality Arabic and English copy. Avoid lorem ipsum and machine-like literal translations.

Use professional, approachable business language appropriate for startup founders and business owners in Iraq and the wider Middle East.

## 6. Site architecture and navigation

Implement and refine these public pages:

1. Home.
2. Services.
3. Individual service detail pages.
4. Portfolio / Case Studies.
5. About.
6. Contact.

Preserve existing routes and links where possible. If route changes are necessary, maintain appropriate redirects and avoid broken links.

### Header and navigation

Create a responsive header containing:

- The existing Sehle logo.
- Links to the main website sections.
- An accessible language switcher.
- A clear primary project inquiry action.
- A mobile navigation menu with functional open and close behavior.

Use a sticky header only if it improves navigation without unnecessarily consuming viewport space.

Support keyboard navigation, visible focus states, active route indication, and appropriate mobile menu behavior.

## 7. Homepage: section-by-section design

The homepage should tell a coherent story: what Sehle does, who it helps, what it can build, why clients should trust it, and how to start a conversation.

### Section 1: Hero

Create a strong, business-focused opening section.

The headline should communicate that Sehle builds practical software and digital systems that help businesses operate better and turn ideas into working products.

Use concise supporting copy explaining the agency's software development, AI, and automation capabilities.

Include two clear actions:

- Primary: Discuss Your Project.
- Secondary: Explore Our Services.

The primary action should connect to the verified WhatsApp Business contact or the established project inquiry flow. The secondary action should navigate to Services.

Use an authentic visual asset, such as a real software interface, product dashboard, or genuine project screenshot.

Avoid generic stock photography, invented statistics, decorative code rain, and abstract 3D objects unrelated to Sehle's work.

The hero must remain clear and compelling in both Arabic and English.

### Section 2: Credibility and positioning

Introduce Sehle as a technology partner for businesses at different stages of growth.

Use verified information about the company, its capabilities, and its real projects.

Only include client logos, years of experience, project counts, performance metrics, certifications, or testimonials if they are supported by available evidence.

If there is insufficient proof for a metric or endorsement, use a clear explanation of the agency's capabilities instead.

### Section 3: Services overview

Present four clear service categories:

**A. Custom Software Development**
- Full-stack development.
- Business management systems.
- Custom web applications.
- APIs and system integrations.

**B. AI and Business Automation**
- AI-powered solutions.
- Machine learning and computer vision.
- Intelligent assistants where genuinely offered.
- Workflow and business process automation.

**C. Digital Product Development**
- Business websites.
- Mobile applications where offered.
- SaaS and digital product development.
- User experience and interface design.

**D. Data, Cloud and IT Consulting**
- Data analytics and reporting.
- Cloud infrastructure.
- Technical consulting.
- System reliability, maintenance, and modernization.

Treat these categories as a proposed information architecture. Verify every service against the existing website and project capabilities before publishing it.

Preserve relevant existing services that do not fit neatly into these groups. Adjust labels and grouping where necessary to reflect the actual business.

Use concise descriptions explaining what each service helps clients accomplish.

Link every category to its relevant service page. Avoid generic cards that contain only an icon, title, and vague sentence.

### Section 4: Selected work

Showcase a small, curated selection of genuine projects.

Inspect the existing website, repository, portfolio records, project documentation, and available screenshots to identify the strongest authentic examples.

Potential candidates to investigate include:

- A restaurant inventory management system.
- An AI-assisted architectural information extraction project.
- Business websites and digital experiences developed for actual clients.

These are research leads, not automatically approved case studies. Verify the available assets and project information before choosing what to feature.

Select projects that demonstrate different capabilities and are relevant to startup founders and business clients.

Each project presentation should include, when available:

- Project name.
- Client or industry, if disclosure is permitted.
- Business problem.
- Sehle's contribution.
- Relevant technologies, when verified.
- Genuine product imagery.
- A link to a detailed case study, if one exists.

Use real screenshots or authentic project media instead of generic illustrations whenever possible.

If a project lacks verified outcomes, describe the delivered functionality rather than inventing business results.

Do not create fake testimonials, client endorsements, or project statistics.

### Section 5: Why Sehle

Explain the agency's actual differentiators:

- Software tailored to the client's requirements.
- AI and automation where they solve a real problem.
- Practical technical choices that consider business needs and budget.
- Direct collaboration and communication.
- Ongoing technical support where offered.
- Understanding of regional business needs.

Support each point with specific explanations rather than unsupported claims of being the best, fastest, or cheapest provider.

### Section 6: Working process

Explain the project journey using a clear, concise sequence, adapted to Sehle's actual workflow.

A proposed structure is:

1. Understand the business and requirements.
2. Define the solution and scope.
3. Design and develop the software.
4. Test and review the result.
5. Deploy and provide agreed ongoing support.

Verify this process with existing company information. Treat it as proposed copy until confirmed.

Use a timeline or structured editorial layout rather than another generic grid of cards.

### Section 7: Final call to action

Close with a clear invitation to discuss a business challenge or product idea.

Primary action: Discuss Your Project.

Secondary option: Email Sehle.

Use concise copy that feels welcoming to founders who may not yet have complete technical specifications.

### Section 8: Footer

Include:

- Sehle logo.
- Brief company positioning.
- Main navigation.
- Service category links.
- Language switching where appropriate.
- Verified email address.
- Verified WhatsApp Business contact.
- Existing social profiles, if configured.
- Appropriate copyright and legal links, if available.

Do not invent contact details or display inconsistent email addresses.

## 8. Services page and individual service pages

### Services overview

Create a well-organized services landing page that helps visitors understand the range of available solutions and identify the right starting point.

Use clear category headings, meaningful descriptions, relevant visuals, and direct links to detail pages.

Preserve the full breadth of Sehle's existing services while improving categorization and discoverability.

Include a clear project inquiry action without making every section compete for attention.

### Individual service detail pages

Use a consistent page structure while adapting the content to each service.

Where appropriate, include:

1. Service-specific hero and value proposition.
2. Business problems addressed.
3. Capabilities and deliverables.
4. Practical use cases.
5. Relevant verified case studies.
6. Typical collaboration or delivery process.
7. Frequently asked questions, if supported by useful information.
8. Project inquiry call to action.

Write specific content for each service. Do not duplicate the same generic text across all pages.

Avoid publishing technical capabilities that Sehle cannot actually deliver.

## 9. Portfolio and case studies

Create a portfolio that demonstrates the quality and relevance of Sehle's work.

Inspect available project information before choosing the featured project. Prefer the strongest genuine project with sufficient supporting information and usable visual assets.

For each case study, present the available information in a clear narrative:

- Project overview.
- Client context or industry, where disclosure is permitted.
- Problem or opportunity.
- Objectives.
- Sehle's role and contributions.
- Solution and implementation.
- Genuine screenshots or product visuals.
- Verified technical details.
- Results, only when supported by evidence.

If there are too few fully documented projects, use a smaller curated portfolio rather than padding it with fictional work.

Do not fabricate clients, project details, performance results, testimonials, or visual evidence.

## 10. About page

Present Sehle's identity, working principles, and role as a technology partner.

Explain the company's approach to understanding business needs, selecting appropriate technologies, developing reliable solutions, and collaborating with clients.

Use genuine company and team information where available.

Do not invent team members, qualifications, company milestones, office locations, or organizational claims.

Keep the page focused on the information prospective clients need to build confidence.

## 11. Contact page and conversion behavior

Make it easy for visitors to start a conversation.

Include:

- A concise, welcoming introduction.
- A prominent WhatsApp Business contact option.
- A clearly displayed, verified email address.
- An optional project inquiry form if appropriate to the existing architecture.
- Clear expectations about the information a prospective client should provide.

If a form is implemented, use only supported fields, such as name, email, company or project type, and a short project description.

Implement client-side validation, accessible labels, useful error messages, disabled/loading states where appropriate, and clear success or failure feedback.

If a backend submission endpoint already exists, preserve and reuse it.

Do not create a form that appears functional but silently discards submissions. If there is no working submission mechanism, use the established contact channels or clearly identify the form integration as incomplete.

Use the verified WhatsApp Business number and a correctly encoded WhatsApp link. Never invent a phone number.

Use the verified email address and a functional email link.

Ensure all contact buttons have meaningful destinations and work on desktop and mobile.

## 12. Components and visual assets

Build on existing components and introduce reusable components only where they provide clear value.

Potential shared components include:

- Header and mobile navigation.
- Language switcher.
- Footer.
- Primary and secondary buttons.
- Service category presentation.
- Case study presentation.
- Section headings.
- Process timeline.
- Contact actions.
- Form controls and validation feedback.

Avoid overengineering a small marketing website with unnecessary abstractions.

Use authentic screenshots, logos, and imagery from the repository or approved sources. Optimize images, preserve their aspect ratios, and use appropriate responsive image behavior.

Provide meaningful alternative text for informative images and empty alt attributes for purely decorative imagery.

Use consistent corner radii, borders, spacing, and surface treatments. Avoid adding shadows and cards to every section.

## 13. Interactions and animation

Prioritize functional, purposeful interactions:

- Accessible desktop and mobile navigation.
- Correct language switching.
- Functional internal navigation.
- Working service and case study links.
- Clear hover, focus, active, disabled, and loading states.
- Functional WhatsApp and email actions.
- Working forms where a valid submission mechanism exists.
- Subtle transitions for interactive elements.
- Lightweight entrance animations only where they improve comprehension.

Respect reduced-motion preferences.

Avoid excessive parallax, scroll hijacking, long reveal delays, animated backgrounds that compete with content, and motion that makes the website feel slower.

Never sacrifice responsiveness or accessibility for decorative effects.

## 14. Responsive design

Design and verify layouts for representative mobile, tablet, laptop, and desktop widths.

Do not merely scale desktop layouts down.

At mobile sizes:

- Simplify navigation into an accessible menu.
- Keep the main call to action easy to reach.
- Stack content according to reading priority.
- Ensure Arabic headings wrap naturally.
- Maintain comfortable body text and spacing.
- Prevent horizontal overflow.
- Preserve useful image crops.
- Keep forms and controls easy to operate.
- Ensure contact links work correctly on touch devices.

For Arabic RTL layouts, verify navigation order, alignment, directional icons, mixed-language strings, form layouts, and reading flow independently.

Test both Arabic and English at representative viewport widths.

## 15. Accessibility, SEO, and performance

Use semantic HTML and accessible interaction patterns.

Requirements include:

- Proper heading hierarchy.
- Keyboard-operable navigation and controls.
- Visible focus indicators.
- Accessible form labels and error messages.
- Sufficient text and control contrast.
- Appropriate document language and text direction.
- Reduced-motion support.
- Descriptive link text.
- Meaningful image alternatives.
- Correct page titles and descriptions for both languages.
- Appropriate canonical URLs and localized alternate links where supported by the routing architecture.
- Preservation of existing SEO-relevant routes and metadata.
- Optimized image loading and appropriate font loading.
- Avoidance of unnecessary client-side JavaScript.
- Protection against layout shifts and oversized media.
- Appropriate caching and rendering strategies consistent with the existing application.

Aim for strong Core Web Vitals and accessibility performance without sacrificing visual quality.

Do not claim compliance or performance improvements without verification.

## 16. Technical implementation constraints

Use the existing Next.js and React stack.

Retain the project's existing styling solution, component library, routing, and localization architecture where appropriate.

Do not assume Tailwind CSS, shadcn/ui, Framer Motion, or another dependency is installed. Inspect the actual project first.

Implementation rules:

- Preserve working routes, APIs, authentication, data flows, and business logic.
- Reuse existing components when they remain appropriate.
- Avoid unnecessary dependencies.
- Avoid duplicate components and conflicting style systems.
- Keep components maintainable and appropriately scoped.
- Preserve environment variables and secret handling.
- Never expose credentials or API keys.
- Do not replace working backend integrations with mock implementations.
- Do not remove existing content or functionality without a clear reason.
- Preserve existing deployment and build conventions.

If a change could introduce a breaking change, identify the risk and use the least disruptive approach.

## 17. Content and localization quality

Write concise, realistic, business-focused content in both languages.

English content should be natural and professional.

Arabic content should read naturally for the intended regional audience. Use professional Modern Standard Arabic as the default for the corporate website, unless the existing brand guidelines establish a different editorial voice.

Avoid literal translation, exaggerated marketing language, meaningless slogans, and generic claims.

Preserve technical accuracy when translating software terminology.

Use consistent translations for service names, navigation, buttons, and recurring terminology.

Do not invent facts to fill missing content. Use existing verified information or clearly identified placeholders that must be replaced before launch.

## 18. Testing and quality assurance

After implementation:

1. Run the existing lint, type-check, and build scripts where available.
2. Resolve errors introduced by the changes.
3. Verify all primary routes and internal links.
4. Test Arabic and English language switching.
5. Verify correct RTL/LTR rendering and document metadata.
6. Test the mobile navigation and keyboard interaction.
7. Verify WhatsApp and email destinations using the actual configured contact details.
8. Test form validation and submission behavior where implemented.
9. Check representative mobile, tablet, and desktop layouts.
10. Inspect image loading, typography, spacing, and content wrapping.
11. Check browser console errors and broken assets.
12. Confirm that existing integrations and business logic remain intact to the extent permitted by the available environment.

If browser or application testing is available, inspect the actual rendered result rather than relying solely on source code.

Report which checks passed, which failed, and which could not be performed. Do not claim that a test passed if it was not run.

## 19. Design mistakes to avoid

Do not produce:

- A generic agency template with a different logo.
- A visually impressive but unclear hero section.
- A long, unstructured list of technical services.
- Repeated card grids in every section.
- Invented testimonials, client logos, case studies, or results.
- A new visual identity that conflicts with Sehle's existing brand.
- An English-first design with inadequate Arabic support.
- RTL layouts that simply reverse every element indiscriminately.
- Nonfunctional buttons or placeholder contact links.
- Forms that do not deliver submitted information.
- Excessive gradients, glassmorphism, shadows, or animation.
- Desktop layouts that break on mobile.
- Unnecessary rewrites of the existing codebase.
- Unsupported claims about technical capabilities or business outcomes.

## 20. Definition of done

The redesign is complete when:

- The existing Sehle identity is preserved and applied consistently.
- The homepage communicates the agency's value proposition quickly.
- Services are organized into clear, accurate categories.
- All required pages are implemented and connected.
- The portfolio uses genuine projects and verified information.
- Arabic and English experiences are complete and usable.
- RTL and LTR layouts work correctly across representative screen sizes.
- WhatsApp Business and email contact actions work.
- Existing application functionality and integrations are preserved.
- Accessibility, SEO, responsive behavior, and performance have been considered and checked where possible.
- The implementation passes the available project checks.
- Any remaining blockers, missing assets, or incomplete integrations are documented.

## 21. Final implementation report

When finished, provide a concise report covering:

1. The major design improvements.
2. The pages and components changed.
3. How the existing brand identity and bilingual architecture were preserved.
4. Any portfolio assets or content used.
5. Tests executed and their results.
6. Remaining issues, assumptions, and missing information.
7. Any recommended follow-up improvements.

Begin by inspecting the repository and existing website. Establish the implementation plan, then execute the redesign in controlled steps, validating the result as you go.

The objective is a credible, distinctive, conversion-focused Sehle website that communicates genuine engineering capability, serves Arabic- and English-speaking audiences, and builds trust with startups and businesses across Iraq and the wider Middle East.
