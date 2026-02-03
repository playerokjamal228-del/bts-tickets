export type Language = 'en' | 'de' | 'es' | 'fr';

export interface Translations {
    // Navigation
    nav: {
        events: string;
        cart: string;
        checkout: string;
        back: string;
        backToEvents: string;
        faq: string;
    };
    // Comparison Block
    comparison: {
        title: string;
        titleHighlight: string;
        feature: string;
        competitors: string;
        us: string;
        features: {
            price: string;
            priceComp: string;
            priceUs: string;
            speed: string;
            speedComp: string;
            speedUs: string;
            type: string;
            typeComp: string;
            typeUs: string;
            support: string;
            supportComp: string;
            supportUs: string;
        }
    };
    // Hero
    hero: {
        ticketsOnSale: string;
        title: string;
        year: string;
        subtitle: string;
        purpleOcean: string;
        getTickets: string;
    };
    // Tour locations
    tour: {
        locations: string;
        chooseCity: string;
        selectTickets: string;
        dates: string;
    };
    // Date modal
    dateModal: {
        selectDate: string;
        choosePreferred: string;
        sellingFast: string;
    };
    // Reviews
    reviews: {
        title: string;
        trustedBy: string;
        worldwide: string;
        subtitle: string;
    };
    // Tickets
    tickets: {
        title: string;
        available: string;
        left: string;
        select: string;
        add: string;
        showingBlock: string;
        selectBlock: string;
        perTicket: string;
        seatsTogether: string;
    };
    // Checkout
    checkout: {
        title: string;
        subtitle: string;
        orderSummary: string;
        billingInfo: string;
        paymentDetails: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        emailNote: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        total: string;
        payNow: string;
        madeTransfer: string;
        processing: string;
        payViaCard: string;
        payViaIBAN: string;
        cardPaymentNote: string;
        ibanNote: string;
        ibanReserved: string;
        ibanInstantWarning: string;
        ibanInstantWarningDesc: string;
        reference: string;
        securePayment: string;
        fillRequired: string;
        emptyCart: string;
        browseTickets: string;
    };
    // Footer
    footer: {
        slogan: string;
        quickLinks: string;
        legal: string;
        contact: string;
        privacy: string;
        terms: string;
        cookies: string;
        refund: string;
        support: string;
        securePayments: string;
        copyright: string;
    };
    // Success page
    success: {
        verifying: string;
        verifyingDesc: string;
        dontClose: string;
        paymentMethod: string;
        methodIban: string;
        methodCard: string;
        methodPaypal: string;
        paymentSuccess: string;
        orderConfirmed: string;
        contactUs: string;
        weWillSend: string;
        whatsapp: string;
        openWhatsapp: string;
        ticketsIn15min: string;
        backToHome: string;
    };
    // PayPal
    paypal: {
        ffWarning: string;
        ffWarningDesc: string;
        ffTitle: string;
        ffSubtitle: string;
        ffGood: string;
        ffBad: string;
        paypalLink: string;
        amountToPay: string;
        orderRef: string;
        orderRefDesc: string;
        openPaypal: string;
        afterPayment: string;
    };
    // Confirmation
    confirmation: {
        title: string;
        subtitle: string;
        timerLabel: string;
        step1: string;
        step2: string;
        whatsappButton: string;
    };
    // General
    general: {
        loading: string;
    };
    // FAQ Page
    faqPage: {
        title: string;
        subtitle: string;
        questions: {
            q1: string;
            a1: string;
            q2: string;
            a2: string;
            q3: string;
            a3: string;
            q4: string;
            a4: string;
            q5: string;
            a5: string;
            q6: string;
            a6: string;
            // New items
            q7: string;
            a7: string;
            q8: string;
            a8: string;
            q9: string;
            a9: string;
            q10: string;
            a10: string;
        };
        stillQuestions: string;
        supportTeam: string;
    };
}

export const translations: Record<Language, Translations> = {
    en: {
        nav: {
            events: "Events",
            cart: "Cart",
            checkout: "Checkout",
            back: "Back",
            backToEvents: "Back to Events",
            faq: "FAQ",
        },
        comparison: {
            title: "Why Fan-to-Fan is",
            titleHighlight: "Smarter",
            feature: "Feature",
            competitors: "Major Resale Sites (StubHub/Viagogo)",
            us: "Our Marketplace (Direct Transfer)",
            features: {
                price: "Price",
                priceComp: "Ticket + 25% Service Fees",
                priceUs: "Ticket Only (0% Fees)",
                speed: "Transfer Speed",
                speedComp: "24-48 hours",
                speedUs: "Instant / < 1 hour",
                type: "Ticket Type",
                typeComp: "PDF / Screenshots (Risky)",
                typeUs: "Official Ticketmaster Transfer 🛡️",
                support: "Support",
                supportComp: "Email Bots",
                supportUs: "24/7 WhatsApp Support 💬"
            }
        },
        hero: {
            ticketsOnSale: "Tickets on sale now",
            title: "BTS EUROPE TOUR",
            year: "2026",
            subtitle: "Experience the magic live across 5 major cities.",
            purpleOcean: "Are you ready for the purple ocean?",
            getTickets: "Get Tickets Now",
        },
        tour: {
            locations: "LOCATIONS",
            chooseCity: "Choose your city and secure your spot in the purple ocean",
            selectTickets: "Select Tickets",
            dates: "Dates",
        },
        dateModal: {
            selectDate: "Select Date for",
            choosePreferred: "Choose your preferred concert date",
            sellingFast: "💜 Tickets are selling fast!",
        },
        reviews: {
            title: "Trusted by",
            trustedBy: "Trusted by",
            worldwide: "ARMY",
            subtitle: "Join thousands of fans who got their tickets with us",
        },
        tickets: {
            title: "Available Tickets",
            available: "offers",
            left: "left",
            select: "Select",
            add: "Add",
            showingBlock: "Showing tickets for Block",
            selectBlock: "Select a block on the stadium map to view available seats",
            perTicket: "/ ticket",
            seatsTogether: "Seats are located together",
        },
        checkout: {
            title: "Checkout",
            subtitle: "Complete your order to receive your tickets",
            orderSummary: "Order Summary",
            billingInfo: "Billing Information",
            paymentDetails: "Payment Method",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email Address",
            phone: "Phone Number",
            emailNote: "for ticket delivery",
            address: "Street Address",
            city: "City",
            postalCode: "Postal Code",
            country: "Country",
            total: "Total",
            payNow: "Pay",
            madeTransfer: "I have made the transfer",
            processing: "Processing...",
            payViaCard: "Pay with Card",
            payViaIBAN: "Pay via Bank Transfer",
            cardPaymentNote: "You will be redirected to our secure payment provider",
            ibanNote: "Please transfer the total amount to the following bank account:",
            ibanReserved: "⚠️ Reservation holds for 15 minutes. Unpaid orders are auto-cancelled.",
            ibanInstantWarning: "IMPORTANT: Send ONLY via Instant Transfer!",
            ibanInstantWarningDesc: "Regular transfers take 1-3 days and may be declined.",
            reference: "Reference",
            securePayment: "Your payment is secured with 256-bit SSL encryption",
            fillRequired: "Please fill in all required fields to continue",
            emptyCart: "Your Cart is Empty",
            browseTickets: "Browse Tickets",
        },
        footer: {
            slogan: "The Purple Ocean awaits.",
            quickLinks: "Quick Links",
            legal: "Legal",
            contact: "Contact",
            privacy: "Privacy Policy",
            terms: "Terms of Use",
            cookies: "Cookie Policy",
            refund: "Refund Policy",
            support: "Support",
            securePayments: "Secure payments with",
            copyright: "© 2026 BTS Europe Tour. All rights reserved.",
        },
        success: {
            verifying: "Verifying payment...",
            verifyingDesc: "We are verifying your payment. This may take up to 3 minutes.",
            dontClose: "Please don't close this page.",
            paymentMethod: "Payment method:",
            methodIban: "Bank Transfer (IBAN)",
            methodCard: "Credit Card",
            methodPaypal: "PayPal",
            paymentSuccess: "Payment Successful!",
            orderConfirmed: "Your order is confirmed. Contact us to receive your tickets.",
            contactUs: "Contact Us",
            weWillSend: "We will send your tickets",
            whatsapp: "WhatsApp",
            openWhatsapp: "Open WhatsApp",
            ticketsIn15min: "Message us and we'll send your e-tickets within 15 minutes.",
            backToHome: "Back to Home",
        },
        paypal: {
            ffWarning: "IMPORTANT: Pay ONLY via PayPal Friends & Family!",
            ffWarningDesc: "Payments via \"Goods & Services\" will be declined and refunded.",
            ffTitle: "⚠️ IMPORTANT: Why 'Friends & Family'?",
            ffSubtitle: "To keep ticket prices 30% below market value, we bypass commercial processing fees.",
            ffGood: "✅ Friends & Family: Instant automated transfer + No Fees.",
            ffBad: "❌ Goods & Services: Requires manual verification + 21% VAT charge. Payments sent via this method cannot be processed at the current ticket price and will be automatically refunded within 3-5 business days.",
            paypalLink: "PayPal Link",
            amountToPay: "Amount to pay",
            orderRef: "Order reference",
            orderRefDesc: "Include in payment comment",
            openPaypal: "Open PayPal",
            afterPayment: "After payment, click the button above to go to the confirmation page",
        },
        confirmation: {
            title: "Payment Confirmation",
            subtitle: "Please send us your payment receipt to secure your tickets.",
            timerLabel: "Time remaining to send receipt:",
            step1: "Step 1: Save the receipt or take a screenshot of your transfer.",
            step2: "Step 2: Click the button below to send it via WhatsApp.",
            whatsappButton: "Send Receipt on WhatsApp",
        },
        general: {
            loading: "Loading...",
        },
        faqPage: {
            title: "Frequently Asked Questions",
            subtitle: "Find answers to common questions about tickets, delivery, and authenticity.",
            questions: {
                q1: "How will I receive my tickets?",
                a1: "All tickets are delivered digitally via Ticketmaster Transfer or the official stadium app (e.g., Stade de France App). Once your purchase is confirmed, you will receive an email with a link to accept your tickets directly into your secure account. This is the safest method to ensure authenticity.",
                q2: "How does the Ticketmaster Transfer work?",
                a2: "It's safe, instant, and official. 1) You receive an email from Ticketmaster with an 'Accept Tickets' link. 2) Click the link and log in to your Ticketmaster account (or create one). 3) The tickets are legally transferred to your name and stay in your account forever. No PDFs, just secure mobile tickets.",
                q3: "Are the tickets authentic?",
                a3: "Yes. We offer a 100% Buyer Guarantee. Every ticket sold on our platform is verified and transferred directly from the original issuer. You are guaranteed entry to the event, or we will provide a full refund of 150% of your order value.",
                q4: "When will I get my tickets?",
                a4: "Due to the event organizer's anti-scalping rules, barcodes are typically released 3-7 days before the concert. Don't worry — your order is confirmed immediately, and we will keep you updated via email at every step.",
                q5: "Is my payment secure?",
                a5: "Absolutely. We use industry-standard 256-bit SSL encryption and process payments via Stripe and Adyen. We do not store your credit card information. We also support protected payment methods like PayPal and Apple Pay.",
                q6: "Can I sit together with my friends?",
                a6: "Yes. If you buy multiple tickets in a single order (e.g., 2 or 4 tickets), they are guaranteed to be seated together side-by-side.",
                q7: "Why are the prices lower than on other resale platforms?",
                a7: "We operate as a direct fan-to-fan marketplace, eliminating the huge corporate fees (up to 25-30%) added by platforms like StubHub or Viagogo. You pay for the ticket, not for global platform marketing.",
                q8: "What happens if the concert is canceled or postponed?",
                a8: "In the event of an official cancellation, we guarantee a 100% refund. If the concert is postponed, your tickets remain valid for the new date.",
                q9: "Can I transfer the ticket to a friend or sell it later?",
                a9: "Yes. Once you accept the Ticketmaster Transfer, you become the full owner. You can forward the ticket to anyone via the official app at any time.",
                q10: "Will I know my exact seat number before the show?",
                a10: "Yes, once the transfer is complete, all details (block, row, and seat) will be visible in your Ticketmaster account. We guarantee that seats in a single order are always located next to each other."
            },
            stillQuestions: "Still have questions?",
            supportTeam: "Our support team is available 24/7 to assist you."
        }
    },
    de: {
        nav: {
            events: "Veranstaltungen",
            cart: "Warenkorb",
            checkout: "Kasse",
            back: "Zurück",
            backToEvents: "Zurück zu Events",
            faq: "FAQ",
        },
        comparison: {
            title: "Warum Fan-to-Fan",
            titleHighlight: "schlauer ist",
            feature: "Feature",
            competitors: "Große Wiederverkaufsseiten",
            us: "Unser Marktplatz",
            features: {
                price: "Preis",
                priceComp: "Ticket + 25% Servicegebühren",
                priceUs: "Nur Ticket (0% Gebühren)",
                speed: "Geschwindigkeit",
                speedComp: "24-48 Stunden",
                speedUs: "Sofort / < 1 Stunde",
                type: "Ticketart",
                typeComp: "PDF / Screenshots (Riskant)",
                typeUs: "Offizieller Ticketmaster Transfer 🛡️",
                support: "Support",
                supportComp: "E-Mail Bots",
                supportUs: "24/7 WhatsApp Support 💬"
            }
        },
        hero: {
            ticketsOnSale: "Tickets jetzt im Verkauf",
            title: "BTS EUROPE TOUR",
            year: "2026",
            subtitle: "Erlebe die Magie live in 5 großen Städten.",
            purpleOcean: "Bist du bereit für den lila Ozean?",
            getTickets: "Tickets kaufen",
        },
        tour: {
            locations: "STÄDTE",
            chooseCity: "Wähle deine Stadt und sichere dir deinen Platz im lila Ozean",
            selectTickets: "Tickets auswählen",
            dates: "Termine",
        },
        dateModal: {
            selectDate: "Datum auswählen für",
            choosePreferred: "Wähle dein bevorzugtes Konzertdatum",
            sellingFast: "💜 Tickets verkaufen sich schnell!",
        },
        reviews: {
            title: "Vertraut von",
            trustedBy: "Vertraut von",
            worldwide: "ARMY",
            subtitle: "Schließe dich tausenden Fans an, die ihre Tickets bei uns gekauft haben",
        },
        tickets: {
            title: "Verfügbare Tickets",
            available: "Angebote",
            left: "übrig",
            select: "Auswählen",
            add: "Hinzufügen",
            showingBlock: "Tickets für Block",
            selectBlock: "Wähle einen Block auf der Stadionkarte, um verfügbare Plätze zu sehen",
            perTicket: "/ Ticket",
            seatsTogether: "Plätze befinden sich nebeneinander",
        },
        checkout: {
            title: "Kasse",
            subtitle: "Schließe deine Bestellung ab, um deine Tickets zu erhalten",
            orderSummary: "Bestellübersicht",
            billingInfo: "Rechnungsinformationen",
            paymentDetails: "Zahlungsmethode",
            firstName: "Vorname",
            lastName: "Nachname",
            email: "E-Mail-Adresse",
            phone: "Handynummer",
            emailNote: "für Ticketzustellung",
            address: "Straße",
            city: "Stadt",
            postalCode: "Postleitzahl",
            country: "Land",
            total: "Gesamt",
            payNow: "Bezahlen",
            madeTransfer: "Ich habe die Überweisung getätigt",
            processing: "Verarbeitung...",
            payViaCard: "Mit Karte bezahlen",
            payViaIBAN: "Per Banküberweisung",
            cardPaymentNote: "Sie werden zu unserem sicheren Zahlungsanbieter weitergeleitet",
            ibanNote: "Bitte überweisen Sie den Gesamtbetrag auf folgendes Bankkonto:",
            ibanReserved: "⚠️ Reservierung gilt für 15 Minuten. Unbezahlte Bestellungen werden automatisch storniert.",
            ibanInstantWarning: "WICHTIG: Senden Sie NUR per Echtzeitüberweisung!",
            ibanInstantWarningDesc: "Tickets sind nur für 15 Minuten reserviert. Bitte schließen Sie die Überweisung sofort ab.",
            reference: "Verwendungszweck",
            securePayment: "Ihre Zahlung ist mit 256-Bit SSL-Verschlüsselung gesichert",
            fillRequired: "Bitte füllen Sie alle erforderlichen Felder aus",
            emptyCart: "Ihr Warenkorb ist leer",
            browseTickets: "Tickets durchsuchen",
        },
        footer: {
            slogan: "Der lila Ozean wartet.",
            quickLinks: "Schnelllinks",
            legal: "Rechtliches",
            contact: "Kontakt",
            privacy: "Datenschutz",
            terms: "Nutzungsbedingungen",
            cookies: "Cookie-Richtlinie",
            refund: "Rückerstattung",
            support: "Support",
            securePayments: "Sichere Zahlung mit",
            copyright: "© 2026 BTS Europe Tour. Alle Rechte vorbehalten.",
        },
        success: {
            verifying: "Zahlung wird überprüft...",
            verifyingDesc: "Wir überprüfen Ihre Zahlung. Dies kann bis zu 3 Minuten dauern.",
            dontClose: "Bitte schließen Sie diese Seite nicht.",
            paymentMethod: "Zahlungsmethode:",
            methodIban: "Banküberweisung (IBAN)",
            methodCard: "Kreditkarte",
            methodPaypal: "PayPal",
            paymentSuccess: "Zahlung erfolgreich!",
            orderConfirmed: "Ihre Bestellung ist bestätigt. Kontaktieren Sie uns, um Ihre Tickets zu erhalten.",
            contactUs: "Kontaktieren Sie uns",
            weWillSend: "Wir senden Ihnen die Tickets",
            whatsapp: "WhatsApp",
            openWhatsapp: "WhatsApp öffnen",
            ticketsIn15min: "Schreiben Sie uns und wir senden Ihnen Ihre E-Tickets innerhalb von 15 Minuten.",
            backToHome: "Zurück zur Startseite",
        },
        paypal: {
            ffWarning: "WICHTIG: Zahlen Sie NUR über PayPal Friends & Family!",
            ffWarningDesc: "Zahlungen über \"Waren & Dienstleistungen\" werden abgelehnt und zurückerstattet.",
            ffTitle: "⚠️ WICHTIG: Warum 'Freunde & Familie'?",
            ffSubtitle: "Um die Ticketpreise 30% unter dem Marktwert zu halten, umgehen wir kommerzielle Bearbeitungsgebühren.",
            ffGood: "✅ Freunde & Familie: Sofortige automatisierte Überweisung + Keine Gebühren.",
            ffBad: "❌ Waren & Dienstleistungen: Erfordert manuelle Überprüfung + 21% MwSt. Zahlungen über diese Methode können nicht zum aktuellen Ticketpreis bearbeitet werden und werden automatisch erstattet.",
            paypalLink: "PayPal-Link",
            amountToPay: "Zu zahlender Betrag",
            orderRef: "Bestellreferenz",
            orderRefDesc: "Im Zahlungskommentar angeben",
            openPaypal: "PayPal öffnen",
            afterPayment: "Nach der Zahlung klicken Sie auf die Schaltfläche oben, um zur Bestätigungsseite zu gelangen",
        },
        confirmation: {
            title: "Zahlungsbestätigung",
            subtitle: "Bitte senden Sie uns Ihren Zahlungsbeleg, um Ihre Tickets zu sichern.",
            timerLabel: "Verbleibende Zeit zum Senden des Belegs:",
            step1: "Schritt 1: Speichern Sie den Beleg oder machen Sie einen Screenshot Ihrer Überweisung.",
            step2: "Schritt 2: Klicken Sie auf den Button unten, um ihn per WhatsApp zu senden.",
            whatsappButton: "Beleg per WhatsApp senden",
        },
        general: {
            loading: "Laden...",
        },
        faqPage: {
            title: "Häufig gestellte Fragen",
            subtitle: "Finden Sie Antworten zu Tickets, Zustellung und Authentizität.",
            questions: {
                q1: "Wie erhalte ich meine Tickets?",
                a1: "Alle Tickets werden digital über Ticketmaster Transfer oder die offizielle Stadion-App (z. B. Stade de France App) zugestellt. Sobald Ihr Kauf bestätigt ist, erhalten Sie eine E-Mail mit einem Link, um Ihre Tickets direkt in Ihr sicheres Konto zu akzeptieren. Dies ist die sicherste Methode, um die Echtheit zu gewährleisten.",
                q2: "Wie funktioniert der Ticketmaster Transfer?",
                a2: "Es ist sicher, sofortig und offiziell. 1) Sie erhalten eine E-Mail von Ticketmaster mit einem Link 'Tickets akzeptieren'. 2) Klicken Sie auf den Link und loggen Sie sich in Ihr Ticketmaster-Konto ein (oder erstellen Sie eines). 3) Die Tickets werden rechtmäßig auf Ihren Namen übertragen und bleiben für immer in Ihrem Konto. Keine PDFs, nur sichere mobile Tickets.",
                q3: "Sind die Tickets echt?",
                a3: "Ja. Wir bieten eine 100% Käufergarantie. Jedes auf unserer Plattform verkaufte Ticket wird verifiziert und direkt vom ursprünglichen Aussteller übertragen. Wir garantieren Ihnen den Einlass zur Veranstaltung oder erstatten Ihnen 150% Ihres Bestellwertes.",
                q4: "Wann bekomme ich meine Tickets?",
                a4: "Aufgrund der Anti-Scalping-Regeln des Veranstalters werden Barcodes in der Regel 3-7 Tage vor dem Konzert freigegeben. Keine Sorge – Ihre Bestellung wird sofort bestätigt und wir halten Sie per E-Mail auf dem Laufenden.",
                q5: "Ist meine Zahlung sicher?",
                a5: "Absolut. Wir verwenden branchenübliche 256-Bit-SSL-Verschlüsselung und verarbeiten Zahlungen über Stripe und Adyen. Wir speichern Ihre Kreditkartendaten nicht. Wir unterstützen auch geschützte Zahlungsmethoden wie PayPal und Apple Pay.",
                q6: "Kann ich mit meinen Freunden zusammensitzen?",
                a6: "Ja. Wenn Sie mehrere Tickets in einer Bestellung kaufen (z. B. 2 oder 4 Tickets), sitzen Sie garantiert nebeneinander.",
                q7: "Warum sind die Preise niedriger als auf anderen Wiederverkaufsplattformen?",
                a7: "Wir arbeiten als direkter Fan-zu-Fan-Marktplatz und eliminieren die hohen Unternehmensgebühren (bis zu 25-30%), die von Plattformen wie StubHub oder Viagogo erhoben werden. Sie zahlen für das Ticket, nicht für das Marketing globaler Plattformen.",
                q8: "Was passiert, wenn das Konzert abgesagt oder verschoben wird?",
                a8: "Im Falle einer offiziellen Absage garantieren wir eine 100%ige Rückerstattung. Wenn das Konzert verschoben wird, bleiben Ihre Tickets für das neue Datum gültig.",
                q9: "Kann ich das Ticket an einen Freund weitergeben oder später verkaufen?",
                a9: "Ja. Sobald Sie den Ticketmaster-Transfer akzeptieren, werden Sie der rechtmäßige Eigentümer. Sie können das Ticket jederzeit über die offizielle App an jede beliebige Person weiterleiten.",
                q10: "Werde ich meine genaue Sitzplatznummer vor der Show kennen?",
                a10: "Ja, sobald der Transfer abgeschlossen ist, werden alle Details (Block, Reihe und Platz) in Ihrem Ticketmaster-Konto angezeigt. Wir garantieren, dass Plätze in einer Bestellung immer nebeneinander liegen."
            },
            stillQuestions: "Haben Sie noch Fragen?",
            supportTeam: "Unser Support-Team steht Ihnen rund um die Uhr zur Verfügung."
        }
    },
    es: {
        nav: {
            events: "Eventos",
            cart: "Carrito",
            checkout: "Pagar",
            back: "Volver",
            backToEvents: "Volver a Eventos",
            faq: "Preguntas",
        },
        comparison: {
            title: "Por qué Fan-to-Fan es",
            titleHighlight: "más inteligente",
            feature: "Característica",
            competitors: "Sitios de Reventa",
            us: "Nuestro Mercado",
            features: {
                price: "Precio",
                priceComp: "Entrada + 25% Tasas",
                priceUs: "Solo Entrada (0% Tasas)",
                speed: "Velocidad",
                speedComp: "24-48 horas",
                speedUs: "Instantáneo / < 1 hora",
                type: "Tipo de Entrada",
                typeComp: "PDF / Capturas (Arriesgado)",
                typeUs: "Transferencia Oficial Ticketmaster 🛡️",
                support: "Soporte",
                supportComp: "Bots de Email",
                supportUs: "Soporte WhatsApp 24/7 💬"
            }
        },
        hero: {
            ticketsOnSale: "Entradas a la venta",
            title: "BTS EUROPE TOUR",
            year: "2026",
            subtitle: "Vive la magia en directo en 5 grandes ciudades.",
            purpleOcean: "¿Estás listo para el océano púrpura?",
            getTickets: "Comprar Entradas",
        },
        tour: {
            locations: "CIUDADES",
            chooseCity: "Elige tu ciudad y asegura tu lugar en el océano púrpura",
            selectTickets: "Seleccionar Entradas",
            dates: "Fechas",
        },
        dateModal: {
            selectDate: "Seleccionar fecha para",
            choosePreferred: "Elige tu fecha de concierto preferida",
            sellingFast: "💜 ¡Las entradas se agotan rápido!",
        },
        reviews: {
            title: "Confiado por",
            trustedBy: "Confiado por",
            worldwide: "ARMY",
            subtitle: "Únete a miles de fans que compraron sus entradas con nosotros",
        },
        tickets: {
            title: "Entradas Disponibles",
            available: "ofertas",
            left: "restantes",
            select: "Seleccionar",
            add: "Añadir",
            showingBlock: "Mostrando entradas para Bloque",
            selectBlock: "Selecciona un bloque en el mapa del estadio para ver asientos disponibles",
            perTicket: "/ entrada",
            seatsTogether: "Los asientos están juntos",
        },
        checkout: {
            title: "Pago",
            subtitle: "Completa tu pedido para recibir tus entradas",
            orderSummary: "Resumen del Pedido",
            billingInfo: "Información de Facturación",
            paymentDetails: "Método de Pago",
            firstName: "Nombre",
            lastName: "Apellido",
            email: "Correo Electrónico",
            phone: "Número de Móvil",
            emailNote: "para entrega de entradas",
            address: "Dirección",
            city: "Ciudad",
            postalCode: "Código Postal",
            country: "País",
            total: "Total",
            payNow: "Pagar",
            madeTransfer: "He realizado la transferencia",
            processing: "Procesando...",
            payViaCard: "Pagar con Tarjeta",
            payViaIBAN: "Transferencia Bancaria",
            cardPaymentNote: "Serás redirigido a nuestro proveedor de pago seguro",
            ibanNote: "Por favor transfiere el importe total a la siguiente cuenta:",
            ibanReserved: "⚠️ La reserva se mantiene por 15 minutos. Los pedidos no pagados se cancelan automáticamente.",
            ibanInstantWarning: "¡IMPORTANTE: Envía SOLO por Transferencia Instantánea!",
            ibanInstantWarningDesc: "Las entradas están reservadas solo por 15 minutos. Por favor complete la transferencia inmediatamente.",
            reference: "Referencia",
            securePayment: "Tu pago está protegido con encriptación SSL de 256 bits",
            fillRequired: "Por favor completa todos los campos requeridos",
            emptyCart: "Tu Carrito está Vacío",
            browseTickets: "Ver Entradas",
        },
        footer: {
            slogan: "El océano púrpura te espera.",
            quickLinks: "Enlaces Rápidos",
            legal: "Legal",
            contact: "Contacto",
            privacy: "Política de Privacidad",
            terms: "Términos de Uso",
            cookies: "Política de Cookies",
            refund: "Política de Reembolso",
            support: "Soporte",
            securePayments: "Pagos seguros con",
            copyright: "© 2026 BTS Europe Tour. Todos los derechos reservados.",
        },
        success: {
            verifying: "Verificando pago...",
            verifyingDesc: "Estamos verificando tu pago. Esto puede tardar hasta 3 minutos.",
            dontClose: "Por favor, no cierres esta página.",
            paymentMethod: "Método de pago:",
            methodIban: "Transferencia Bancaria (IBAN)",
            methodCard: "Tarjeta de Crédito",
            methodPaypal: "PayPal",
            paymentSuccess: "¡Pago Exitoso!",
            orderConfirmed: "Tu pedido está confirmado. Contáctanos para recibir tus entradas.",
            contactUs: "Contáctanos",
            weWillSend: "Te enviaremos las entradas",
            whatsapp: "WhatsApp",
            openWhatsapp: "Abrir WhatsApp",
            ticketsIn15min: "Escríbenos y te enviaremos tus e-tickets en 15 minutos.",
            backToHome: "Volver al Inicio",
        },
        paypal: {
            ffWarning: "¡IMPORTANTE: Paga SOLO vía PayPal Friends & Family!",
            ffWarningDesc: "Los pagos vía \"Bienes y Servicios\" serán rechazados y reembolsados.",
            ffTitle: "⚠️ IMPORTANTE: ¿Por qué 'Amigos y Familiares'?",
            ffSubtitle: "Para mantener los precios un 30% por debajo del valor de mercado, evitamos las tarifas comerciales.",
            ffGood: "✅ Amigos y Familiares: Transferencia automatizada instantánea + Sin comisiones.",
            ffBad: "❌ Bienes y Servicios: Requiere verificación manual + 21% de IVA. Los pagos de este tipo serán rechazados y reembolsados automáticamente.",
            paypalLink: "Enlace PayPal",
            amountToPay: "Importe a pagar",
            orderRef: "Referencia del pedido",
            orderRefDesc: "Incluir en el comentario del pago",
            openPaypal: "Abrir PayPal",
            afterPayment: "Después del pago, haz clic en el botón de arriba para ir a la página de confirmación",
        },
        confirmation: {
            title: "Confirmación de Pago",
            subtitle: "Por favor envíenos su recibo de pago para asegurar sus entradas.",
            timerLabel: "Tiempo restante para enviar el recibo:",
            step1: "Paso 1: Guarde el recibo o haga una captura de pantalla de su transferencia.",
            step2: "Paso 2: Haga clic en el botón de abajo para enviarlo por WhatsApp.",
            whatsappButton: "Enviar Recibo por WhatsApp",
        },
        general: {
            loading: "Cargando...",
        },
        faqPage: {
            title: "Preguntas Frecuentes",
            subtitle: "Encuentra respuestas a preguntas comunes sobre entradas, entrega y autenticidad.",
            questions: {
                q1: "¿Cómo recibiré mis entradas?",
                a1: "Todas las entradas se entregan digitalmente a través de Ticketmaster Transfer o la aplicación oficial del estadio (ej. App Stade de France). Una vez confirmado tu pedido, recibirás un email con un enlace para aceptar tus entradas directamente en tu cuenta segura. Este es el método más seguro para garantizar la autenticidad.",
                q2: "¿Cómo funciona Ticketmaster Transfer?",
                a2: "Es seguro, instantáneo y oficial. 1) Recibes un email de Ticketmaster con un enlace 'Aceptar Entradas'. 2) Haz clic en el enlace e inicia sesión en tu cuenta Ticketmaster (o crea una). 3) Las entradas se transfieren legalmente a tu nombre y permanecen en tu cuenta para siempre. Sin PDFs, solo entradas móviles seguras.",
                q3: "¿Son auténticas las entradas?",
                a3: "Sí. Ofrecemos una Garantía del 100% al Comprador. Cada entrada vendida en nuestra plataforma es verificada y transferida directamente desde el emisor original. Garantizamos tu entrada al evento o te ofrecemos un reembolso completo del 150% del valor de tu pedido.",
                q4: "¿Cuándo recibiré mis entradas?",
                a4: "Debido a las reglas anti-reventa del organizador, los códigos de barras generalmente se liberan 3-7 días antes del concierto. No te preocupes: tu pedido se confirma de inmediato y te mantendremos informado por email en cada paso.",
                q5: "¿Es seguro mi pago?",
                a5: "Absolutamente. Utilizamos encriptación SSL de 256 bits estándar de la industria y procesamos pagos a través de Stripe y Adyen. No almacenamos la información de tu tarjeta de crédito. También admitimos métodos de pago protegidos como PayPal y Apple Pay.",
                q6: "¿Puedo sentarme junto a mis amigos?",
                a6: "Sí. Si compras varias entradas en un solo pedido (ej. 2 o 4 entradas), se garantiza que estarán sentados juntos uno al lado del otro.",
                q7: "¿Por qué los precios son más bajos que en otras plataformas de reventa?",
                a7: "Operamos como un mercado directo de fan a fan, eliminando las enormes comisiones corporativas (hasta 25-30%) que añaden plataformas como StubHub o Viagogo. Pagas por la entrada, no por el marketing de plataformas globales.",
                q8: "¿Qué sucede si el concierto se cancela o pospone?",
                a8: "En caso de cancelación oficial, garantizamos un reembolso del 100%. Si el concierto se pospone, tus entradas seguirán siendo válidas para la nueva fecha.",
                q9: "¿Puedo transferir la entrada a un amigo o venderla más tarde?",
                a9: "Sí. Una vez que aceptas la transferencia de Ticketmaster, te conviertes en el propietario legal. Puedes reenviar la entrada a cualquier persona a través de la aplicación oficial en cualquier momento.",
                q10: "¿Sabré mi número exacto de asiento antes del espectáculo?",
                a10: "Sí, una vez completada la transferencia, todos los datos (sector, fila y asiento) aparecerán en tu cuenta de Ticketmaster. Garantizamos que los asientos de un mismo pedido siempre están ubicados juntos."
            },
            stillQuestions: "¿Todavía tienes preguntas?",
            supportTeam: "Nuestro equipo de soporte está disponible 24/7 para ayudarte."
        }
    },
    fr: {
        nav: {
            events: "Événements",
            cart: "Panier",
            checkout: "Paiement",
            back: "Retour",
            backToEvents: "Retour aux Événements",
            faq: "FAQ",
        },
        comparison: {
            title: "Pourquoi Fan-to-Fan est",
            titleHighlight: "plus malin",
            feature: "Fonctionnalité",
            competitors: "Sites de Revente",
            us: "Notre Marketplace",
            features: {
                price: "Prix",
                priceComp: "Billet + 25% Frais",
                priceUs: "Billet Seul (0% Frais)",
                speed: "Vitesse",
                speedComp: "24-48 heures",
                speedUs: "Instantané / < 1 heure",
                type: "Type de Billet",
                typeComp: "PDF / Captures (Risqué)",
                typeUs: "Transfert Officiel Ticketmaster 🛡️",
                support: "Support",
                supportComp: "Bots Email",
                supportUs: "Support WhatsApp 24/7 💬"
            }
        },
        hero: {
            ticketsOnSale: "Billets en vente",
            title: "BTS EUROPE TOUR",
            year: "2026",
            subtitle: "Vivez la magie en direct dans 5 grandes villes.",
            purpleOcean: "Êtes-vous prêt pour l'océan violet?",
            getTickets: "Acheter des Billets",
        },
        tour: {
            locations: "VILLES",
            chooseCity: "Choisissez votre ville et réservez votre place dans l'océan violet",
            selectTickets: "Sélectionner Billets",
            dates: "Dates",
        },
        dateModal: {
            selectDate: "Sélectionner la date pour",
            choosePreferred: "Choisissez votre date de concert préférée",
            sellingFast: "💜 Les billets se vendent vite!",
        },
        reviews: {
            title: "Approuvé par",
            trustedBy: "Approuvé par",
            worldwide: "ARMY",
            subtitle: "Rejoignez des milliers de fans qui ont acheté leurs billets chez nous",
        },
        tickets: {
            title: "Billets Disponibles",
            available: "offres",
            left: "restants",
            select: "Sélectionner",
            add: "Ajouter",
            showingBlock: "Affichage des billets pour le Bloc",
            selectBlock: "Sélectionnez un bloc sur la carte du stade pour voir les places disponibles",
            perTicket: "/ billet",
            seatsTogether: "Les places sont côte à côte",
        },
        checkout: {
            title: "Paiement",
            subtitle: "Finalisez votre commande pour recevoir vos billets",
            orderSummary: "Récapitulatif",
            billingInfo: "Informations de Facturation",
            paymentDetails: "Méthode de Paiement",
            firstName: "Prénom",
            lastName: "Nom",
            email: "Adresse Email",
            phone: "Numéro de Mobile",
            emailNote: "pour la livraison des billets",
            address: "Adresse",
            city: "Ville",
            postalCode: "Code Postal",
            country: "Pays",
            total: "Total",
            payNow: "Payer",
            madeTransfer: "J'ai effectué le virement",
            processing: "Traitement...",
            payViaCard: "Payer par Carte",
            payViaIBAN: "Virement Bancaire",
            cardPaymentNote: "Vous serez redirigé vers notre fournisseur de paiement sécurisé",
            ibanNote: "Veuillez transférer le montant total sur le compte suivant:",
            ibanReserved: "⚠️ La réservation est maintenue pendant 15 minutes. Les commandes impayées sont annulées automatiquement.",
            ibanInstantWarning: "IMPORTANT: Envoyez UNIQUEMENT par Virement Instantané!",
            ibanInstantWarningDesc: "Les virements normaux prennent 1-3 jours et peuvent être refusés.",
            reference: "Référence",
            securePayment: "Votre paiement est sécurisé avec un cryptage SSL 256 bits",
            fillRequired: "Veuillez remplir tous les champs obligatoires",
            emptyCart: "Votre Panier est Vide",
            browseTickets: "Parcourir les Billets",
        },
        footer: {
            slogan: "L'océan violet vous attend.",
            quickLinks: "Liens Rapides",
            legal: "Mentions Légales",
            contact: "Contact",
            privacy: "Politique de Confidentialité",
            terms: "Conditions d'Utilisation",
            cookies: "Politique de Cookies",
            refund: "Politique de Remboursement",
            support: "Support",
            securePayments: "Paiements sécurisés avec",
            copyright: "© 2026 BTS Europe Tour. Tous droits réservés.",
        },
        success: {
            verifying: "Vérification du paiement...",
            verifyingDesc: "Nous vérifions votre paiement. Cela peut prendre jusqu'à 3 minutes.",
            dontClose: "Veuillez ne pas fermer cette page.",
            paymentMethod: "Mode de paiement:",
            methodIban: "Virement Bancaire (IBAN)",
            methodCard: "Carte Bancaire",
            methodPaypal: "PayPal",
            paymentSuccess: "Paiement Réussi!",
            orderConfirmed: "Votre commande est confirmée. Contactez-nous pour recevoir vos billets.",
            contactUs: "Contactez-nous",
            weWillSend: "Nous vous enverrons les billets",
            whatsapp: "WhatsApp",
            openWhatsapp: "Ouvrir WhatsApp",
            ticketsIn15min: "Écrivez-nous et nous vous enverrons vos e-billets en 15 minutes.",
            backToHome: "Retour à l'Accueil",
        },
        paypal: {
            ffWarning: "IMPORTANT: Payez UNIQUEMENT via PayPal Amis et Proches !",
            ffWarningDesc: "Les paiements via \"Biens et Services\" seront refusés et remboursés.",
            ffTitle: "⚠️ IMPORTANT : Pourquoi 'Amis et Proches' ?",
            ffSubtitle: "Pour maintenir les prix 30% sous le marché, nous évitons les frais commerciaux.",
            ffGood: "✅ Amis et Proches : Virement instantané + Sans frais.",
            ffBad: "❌ Biens et Services : Vérification manuelle + 21% TVA. Les paiements via cette méthode seront refusés et remboursés automatiquement.",
            paypalLink: "Lien PayPal",
            amountToPay: "Montant à payer",
            orderRef: "Référence de commande",
            orderRefDesc: "Inclure dans le commentaire du paiement",
            openPaypal: "Ouvrir PayPal",
            afterPayment: "Après le paiement, cliquez sur le bouton ci-dessus pour accéder à la page de confirmation",
        },
        confirmation: {
            title: "Confirmation de Paiement",
            subtitle: "Veuillez nous envoyer votre reçu de paiement pour sécuriser vos billets.",
            timerLabel: "Temps restant pour envoyer le reçu :",
            step1: "Étape 1 : Enregistrez le reçu ou faites une capture d'écran de votre virement.",
            step2: "Étape 2 : Cliquez sur le bouton ci-dessous pour l'envoyer par WhatsApp.",
            whatsappButton: "Envoyer le reçu par WhatsApp",
        },
        general: {
            loading: "Chargement...",
        },
        faqPage: {
            title: "Foire Aux Questions",
            subtitle: "Trouvez des réponses aux questions courantes sur les billets, la livraison et l'authenticité.",
            questions: {
                q1: "Comment vais-je recevoir mes billets ?",
                a1: "Tous les billets sont livrés numériquement via Ticketmaster Transfer ou l'application officielle du stade (ex. Stade de France App). Une fois votre achat confirmé, vous recevrez un email avec un lien pour accepter vos billets directement dans votre compte sécurisé. C'est la méthode la plus sûre pour garantir l'authenticité.",
                q2: "Comment fonctionne le transfert Ticketmaster ?",
                a2: "C'est sûr, instantané et officiel. 1) Vous recevez un email de Ticketmaster avec un lien 'Accepter les billets'. 2) Cliquez sur le lien et connectez-vous à votre compte Ticketmaster (ou créez-en un). 3) Les billets sont légalement transférés à votre nom et restent dans votre compte pour toujours. Pas de PDF, juste des billets mobiles sécurisés.",
                q3: "Les billets sont-ils authentiques ?",
                a3: "Oui. Nous offrons une garantie acheteur à 100%. Chaque billet vendu sur notre plateforme est vérifié et transféré directement depuis l'émetteur original. Vous êtes assuré d'entrer à l'événement, ou nous vous rembourserons intégralement 150% de la valeur de votre commande.",
                q4: "Quand recevrai-je mes billets ?",
                a4: "En raison des règles anti-revente de l'organisateur, les codes-barres sont généralement publiés 3 à 7 jours avant le concert. Ne vous inquiétez pas — votre commande est confirmée immédiatement et nous vous tiendrons informé par email à chaque étape.",
                q5: "Mon paiement est-il sécurisé ?",
                a5: "Absolument. Nous utilisons un cryptage SSL 256 bits standard de l'industrie et traitons les paiements via Stripe et Adyen. Nous ne stockons pas vos informations de carte de crédit. Nous acceptons également les méthodes de paiement protégées comme PayPal et Apple Pay.",
                q6: "Puis-je m'asseoir avec mes amis ?",
                a6: "Oui. Si vous achetez plusieurs billets en une seule commande (par exemple 2 ou 4 billets), ils sont garantis d'être assis côte à côte.",
                q7: "Pourquoi les prix sont-ils inférieurs à ceux d'autres plateformes de reventa ?",
                a7: "Nous fonctionnons comme une place de marché directe de fan à fan, éliminant les énormes frais d'entreprise (jusqu'à 25-30%) ajoutés par des plateformes comme StubHub ou Viagogo. Vous payez pour le billet, pas pour le marketing des plateformes mondiales.",
                q8: "Que se passe-t-il si le concert est annulé ou reporté ?",
                a8: "En cas d'annulation officielle, nous garantissons un remboursement à 100%. Si le concert est reporté, vos billets restent valables pour la nouvelle date.",
                q9: "Puis-je transférer le billet à un ami ou le revendre plus tard ?",
                a9: "Oui. Une fois que vous avez accepté le transfert Ticketmaster, vous devenez le propriétaire légitime. Vous pouvez transférer le billet à n'importe qui via l'application officielle à tout moment.",
                q10: "Connaîtrai-je mon numéro de siège exact avant le spectacle ?",
                a10: "Oui, une fois le transfert terminé, tous les détails (bloc, rangée et siège) seront visibles dans votre compte Ticketmaster. Nous garantissons que les places d'une même commande sont toujours situées côte à côte."
            },
            stillQuestions: "Vous avez encore des questions ?",
            supportTeam: "Notre équipe de support est disponible 24/7 pour vous aider."
        }
    },
};
