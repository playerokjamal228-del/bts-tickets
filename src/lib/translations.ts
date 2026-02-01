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
        paypalLink: string;
        amountToPay: string;
        orderRef: string;
        orderRefDesc: string;
        openPaypal: string;
        afterPayment: string;
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
            paypalLink: "PayPal Link",
            amountToPay: "Amount to pay",
            orderRef: "Order reference",
            orderRefDesc: "Include in payment comment",
            openPaypal: "Open PayPal",
            afterPayment: "After payment, click the button above to go to the confirmation page",
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
            ibanInstantWarning: "WICHTIG: Senden Sie NUR per Echtzeitüberweisung!",
            ibanInstantWarningDesc: "Normale Überweisungen dauern 1-3 Tage und können abgelehnt werden.",
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
            paypalLink: "PayPal-Link",
            amountToPay: "Zu zahlender Betrag",
            orderRef: "Bestellreferenz",
            orderRefDesc: "Im Zahlungskommentar angeben",
            openPaypal: "PayPal öffnen",
            afterPayment: "Nach der Zahlung klicken Sie auf die Schaltfläche oben, um zur Bestätigungsseite zu gelangen",
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
            ibanInstantWarning: "¡IMPORTANTE: Envía SOLO por Transferencia Instantánea!",
            ibanInstantWarningDesc: "Las transferencias normales tardan 1-3 días y pueden ser rechazadas.",
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
            paypalLink: "Enlace PayPal",
            amountToPay: "Importe a pagar",
            orderRef: "Referencia del pedido",
            orderRefDesc: "Incluir en el comentario del pago",
            openPaypal: "Abrir PayPal",
            afterPayment: "Después del pago, haz clic en el botón de arriba para ir a la página de confirmación",
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
            ffWarning: "IMPORTANT: Payez UNIQUEMENT via PayPal Friends & Family!",
            ffWarningDesc: "Les paiements via \"Biens et Services\" seront refusés et remboursés.",
            paypalLink: "Lien PayPal",
            amountToPay: "Montant à payer",
            orderRef: "Référence de commande",
            orderRefDesc: "Inclure dans le commentaire du paiement",
            openPaypal: "Ouvrir PayPal",
            afterPayment: "Après le paiement, cliquez sur le bouton ci-dessus pour accéder à la page de confirmation",
        },
        general: {
            loading: "Chargement...",
        },
    },
};
