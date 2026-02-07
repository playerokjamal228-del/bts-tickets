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
        emailNote: string;
        // phone: string; // Removed
        // address: string; // Removed
        // city: string; // Removed
        // postalCode: string; // Removed
        country: string;
        total: string;
        payNow: string;
        madeTransfer: string;
        processing: string;
        payViaCard: string;
        payViaIBAN: string;
        cardPaymentNote: string;
        ticketmasterTrust: string; // Added
        ibanNote: string;
        ibanReserved: string;
        ibanInstantWarning: string;
        ibanInstantWarningDesc: string;
        reference: string;
        securePayment: string;
        fillRequired: string;
        emptyCart: string;
        browseTickets: string;
        ticketsReserved: string;
        fanProtectTitle: string;
        fanProtectDesc: string;
        resellTitle: string;
        resellDesc: string;
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
        impressum: string;
    };
    // Cookie Banner
    cookie: {
        text: string;
        accept: string;
        decline: string;
    };
    // Impressum Page
    impressumPage: {
        title: string;
        subtitle: string;
        companyName: string;
        addressTitle: string;
        address: string;
        representedTitle: string;
        representedBy: string;
        contactTitle: string;
        email: string;
        whatsapp: string;
        regTitle: string;
        regNumber: string;
        vatTitle: string;
        vatNumber: string;
        disclaimerTitle: string;
        disclaimerText: string;
        disclaimerLinksTitle: string;
        disclaimerLinksText: string;
        copyrightTitle: string;
        copyrightText: string;
        disputeTitle: string;
        disputeText: string;
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
            emailNote: "for Ticketmaster Transfer",
            country: "Country",
            total: "Total",
            payNow: "Pay",
            madeTransfer: "I have made the transfer",
            processing: "Processing...",
            payViaCard: "Pay with Card",
            payViaIBAN: "Pay via Bank Transfer",
            cardPaymentNote: "You will be redirected to our secure payment provider",
            ticketmasterTrust: "🔒 Official Ticketmaster Transfer: Your tickets will be transferred directly to this email address. 100% Safe & Guaranteed.",
            ibanNote: "Please transfer the total amount to the following bank account:",
            ibanReserved: "⚠️ Reservation holds for 15 minutes. Unpaid orders are auto-cancelled.",
            ibanInstantWarning: "IMPORTANT: Send ONLY via Instant Transfer!",
            ibanInstantWarningDesc: "Regular transfers take 1-3 days and may be declined.",
            reference: "Reference",
            securePayment: "Your payment is secured with 256-bit SSL encryption",
            fillRequired: "Please fill in all required fields to continue",
            emptyCart: "Your Cart is Empty",
            browseTickets: "Browse Tickets",
            ticketsReserved: "Tickets are reserved for:",
            privacy: "Política de Privacidad",
            terms: "Términos de Uso",
            cookies: "Política de Cookies",
            refund: "Política de Reembolso",
            support: "Soporte",
            securePayments: "Pagos seguros con",
            copyright: "© 2026 BTS Europe Tour. Todos los derechos reservados.",
            impressum: "Aviso Legal",
        },
        cookie: {
            text: "Utilizamos cookies para mejorar su experiencia. Al continuar visitando este sitio, acepta nuestro uso de cookies.",
            accept: "Aceptar",
            decline: "Rechazar",
        },
        impressumPage: {
            title: "Aviso Legal (Impressum)",
            subtitle: "Información según § 5 TMG",
            companyName: "BTS Tour Europe Ltd.",
            addressTitle: "Dirección",
            address: "Friedrichstraße 123\n10117 Berlin\nAlemania",
            representedTitle: "Representado por",
            representedBy: "Director General: Hans Müller",
            contactTitle: "Contacto",
            email: "support@bts-tour.com",
            whatsapp: "Soporte WhatsApp: +49 152 22479268",
            regTitle: "Registro Comercial",
            regNumber: "Juzgado de Registro: Amtsgericht Charlottenburg\nNúmero de Registro: HRB 123456 B",
            vatTitle: "NIF/IVA",
            vatNumber: "Número de identificación fiscal: DE 123 456 789",
            disclaimerTitle: "Responsabilidad por contenidos",
            disclaimerText: "Como proveedor de servicios, somos responsables de nuestros propios contenidos en estas páginas de acuerdo con el § 7 párrafo 1 TMG bajo las leyes generales. Sin embargo, no estamos obligados a monitorear información de terceros transmitida o almacenada ni a investigar circunstancias que indiquen actividad ilegal.",
            disclaimerLinksTitle: "Responsabilidad por enlaces",
            disclaimerLinksText: "Nuestra oferta contiene enlaces a sitios web externos de terceros sobre cuyo contenido no tenemos influencia. Por lo tanto, no podemos asumir ninguna responsabilidad por este contenido externo.",
            copyrightTitle: "Derechos de autor",
            copyrightText: "El contenido y las obras en estas páginas creados por los operadores del sitio están sujetos a la ley de derechos de autor alemana.",
            disputeTitle: "Resolución de disputas de la UE",
            disputeText: "La Comisión Europea proporciona una plataforma para la resolución de disputas en línea (ODR): https://ec.europa.eu/consumers/odr/.",
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
            emailNote: "pour la livraison des billets",
            country: "Pays",
            total: "Total",
            payNow: "Payer",
            madeTransfer: "J'ai effectué le virement",
            processing: "Traitement...",
            payViaCard: "Payer par Carte",
            payViaIBAN: "Virement Bancaire",
            cardPaymentNote: "Vous serez redirigé vers notre fournisseur de paiement sécurisé",
            ticketmasterTrust: "🔒 Transfert Officiel Ticketmaster : Vos billets seront transférés directement à cette adresse e-mail. 100% Sécurisé & Garanti.",
            ibanNote: "Veuillez transférer le montant total sur le compte suivant:",
            ibanReserved: "⚠️ La réservation est maintenue pendant 15 minutes. Les commandes impayées sont annulées automatiquement.",
            ibanInstantWarning: "IMPORTANT: Envoyez UNIQUEMENT par Virement Instantané!",
            ibanInstantWarningDesc: "Les virements normaux prennent 1-3 jours et peuvent être refusés.",
            reference: "Référence",
            securePayment: "Votre paiement est sécurisé avec un cryptage SSL 256 bits",
            fillRequired: "Veuillez remplir tous les champs obligatoires",
            emptyCart: "Votre Panier est Vide",
            browseTickets: "Parcourir les Billets",
            ticketsReserved: "Les billets sont réservés pendant :",
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
            impressum: "Mentions Légales",
        },
        cookie: {
            text: "Nous utilisons des cookies pour améliorer votre expérience. En continuant à visiter ce site, vous acceptez notre utilisation des cookies.",
            accept: "Accepter",
            decline: "Refuser",
        },
        impressumPage: {
            title: "Mentions Légales (Impressum)",
            subtitle: "Informations selon § 5 TMG",
            companyName: "BTS Tour Europe Ltd.",
            addressTitle: "Adresse",
            address: "Friedrichstraße 123\n10117 Berlin\nAllemagne",
            representedTitle: "Représenté par",
            representedBy: "Directeur Général : Hans Müller",
            contactTitle: "Contact",
            email: "support@bts-tour.com",
            whatsapp: "Support WhatsApp : +49 152 22479268",
            regTitle: "Registre du Commerce",
            regNumber: "Tribunal d'enregistrement : Amtsgericht Charlottenburg\nNuméro d'enregistrement : HRB 123456 B",
            vatTitle: "Numéro de TVA",
            vatNumber: "Numéro d'identification TVA : DE 123 456 789",
            disclaimerTitle: "Responsabilité du contenu",
            disclaimerText: "En tant que prestataire de services, nous sommes responsables de nos propres contenus sur ces pages conformément au § 7 Paragraphe 1 TMG selon les lois générales.",
            disclaimerLinksTitle: "Responsabilité des liens",
            disclaimerLinksText: "Notre offre contient des liens vers des sites Web tiers externes sur le contenu desquels nous n'avons aucune influence.",
            copyrightTitle: "Droit d'auteur",
            copyrightText: "Le contenu et les œuvres de ces pages créés par les exploitants du site sont soumis au droit d'auteur allemand.",
            disputeTitle: "Règlement des litiges de l'UE",
            disputeText: "La Commission européenne fournit une plateforme de règlement des litiges en ligne (RLL) : https://ec.europa.eu/consumers/odr/.",
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
