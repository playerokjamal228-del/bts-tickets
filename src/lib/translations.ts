export type Language = 'en' | 'de' | 'es' | 'fr';

export interface Translations {
    // Navigation
    nav: {
        events: string;
        cart: string;
        checkout: string;
        back: string;
        backToEvents: string;
        faq: string; // Added
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
        emailNote: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        total: string;
        payNow: string;
        processing: string;
        payViaCard: string;
        payViaIBAN: string;
        cardPaymentNote: string;
        ibanNote: string;
        ibanReserved: string;
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
    // General
    general: {
        loading: string;
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
            emailNote: "for ticket delivery",
            address: "Street Address",
            city: "City",
            postalCode: "Postal Code",
            country: "Country",
            total: "Total",
            payNow: "Pay",
            processing: "Processing...",
            payViaCard: "Pay with Card",
            payViaIBAN: "Pay via Bank Transfer",
            cardPaymentNote: "You will be redirected to our secure payment provider",
            ibanNote: "Please transfer the total amount to the following bank account:",
            ibanReserved: "Your tickets will be reserved for 24 hours pending payment.",
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
        general: {
            loading: "Loading...",
        },
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
            emailNote: "für Ticketzustellung",
            address: "Straße",
            city: "Stadt",
            postalCode: "Postleitzahl",
            country: "Land",
            total: "Gesamt",
            payNow: "Bezahlen",
            processing: "Verarbeitung...",
            payViaCard: "Mit Karte bezahlen",
            payViaIBAN: "Per Banküberweisung",
            cardPaymentNote: "Sie werden zu unserem sicheren Zahlungsanbieter weitergeleitet",
            ibanNote: "Bitte überweisen Sie den Gesamtbetrag auf folgendes Bankkonto:",
            ibanReserved: "Ihre Tickets werden 24 Stunden bis zur Zahlung reserviert.",
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
        general: {
            loading: "Laden...",
        },
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
            emailNote: "para entrega de entradas",
            address: "Dirección",
            city: "Ciudad",
            postalCode: "Código Postal",
            country: "País",
            total: "Total",
            payNow: "Pagar",
            processing: "Procesando...",
            payViaCard: "Pagar con Tarjeta",
            payViaIBAN: "Transferencia Bancaria",
            cardPaymentNote: "Serás redirigido a nuestro proveedor de pago seguro",
            ibanNote: "Por favor transfiere el importe total a la siguiente cuenta:",
            ibanReserved: "Tus entradas se reservarán por 24 horas hasta el pago.",
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
        general: {
            loading: "Cargando...",
        },
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
            emailNote: "pour la livraison des billets",
            address: "Adresse",
            city: "Ville",
            postalCode: "Code Postal",
            country: "Pays",
            total: "Total",
            payNow: "Payer",
            processing: "Traitement...",
            payViaCard: "Payer par Carte",
            payViaIBAN: "Virement Bancaire",
            cardPaymentNote: "Vous serez redirigé vers notre fournisseur de paiement sécurisé",
            ibanNote: "Veuillez transférer le montant total sur le compte suivant:",
            ibanReserved: "Vos billets seront réservés pendant 24 heures.",
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
        general: {
            loading: "Chargement...",
        },
    },
};
