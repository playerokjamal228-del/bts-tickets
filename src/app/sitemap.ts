import { MetadataRoute } from 'next'
import { getAllEvents } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const events = getAllEvents()
    const baseUrl = 'https://bts-tour.com'

    const eventUrls = events.map((event) => ({
        url: `${baseUrl}/event/${event.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...eventUrls,
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ]
}
