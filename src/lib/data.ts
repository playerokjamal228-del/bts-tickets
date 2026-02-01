export interface TicketOffer {
    id: string;
    sectorName: string;
    block: string;
    row: string;
    price: number;
    available: number;
    type: string;
}

export interface EventData {
    id: string;
    country: string;
    city: string;
    stadium: string;
    date: string;
    offers: TicketOffer[];
}

const CITIES = [
    { id: "belgium", city: "Brussels", country: "Belgium", stadium: "King Baudouin Stadium", date: "July 01, 2026" },
    { id: "uk", city: "London", country: "UK", stadium: "Wembley Stadium", date: "July 06, 2026" },
    { id: "germany", city: "Munich", country: "Germany", stadium: "Allianz Arena", date: "July 11, 2026" },
    { id: "france", city: "Paris", country: "France", stadium: "Stade de France", date: "July 17, 2026" },
    { id: "spain", city: "Madrid", country: "Spain", stadium: "Santiago Bernabéu", date: "July 26, 2026" },
];

const generateRange = (prefix: string, start: number, end: number): string[] => {
    const blocks: string[] = [];
    for (let i = start; i <= end; i++) {
        blocks.push(`${prefix}${i}`);
    }
    return blocks;
};

export const getEventData = (id: string): EventData | null => {
    const city = CITIES.find(c => c.id === id);
    if (!city) return null;

    const offers: TicketOffer[] = [];

    // Helper to determine availability: 60% chance of being sold out (0 tickets), 
    // otherwise very limited availability (1-4 tickets)
    // Static availability to ensure consistency
    const getAvailability = (baseAvailable: number, index: number) => {
        // Deterministic pattern: 4, 2, 4, 3, 4...
        // Use index to vary it slightly but statically
        const patterns = [4, 2, 4, 3];
        return patterns[index % patterns.length];
    };

    const addOffers = (blocks: string[], sectorName: string, type: string, price: number) => {
        blocks.forEach((block, i) => {
            // For interior/standing, just one "row" usually
            const rows = type === "Interior" ? ["GA"] : [10, 25, 40];

            // Deterministic "Sold Out" logic:
            // Mark ~30% of blocks as sold out (e.g. every 3rd block)
            // Use block name or index to be consistent
            const isBlockSoldOut = (i % 3 === 0) && type !== "Interior"; // Keep interior mostly available for fun

            rows.forEach((r, idx) => {
                // Determine availability for this specific offer
                // If block is sold out, availability is 0
                // Otherwise use the pattern (1-4)
                const available = isBlockSoldOut ? 0 : getAvailability(4, idx + i);

                offers.push({
                    id: `${id}-${block}-${r}`,
                    sectorName: `${sectorName} ${block}`,
                    block: block,
                    row: typeof r === 'number' ? `Row ${r}` : r,
                    price: price - (idx * 10),
                    available: available,
                    type: type
                });
            });
        });
    };

    if (id === "uk") {
        // London (Wembley)
        addOffers(generateRange("", 101, 144), "Block", "Lower", 500);
        addOffers(generateRange("", 201, 252), "Club Block", "Club", 700);
        addOffers(generateRange("", 501, 552), "Upper Block", "Upper", 240);
        addOffers(["North Pitch", "South Pitch", "East Pitch", "West Pitch"], "Pitch", "Interior", 600);
    }
    else if (id === "germany") {
        // Munich (Allianz Arena)
        addOffers(generateRange("", 301, 348), "Block", "Upper", 240);
        addOffers(generateRange("", 201, 247), "Block", "Club", 560);
        addOffers(generateRange("", 101, 136), "Block", "Lower", 700);
        addOffers(["Zone A", "Zone B", "Zone C", "Zone D"], "Standing", "Interior", 360);
    }
    else if (id === "belgium") {
        // Brussels - match StadiumWidget sector IDs
        addOffers(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"], "Tribune", "Grandstand", 300);
        addOffers(["O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], "Tribune", "Grandstand", 260);
        addOffers(["AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL"], "Tribune", "Grandstand", 240);
        addOffers(["AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW"], "Tribune", "Grandstand", 240);
        addOffers(["Pitch"], "Zone", "Interior", 400);
        addOffers(["Standing Zone A", "Standing Zone B", "Standing Zone C", "Standing Zone D"], "Floor", "Interior", 380);
    }
    else if (id === "spain") {
        // Madrid
        addOffers(generateRange("", 420, 435), "Sector", "Upper", 220);
        addOffers(generateRange("", 301, 324), "Sector", "Middle", 300);
        addOffers(generateRange("", 201, 220), "Sector", "Lower", 400);
        addOffers(generateRange("", 101, 114), "Sector", "Premium", 600);
        addOffers(generateRange("", 501, 510), "Grada", "Standard", 180);
        addOffers(["A", "B", "C", "D"], "Pista", "Interior", 360);
    }
    else {
        // Generic fallback
        addOffers(["101", "102", "103"], "Sector", "Lower", 200);
        addOffers(["201", "202", "203"], "Sector", "Upper", 160);
        addOffers(["GA"], "Floor", "Interior", 300);
    }

    return {
        ...city,
        offers
    };
};

export const getAllEvents = () => CITIES;
