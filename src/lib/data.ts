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

// Helper to limit available tickets by 50%
const filterHalf = (arr: string[]) => arr.filter((_, i) => i % 2 === 0);

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
        // London (Wembley) - Using actual SVG section IDs
        // Lower tier (100s)
        addOffers(["101", "102", "103", "104", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "122", "123", "124"], "Section", "Lower", 500);
        // Club tier (200s)
        addOffers(["201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "214", "215", "245", "246", "247", "248", "249", "250", "251", "252", "254", "256"], "Club Block", "Club", 700);
        // Upper tier (500s)
        addOffers(["501", "502", "503", "504", "505", "506", "507", "508", "509", "510", "511", "512", "513", "514", "515", "516", "517", "518", "519", "520", "521", "522", "523", "524", "525", "527", "528", "529", "530"], "Upper Block", "Upper", 240);
        // Floor standing areas (001-003)
        addOffers(["001", "002", "003"], "Pitch", "Interior", 600);
    }
    else if (id === "germany") {
        // Munich (Allianz Arena)
        addOffers(generateRange("", 301, 348), "Block", "Upper", 240);
        addOffers(generateRange("", 201, 247), "Block", "Club", 560);
        addOffers(generateRange("", 101, 136), "Block", "Lower", 700);
        addOffers(["Zone A", "Zone B", "Zone C", "Zone D"], "Standing", "Interior", 360);
    }
    else if (id === "belgium") {
        // Brussels - match SVG section IDs (1a, 1b, 2a, 2b, etc.)
        // Floor/Tribune sections (1a-1l, 2a-2v, 3a-3n, 4a-4v)
        addOffers(["1a", "1b", "1c", "1d", "1e", "1f", "1g", "1h", "1i", "1j", "1k", "1l", "1-vop"], "Tribune", "Grandstand", 300);
        addOffers(["2a", "2b", "2c", "2d", "2e", "2f", "2g", "2h", "2i", "2j", "2k", "2l", "2m", "2n", "2o", "2p", "2q", "2r", "2s", "2t", "2u", "2v"], "Tribune", "Grandstand", 260);
        addOffers(["3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h", "3i", "3j", "3k", "3l", "3m", "3n"], "Tribune", "Grandstand", 280);
        addOffers(["4a", "4b", "4c", "4d", "4e", "4f", "4g", "4h", "4i", "4j", "4k", "4l", "4m", "4n", "4o", "4p", "4q", "4r", "4s", "4t", "4u", "4v"], "Tribune", "Grandstand", 240);
        // Standing Floor sections
        addOffers(["standing-flr-a", "standing-flr-b", "standing-flr-c", "standing-flr-d"], "Floor", "Interior", 380);
        // ADA zones
        addOffers(["ada-zone-a", "ada-zone-c"], "ADA", "Accessible", 350);
    }
    else if (id === "spain") {
        // Madrid - Reduce density by 50%
        // Upper (4xx, 5xx)
        addOffers(filterHalf(generateRange("", 400, 439)), "Sector", "Upper", 220);
        addOffers(filterHalf(generateRange("", 500, 512)), "Sector", "Upper", 220);
        // Middle (3xx)
        addOffers(filterHalf(generateRange("", 300, 339)), "Sector", "Middle", 300);
        // Lower (2xx)
        addOffers(filterHalf(generateRange("", 200, 239)), "Sector", "Lower", 400);
        // Premium (1xx)
        addOffers(filterHalf(generateRange("", 100, 133)), "Sector", "Premium", 600);

        // Pista (A, B only - others unavailable) - Keep A/B available (no filterHalf needed as it's small)
        addOffers(["a", "b"], "Pista", "Interior", 360);

        // VIP / Special
        addOffers(filterHalf(["palco", "skybox"]), "VIP", "Premium", 800);

        // B-sides (partial views or sub-sectors)
        // 401-b to 410-b
        const bSides4 = Array.from({ length: 10 }, (_, i) => `4${(i + 1).toString().padStart(2, '0')}-b`);
        addOffers(filterHalf(bSides4), "Grada", "Standard", 180);

        // 501-b to 510-b
        const bSides5 = Array.from({ length: 10 }, (_, i) => `5${(i + 1).toString().padStart(2, '0')}-b`);
        addOffers(filterHalf(bSides5), "Grada", "Standard", 180);

        addOffers(["322-b"], "Sector", "Middle", 280);
    }
    else if (id === "france") {
        // Paris (Stade de France) - Using actual SVG section IDs with alphanumeric format - Reduce density by 50%
        // A sections
        addOffers(filterHalf(["a-1", "a-2", "a-3", "a-4", "a-5", "a-6", "a-9", "a-10", "a-11", "a-12"]), "Section A", "Upper", 280);
        // B sections
        addOffers(filterHalf(["b-1", "b-2", "b-3", "b-4", "b-5", "b-6", "b-7", "b-8", "b-11", "b-12"]), "Section B", "Upper", 260);
        // C sections
        addOffers(filterHalf(["c-3", "c-4", "c-5", "c-6", "c-7", "c-8", "c-9", "c-10"]), "Section C", "Middle", 320);
        // D sections
        addOffers(filterHalf(["d-1", "d-2", "d-4", "d-5", "d-6", "d-7", "d-8", "d-9"]), "Section D", "Middle", 340);
        // E sections
        addOffers(filterHalf(["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-9", "e-10", "e-11", "e-12", "e-13", "e-14"]), "Section E", "Lower", 400);
        // G sections
        addOffers(filterHalf(["g-1", "g-2", "g-3", "g-4", "g-5", "g-6", "g-7", "g-8"]), "Section G", "Lower", 380);
        // H sections (all h sections from SVG)
        addOffers(filterHalf(["h-1", "h-2", "h-3", "h-4", "h-5", "h-6", "h-7", "h-8", "h-11", "h-12"]), "Section H", "Premium", 450);
        // J sections (all j sections from SVG)
        addOffers(filterHalf(["j-1", "j-2", "j-3", "j-4", "j-5", "j-6", "j-7", "j-8", "j-9", "j-10"]), "Section J", "Premium", 480);
        // K sections (all k sections from SVG)
        addOffers(filterHalf(["k-1", "k-2", "k-3", "k-4", "k-7", "k-8", "k-9", "k-10"]), "Section K", "Premium", 500);
        // L sections (all l sections from SVG)
        addOffers(filterHalf(["l-1", "l-2", "l-3", "l-4", "l-5", "l-6", "l-9", "l-10", "l-11", "l-12", "l-13", "l-14", "l-15", "l-16", "l-17", "l-18"]), "Section L", "Club", 600);
        // N sections (all n sections from SVG)
        addOffers(filterHalf(["n-3", "n-4", "n-5", "n-6", "n-9", "n-10", "n-11", "n-12", "n-13", "n-14", "n-15", "n-16", "n-17", "n-18"]), "Section N", "Premium", 520);
        // R sections (all r sections from SVG)
        addOffers(filterHalf(["r-1", "r-2", "r-3", "r-4", "r-5", "r-6", "r-9", "r-10", "r-11", "r-12", "r-13", "r-14", "r-15"]), "Section R", "Club", 580);
        // S sections (all s sections from SVG)
        addOffers(filterHalf(["s-1", "s-2", "s-3", "s-4", "s-5", "s-6", "s-7", "s-8", "s-12", "s-13", "s-14", "s-15", "s-16", "s-17", "s-18"]), "Section S", "Lower", 380);
        // T sections (all t sections from SVG)
        addOffers(filterHalf(["t-1", "t-2", "t-3", "t-5", "t-6", "t-7", "t-8", "t-9", "t-10", "t-11"]), "Section T", "Lower", 360);
        // U sections (all u sections from SVG)
        addOffers(filterHalf(["u-1", "u-2", "u-3", "u-4", "u-5", "u-6", "u-7", "u-8", "u-9", "u-11", "u-12", "u-13", "u-14", "u-17", "u-18", "u-19", "u-20", "u-21", "u-22"]), "Section U", "Lower", 340);
        // X sections (all x sections from SVG)
        addOffers(filterHalf(["x-2", "x-3", "x-4", "x-5", "x-8", "x-9", "x-10", "x-11", "x-12", "x-13", "x-14", "x-15"]), "Section X", "Upper", 300);
        // Y sections (all y sections from SVG)
        addOffers(filterHalf(["y-1", "y-2", "y-3", "y-4", "y-5", "y-6", "y-7", "y-8", "y-9", "y-10", "y-13", "y-14", "y-15", "y-16"]), "Section Y", "Upper", 280);
        // Z sections (all z sections from SVG)
        addOffers(filterHalf(["z-1", "z-2", "z-3", "z-4", "z-5", "z-6", "z-7", "z-8", "z-9", "z-10", "z-11", "z-12", "z-13", "z-14"]), "Section Z", "Upper", 260);
        // PELOUSE - Dance floor/Pitch area - Keep Available
        addOffers(["pel"], "Pelouse", "Interior", 650);
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
