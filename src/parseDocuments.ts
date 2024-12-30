import type {RouteConfig, DocusaurusConfig} from '@docusaurus/types';
import {flattenRoutes} from '@docusaurus/utils';
import matter from 'gray-matter';
import fs from 'fs-extra';
import logger from '@docusaurus/logger';
import path from 'path';

export interface RouteMetadata {
    title: string;
    description: string | null;
    content: string;
    section_name: string;
    url: string;
}

function extractUrl(route: RouteConfig, siteConfig: DocusaurusConfig): string {
    return path.join(siteConfig.url, route.path);
}

function extractTitle(content: string, frontMatter: matter.GrayMatterFile<string>): string {
    let title = frontMatter.data?.title;
    
    // If no title in frontmatter, try to get first header
    if (!title) {
        const headerMatch = frontMatter.content.match(/^#\s+(.+)$/m);
        if (headerMatch) {
            title = headerMatch[1].trim();
        }
    }
    
    return title || "";
}

function extractSectionName(route: RouteConfig, siteConfig: DocusaurusConfig) {
    const navbars: any = siteConfig.themeConfig.navbar || {};
    const matching_sidebars = navbars.items.filter((item: any) => item.sidebarId === route.sidebar)

    if (matching_sidebars.length == 1) {
        return matching_sidebars[0].label
    } else {
        logger.error('Multiple sidebars found for route ' + route.path)
        throw new Error('Multiple sidebars found for route ' + route.path)
    }
}

function extractSingleRouteMetadata(route: RouteConfig, siteConfig: DocusaurusConfig) : RouteMetadata {
    let description = null;
    let content = "";
    let section_name = "";
    let url = "";
    let title = "";

    if (route.metadata?.sourceFilePath) {
        try {
            const source = route.metadata.sourceFilePath;
            content = fs.readFileSync(source, 'utf8');
        } catch (error) {
            console.error(`Error reading file ${route.metadata.sourceFilePath}:`, error);
        }
        
        try {
            const frontMatter = matter(content);
            title = extractTitle(content, frontMatter);
            description = frontMatter.data?.description;

            section_name = extractSectionName(route, siteConfig);
            url = extractUrl(route, siteConfig);
        } catch (error) {
            console.error(`Error parsing markdown file ${route.metadata.sourceFilePath}:`, error);
        }
    }

    return {
        title: title,
        description: description,
        content: content,
        section_name: section_name,
        url: url
    }
}

export function extractRoutesMetadata(routes: RouteConfig[], siteConfig: DocusaurusConfig) {
    const flatRoutes = flattenRoutes(routes)
    const filteredRoutes = flatRoutes.filter((route) => route.metadata?.sourceFilePath?.endsWith('.md') || route.metadata?.sourceFilePath?.endsWith('.mdx'))
    
    const routesMetadata = filteredRoutes.map((route) => {
        return extractSingleRouteMetadata(route, siteConfig);
    });

    return routesMetadata;
}
