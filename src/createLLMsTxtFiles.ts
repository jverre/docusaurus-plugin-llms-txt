import {RouteMetadata} from './parseDocuments';
import {PluginOptions} from './options';

function createTitleSection(options: PluginOptions): string {
    const description = options.description ? `\n\n> ${options.description}` : '';
    return `# ${options.title}${description}\n\n`;
} 

function groupRoutesBySection(routes: RouteMetadata[]): { [key: string]: RouteMetadata[] } {
    return routes.reduce((acc: { [key: string]: RouteMetadata[] }, route) => {
        const section = route.section_name;
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(route);
        return acc;
    }, {});
}

function createSectionContent(routes: RouteMetadata[]): string {
    // Group routes by section_name
    const routesBySection = groupRoutesBySection(routes);
    
    // Create markdown for each section
    return Object.entries(routesBySection).map(([sectionName, sectionRoutes]) => {
        const routesList = sectionRoutes
            .map(route => {
                const link = `[${route.title}](${route.url})`;
                return route.description ? `- ${link}: ${route.description}` : `- ${link}`;
            })
            .join('\n');
            
        return `## ${sectionName}\n\n${routesList}`;
    }).join('\n\n');
}

function createFullSectionContent(routes: RouteMetadata[]): string {
    return routes.map((route) => route.content).join('\n\n');
}

export function generateLLMsTxt(routes: RouteMetadata[], options: PluginOptions): string {
    const titleSection = createTitleSection(options);
    const content = createSectionContent(routes);
    return titleSection + content;
}

export function generateFullLLMsTxt(routes: RouteMetadata[], options: PluginOptions): string {
    let llmsTxt = createTitleSection(options);
    
    // Group routes by section_name
    const mergedContent = createFullSectionContent(routes);
    
    return llmsTxt + mergedContent;
}
