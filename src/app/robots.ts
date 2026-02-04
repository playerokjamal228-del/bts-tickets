import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/checkout/success', '/api/'],
        },
        sitemap: 'https://bts-tour.com/sitemap.xml',
    }
}
