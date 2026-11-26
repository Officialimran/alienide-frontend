import type { Metadata } from "next";
import type { ComponentType } from "react";
import { TEMPLATE } from "@/lib/routes";
import { AboutTemplate } from "./AboutTemplate";
import { ContactTemplate } from "./ContactTemplate";
import { DefaultTemplate } from "./DefaultTemplate";
import { LandingTemplate } from "./LandingTemplate";
import { ProjectDetailTemplate, projectDetailMetadata } from "./ProjectDetailTemplate";
import { ProjectsTemplate } from "./ProjectsTemplate";
import { ServiceDetailTemplate, serviceDetailMetadata } from "./ServiceDetailTemplate";
import { ServicesTemplate } from "./ServicesTemplate";
import { TeamTemplate } from "./TeamTemplate";
import type { DetailTemplateProps, TemplateProps } from "./types";

type PageTemplate = ComponentType<TemplateProps>;

/**
 * Page layout per CMS template slug (Page.template.slug).
 * To support a new template: create it in the CMS, build a component
 * taking TemplateProps, and register it here.
 */
const pageTemplates: Record<string, PageTemplate> = {
  [TEMPLATE.landing]: LandingTemplate,
  [TEMPLATE.projects]: ProjectsTemplate,
  [TEMPLATE.services]: ServicesTemplate,
  [TEMPLATE.team]: TeamTemplate,
  [TEMPLATE.contact]: ContactTemplate,
  [TEMPLATE.about]: AboutTemplate,
};

export function resolvePageTemplate(slug: string | null | undefined): PageTemplate {
  return (slug && pageTemplates[slug]) || DefaultTemplate;
}

interface DetailTemplate {
  Component: ComponentType<DetailTemplateProps>;
  metadata: (props: DetailTemplateProps) => Promise<Metadata>;
}

/**
 * Item pages nested under a listing page: /{listing-slug}/{item-slug}.
 * The listing page's template decides which kind of item the slug refers to.
 */
const detailTemplates: Record<string, DetailTemplate> = {
  [TEMPLATE.projects]: { Component: ProjectDetailTemplate, metadata: projectDetailMetadata },
  [TEMPLATE.services]: { Component: ServiceDetailTemplate, metadata: serviceDetailMetadata },
};

export function resolveDetailTemplate(parentTemplate: string | null | undefined): DetailTemplate | undefined {
  return parentTemplate ? detailTemplates[parentTemplate] : undefined;
}
